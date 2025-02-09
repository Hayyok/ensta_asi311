import React, { useState, useEffect } from "react";
import FilmList from "./FilmList";
import CreateFilmForm from "./CreateFilmForm";
import FilmDetails from "./FilmDetails";
import { getAllFilms, postFilm, putFilm, deleteFilm } from "./api/FilmAPI";
import { getAllRealisateurs } from "./api/RealisateurAPI";
import { Button } from "@mui/material";

export default function FilmContainer() {
    const [films, setFilms] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [selectedFilm, setSelectedFilm] = useState(null);

    useEffect(() => {
        getAllFilms()
            .then((response) => setFilms(response.data))
            .catch((err) => console.error(err));
    }, []);

    const [realisateurs, setRealisateurs] = useState([]);

    useEffect(() => {
    // Charger les réalisateurs
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
        <div>
            {selectedFilm ? (
                <FilmDetails 
                film={selectedFilm}
                realisateurs={realisateurs} 
                onClose={handleCloseDetails} />
            ) : (
                <>
                    {!isCreating ? (
                        <Button
                            onClick={() => setIsCreating(true)}
                            variant="contained"
                            color="primary"
                            style={{ marginBottom: "16px" }}
                        >
                            Ajouter un Film
                        </Button>
                    ) : (
                        <CreateFilmForm onSubmit={handleCreateFilm} />
                    )}
                    <FilmList
                        films={films}
                        onUpdateFilm={handleUpdateFilm}
                        onDeleteFilm={handleDeleteFilm}
                        onSelectFilm={handleSelectFilm}
                    />
                </>
            )}
        </div>
    );
}
