import React, {useEffect, useState} from "react";
import {Dialog, DialogTitle, DialogContent, DialogActions, Button} from "@mui/material";
import FilmCard from "./FilmCard";
import CreateFilmForm from "./CreateFilmForm";
import {getAllFilms} from "./api/FilmAPI";

export default function FilmList({ onUpdateFilm, onDeleteFilm, onSelectFilm }) {
    const [open, setOpen] = useState(false);
    const [films, setFilms] = useState([]);
    const [selectedFilm, setSelectedFilm] = useState(null);

    useEffect(() => {
        getAllFilms().then(response => {
            setFilms(response.data);
        }).catch(err => {
            console.log(err);
        })
    }, [films]);

    const handleEditFilm = (film) => {
        console.log("Film sélectionné pour édition :", film);
        setSelectedFilm(film);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedFilm(null);
    };

    const handleSubmit = (updatedFilm) => {
        console.log("Film envoyé au back :", updatedFilm);
        onUpdateFilm(updatedFilm);
        handleClose();
    };

    const handleDeleteFilm = (id) => {
        onDeleteFilm(id);
        getAllFilms().then(response => setFilms(response.data)); // Mise à jour après suppression
    };

    return (
        <div>
            {films.map((film) => (
                <FilmCard
                    key={film.id}
                    film={film}
                    onEdit={handleEditFilm}
                    onDelete={handleDeleteFilm}
                    onSelect={() => onSelectFilm(film)} 
                />
            ))}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Modifier le film</DialogTitle>
                <DialogContent>
                    {selectedFilm && (<CreateFilmForm film={selectedFilm} onSubmit={handleSubmit} />)}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Annuler</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

