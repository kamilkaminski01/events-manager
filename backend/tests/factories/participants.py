from app.extensions import db
from app.models.participant import Meal, Participant


def create_participant(app):
    with app.app_context():
        breakfast, dinner, supper = query_meals()
        participant = Participant(
            first_name="Adam",
            last_name="Test",
            is_host=False,
            meal_preference="CARNIVOROUS",
            chosen_meals=[breakfast, dinner, supper],
        )
        db.session.add(participant)
        db.session.commit()


def create_bulk_participants(app):
    with app.app_context():
        breakfast, dinner, supper = query_meals()
        participant1 = Participant(
            first_name="Kamil",
            last_name="Test",
            is_host=False,
            meal_preference="CARNIVOROUS",
            chosen_meals=[breakfast, dinner, supper],
        )
        participant2 = Participant(
            first_name="John",
            last_name="Test",
            is_host=False,
            meal_preference="VEGETARIAN",
            chosen_meals=[breakfast, supper],
        )
        participant3 = Participant(
            first_name="Anna",
            last_name="Test",
            is_host=False,
            meal_preference=None,
            chosen_meals=[breakfast],
        )
        db.session.add_all([participant1, participant2, participant3])
        db.session.commit()


def query_meals():
    breakfast = Meal.query.filter_by(type="BREAKFAST").first()
    supper = Meal.query.filter_by(type="SUPPER").first()
    dinner = Meal.query.filter_by(type="DINNER").first()
    return breakfast, supper, dinner
