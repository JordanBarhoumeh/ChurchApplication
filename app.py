from flask import Flask, jsonify, request, render_template, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from flask import jsonify
from datetime import datetime
from flask import make_response
from flask_wtf.csrf import CSRFProtect


app = Flask(__name__)
app.config['SECRET_KEY'] = 'a_very_secret_key'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////home/jordanbarhoumeh/ChurchApplication/instance/church_app.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://jordanbarhoumeh:dbpass2002@jordanbarhoumeh.mysql.pythonanywhere-services.com/jordanbarhoumeh$default'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
csrf = CSRFProtect(app)


db = SQLAlchemy(app)

#check database location, print in Terminal
print(app.config['SQLALCHEMY_DATABASE_URI'])

#Classes for tables
class Church(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(10), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    image_path = db.Column(db.String(255), nullable=True)  # Optional image path
    instagram = db.Column(db.String(255), nullable=True)  # Optional Instagram link
    admin_password = db.Column(db.String(255), nullable=True)  # Ensure this line is added




class Event(db.Model):
    __tablename__ = 'events'  # Ensure this matches your table name in the database
    id = db.Column(db.Integer, primary_key=True)
    church_id = db.Column(db.Integer, db.ForeignKey('church.id'), nullable=False)
    event_title = db.Column(db.String(255), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    end_time = db.Column(db.DateTime, default=datetime.utcnow)
    is_all_day = db.Column(db.Boolean, default=False)
    description = db.Column(db.Text)

    church = db.relationship('Church', backref=db.backref('events', lazy=True))


@app.route('/index')
def index():
    church_code = request.cookies.get('church_code')
    if church_code:
        church = Church.query.filter_by(code=church_code).first()
        if church:
            return redirect(url_for('church_main', church_id=church.id))
    return render_template('index.html')

@app.route('/logout')
def logout():
    response = make_response(redirect(url_for('index')))
    response.set_cookie('church_code', '', expires=0)  # Clear the cookie
    return response


@app.route('/set_church', methods=['POST'])
def set_church():
    code = request.form.get('church_code').strip()
    church = Church.query.filter_by(code=code).first()
    if church:
        response = make_response(redirect(url_for('church_main', church_id=church.id)))
        response.set_cookie('church_code', code, max_age=60*60*24*30)  # Expires in 30 days
        return response
    else:
        return render_template('error.html', message='Church code not found. Please try again.')

@app.route('/church_main/<int:church_id>')
def church_main(church_id):
    church = Church.query.get_or_404(church_id)
    next_event = Event.query.filter(Event.church_id == church_id, Event.start_time > datetime.utcnow()).order_by(Event.start_time).first()
    return render_template('church_main.html', church=church, next_event=next_event)

@app.route('/calendar/<int:church_id>')
def calendar(church_id):
    church = Church.query.get_or_404(church_id)
    return render_template('calendar.html', church=church)

@app.route('/upcoming-events/<int:church_id>')
def upcoming_events(church_id):
    church = Church.query.get_or_404(church_id)
    # Filter events that have a start time greater than the current time
    events = Event.query.filter(Event.church_id == church_id, Event.start_time > datetime.utcnow()).order_by(Event.start_time).all()
    return render_template('upcoming_events.html', church=church, events=events)

@app.route('/events/<int:church_id>')
def get_events(church_id):
    events = Event.query.filter_by(church_id=church_id).all()
    return jsonify([{
        'id': event.id,
        'title': event.event_title,
        'start': event.start_time.isoformat(),  # Use start_time instead of date
        'end': event.end_time.isoformat(),  # Use end_time instead of date
        'isAllDay': event.is_all_day,
        'category': 'time',
        'bgColor': '#9e5fff',
        'dragBgColor': '#9e5fff',
        'borderColor': '#9e5fff'
    } for event in events])

@app.route('/service_books/<int:church_id>')
def service_books(church_id):
    church = Church.query.get_or_404(church_id)
    return render_template('service_books.html', church=church)

@app.route('/settings/<int:church_id>')
def settings(church_id):
    church = Church.query.get_or_404(church_id)
    return render_template('settings.html', church=church)

@app.route('/admin_check/<int:church_id>')
def admin_check(church_id):
    return render_template('admin_check.html', church_id=church_id)

@app.route('/verify_admin_password/<int:church_id>', methods=['POST'])
def verify_admin_password(church_id):
    admin_password = request.form['admin_password']
    church = Church.query.get_or_404(church_id)
    if church.admin_password == admin_password:  # Direct comparison, no hashing since it's a code
        return redirect(url_for('admin_settings', church_id=church_id))
    else:
        return redirect(url_for('error'))  # Assuming you have an error.html or similar handler

@app.route('/admin_settings/<int:church_id>')
def admin_settings(church_id):
    # Assuming there's a method to fetch a church based on the given church_id
    church = Church.query.get_or_404(church_id)
    upcoming_events = Event.query.filter(Event.start_time > datetime.utcnow()).all()
    return render_template('admin_settings.html', upcoming_events=upcoming_events, church=church)

@app.route('/add_event/<int:church_id>', methods=['POST'])
def add_event(church_id):
    church = Church.query.get_or_404(church_id)
    new_event = Event(
        church_id=church.id,
        event_title=request.form['event_title'],
        start_time=request.form['start_time'],
        end_time=request.form['end_time'],
        is_all_day='is_all_day' in request.form,  # This checks if the checkbox is ticked
        description=request.form['description']
    )
    db.session.add(new_event)
    db.session.commit()
    flash('Event added successfully!')
    return redirect(url_for('admin_settings', church_id=church_id))


@app.route('/delete-event/<int:event_id>', methods=['POST'])
def delete_event(event_id):
    event = Event.query.get_or_404(event_id)
    db.session.delete(event)
    db.session.commit()
    return jsonify({'success': 'Event deleted'}), 200






@app.route('/')
def home():
    return render_template('welcome.html')



# if __name__ == '__main__':
#     with app.app_context():
#         db.create_all()
#     # app.run(host='192.168.5.129', port=5000, debug=True)
#     app.run(host='0.0.0.0', port=5000, debug = True)

