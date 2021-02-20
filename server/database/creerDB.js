const sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('./database/mydb.db');

db.serialize(function() {
    
    db.run(`CREATE TABLE if not exists categorie(
        id	INTEGER,
        nom	TEXT NOT NULL,
        PRIMARY KEY("id" AUTOINCREMENT)
    )`);
    
});
  
db.close();