import enum
from datetime import datetime

from sqlalchemy import asc

from app.extensions import db

meals_order = {"Breakfast": 1, "Dinner": 2, "Supper": 3}


def sort_chosen_meals(meals):
    return sorted(
        meals, key=lambda meal: meals_order.get(meal.type.value, float("inf"))
    )


class MealType(enum.Enum):
    BREAKFAST = "Breakfast"
    DINNER = "Dinner"
    SUPPER = "Supper"


class MealsPreference(enum.Enum):
    CARNIVOROUS = "Carnivorous"
    VEGETARIAN = "Vegetarian"


participant_meals = db.Table(
    "participant_meals",
    db.Column("participant_id", db.Integer, db.ForeignKey("participants.id")),
    db.Column("meal_id", db.Integer, db.ForeignKey("meals.id")),
)


class Meal(db.Model):  # type: ignore
    __tablename__ = "meals"

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.Enum(MealType), unique=True, nullable=False)


class Participant(db.Model):  # type: ignore
    __tablename__ = "participants"

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    is_host = db.Column(db.Boolean, default=False)
    meal_preference = db.Column(db.Enum(MealsPreference))
    chosen_meals = db.relationship(
        "Meal",
        secondary=participant_meals,
        backref="participant",
    )

    def __repr__(self) -> str:
        return f"<Participant {self.first_name} {self.last_name}>"

    @classmethod
    def default_sort(cls):
        return cls.query.order_by(asc(cls.created_at))
