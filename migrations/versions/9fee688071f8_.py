"""empty message

Revision ID: 9fee688071f8
Revises: 827ed4e8e96e
Create Date: 2021-02-05 14:13:18.739089

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9fee688071f8'
down_revision = '827ed4e8e96e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('customer_info', sa.Column('isdelete', sa.Boolean(), nullable=True))
    op.add_column('follow_info', sa.Column('isdelete', sa.Boolean(), nullable=True))
    op.add_column('user_profile', sa.Column('isdelete', sa.Boolean(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user_profile', 'isdelete')
    op.drop_column('follow_info', 'isdelete')
    op.drop_column('customer_info', 'isdelete')
    # ### end Alembic commands ###
