import React, { useState, useEffect } from "react";
import FilmList from "./FilmList";
import CreateFilmForm from "./CreateFilmForm";
import { getAllFilms, postFilm } from "./api/FilmApi";

export default function FilmContainer() {
    const [films, setFilms] = useState([]);

    useEffect(() => {
        getAllFilms()
            .then((response) => {
                setFilms(response.data);
            })
            .catch((err) => console.error("Erreur lors de la récupération des films :", err));
    }, []);

    const handleCreateFilm = (film) => {
        postFilm(film)
            .then(() => {
                return getAllFilms();
            })
            .then((response) => {
                setFilms(response.data);
            })
            .catch((err) => console.error("Erreur lors de la création d'un film :", err));
    };

    return (
        <div>
            <CreateFilmForm onSubmit={handleCreateFilm} />
            <FilmList films={films} />
        </div>
    );
}
