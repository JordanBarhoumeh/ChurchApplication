# models.py
from shared import db
from datetime import datetime

class Church(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(10), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    events = db.relationship('Event', backref='church', lazy=True)

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    church_id = db.Column(db.Integer, db.ForeignKey('church.id'), nullable=False)
    event_title = db.Column(db.String(255), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False, default=datetime.now)
    end_time = db.Column(db.DateTime, nullable=False, default=datetime.now)
    is_all_day = db.Column(db.Boolean, default=False)
    description = db.Column(db.Text)
