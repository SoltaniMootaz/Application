const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());

//import routes
const authRoute = require('./routes/auth');

//Middlewares
app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

//Route middlewares
app.use(authRoute);

const port = 3001;

app.listen(port, () => {
    console.log("listening on port " + port);
});