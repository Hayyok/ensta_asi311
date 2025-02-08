import React, { useState, useEffect } from "react";
import FilmList from "./FilmList";
import CreateFilmForm from "./CreateFilmForm";
import { getAllFilms, postFilm, putFilm, deleteFilm } from "./api/FilmAPI";
import {Button} from "@mui/material";


export default function FilmContainer({ userId }) {
    const [films, setFilms] = useState([]);
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        getAllFilms()
            .then((response) => setFilms(response.data))
            .catch((err) => console.error(err));
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
        console.log("Mise à jour du film :", film);
        console.log(film.id);
        putFilm(film.id, film)
            .then(() => getAllFilms())
            .then((response) => setFilms(response.data))
            .catch((err) => console.error("Erreur lors de la modification :", err));
    };

    const handleDeleteFilm = (id) => {
        deleteFilm(id)
            .then(() => getAllFilms())
            .then((response) => setFilms(response.data))
            .catch((err) => console.error(err));
    };

    return (
        <div>
            {userId === "admin" && !isCreating ? (
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
            <FilmList
                films={films}
                userId={userId}
                onUpdateFilm={handleUpdateFilm}
                onDeleteFilm={handleDeleteFilm}
            />
        </div>
    );
}

