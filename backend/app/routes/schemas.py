from marshmallow import Schema, fields

from app.models.participant import MealsPreference, MealType


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
    meal_preference = fields.Enum(MealsPreference)
    chosen_meals = fields.List(fields.Enum(MealType))


class ParticipantResponseSchema(CamelCaseSchema):
    first_name = fields.Str()
    last_name = fields.Str()
    is_host = fields.Bool()
    meal_preference = fields.Enum(MealsPreference, by_value=True)
    chosen_meals = fields.List(fields.Str())
