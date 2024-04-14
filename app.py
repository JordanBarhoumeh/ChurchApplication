from flask import Flask, request, render_template, redirect, url_for, session, make_response
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import bcrypt

app = Flask(__name__)
app.config['SECRET_KEY'] = 'a_very_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://jordanbarhoumeh:dbpass2002@jordanbarhoumeh.mysql.pythonanywhere-services.com/jordanbarhoumeh$default'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Church(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(10), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    image_path = db.Column(db.String(255), nullable=True)  # Optional image path
    instagram = db.Column(db.String(255), nullable=True)  # Optional Instagram link
    admin_password = db.Column(db.String(255), nullable=True)

    def set_password(self, password):
        self.admin_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.admin_password.encode('utf-8'))

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    church_id = db.Column(db.Integer, db.ForeignKey('church.id'), nullable=False)
    event_title = db.Column(db.String(255), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)
    description = db.Column(db.Text)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/church_main/<int:church_id>')
def church_main(church_id):
    church = Church.query.get_or_404(church_id)
    if church:
        return redirect(url_for('church_main', church_id=church.id))
    else:
        return render_template('index.html', error="Church code not found.")


@app.route('/church_main/<int:church_id>')
def church_main(church_id):
    church = Church.query.get_or_404(church_id)
    next_event = Event.query.filter_by(church_id=church_id).first()
    return render_template('church_main.html', church=church, next_event=next_event)

@app.route('/admin_settings/<int:church_id>', methods=['GET', 'POST'])
def admin_settings(church_id):
    church = Church.query.get_or_404(church_id)
    if request.method == 'POST' and 'admin_password' in request.form:
        admin_password = request.form['admin_password']
        if church.check_password(admin_password):
            session['admin_authenticated'] = True
            return render_template('admin_settings.html', church=church, password_verified=True)
        else:
            return render_template('admin_settings.html', church=church, password_verified=False, error="Incorrect password")
    return render_template('admin_settings.html', church=church)

@app.route('/verify_admin_password/<int:church_id>', methods=['POST'])
def verify_admin_password(church_id):
    church = Church.query.get_or_404(church_id)
    admin_password = request.form['admin_password']
    if church.check_password(admin_password):
        session['admin_authenticated'] = True
        return redirect(url_for('admin_settings', church_id=church_id))
    else:
        return render_template('admin_settings.html', church=church, password_verified=False, error="Incorrect password")

@app.route('/add_event', methods=['POST'])
def add_event():
    if not session.get('admin_authenticated'):
        return redirect(url_for('index'))
    
    church_id = request.form['church_id']
    new_event = Event(
        church_id=church_id,
        event_title=request.form['event_title'],
        start_time=datetime.strptime(request.form['start_time'], '%Y-%m-%dT%H:%M'),
        end_time=datetime.strptime(request.form['end_time'], '%Y-%m-%dT%H:%M'),
        description=request.form['description']
    )
    db.session.add(new_event)
    db.session.commit()
    return redirect(url_for('admin_settings', church_id=church_id))

@app.route('/logout')
def logout():
    session.pop('admin_authenticated', None)
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
