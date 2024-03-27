from flask import Flask, jsonify, request, render_template, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SECRET_KEY'] = 'a_very_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///church_app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

#Class for tables
class Church(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(10), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100), nullable=False)


class Event(db.Model):
    __tablename__ = 'events'  # Ensure this matches your actual table name
    id = db.Column(db.Integer, primary_key=True)
    church_id = db.Column(db.Integer, db.ForeignKey('church.id'), nullable=False)
    event_title = db.Column(db.String(100), nullable=False)  # Make sure this matches the actual column name
    date = db.Column(db.DateTime, nullable=False)  # Ensure the column type matches your intended use and table structure
    description = db.Column(db.Text, nullable=True)

    church = db.relationship('Church', backref=db.backref('events', lazy=True))


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/set_church', methods=['POST'])
def set_church():
    code = request.form.get('church_code').strip()
    church = Church.query.filter_by(code=code).first()
    if church:
        return redirect(url_for('church_main', church_id=church.id))
    else:
        return render_template('error.html', message='Church code not found. Please try again.')

@app.route('/church_main/<int:church_id>')
def church_main(church_id):
    church = Church.query.get_or_404(church_id)
    return render_template('church_main.html', church=church)

@app.route('/upcoming-events/<int:church_id>')
def upcoming_events(church_id):
    church = Church.query.get_or_404(church_id)
    events = Event.query.filter_by(church_id=church_id).order_by(Event.date).all()
    print("Events for church_id", church_id, ":", events)
    return render_template('upcoming_events.html', church=church, events=events)



if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    # app.run(host='192.168.5.129', port=5000, debug=True)
    app.run(host='0.0.0.0', port=5000, debug = True)

