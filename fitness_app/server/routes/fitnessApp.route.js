const FitnessAppController = require('../controllers/fitnessApp.controller');
const User = require('../controllers/User.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get('/api/test', FitnessAppController.test)
    app.post('/api/user/register', User.register);
    app.post('/api/user/login', User.login);
    app.get('/api/:user_id', User.getUser);
    // app.get('/api/users', authenticate, User.allUsers);
};

