from flask import render_template, redirect, request, session, jsonify
from flask_app import app
from flask_app.models import user
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/register', methods = ['POST'])
def register_user():
    print('form: ', request.form)
    
    if not user.User.validate_user_registration(request.form):
        return redirect('/')

    
    hashed_pw = bcrypt.generate_password_hash(request.form['password'])
    
    data = {
        'first_name': request.form['first_name'],
        'last_name': request.form['last_name'],
        'email': request.form['email'],
        'password': hashed_pw
    }
    
    new_user = user.User.save(data)
    
    session['uuid'] = new_user

    return redirect('/')

@app.route('/login', methods = ['POST'])
def user_login():
    if not user.User.validate_user_login(request.form):
        return redirect('/')

    login = user.User.get_user({'email': request.form['email']})

    session['uuid'] = login.id

    return redirect('/success')

@app.route('/sign_in')
def show_sign_in():
    # if 'uuid' not in session:
    #     return redirect('/')

    return render_template('sign_in.html')

@app.route('/logout')
def logout():
    session.clear()

    return redirect('/')
