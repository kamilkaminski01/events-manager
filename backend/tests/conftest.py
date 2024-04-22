import pytest
from sqlalchemy.exc import IntegrityError

from app import create_app, db
from app.config import TestConfig
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


@pytest.fixture()
def app():
    app = create_app(config=TestConfig)

    with app.app_context():
        db.create_all()
        initialize_db_with_dependent_data()

    yield app

    with app.app_context():
        db.session.remove()
        db.drop_all()


@pytest.fixture()
def client(app):
    return app.test_client()
