# -*- coding: utf-8 -*-
import datetime
import math
import random
from email.mime.text import MIMEText
from encodings.base64_codec import base64_encode

from flask import jsonify, request, Flask, render_template
from flask_mail import Mail, Message
from werkzeug.security import generate_password_hash, check_password_hash

from . import home
from .. import db, app
from ..models import Goods, User, Order, Label, Address, Coupon


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
    coupon_id = info['coupon_id']
    coupon = Coupon.query.filter_by(id=coupon_id).first()
    coupon.status = 1
    db.session.add(coupon)
    total_price = float(price)*int(number)-float(coupon.les)
    address_info = info['address_info']['address']
    address_people_name = info['address_info']['name']
    address_phone = info['address_info']['phone']
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
    user.total_consume = str(float(user.total_consume)+total_price)
    type_name = user_type(user.buy_num, float(user.total_consume))
    label = Label.query.filter_by(label_name = type_name).first()
    user.label_id = label.id
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


# 登录
@home.route("/login/")
def login():
    phone = request.args.get("phone")
    password = request.args.get("password")
    res = {}
    user = User.query.filter_by(phone=phone).first()
    print(password)
    if user is None:
        res['code'] = 101
    elif check_password_hash(user.password, password) is False:
        res['code'] = 102
    else:
        res['code'] = 200
        res['user'] = user.to_json()
    return jsonify(res)

# 通过手机号注册
@home.route("/register/")
def register():
    phone = request.args.get("phone")
    password = request.args.get("password")
    age = request.args.get("age")
    email = request.args.get("email")
    res = {}
    user = User.query.filter_by(phone=phone).first()
    if user is None:
        label = Label.query.filter_by(label_name="潜在客户").first()
        user_add = User(
            phone=phone,
            total_consume='0',
            buy_num=0,
            email=email,
            age=age,
            password=generate_password_hash(password),
            label_id=label.id
        )
        db.session.add(user_add)
        db.session.flush()
        db.session.commit()
        user = User.query.filter_by(phone=phone).first()
        res['user'] = user.to_json()
        res['code'] = 0
        print(res)
    else:
        res['code'] = 100
    return jsonify(res)


# 修改年龄
@home.route("/edit/age/")
def editAge():
    user_id = request.args.get("user_id")
    res = {}
    age = request.args.get("age")
    user = User.query.filter_by(id=user_id).first()
    user.age = age
    db.session.add(user)
    db.session.commit()
    res['age'] = age
    return jsonify(res)


# 查询标签信息列表
@home.route("/label/list/")
def label_list():
    label_list = Label.query.filter_by().all()
    list = []
    res = {}
    for label in label_list:
        list.append(label.to_json())
    res['list'] = list
    print(res)
    return jsonify(res)


# 根据id查询标签详情信息
@home.route("/label/detail/")
def label_detail():
    id = request.args.get("id")
    label = Label.query.filter_by(id=id).first()
    res = label.to_json()
    print(res)
    return jsonify(res)

# 修改标签信息
@home.route("/label/edit/", methods=["POST"])
def editLabel():
    info = request.get_json()
    print(info)
    res = {}
    id = info["id"]
    title = info["title"]
    context = info["context"]

    label = Label.query.filter_by(id=id).first()
    label.title = title
    label.context = context
    db.session.add(label)
    db.session.commit()
    res['code'] = 0
    return jsonify(res)

# 发送邮件
@home.route('/send/email/')
def send_email():
    type = request.args.get("type")
    label = Label.query.filter_by(label_name=type).first()
    user_list = User.query.filter_by(label_id=label.id).all()
    email_list = []
    title = label.title
    body = label.context
    for user in user_list:
        email_list.append(user.email)
    # 发送短信的配置
    # 如果是qq邮箱这里应该为"smtp.qq.com"
    app.config['MAIL_SERVER'] = "smtp.qq.com"
    # 如果使用ssl则端口号应为465
    app.config['MAIL_PORT'] = 465
    app.config['MAIL_USE_SSL'] = True
    app.config['MAIL_USE_TLS'] = False
    # 发送人的邮箱
    app.config['MAIL_USERNAME'] = "2861679704"
    # 这里的密码是之前获取的邮箱授权码
    app.config['MAIL_PASSWORD'] = "xhtkdrlfyjrvdfcc"
    # 显示发送人的名字
    # app.config['MAIL_DEFAULT_SENDER'] = '2861679704@qq.com'
    mail = Mail(app)
    # body = render_template('潜在客户123')
    msg = Message(subject=title,
                  sender="2861679704@qq.com",
                  recipients=email_list)
    msg.body = body
    mail.send(msg)
    res = {}
    return jsonify(res)


# 添加收货地址
@home.route('/address/add/')
def address_add():
    user_id = request.args.get("user_id")
    name = request.args.get("name")
    phone = request.args.get("phone")
    address = request.args.get("address")
    address_add = Address(
        user_id=user_id,
        name=name,
        phone=phone,
        address=address
    )
    db.session.add(address_add)
    db.session.flush()
    db.session.commit()
    res = {}
    res['code'] = 0
    return jsonify(res)


# 创建优惠券
@home.route('/create/coupon/')
def create_coupon():
    type = request.args.get("type")
    al = request.args.get("al")
    les = request.args.get("les")
    label = Label.query.filter_by(label_name=type).first()
    user_list = User.query.filter_by(label_id=label.id).all()
    for user in user_list:
        coupon = Coupon(
            user_id=user.id,
            al=al,
            les=les,
            status=0
        )
        db.session.add(coupon)
        db.session.flush()
    db.session.commit()
    res = {}
    res['code'] = 0
    return jsonify(res)


# 根据用户查询优惠券
@home.route('/coupon/list/')
def coupon_list():
    user_id = request.args.get("user_id")
    coupon_list = Coupon.query.filter_by(user_id=user_id, status=0).all()
    list = []
    res = {}
    for coupon in coupon_list:
        list.append(coupon.to_json())
    res['list'] = list
    print(res)
    return jsonify(res)


# 删除收货地址
@home.route('/address/del/')
def address_del():
    id = int(request.args.get("id"))
    address = Address.query.filter_by(id=id).first()
    db.session.delete(address)
    db.session.commit()
    res = {}
    res['code'] = 0
    return jsonify(res)


# 根据用户查询收货地址列表
@home.route('/address/list/')
def address_list():
    user_id = request.args.get("user_id")
    address_list = Address.query.filter_by(user_id=user_id).all()
    address_list_json = []
    for address in address_list:
        address_list_json.append(address.to_json())
    res = {}
    res['address_list'] = address_list_json
    return jsonify(res)

# 根据时间戳生成唯一订单号
def tid_maker():
    return '{0:%Y%m%d%H%M%S%f}'.format(datetime.datetime.now())+''.join([str(random.randint(1,10)) for i in range(5)])


# 判断用户类型
def user_type(user_buy_num, user_total_consume):
    if user_total_consume<=500 or user_buy_num <=5:
        return "基础客户"
    elif 500<user_total_consume<=1000 and user_buy_num<=10:
        return "一般客户"
    elif user_total_consume>1000:
        if user_buy_num<=10:
            return "一般客户"
        else:
            return "重点客户"

# 发送邮件
@home.route('/test/')
def test():

    app.config.update(dict(
        DEBUG=True,
        MAIL_SERVER='smtp.qq.com',
        MAIL_PORT=465,
        MAIL_USE_TLS=False,
        MAIL_USE_SSL=True,
        MAIL_USERNAME="2861679704",
        MAIL_PASSWORD='xhtkdrlfyjrvdfcc'
    ))
    mail = Mail(app)
    msg = Message('xxx',sender='2861679704@qq.com', recipients=["136080416@qq.com"])
    msg.body = "hello 中国"
    mail.send(msg)
    res = {}
    return jsonify(res)