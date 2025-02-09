import React, { useState, useEffect } from "react";
import FilmList from "./FilmList";
import CreateFilmForm from "./CreateFilmForm";
import FilmDetails from "./FilmDetails";
import { getAllFilms, postFilm, putFilm, deleteFilm } from "./api/FilmAPI";
import { getAllRealisateurs } from "./api/RealisateurAPI";
import { Button } from "@mui/material";

export default function FilmContainer({ userId, userRole }) {
    const [films, setFilms] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [selectedFilm, setSelectedFilm] = useState(null);
    const [realisateurs, setRealisateurs] = useState([]);

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

    return (
        <Grid container spacing={3} padding={3}>
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
                                films={films}
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
