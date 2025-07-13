import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://admin:secretpassword@my_postgres_calendar:5432/calenderpalnnerdb')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = 'asdfhjfasiioh fasdfa sdfa sdf a1234h'
    JWT_ACCESS_TOKEN_EXPIRES = 3600
    DEBUG = True
