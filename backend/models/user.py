from . import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    username = db.Column(db.String(150), nullable=False)
    password = db.Column(db.String(200), nullable=False)

    events = db.relationship('Event', backref='user', lazy=True)

    def save(self):
        db.session.add(self)
        db.session.commit()