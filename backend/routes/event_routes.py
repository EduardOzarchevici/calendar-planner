from flask import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from controllers.event_controller import *

event = Blueprint('event', __name__)

@event.route('/events', methods=['GET'])
@jwt_required()
def get_events_by_user_route():  # nume unic
    current_user = get_jwt_identity()
    return resolve_get_events_by_user(current_user)

@event.route('/events', methods=['POST'])
@jwt_required()
def add_event_route():  # nume unic
    current_user = get_jwt_identity()
    return resolve_add_event(current_user)

@event.route('/events/<int:event_id>', methods=['DELETE'])
@jwt_required()
def delete_event_route(event_id):  # nume unic
    return resolve_delete_event(event_id)
    


