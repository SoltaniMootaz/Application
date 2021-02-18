CREATE DATABASE projet;

CREATE TABLE utilisateur(
    id SERIAL PRIMARY KEY,
    nom VARCHAR(20) NOT NULL,
    prenom VARCHAR(20) NOT NULL,
    telephone VARCHAR(20) NOT NULL,
    email VARCHAR(20) NOT NULL,
    adresse VARCHAR(20) NOT NULL
);