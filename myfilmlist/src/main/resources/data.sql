CREATE TABLE IF NOT EXISTS Realisateur(id INT primary key auto_increment, nom VARCHAR(100), prenom VARCHAR(100), date_naissance TIMESTAMP, celebre BOOLEAN);
INSERT INTO Realisateur(nom, prenom, date_naissance, celebre) VALUES('Cameron', 'James', '1954-08-16', false);
INSERT INTO Realisateur(nom, prenom, date_naissance, celebre) VALUES('Jackson', 'Peter', '1961-10-31', true);

CREATE TABLE IF NOT EXISTS Film(id INT primary key auto_increment, titre VARCHAR(100), duree INT, realisateur_id INT, note FLOAT, nb_note INT);
INSERT INTO Film(titre, duree, realisateur_id, note, nb_note) VALUES('Avatar', 162, 1, 4.7, 13);
INSERT INTO Film(titre, duree, realisateur_id, note, nb_note) VALUES('La communauté de l''anneau', 178, 2, 4.2, 26);
INSERT INTO Film(titre, duree, realisateur_id, note, nb_note) VALUES('Les deux tours', 179, 2, 3.5, 7);
INSERT INTO Film(titre, duree, realisateur_id, note, nb_note) VALUES('Le retour du roi', 201, 2, 5, 18);


CREATE TABLE IF NOT EXISTS Utilisateur(id INT primary key auto_increment, username VARCHAR(100), password VARCHAR(100), role VARCHAR(100));
INSERT INTO Utilisateur(username, password, role) VALUES('john_doe', 'password123', 'user');
INSERT INTO Utilisateur(username, password, role) VALUES('jane_doe', 'secure456', 'user');
INSERT INTO Utilisateur(username, password, role) VALUES('turtle_lover', 'iloveturtles', 'admin');
INSERT INTO Utilisateur(username, password, role) VALUES('admin', 'admin', 'admin');

CREATE TABLE IF NOT EXISTS Utilisateur_FilmsFavoris (
    utilisateur_id INT,
    film_id INT,
    PRIMARY KEY (utilisateur_id, film_id),
    FOREIGN KEY (utilisateur_id) REFERENCES Utilisateur(id) ON DELETE CASCADE,
    FOREIGN KEY (film_id) REFERENCES Film(id) ON DELETE CASCADE);
INSERT INTO Utilisateur_FilmsFavoris(utilisateur_id, film_id) VALUES (1, 2); -- John Doe aime "La communauté de l'anneau"
INSERT INTO Utilisateur_FilmsFavoris(utilisateur_id, film_id) VALUES (1, 3); -- John Doe aime "Les deux tours"
INSERT INTO Utilisateur_FilmsFavoris(utilisateur_id, film_id) VALUES (2, 1); -- Jane Doe aime "Avatar"
INSERT INTO Utilisateur_FilmsFavoris(utilisateur_id, film_id) VALUES (3, 2); -- Turtle Lover aime "La communauté de l'anneau"
