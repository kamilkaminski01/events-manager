from flask import Blueprint, Response, abort, jsonify, make_response, request
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    get_jwt_identity,
    jwt_required,
)
from marshmallow.exceptions import ValidationError

from app.extensions import db
from app.models.event import Event
from app.models.participant import Participant
from app.models.user import User

from .responses import Responses
from .schemas import (
    EventRequestSchema,
    EventResponseSchema,
    LoginRequestSchema,
    ParticipantRequestSchema,
    ParticipantResponseSchema,
)

api = Blueprint("api", __name__, url_prefix="/api/v1")


@api.route("/login/", methods=["POST"])
def login() -> Response:
    try:
        schema = LoginRequestSchema()
        data = schema.load(request.get_json())
        username, password = data["username"], data["password"]
        user = db.session.query(User).filter_by(username=username).first()
        if not user or not user.check_password(password):
            return make_response(jsonify(Responses.INVALID_CREDENTIALS), 401)
        access_token = create_access_token(identity=user.id)
        refresh_token = create_refresh_token(identity=user.id)
    except ValidationError:
        return make_response(jsonify(Responses.INVALID_DATA), 400)
    return make_response(jsonify(access=access_token, refresh=refresh_token), 200)


@api.route("/refresh/", methods=["POST"])
@jwt_required(refresh=True)
def refresh() -> Response:
    user_id = get_jwt_identity()
    access_token = create_access_token(identity=user_id)
    return make_response(jsonify(access=access_token), 200)


@api.route("/participants/", methods=["GET"])
def list_participants() -> Response:
    response_schema = ParticipantResponseSchema()
    participants = Participant.default_sort().all()
    response = [response_schema.dump(participant) for participant in participants]
    return make_response(jsonify(response), 200)


@api.route("/participants/", methods=["POST"])
@jwt_required()
def create_participant() -> Response:
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
        return make_response(jsonify(Responses.INVALID_DATA), 400)
    return make_response(jsonify(response_schema.dump(participant)), 201)


@api.route("/participants/<int:id>/", methods=["GET"])
def get_participant(id: int) -> Response:
    participant = db.session.get(Participant, id)  # type: ignore[attr-defined]
    if not participant:
        abort(404)
    if participant.is_host:
        hosted_event = db.session.query(Event).filter_by(host_id=participant.id).first()
        participant.hosted_event = hosted_event
    response_schema = ParticipantResponseSchema()
    response = response_schema.dump(participant)
    return make_response(jsonify(response), 200)


@api.route("/participants/<int:id>/", methods=["PATCH"])
@jwt_required()
def update_participant(id: int) -> Response:
    participant = db.session.get(Participant, id)  # type: ignore[attr-defined]
    if not participant:
        abort(404)
    request_schema = ParticipantRequestSchema()
    response_schema = ParticipantResponseSchema()
    try:
        data = request_schema.load(request.get_json(), partial=True)
        for key, value in data.items():
            setattr(participant, key, value)
        db.session.commit()
        return make_response(jsonify(response_schema.dump(participant)), 200)
    except ValidationError:
        return make_response(jsonify(Responses.INVALID_DATA), 400)


@api.route("/participants/<int:id>/", methods=["DELETE"])
@jwt_required()
def delete_participant(id: int) -> Response:
    participant = db.session.get(Participant, id)  # type: ignore[attr-defined]
    if not participant:
        abort(404)
    if participant.is_host:
        event = db.session.query(Event).filter_by(host=participant).first()
        if event and event.host:
            event.host = None
    db.session.delete(participant)
    db.session.commit()
    return make_response(jsonify(Responses.DELETED), 204)


@api.route("/events/", methods=["GET"])
def list_events() -> Response:
    response_schema = EventResponseSchema()
    events = Event.default_sort().all()
    response = [response_schema.dump(event) for event in events]
    return make_response(jsonify(response), 200)


@api.route("/events/", methods=["POST"])
@jwt_required()
def create_event() -> Response:
    request_schema = EventRequestSchema()
    response_schema = EventResponseSchema()
    try:
        data = request_schema.load(request.get_json())
        event = Event(name=data["name"], host_id=data["host_id"])
        _add_host_to_event(event, data)
        _add_participants_to_event(event, data)
        db.session.add(event)
        db.session.commit()
    except ValidationError:
        return make_response(jsonify(Responses.INVALID_DATA), 400)
    return make_response(jsonify(response_schema.dump(event)), 201)


def _add_host_to_event(event: Event, data: dict) -> None:
    host = db.session.get(Participant, data["host_id"])  # type: ignore[attr-defined]
    event.host = host
    host.is_host = True


def _add_participants_to_event(event: Event, data: dict) -> None:
    if participants_ids := data.get("participants"):
        condition = Participant.id.in_(participants_ids)
        participants = db.session.query(Participant).filter(condition).all()
        event.participants.extend(participants)


@api.route("/events/<int:id>/", methods=["GET"])
def get_event(id: int) -> Response:
    event = db.session.get(Event, id)  # type: ignore[attr-defined]
    if not event:
        abort(404)
    response_schema = EventResponseSchema()
    response = response_schema.dump(event)
    return make_response(jsonify(response), 200)


@api.route("/events/<int:id>/", methods=["DELETE"])
@jwt_required()
def delete_event(id: int) -> Response:
    event = db.session.get(Event, id)  # type: ignore[attr-defined]
    if not event:
        abort(404)
    if event.host:
        event.host.is_host = False
    db.session.delete(event)
    db.session.commit()
    return make_response(jsonify(Responses.DELETED), 204)


@api.route("/events/<int:id>/", methods=["PATCH"])
@jwt_required()
def update_event(id: int) -> Response:
    event = db.session.get(Event, id)  # type: ignore[attr-defined]
    if not event:
        abort(404)
    request_schema = EventRequestSchema()
    response_schema = EventResponseSchema()
    try:
        data = request_schema.load(request.get_json(), partial=True)
        _update_event_host(event, data)
        _update_event_participants(event, data)
        _update_event_fields(event, data)
        db.session.commit()
        response = response_schema.dump(event)
        return make_response(jsonify(response), 200)
    except ValidationError:
        return make_response(jsonify(Responses.INVALID_DATA), 400)


def _update_event_host(event: Event, data: dict) -> None:
    if host_id := data.get("host_id"):
        if event.host and event.host.id != host_id:
            event.host.is_host = False
            event.participants.append(event.host)
        new_host = db.session.get(Participant, host_id)  # type: ignore[attr-defined]
        new_host.is_host = True
        if new_host in event.participants:
            event.participants.remove(new_host)


def _update_event_fields(event: Event, data: dict) -> None:
    for key, value in data.items():
        setattr(event, key, value)


def _update_event_participants(event: Event, data: dict) -> None:
    participants_ids = data.get("participants")
    if participants_ids and len(participants_ids):
        condition = Participant.id.in_(participants_ids)
        participants = db.session.query(Participant).filter(condition).all()
        event.participants = participants
    elif participants_ids is not None and not len(participants_ids):
        event.participants.clear()
    data.pop("participants", None)
