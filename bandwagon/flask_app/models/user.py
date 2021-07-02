from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash 
from flask_app import app
from flask_bcrypt import Bcrypt
import re

bcrypt = Bcrypt(app)

class User:
    def __init__(self, data):
        self.id = data['id']
        self.first_name = data['first_name']
        self.last_name = data['last_name']
        self.email = data['email']
        self.password = data['password']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

    # @classmethod
    # def get_all(cls):
    #     query = "SELECT * FROM users;"
    #     results = connectToMySQL('dojo_survey_schema').query_db(query)
    #     users = []
    #     for user in results:
    #         # print(user)
    #         users.append(cls(user))
        
    #     return users
    
    @classmethod
    def get_user(cls, data):
        query = "SELECT * FROM users WHERE users.email = %(email)s;"
        results = connectToMySQL('bandwagon_schema').query_db(query, data)

        user = cls(results[0])

        return user
    
    @classmethod
    def save(cls, data):
        query = "INSERT INTO users (first_name, last_name, email, password, created_at, updated_at) VALUES (%(first_name)s, %(last_name)s, %(email)s, %(password)s, NOW() , NOW());"
        
        return connectToMySQL('bandwagon_schema').query_db(query, data)

    @staticmethod
    def validate_user_registration(registration):
        is_valid = True # we assume this is true
        
        # Check first and last name
        if len(registration['first_name']) < 2:
            flash("First name must be at least 2 characters.")
            is_valid = False
        if len(registration['last_name']) < 2:
            flash("Last name must be at least 2 characters.")
            is_valid = False

        # Check email address
        # EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$') 
        # if not EMAIL_REGEX.match(registration['email']): 
        #     flash("Invalid email address!")
        #     is_valid = False
        if User.email_exists(registration):
            flash("Email address is already registered.")
            is_valid = False
        
        # Check pw
        pw_has_num_and_letter = User.check_password_for_letter_and_number(registration['password'])
        if len(registration['password']) < 8 or not pw_has_num_and_letter:
            flash("Password must be at least 8 characters and have 1 number and 1 uppercase letter.")
            is_valid = False
        else:
            if registration['password'] != registration['confirm_password']:
                flash("Passwords do not match.")
                is_valid = False
        return is_valid

    @staticmethod
    def validate_user_login(login):
        is_valid = True # we assume this is true

        # Check to see if the email address has been previously registered
        if not User.email_exists(login):
            flash("Email address is not registered.")
            is_valid = False
        else:
            # Check email address and password against what's in the database for the user's email
            user_login = User.get_user({'email': login['email']})
            # Check entered password against what's returned from database
            if not bcrypt.check_password_hash(user_login.password, login['password']):
                flash("Incorrect password.")
                is_valid = False

        return is_valid
    
    @staticmethod
    def check_password_for_letter_and_number(pw):
        # If pw is all lowercase, islower() returns true, which means there are no uppercase letters
        # If pw has no numbers, isalpha() returns true, which means there are no numbers
        if pw.islower() or pw.isalpha():
            return False
        else:
            return True
    
    @staticmethod
    def email_exists(registration):
        # Query the database and see if the email is there; if it's there, return True

        query = "SELECT * FROM users WHERE email = %(email)s;"
        results = connectToMySQL('bandwagon_schema').query_db(query, registration)
        print(results)

        return results
        


