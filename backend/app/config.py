import os


class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URI", "sqlite:///db.sqlite3")
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class TestConfig:
    TESTING = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///db.sqlite3"
