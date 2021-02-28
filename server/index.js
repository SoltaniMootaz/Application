const express = require('express');
const app = express();
const cors = require('cors');
require('./database/creerDB-SQLite.js');
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());

//import routes
const authRoute = require('./routes/auth');
const menuRoute = require('./routes/menu');
const caisseRoute = require('./routes/caisse');

//Middlewares
app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

//Route middlewares
app.use(authRoute);
app.use(menuRoute);
app.use(caisseRoute);


const port = 3001;
const adresse = '192.168.1.79';

app.listen(port, () => {
    console.log("listening on port " + port);
});