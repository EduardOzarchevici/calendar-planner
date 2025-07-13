import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = 'asdfhjfasiioh fasdfa sdfa sdf a1234h'
    JWT_ACCESS_TOKEN_EXPIRES = 3600
    DEBUG = True
