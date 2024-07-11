from sqlalchemy.ext.hybrid import hybrid_property
from werkzeug.security import check_password_hash, generate_password_hash

from app.extensions import db


class User(db.Model):  # type: ignore
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password = db.Column("password", db.String, nullable=False)

    @hybrid_property
    def password(self) -> str:
        return self._password

    @password.setter  # type: ignore[no-redef]
    def password(self, raw_password: str) -> None:
        self._password = generate_password_hash(raw_password)

    def check_password(self, raw_password: str) -> bool:
        return check_password_hash(self._password, raw_password)
