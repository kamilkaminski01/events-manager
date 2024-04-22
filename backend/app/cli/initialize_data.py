from flask import Blueprint

from app.extensions import db
from app.models.event import Event
from app.models.participant import Meal, Participant

cmd = Blueprint("cmd", __name__)


@cmd.cli.command("initialize_data")
def initialize_data():
    breakfast = Meal.query.filter_by(type="BREAKFAST").first()
    supper = Meal.query.filter_by(type="SUPPER").first()
    dinner = Meal.query.filter_by(type="DINNER").first()

    participants = [
        Participant(
            first_name="Kamil",
            last_name="Kaminski",
            is_host=True,
            meal_preference="CARNIVOROUS",
            chosen_meals=[breakfast, supper],
        ),
        Participant(
            first_name="John",
            last_name="Smith",
            is_host=True,
            meal_preference="VEGETARIAN",
            chosen_meals=[],
        ),
        Participant(
            first_name="Maciej",
            last_name="Brown",
            is_host=False,
            meal_preference="CARNIVOROUS",
            chosen_meals=[dinner],
        ),
        Participant(
            first_name="James",
            last_name="William",
            is_host=False,
            meal_preference="VEGETARIAN",
            chosen_meals=[dinner, supper],
        ),
        Participant(
            first_name="Benjamin",
            last_name="Johnson",
            is_host=False,
            meal_preference=None,
            chosen_meals=[],
        ),
        Participant(
            first_name="Lucas",
            last_name="Davis",
            is_host=True,
            meal_preference="CARNIVOROUS",
            chosen_meals=[breakfast],
        ),
    ]

    events = [
        Event(
            name="Sun Rock Festival",
            host=participants[1],
            participants=[participants[0], participants[2]],
        ),
        Event(
            name="Dubai Vacation",
            host=participants[3],
            participants=[participants[1], participants[2], participants[5]],
        ),
        Event(
            name="Summer BBQ",
            host=participants[0],
            participants=[participants[1], participants[2], participants[4]],
        ),
        Event(
            name="Q3 Meetup",
            host=participants[5],
            participants=[participants[1], participants[2], participants[0]],
        ),
    ]

    db.session.add_all(participants)
    db.session.add_all(events)
    db.session.commit()
