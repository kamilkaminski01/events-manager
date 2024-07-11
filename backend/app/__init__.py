from flask import Flask
from flask_cors import CORS

from app.cli.commands import cmd
from app.routes.endpoints import api

from .config import Config
from .extensions import db, jwt, migrate


def create_app(config=Config):
    app = Flask(__name__)
    app.config.from_object(config)
    app.json.sort_keys = False
    CORS(app)

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    app.register_blueprint(api)
    app.register_blueprint(cmd)

    return app
