from flask import request, jsonify
from flask_jwt_extended import get_jwt_identity
from models import db, Event
from datetime import date

def resolve_get_events_by_user(user_id):
    try:
        events = Event.query.filter_by(user_id=user_id).all()
        event_list = [{
            "id": event.id,
            "title": event.title,
            "date": event.date.isoformat()
        } for event in events]

        return jsonify(event_list), 200
    except Exception as e:
        return jsonify({"message": f"Error fetching events: {str(e)}"}), 500


def resolve_add_event(user_id):
    try:
        data = request.json

        title = data.get("title")
        date_str = data.get("date")

        if not title or not date_str:
            return jsonify({"message": "Title and date are required"}), 400

        try:
            event_date = date.fromisoformat(date_str)
        except ValueError:
            return jsonify({"message": "Invalid date format. Use YYYY-MM-DD."}), 400

        new_event = Event(
            title=title,
            date=event_date,
            user_id=user_id
        )

        db.session.add(new_event)
        db.session.commit()

        return jsonify({
            "message": "Event created successfully",
            "event": {
                "id": new_event.id,
                "title": new_event.title,
                "date": new_event.date.isoformat()
            }
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error creating event: {str(e)}"}), 500


def resolve_delete_event(event_id):
    try:
        event = Event.query.get(event_id)

        if not event:
            return jsonify({"message": "Event not found"}), 404

        db.session.delete(event)
        db.session.commit()

        return jsonify({"message": "Event deleted successfully"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error deleting event: {str(e)}"}), 500
