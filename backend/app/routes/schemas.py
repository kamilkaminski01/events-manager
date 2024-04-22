from typing import List

from marshmallow import Schema, fields, post_load

from app.models.participant import Meal, MealsPreference, MealType


def camelcase(s):
    parts = iter(s.split("_"))
    return next(parts) + "".join(i.title() for i in parts)


class CamelCaseSchema(Schema):
    """Schema that uses camel-case for its external representation and snake-
    case for its internal representation."""

    def on_bind_field(self, field_name, field_obj):
        field_obj.data_key = camelcase(field_obj.data_key or field_name)


class ParticipantRequestSchema(CamelCaseSchema):
    first_name = fields.Str()
    last_name = fields.Str()
    is_host = fields.Bool(load_default=False)
    meal_preference = fields.Enum(MealsPreference, allow_none=True)
    chosen_meals = fields.List(fields.Enum(MealType), allow_none=True)

    @post_load
    def prepare_chosen_meals(self, data: dict, **kwargs) -> dict:
        if chosen_meals_data := data.get("chosen_meals"):
            chosen_meals: List[Meal] = []
            for meal_type in chosen_meals_data:
                meal = Meal.query.filter_by(type=meal_type).first()
                chosen_meals.append(meal)
            data["chosen_meals"] = chosen_meals
        return data


class EventsForParticipantResponseSchema(CamelCaseSchema):
    id = fields.Integer()
    name = fields.Str()


class ParticipantResponseSchema(CamelCaseSchema):
    id = fields.Integer()
    first_name = fields.Str()
    last_name = fields.Str()
    is_host = fields.Bool()
    meal_preference = fields.Enum(MealsPreference, by_value=True)
    chosen_meals = fields.List(fields.Str())
    hosted_event = fields.Nested(EventsForParticipantResponseSchema)
    events = fields.Nested(EventsForParticipantResponseSchema, many=True)


class EventRequestSchema(CamelCaseSchema):
    name = fields.Str()
    host_id = fields.Integer()
    participants = fields.List(fields.Integer())


class EventResponseSchema(CamelCaseSchema):
    id = fields.Integer()
    name = fields.Str()
    host = fields.Nested(ParticipantResponseSchema)
    participants = fields.Nested(ParticipantResponseSchema, many=True)
