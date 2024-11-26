import pytest
from flask_jwt_extended import create_access_token
from sqlalchemy.exc import IntegrityError

from app import create_app
from app.config import TestConfig
from app.extensions import db
from app.models.participant import Meal


def initialize_db_with_dependent_data():
    try:
        breakfast = Meal(type="BREAKFAST")
        dinner = Meal(type="DINNER")
        supper = Meal(type="SUPPER")
        db.session.add_all([breakfast, dinner, supper])
        db.session.commit()
    except IntegrityError:
        db.session.rollback()


@pytest.fixture(autouse=True)
def app():
    app = create_app(config=TestConfig)
    app.app_context().push()

    db.create_all()
    initialize_db_with_dependent_data()

    yield app

    db.session.remove()
    db.drop_all()


@pytest.fixture()
def client(app):
    return app.test_client()


@pytest.fixture()
def auth():
    access_token = create_access_token(identity="1")
    return {"Authorization": f"Bearer {access_token}"}
