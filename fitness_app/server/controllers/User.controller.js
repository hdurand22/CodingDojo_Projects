const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { secretKey } = require('../config/jwt.config');

module.exports.register = (req, res) => {
    User.exists({ email: req.body.email })
        .then(userExists => {
            if (userExists) {
                const errors = {
                    'errors': { 'duplicate': 'user exists' }
                }
                return Promise.reject(errors);
            }
            const user = new User(req.body);
            return user.save();
        })
        .then(() => {
            res.status(200).json({ msg: 'Success!', user: user });
        })
        .catch(err => {
            console.log('ERROR: ', err);
            res.status(400).json(err);
        });
};

module.exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user === null) {
                res.status(404).json({ 
                    msg: 'Invalid login attempt: USER NOT FOUND',
                    status: 404
                });
            }
            else {
                bcrypt
                    .compare(req.body.password, user.password)
                    .then(passwordIsValid => {
                        if (passwordIsValid) {
                            const newJWT = jwt.sign({
                                _id: user._id
                            }, secretKey)
                        res
                            .cookie('usertoken', newJWT, { httpOnly: true })
                            .cookie('userID', user._id)
                            .cookie('userName', user.firstName+user.lastName)
                            .status(200).json({ msg: 'Success!' });
                        }
                        else {
                            res.status(400).json({ 
                                msg: 'Invalid login attempt: INCORRECT PASSWORD',
                                status: 400
                            });
                        }
                    })
                    .catch(err => res.json({ msg: 'Invalid login attempt: PASSWORD ERROR CATCH' }));
            }
        })
        .catch(err => res.json(err));
}

module.exports.getUser = (req, res) => {
    const {user_id} = req.params;
    User.findOne({_id: user_id})
        .then(user => res.json(user))
        .catch(err => res.json(err));
};



