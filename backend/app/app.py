from __init__ import create_app
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

app = create_app()

db = SQLAlchemy(app)
migrate = Migrate(app, db)
