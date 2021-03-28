import datetime
import math
import random

from flask import jsonify, request
from . import home
from .. import db
from ..models import Goods, User, Order


# 通过配置headers参数允许请求跨域
@home.after_request
def cors(environ):
    environ.headers['Access-Control-Allow-Origin']='*'
    environ.headers['Access-Control-Allow-Method']='*'
    environ.headers['Access-Control-Allow-Headers']='x-requested-with,content-type'
    return environ


# 获取商品列表
@home.route("/list/", methods=['GET'])
def get_goods_list():
    goods_list = Goods.query.all()
    list = []
    for good in goods_list:
        list.append(good.to_json())
    res = {}
    res['list'] = list
    print(res)
    return jsonify(res)


# 通过id获取商品详情
@home.route("/good/")
def get_good_by_id():
    id = request.args.get("id")
    good = Goods.query.filter_by(id=id).first_or_404()
    res = good.to_json()
    print(res)
    return jsonify(res)

# 用户购买商品
@home.route("/buy/", methods=["POST"])
def submit_order():
    info = request.get_json()
    res = {}
    order_num = tid_maker()
    good_title = info['good']['title']
    price = info['good']['price']
    image_url = info['good']['img_url']
    number = info['num']
    total_price = float(price)*int(number)
    address_info = info['address_info']['provinceName']+info['address_info']['cityName']+info['address_info']['countyName']+info['address_info']['detailInfo']
    address_people_name = info['address_info']['userName']
    address_phone = info['address_info']['telNumber']
    user_id = int(info['user_id'])
    create_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    order_add = Order(
        order_num=order_num,
        good_title = good_title,
        price = price,
        image_url = image_url,
        number = number,
        total_price = str(total_price),
        address_info = address_info,
        address_people_name = address_people_name,
        address_phone = address_phone,
        user_id = user_id,
        create_time = create_time
    )
    db.session.add(order_add)
    db.session.flush()
    res['order_id'] = order_add.id
    user = User.query.filter_by(id=user_id).first()
    user.buy_num = user.buy_num+1
    db.session.add(user)
    db.session.commit()
    return jsonify(res)


# 根据用户id查询订单列表
@home.route("/order/list/")
def order_list():
    user_id = request.args.get("user_id")
    order_list = Order.query.filter_by(user_id=user_id).all()
    list = []
    res = {}
    for order in order_list:
        list.append(order.to_json())
    res['list'] = list
    print(res)
    return jsonify(res)


# 根据订单id查询订单详情信息
@home.route("/order/detail/")
def order_detail():
    id = request.args.get("id")
    order = Order.query.filter_by(id=id).first()
    res = order.to_json()
    print(res)
    return jsonify(res)


# 通过验证码登录
@home.route("/login/")
def login():
    phone = request.args.get("phone")
    num = request.args.get("num")
    res = {}
    user = User.query.filter_by(phone=phone).first()
    if user is None:
        user_add = User(
            phone=phone,
            buy_num=0
        )
        db.session.add(user_add)
        db.session.flush()
        res['user'] = user_add.to_json()
        db.session.commit()
    else:
        res['user'] = user.to_json()
    print(res)
    return jsonify(res)


# 根据时间戳生成唯一订单号
def tid_maker():
    return '{0:%Y%m%d%H%M%S%f}'.format(datetime.datetime.now())+''.join([str(random.randint(1,10)) for i in range(5)])


