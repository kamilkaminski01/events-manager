from app.extensions import db
from app.models.user import User


def create_user(app):
    with app.app_context():
        user = User(username="tester", password="test")
        db.session.add(user)
        db.session.commit()
