from flask import Flask
from config import Config
from routes.auth_routes import auth
from routes.event_routes import event
from models import db
from flask_cors import CORS
from controllers import jwt


def create_app():
    app = Flask(__name__)
    app.register_blueprint(auth, url_prefix='/api')
    app.register_blueprint(event, url_prefix='/api')

    app.config.from_object(Config)

    db.init_app(app)
    jwt.init_app(app)
    CORS(app)


    return app