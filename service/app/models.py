from datetime import datetime

from app import db


class Goods(db.Model):
    __tablename__ = 'goods'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    price = db.Column(db.String(255))
    brief = db.Column(db.String(255))
    img_url = db.Column(db.String(255))
    context = db.Column(db.TEXT)

    def to_json(self):
        dict = self.__dict__
        if "_sa_instance_state" in dict:
            del dict["_sa_instance_state"]
            return dict


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    phone = db.Column(db.String(255))
    password = db.Column(db.String(255))
    buy_num = db.Column(db.Integer)
    age = db.Column(db.Integer)
    total_consume = db.Column(db.String(255))
    label_id = db.Column(db.Integer)
    email = db.Column(db.String(255))

    def to_json(self):
        dict = self.__dict__
        if "_sa_instance_state" in dict:
            del dict["_sa_instance_state"]
            return dict


class Order(db.Model):
    __tablename__ = 'order'
    id = db.Column(db.Integer, primary_key=True)
    order_num = db.Column(db.String(255))
    good_title = db.Column(db.String(255))
    price = db.Column(db.String(255))
    number = db.Column(db.Integer)
    total_price = db.Column(db.String(255))
    address_info = db.Column(db.String(255))
    address_people_name = db.Column(db.String(255))
    address_phone = db.Column(db.String(255))
    user_id = db.Column(db.Integer)
    image_url = db.Column(db.String(255))
    create_time = db.Column(db.String(255))

    def to_json(self):
        dict = self.__dict__
        if "_sa_instance_state" in dict:
            del dict["_sa_instance_state"]
            return dict


class Label(db.Model):
    __tablename__ = 'label'
    id = db.Column(db.Integer, primary_key=True)
    label_name = db.Column(db.String(255))
    title = db.Column(db.String(255))
    context = db.Column(db.TEXT)

    def to_json(self):
        dict = self.__dict__
        if "_sa_instance_state" in dict:
            del dict["_sa_instance_state"]
            return dict


class Address(db.Model):
    __tablename__ = 'address'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    name = db.Column(db.String(255))
    phone = db.Column(db.String(255))
    address = db.Column(db.String(255))

    def to_json(self):
        dict = self.__dict__
        if "_sa_instance_state" in dict:
            del dict["_sa_instance_state"]
            return dict