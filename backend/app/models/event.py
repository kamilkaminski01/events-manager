from datetime import datetime

from sqlalchemy import asc

from app.extensions import db

event_participants = db.Table(
    "event_participants",
    db.Column("event_id", db.Integer, db.ForeignKey("events.id")),
    db.Column("participant_id", db.Integer, db.ForeignKey("participants.id")),
)


class Event(db.Model):  # type: ignore
    __tablename__ = "events"

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    name = db.Column(db.String(255), nullable=False)
    host_id = db.Column(db.Integer, db.ForeignKey("participants.id"), nullable=True)
    host = db.relationship(
        "Participant",
        foreign_keys=[host_id],
        backref="host",
    )
    participants = db.relationship(
        "Participant",
        secondary=event_participants,
        backref="events",
    )

    def __repr__(self) -> str:
        return f"<Event {self.name}>"

    @classmethod
    def default_sort(cls):
        return cls.query.order_by(asc(cls.created_at), asc(cls.id))
