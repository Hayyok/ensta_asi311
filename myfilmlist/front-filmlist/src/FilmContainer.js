import React, { useState, useEffect } from "react";
import FilmList from "./FilmList";
import CreateFilmForm from "./CreateFilmForm";
import { getAllFilms, postFilm, putFilm, deleteFilm } from "./api/FilmAPI";

export default function FilmContainer() {
    const [films, setFilms] = useState([]);

    useEffect(() => {
        getAllFilms()
            .then((response) => setFilms(response.data))
            .catch((err) => console.error(err));
    }, []);

    const handleCreateFilm = (film) => {
        postFilm(film)
            .then(() => getAllFilms())
            .then((response) => setFilms(response.data))
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

    return (
        <div>
            <CreateFilmForm onSubmit={handleCreateFilm} />
            <FilmList
                films={films}
                onUpdateFilm={handleUpdateFilm}
                onDeleteFilm={handleDeleteFilm}
            />
        </div>
    );
}
