from typing import List, Optional

from flask import Blueprint, Response, jsonify, make_response, request
from marshmallow.exceptions import ValidationError

from app.extensions import db
from app.models.participant import Meal, Participant

from .responses import ResponseMessage
from .schemas import ParticipantRequestSchema, ParticipantResponseSchema

api = Blueprint("api", __name__, url_prefix="/api/v1")


@api.route("/meals/", methods=["POST"])
def create_meal() -> Response:
    try:
        data = request.get_json()
        meal = Meal(type=data["type"])
        db.session.add(meal)
        db.session.commit()
    except KeyError:
        return make_response(jsonify(ResponseMessage.INVALID_DATA), 400)
    return jsonify(meal.to_dict())


@api.route("/participants/", methods=["GET", "POST"])
def create_participant() -> Response:
    response_schema = ParticipantResponseSchema()
    if request.method == "GET":
        participants = Participant.query.all()
        response = [response_schema.dump(participant) for participant in participants]
        return make_response(jsonify(response), 200)
    if request.method == "POST":
        try:
            data = ParticipantRequestSchema().load(request.get_json())
            participant = Participant(
                first_name=data["first_name"],
                last_name=data["last_name"],
                is_host=data["is_host"],
                meal_preference=data.get("meal_preference"),
                chosen_meals=_get_chosen_meals(data.get("chosen_meals")),
            )
            db.session.add(participant)
            db.session.commit()
        except ValidationError:
            return make_response(jsonify(ResponseMessage.INVALID_DATA), 400)
        return make_response(jsonify(response_schema.dump(participant)), 201)
    return make_response(jsonify(ResponseMessage.INVALID_REQUEST), 404)


def _get_chosen_meals(chosen_meals_data: Optional[list]) -> List[Meal]:
    chosen_meals: List[Meal] = []
    if chosen_meals_data:
        for meal_type in chosen_meals_data:
            meal = Meal.query.filter_by(type=meal_type).first()
            if meal:
                chosen_meals.append(meal)
    return chosen_meals
