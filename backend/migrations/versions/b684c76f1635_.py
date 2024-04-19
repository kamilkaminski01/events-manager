"""Empty message.

Revision ID: b684c76f1635
Revises: 5d8e53ebcf24
Create Date: 2024-04-18 23:53:33.099262
"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "b684c76f1635"
down_revision = "5d8e53ebcf24"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("participants", schema=None) as batch_op:
        batch_op.add_column(sa.Column("created_at", sa.DateTime(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("participants", schema=None) as batch_op:
        batch_op.drop_column("created_at")

    # ### end Alembic commands ###
