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

