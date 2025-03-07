"""Added rating field to Candidate

Revision ID: d6352b58e65c
Revises: 
Create Date: 2025-03-02 07:16:31.594573

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd6352b58e65c'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('candidates', schema=None) as batch_op:
        batch_op.add_column(sa.Column('rating', sa.Float(), nullable=True))
        batch_op.alter_column('status',
               existing_type=sa.VARCHAR(length=10),
               type_=sa.Enum('APPLIED', 'SCREENING', 'DESIGNCHALLENGE', 'INTERVIEW', 'HRROUND', 'HIRED','ACCEPTED', 'REJECTED', name='candidatestatus'),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('candidates', schema=None) as batch_op:
        batch_op.alter_column('status',
               existing_type=sa.Enum('APPLIED', 'SCREENING', 'DESIGNCHALLENGE', 'INTERVIEW', 'HRROUND', 'HIRED','ACCEPTED', 'REJECTED', name='candidatestatus'),
               type_=sa.VARCHAR(length=10),
               existing_nullable=True)
        batch_op.drop_column('rating')

    # ### end Alembic commands ###
