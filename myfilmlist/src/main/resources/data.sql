CREATE TABLE IF NOT EXISTS Realisateur(id INT primary key auto_increment, nom VARCHAR(100), prenom VARCHAR(100), date_naissance TIMESTAMP, celebre BOOLEAN);
INSERT INTO Realisateur(nom, prenom, date_naissance, celebre) VALUES('Cameron', 'James', '1954-08-16', false);
INSERT INTO Realisateur(nom, prenom, date_naissance, celebre) VALUES('Jackson', 'Peter', '1961-10-31', true);

CREATE TABLE IF NOT EXISTS Film(id INT primary key auto_increment, titre VARCHAR(100), duree INT, realisateur_id INT, note FLOAT, nb_note INT);
INSERT INTO Film(titre, duree, realisateur_id, note, nb_note) VALUES('Avatar', 162, 1, 4.7, 13);
INSERT INTO Film(titre, duree, realisateur_id, note, nb_note) VALUES('La communauté de l''anneau', 178, 2, 4.2, 26);
INSERT INTO Film(titre, duree, realisateur_id, note, nb_note) VALUES('Les deux tours', 179, 2, 3.5, 7);
INSERT INTO Film(titre, duree, realisateur_id, note, nb_note) VALUES('Le retour du roi', 201, 2, 5, 18);

CREATE TABLE IF NOT EXISTS Utilisateur(id INT primary key auto_increment, nom VARCHAR(100), prenom VARCHAR(100));
INSERT INTO Utilisateur(nom, prenom) VALUES('John', 'Doe');
INSERT INTO Utilisateur(nom, prenom) VALUES('Jane', 'Doe');