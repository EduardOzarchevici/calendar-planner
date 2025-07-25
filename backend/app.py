from sqlalchemy.exc import OperationalError
from sqlalchemy import text
from routes import create_app
from models import db


app = create_app()
with app.app_context():
    try:
        db.session.execute(text('SELECT 1'))
        print("DB connection was successful")
    except OperationalError as e:
        print(f"DB connection error: {str(e)}")
        exit(1)

with app.app_context():
    try:
        #db.drop_all()
        db.create_all()
        print("Tables created successfully")
    except Exception as e:
        print(f"Error creating tables: {str(e)}")

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
