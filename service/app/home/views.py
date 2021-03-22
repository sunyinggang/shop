import math

from flask import jsonify, request
from . import home
from .. import db
from ..models import Goods


# 通过配置headers参数允许请求跨域
@home.after_request
def cors(environ):
    environ.headers['Access-Control-Allow-Origin']='*'
    environ.headers['Access-Control-Allow-Method']='*'
    environ.headers['Access-Control-Allow-Headers']='x-requested-with,content-type'
    return environ


# 获取商品列表
@home.route("/list", methods=['GET'])
def get_goods_list():
    goods_list = Goods.query.all()
    list = []
    for good in goods_list:
        list.append(good.to_json())
    res = {}
    res['list'] = list
    return jsonify(res)


# 通过id获取商品详情
@home.route("/good")
def get_good_by_id():
    id = request.args.get("id")
    good = Goods.query.filter_by(id=id).first_or_404()
    res = good.to_json()
    return jsonify(res)


