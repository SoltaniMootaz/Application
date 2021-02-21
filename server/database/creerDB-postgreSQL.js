const Pool = require('pg').Pool;

//process.env.DB_pass
const pool = new Pool({
    user: "postgres",
    password: process.env.DB_pass,
    database: "projet",
    host: "localhost",
    port: 5432
});

module.exports = pool;

/* var pg = require('pg');

var conString = "postgres://ltttvdvd:n-pct2c_QCXeAaBFs5oGlwxMVrdfuVC1@ziggy.db.elephantsql.com:5432/ltttvdvd" //Can be found in the Details page
var client = new pg.Client(conString);

module.exports = client; */