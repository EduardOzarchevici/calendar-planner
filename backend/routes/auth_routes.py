from flask import Blueprint
from controllers.auth_controller import *

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['POST'])
def login():
    return login_verification()

@auth.route('/register', methods=['POST'])
def register():
    return register_verification()
