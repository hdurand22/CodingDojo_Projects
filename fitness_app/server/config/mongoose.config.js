const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/fitness_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('CONNECTED TO FITNESS APP'))
    .catch(err => console.log("ERROR: ", err));