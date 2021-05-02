const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());

//import routes
const authRoute = require('./routes/auth');
const menuRoute = require('./routes/menu');
const caisseRoute = require('./routes/caisse');
const journalRoute = require('./routes/journal');
const kridiRoute = require('./routes/kridi');
const settingsRoute = require('./routes/settings');
const stockRoute = require('./routes/stock');
const recommRoute = require('./routes/recommendation');

//Middlewares
app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

//Route middlewares
app.use(authRoute);
app.use(menuRoute);
app.use(caisseRoute);
app.use(journalRoute);
app.use(kridiRoute);
app.use(settingsRoute);
app.use(stockRoute);
app.use(recommRoute);


const port = 3001;
const adresse = '192.168.1.79';

app.listen(port, () => {
    console.log("listening on port " + port);
});