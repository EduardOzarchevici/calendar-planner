from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from flask import jsonify, request, redirect, url_for
from models import User, db

def login_verification():

    data = request.json

    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"message":"User and password are not optional"}), 400

    result = User.query.filter_by(username=username).first()
    if not result:
        return jsonify({"message":"User not found"}), 400

    if not check_password_hash(result.password, password):
        return jsonify({"message":"Username or password incorect"}), 400

    access_token = create_access_token(identity=str(result.id))
    return jsonify({
        "message": "Login successful",
        "token":access_token
    }), 200

def register_verification():

    try:
        data = request.json

        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({"message":"Usename and password are not optional"}), 400

        result = User.query.filter_by(username=username).first()
        if result:
            return jsonify({"message":"Username already exists"}), 409

        hashed_password = generate_password_hash(password, method='scrypt', salt_length=16)

        new_user = User(username=username, password=hashed_password)

        new_user.save()
        access_token = create_access_token(identity=str(new_user.id))

        return jsonify({
            "message": "Account created successfuly",
            "token": access_token,
            "username": new_user.username
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"message":str(e)}), 500
