// FilmFavorisContainer.js
import React, { useState, useEffect } from "react";
import FilmCard from "./FilmCard";
import { getFilmsFavorisWithUserId } from "./api/UserAPI";
import FilmDetails from "./FilmDetails";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import {getAllRealisateurs} from "./api/RealisateurAPI";

export default function FilmFavorisContainer({ userId }) {
    const [filmsFavoris, setFilmsFavoris] = useState([]);
    const [selectedFilm, setSelectedFilm] = useState(null);
    const [realisateurs, setRealisateurs] = useState([]);
    // Charger les réalisateurs
    useEffect(() => {
        getAllRealisateurs()
            .then((response) => setRealisateurs(response.data))
            .catch((err) => console.error("Erreur lors de la récupération des réalisateurs :", err));
    }, []);

    // Charger les films favoris lorsque l'utilisateur se connecte
    useEffect(() => {
        getFilmsFavorisWithUserId(userId)
            .then((response) => setFilmsFavoris(response.data))
            .catch((err) => console.error("Erreur lors de la récupération des films favoris :", err));
    }, [userId]);

    const handleSelectFilm = (film) => {
        setSelectedFilm(film); // Ouvre le détail du film lorsqu'on clique
    };

    const handleCloseDetails = () => {
        setSelectedFilm(null); // Ferme le détail du film
    };

    return (
        <div>
            <Grid container spacing={3} padding={3}>
                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>
                        Mes Films Favoris
                    </Typography>
                </Grid>
                <Grid item xs={12} style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                    {filmsFavoris.map((film) => (
                        <FilmCard
                            key={film.id}
                            film={film}
                            userId={userId}
                            userRole="user"  // Assuming "user" for simplicity
                            isFavoris={true}
                            onSelect={handleSelectFilm}
                        />
                    ))}
                </Grid>
            </Grid>

            {/* Afficher les détails du film lorsqu'il est sélectionné */}
            {selectedFilm && <FilmDetails film={selectedFilm} realisateurs={realisateurs} onClose={handleCloseDetails} />}
        </div>
    );
}
