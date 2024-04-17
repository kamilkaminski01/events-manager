from typing import List

from flask import Blueprint, Response, jsonify, request

from app.extensions import db
from app.models.participant import Meal, Participant

api = Blueprint("api", __name__, url_prefix="/api/v1")


@api.route("/meals/", methods=["POST"])
def create_meal():
    data = request.get_json()
    meal = Meal(type=data["type"])

    db.session.add(meal)
    db.session.commit()

    return jsonify(meal.to_dict())


@api.route("/participants/", methods=["POST"])
def create_participant() -> Response:
    data = request.get_json()
    participant = Participant(
        first_name=data["first_name"],
        last_name=data["last_name"],
        is_host=data.get("is_host", False),
        days_participation_length=data["days_participation_length"],
        meal_preference=data["meal_preference"],
        chosen_meals=_get_chosen_meals(data["chosen_meals"]),
    )

    db.session.add(participant)
    db.session.commit()

    return jsonify(participant.to_dict())


def _get_chosen_meals(chosen_meals_data: list) -> List[Meal]:
    chosen_meals: List[Meal] = []
    for meal_type in chosen_meals_data:
        meal = Meal.query.filter_by(type=meal_type).first()
        if meal:
            chosen_meals.append(meal)
    return chosen_meals
