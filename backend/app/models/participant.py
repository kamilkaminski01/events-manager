import enum

from app.extensions import db


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

    def __repr__(self) -> str:
        return f"<Meal: {self.type}>"

    def to_dict(self) -> dict:
        return {"id": self.id, "type": self.type.value}


class Participant(db.Model):  # type: ignore
    __tablename__ = "participants"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    is_host = db.Column(db.Boolean, default=False)
    days_participation_length = db.Column(db.Integer, nullable=False)
    meal_preference = db.Column(db.Enum(MealsPreference), nullable=False)
    chosen_meals = db.relationship(
        "Meal",
        secondary=participant_meals,
        backref="participant",
    )

    def __repr__(self) -> str:
        return f"<Participant: {self.first_name} {self.first_name}>"

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "is_host": self.is_host,
            "days_participation_length": self.days_participation_length,
            "meal_preference": self.meal_preference.value,
            "chosen_meals": [meal.type.value for meal in self.chosen_meals],
        }
