const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { secretKey } = require('../config/jwt.config');

module.exports.test = (req, res) => {
    res.json({message: "TEST CONTROLLER RESPONSE"});
};