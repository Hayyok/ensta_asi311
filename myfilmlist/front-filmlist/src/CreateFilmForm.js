import React, { useState, useEffect } from "react";
import { TextField, Select, MenuItem, Button, FormControl, InputLabel } from "@mui/material";
import { getAllRealisateurs } from "./api/RealisateurAPI";

export default function CreateFilmForm({ film = {}, onSubmit }) {
    const [titre, setTitle] = useState(film.titre || "");
    const [duree, setDuration] = useState(film.duree || "");
    const [selectedRealisateur, setSelectedRealisateur] = useState(film.realisateurId || "");
    const [realisateurs, setRealisateurs] = useState([]);

    useEffect(() => {
        getAllRealisateurs()
            .then((response) => setRealisateurs(response.data))
            .catch((err) => console.error("Erreur lors de la récupération des réalisateurs :", err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ id: film.id, titre, duree, realisateurId: selectedRealisateur });
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Titre"
                value={titre}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Durée"
                value={duree}
                onChange={(e) => setDuration(e.target.value)}
                fullWidth
                margin="normal"
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Réalisateur</InputLabel>
                <Select
                    value={selectedRealisateur}
                    onChange={(e) => setSelectedRealisateur(e.target.value)}
                >
                    {realisateurs.map((realisateur) => (
                        <MenuItem key={realisateur.id} value={realisateur.id}>
                            {realisateur.prenom} {realisateur.nom}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary">
                {film.id ? "Modifier" : "Créer"}
            </Button>
        </form>
    );
}
