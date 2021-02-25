const sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('./database/mydb.db');

db.serialize(function() {
    
    db.run(`CREATE TABLE if not exists "categorie"(
        nom	TEXT NOT NULL,
        PRIMARY KEY("nom")
    )`);

    db.run(`CREATE TABLE if not exists "article-menu"(
        nom	TEXT NOT NULL,
        prix	INTEGER NOT NULL,
        unite	TEXT,
        image	TEXT,
        nomCategorie TEXT NOT NULL,
        PRIMARY KEY("nom"),
        FOREIGN KEY("nomCategorie") REFERENCES "categorie"(nom)
    )`);

    db.run(`CREATE TABLE if not exists "ingredient"(
        id	INTEGER,
        nom	TEXT NOT NULL,
        quantite	INTEGER NOT NULL,
        NomArt INTEGER NOT NULL,
        PRIMARY KEY("id" AUTOINCREMENT),
        FOREIGN KEY("nomArt") REFERENCES "article-menu"(nom)
    )`);
    
});
  
db.close();