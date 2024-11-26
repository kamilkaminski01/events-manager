from app.extensions import db
from app.models.user import User


def create_user():
    user = User(username="tester", password="test")
    db.session.add(user)
    db.session.commit()
