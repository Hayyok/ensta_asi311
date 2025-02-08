import React, {useState} from "react";
import {Dialog, DialogTitle, DialogContent, DialogActions, Button} from "@mui/material";
import FilmCard from "./FilmCard";
import CreateFilmForm from "./CreateFilmForm";

export default function FilmList({ userId, films, onUpdateFilm, onDeleteFilm }) {
    const [open, setOpen] = useState(false);
    const [selectedFilm, setSelectedFilm] = useState(null);

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
    };

    return (
        <div>
            {films.map((film) => (
                <FilmCard
                    key={film.id}
                    film={film}
                    onEdit={handleEditFilm}
                    onDelete={handleDeleteFilm}
                    userId={userId}
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

