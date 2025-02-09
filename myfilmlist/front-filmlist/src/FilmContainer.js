import React, { useState, useEffect } from "react";
import FilmList from "./FilmList";
import CreateFilmForm from "./CreateFilmForm";
import FilmDetails from "./FilmDetails";
import { getAllFilms, postFilm, putFilm, deleteFilm } from "./api/FilmAPI";
import { getAllRealisateurs } from "./api/RealisateurAPI";
import {Button, Divider, Grid, TextField} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CommentaireContainer from "./CommentaireContainer";

export default function FilmContainer({ userId, userRole }) {
    const [films, setFilms] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [selectedFilm, setSelectedFilm] = useState(null);
    const [realisateurs, setRealisateurs] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // État pour le terme de recherche

    // Charger les films
    useEffect(() => {
        getAllFilms()
            .then((response) => setFilms(response.data))
            .catch((err) => console.error(err));
    }, []);

    // Charger les réalisateurs
    useEffect(() => {
        getAllRealisateurs()
            .then((response) => setRealisateurs(response.data))
            .catch((err) => console.error("Erreur lors de la récupération des réalisateurs :", err));
    }, []);

    const handleCreateFilm = (film) => {
        postFilm(film)
            .then(() => getAllFilms())
            .then((response) => {
                setFilms(response.data);
                setIsCreating(false);
            })
            .catch((err) => console.error(err));
    };

    const handleUpdateFilm = (film) => {
        putFilm(film.id, film)
            .then(() => getAllFilms())
            .then((response) => setFilms(response.data))
            .catch((err) => console.error(err));
    };

    const handleDeleteFilm = (id) => {
        deleteFilm(id)
            .then(() => getAllFilms())
            .then((response) => setFilms(response.data))
            .catch((err) => console.error(err));
    };

    const handleSelectFilm = (film) => {
        setSelectedFilm(film);
    };

    const handleCloseDetails = () => {
        setSelectedFilm(null);
    };

    // Fonction pour gérer le changement dans la barre de recherche
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filtrer les films en fonction du terme de recherche
    const filteredFilms = films.filter((film) =>
        film.titre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Grid container spacing={3} padding={3}>
            {/* Section de recherche */}
            <Grid item xs={12}>
                <TextField
                    label="Rechercher un film"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ marginBottom: "20px" }}
                />
            </Grid>
            {/* Section de gestion des films */}
            <Grid item xs={12} md={8}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Liste des Films
                        </Typography>
                        {userRole === "admin" && !isCreating ? (
                            <Button
                                onClick={() => setIsCreating(true)}
                                variant="contained"
                                color="primary"
                                style={{ marginBottom: "16px" }}
                            >
                                Ajouter un Film
                            </Button>
                        ) : (
                            isCreating && <CreateFilmForm onSubmit={handleCreateFilm} />
                        )}
                        {selectedFilm ? (
                            <FilmDetails
                                film={selectedFilm}
                                realisateurs={realisateurs}
                                onClose={handleCloseDetails}
                            />
                        ) : (
                            <FilmList
                                films={filteredFilms}
                                userId={userId}
                                userRole={userRole}
                                onUpdateFilm={handleUpdateFilm}
                                onDeleteFilm={handleDeleteFilm}
                                onSelectFilm={handleSelectFilm}
                            />
                        )}
                    </CardContent>
                </Card>
            </Grid>

            {/* Section de suggestions */}
            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Suggestions pour les Admins
                        </Typography>
                        <Divider sx={{ marginY: 2 }} />
                        <CommentaireContainer />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
