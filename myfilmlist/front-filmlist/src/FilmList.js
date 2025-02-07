import React, {useEffect, useState} from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import FilmCard from "./FilmCard";
import CreateFilmForm from "./CreateFilmForm";
import {getAllFilms} from "./api/FilmAPI";

export default function FilmList({ onUpdateFilm, onDeleteFilm }) {
    const [open, setOpen] = useState(false);
    const [films, setFilms] = useState([]);

    useEffect(() => {
        getAllFilms().then(response => {
            setFilms(response.data);
        }).catch(err => {
            console.log(err);
        })
    }, []);

    const handleEditFilm = (film) => {
        setFilms(film);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFilms(null);
    };

    const handleSubmit = (updatedFilm) => {
        onUpdateFilm(updatedFilm);
        handleClose();
    };

    return (
        <div>
            {films.map((film) => (
                <FilmCard
                    key={film.id}
                    film={film}
                    onEdit={handleEditFilm}
                    onDelete={onDeleteFilm}
                />
            ))}
        </div>
    );
}

