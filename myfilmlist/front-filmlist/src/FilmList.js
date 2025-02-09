import React, {useState} from "react";
import {Dialog, DialogTitle, DialogContent, DialogActions, Button} from "@mui/material";
import FilmCard from "./FilmCard";
import CreateFilmForm from "./CreateFilmForm";

export default function FilmList({ userId, userRole, films, onUpdateFilm, onDeleteFilm, onSelectFilm }) {
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
        <div style={{
            backgroundColor: "#bdcf47",
            fontFamily: 'Poppins, sans-serif',
            margin: "10px auto",
            padding: "8px 12px",
            color: "#484e23",
            borderRadius: "5px",
            cursor: "pointer",
            display: "block",
        }}>
            {films.map((film) => (
                <FilmCard
                    key={film.id}
                    film={film}
                    onEdit={handleEditFilm}
                    onDelete={handleDeleteFilm}
                    onSelect={() => onSelectFilm(film)} 
                    userRole={userRole}
                    userId={userId}
                    isFavoris={false}
                    style={{
                        backgroundColor: "#bdcf47",
                        fontFamily: 'Poppins, sans-serif',
                        margin: "10px auto",
                        padding: "8px 12px",
                        color: "#484e23",
                        borderRadius: "5px",
                        cursor: "pointer",
                        display: "block",
                    }}

                />
            ))}
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>Modifier le film</DialogTitle>
                <DialogContent>
                    {selectedFilm && (<CreateFilmForm film={selectedFilm} onSubmit={handleSubmit} />)}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} style={{
                        fontFamily: 'Poppins, sans-serif',
                        color: "#484e23",
                    }}>Annuler</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

