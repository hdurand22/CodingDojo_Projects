const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const port = 8000;

require('./config/mongoose.config');

app.use(cookieParser());
app.use(cors({credentials: true, origin: "http://localhost:3000"}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const fitnessRoute = require('./routes/fitnessApp.route');
fitnessRoute(app);

app.listen(port, () => console.log(`EXPRESS LISTENING ON PORT ${port}`));