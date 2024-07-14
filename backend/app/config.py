import os


class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "secret")
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "secret")
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URI", "sqlite:///db.sqlite3")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SENTRY_DSN = os.environ.get("SENTRY_DSN")


class TestConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///db.sqlite3"
    SENTRY_DSN = None
