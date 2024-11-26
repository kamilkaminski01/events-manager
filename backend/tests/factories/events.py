from app.extensions import db
from app.models.event import Event
from app.models.participant import Participant


def create_event():
    host = Participant(
        first_name="Tester",
        last_name="Test",
        is_host=True,
        meal_preference="CARNIVOROUS",
        chosen_meals=[],
    )
    db.session.add(host)
    db.session.commit()
    event = Event(name="Test Event", host_id=host.id)
    db.session.add(event)
    db.session.commit()
