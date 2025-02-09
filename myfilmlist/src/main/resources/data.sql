CREATE TABLE IF NOT EXISTS Realisateur(id INT primary key auto_increment, nom VARCHAR(100), prenom VARCHAR(100), date_naissance TIMESTAMP, celebre BOOLEAN);
INSERT INTO Realisateur(nom, prenom, date_naissance, celebre) VALUES('Cameron', 'James', '1954-08-16', false);
INSERT INTO Realisateur(nom, prenom, date_naissance, celebre) VALUES('Jackson', 'Peter', '1961-10-31', true);

CREATE TABLE IF NOT EXISTS Film(id INT primary key auto_increment, titre VARCHAR(100), duree INT, realisateur_id INT);
INSERT INTO Film(titre, duree, realisateur_id) VALUES('avatar', 162, 1);
INSERT INTO Film(titre, duree, realisateur_id) VALUES('La communauté de l''anneau', 178, 2);
INSERT INTO Film(titre, duree, realisateur_id) VALUES('Les deux tours', 179, 2);
INSERT INTO Film(titre, duree, realisateur_id) VALUES('Le retour du roi', 201, 2);

CREATE TABLE IF NOT EXISTS Utilisateur(id INT primary key auto_increment, username VARCHAR(100), password VARCHAR(100), role VARCHAR(100));
INSERT INTO Utilisateur(username, password, role) VALUES('john_doe', 'password123', 'user');
INSERT INTO Utilisateur(username, password, role) VALUES('jane_doe', 'secure456', 'user');
INSERT INTO Utilisateur(username, password, role) VALUES('turtle_lover', 'iloveturtles', 'admin');
INSERT INTO Utilisateur(username, password, role) VALUES('admin', 'admin', 'admin');