import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import FilmCard from "./FilmCard";
import CreateFilmForm from "./CreateFilmForm";

export default function FilmList({ films, onUpdateFilm, onDeleteFilm }) {
    const [open, setOpen] = useState(false);
    const [selectedFilm, setSelectedFilm] = useState(null);

    const handleEditFilm = (film) => {
        setSelectedFilm(film);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedFilm(null);
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
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>Editer un film</DialogTitle>
                <DialogContent>
                    {selectedFilm && (
                        <CreateFilmForm
                            film={selectedFilm}
                            onSubmit={handleSubmit}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
