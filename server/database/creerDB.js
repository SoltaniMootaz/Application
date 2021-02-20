const sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('./database/mydb.db');

db.serialize(function() {
    
    db.run(`CREATE TABLE if not exists "categorie"(
        id	INTEGER,
        nom	TEXT NOT NULL,
        PRIMARY KEY("id" AUTOINCREMENT)
    )`);

    db.run(`CREATE TABLE if not exists "article-menu"(
        nom	TEXT NOT NULL,
        prix	INTEGER NOT NULL,
        unite	INTEGER NOT NULL,
        cout	INTEGER NOT NULL,
        image	TEXT,
        idIngredient	INTEGER,
        PRIMARY KEY("nom")
    )`);

    db.run(`CREATE TABLE if not exists "ingredient"(
        id	INTEGER,
        nom	TEXT NOT NULL,
        quantite	INTEGER NOT NULL,
        NomArt INTEGER NOT NULL,
        PRIMARY KEY("id" AUTOINCREMENT)
        FOREIGN KEY("nomArt") REFERENCES "article-menu"(nom)
    )`);
    
});
  
db.close();