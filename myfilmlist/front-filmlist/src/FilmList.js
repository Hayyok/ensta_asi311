import React, {useEffect, useState} from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import FilmCard from "./FilmCard";
//import CreateFilmForm from "./CreateFilmForm";
import {getAllFilms} from "./api/FilmAPI";

export default function FilmList({ onUpdateFilm, onDeleteFilm }) {
    //const [open, setOpen] = useState(false);
    const [films, setFilms] = useState([]);

    useEffect(() => {
        getAllFilms().then(response => {
            setFilms(response.data);
        }).catch(err => {
            console.log(err);
        })
    }, []);
    /*
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
    */
    return (
        <div>
            {films.map((film) => (
                <FilmCard
                    key={film.id}
                    film={film}
                    //onEdit={handleEditFilm}
                    //onDelete={onDeleteFilm}
                />
            ))}
        </div>
    );
}

/* dans le return après films.map
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
 */