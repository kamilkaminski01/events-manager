from flask import Blueprint, Response, jsonify, make_response, request
from marshmallow.exceptions import ValidationError
from sqlalchemy.orm.exc import UnmappedInstanceError

from app.extensions import db
from app.models.event import Event
from app.models.participant import Meal, Participant

from .responses import ResponseMessage
from .schemas import (
    EventRequestSchema,
    EventResponseSchema,
    ParticipantRequestSchema,
    ParticipantResponseSchema,
)

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
        request_schema = ParticipantRequestSchema()
        response_schema = ParticipantResponseSchema()
        try:
            data = request_schema.load(request.get_json())
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
            request_schema = ParticipantRequestSchema()
            response_schema = ParticipantResponseSchema()
            try:
                data = request_schema.load(request.get_json(), partial=True)
                for key, value in data.items():
                    setattr(participant, key, value)
                db.session.commit()
                response = response_schema.dump(participant)
                return make_response(jsonify(response), 200)
            except ValidationError:
                return make_response(jsonify(ResponseMessage.INVALID_DATA), 400)
        return make_response(jsonify(ResponseMessage.NOT_FOUND), 404)
    return make_response(jsonify(ResponseMessage.INVALID_REQUEST), 404)


@api.route("/participants/<int:id>/", methods=["DELETE"])
def delete_participant(id: int) -> Response:
    if request.method == "DELETE":
        try:
            participant = Participant.query.get(id)
            if participant.is_host:
                event = Event.query.filter_by(host=participant).first()
                event.host = None
            db.session.delete(participant)
            db.session.commit()
        except UnmappedInstanceError:
            return make_response(jsonify(ResponseMessage.NOT_FOUND), 404)
        return make_response(jsonify(ResponseMessage.DELETED), 200)
    return make_response(jsonify(ResponseMessage.INVALID_REQUEST), 404)


@api.route("/events/", methods=["GET"])
def list_events() -> Response:
    if request.method == "GET":
        response_schema = EventResponseSchema()
        events = Event.default_sort().all()
        response = [response_schema.dump(event) for event in events]
        return make_response(jsonify(response), 200)
    return make_response(jsonify(ResponseMessage.INVALID_REQUEST), 404)


@api.route("/events/", methods=["POST"])
def create_event() -> Response:
    if request.method == "POST":
        request_schema = EventRequestSchema()
        response_schema = EventResponseSchema()
        try:
            data = request_schema.load(request.get_json())
            event = Event(name=data["name"], host_id=data["host_id"])
            host_participant = Participant.query.get(data["host_id"])

            event.host = host_participant
            host_participant.is_host = True

            if participants_ids := data.get("participants"):
                participants = Participant.query.filter(
                    Participant.id.in_(participants_ids)
                ).all()
                event.participants.extend(participants)

            db.session.add(event)
            db.session.add(host_participant)
            db.session.commit()
            response = {
                "id": event.id,
                "name": event.name,
                "host": host_participant,
                "participants": event.participants,
            }
        except ValidationError:
            return make_response(jsonify(ResponseMessage.INVALID_DATA), 400)
        return make_response(jsonify(response_schema.dump(response)), 201)
    return make_response(jsonify(ResponseMessage.INVALID_REQUEST), 404)


@api.route("/events/<int:id>/", methods=["PATCH"])
def update_event(id: int) -> Response:
    if request.method == "PATCH":
        event = Event.query.get(id)
        if event:
            request_schema = EventRequestSchema()
            response_schema = EventResponseSchema()
            try:
                data = request_schema.load(request.get_json(), partial=True)
                host_id = data["host_id"]
                if event.host.id != host_id:
                    event.host.is_host = False
                    new_host = Participant.query.get(host_id)
                    new_host.is_host = True
                for key, value in data.items():
                    setattr(event, key, value)
                db.session.commit()
                response = response_schema.dump(event)
                return make_response(jsonify(response), 200)
            except ValidationError:
                return make_response(jsonify(ResponseMessage.INVALID_DATA), 400)
        return make_response(jsonify(ResponseMessage.NOT_FOUND), 404)
    return make_response(jsonify(ResponseMessage.INVALID_REQUEST), 404)


@api.route("/events/<int:id>/", methods=["DELETE"])
def delete_event(id: int) -> Response:
    if request.method == "DELETE":
        try:
            event = Event.query.get(id)
            if event.host:
                event.host.is_host = False
            for participant in event.participants:
                participant.event.remove(event)
            db.session.delete(event)
            db.session.commit()
        except UnmappedInstanceError:
            return make_response(jsonify(ResponseMessage.NOT_FOUND), 404)
        return make_response(jsonify(ResponseMessage.DELETED), 200)
    return make_response(jsonify(ResponseMessage.INVALID_REQUEST), 404)
