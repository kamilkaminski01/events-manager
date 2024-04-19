from flask import Blueprint, Response, jsonify, make_response, request
from marshmallow.exceptions import ValidationError
from sqlalchemy.orm.exc import UnmappedInstanceError

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
    return make_response(jsonify(ResponseMessage.CREATED), 201)


@api.route("/participants/", methods=["GET"])
def list_participants() -> Response:
    if request.method == "GET":
        response_schema = ParticipantResponseSchema()
        participants = Participant.default_sort().all()
        response = [response_schema.dump(participant) for participant in participants]
        return make_response(jsonify(response), 200)
    return make_response(jsonify(ResponseMessage.INVALID_REQUEST), 404)


@api.route("/participants/", methods=["POST"])
def create_participant() -> Response:
    if request.method == "POST":
        response_schema = ParticipantResponseSchema()
        try:
            data = ParticipantRequestSchema().load(request.get_json())
            participant = Participant(
                first_name=data["first_name"],
                last_name=data["last_name"],
                is_host=data["is_host"],
                meal_preference=data.get("meal_preference"),
                chosen_meals=data["chosen_meals"],
            )
            db.session.add(participant)
            db.session.commit()
        except ValidationError:
            return make_response(jsonify(ResponseMessage.INVALID_DATA), 400)
        return make_response(jsonify(response_schema.dump(participant)), 201)
    return make_response(jsonify(ResponseMessage.INVALID_REQUEST), 404)


@api.route("/participants/<int:id>/", methods=["GET"])
def get_participant(id: int) -> Response:
    if request.method == "GET":
        participant = Participant.query.get(id)
        if participant:
            response_schema = ParticipantResponseSchema()
            response = response_schema.dump(participant)
            return make_response(jsonify(response), 200)
        return make_response(jsonify(ResponseMessage.NOT_FOUND), 404)
    return make_response(jsonify(ResponseMessage.INVALID_REQUEST), 404)


@api.route("/participants/<int:id>/", methods=["PATCH"])
def update_participant(id: int) -> Response:
    if request.method == "PATCH":
        participant = Participant.query.get(id)
        if participant:
            try:
                request_schema = ParticipantRequestSchema()
                data = request_schema.load(request.get_json(), partial=True)
                for key, value in data.items():
                    setattr(participant, key, value)
                db.session.commit()
                return make_response(jsonify(ResponseMessage.UPDATED), 200)
            except ValidationError:
                return make_response(jsonify(ResponseMessage.INVALID_DATA), 400)
        return make_response(jsonify(ResponseMessage.NOT_FOUND), 404)
    return make_response(jsonify(ResponseMessage.INVALID_REQUEST), 404)


@api.route("/participants/<int:id>/", methods=["DELETE"])
def delete_participant(id: int) -> Response:
    if request.method == "DELETE":
        try:
            participant = Participant.query.get(id)
            db.session.delete(participant)
            db.session.commit()
        except UnmappedInstanceError:
            return make_response(jsonify(ResponseMessage.NOT_FOUND), 404)
        return make_response(jsonify(ResponseMessage.DELETED), 200)
    return make_response(jsonify(ResponseMessage.INVALID_REQUEST), 404)
