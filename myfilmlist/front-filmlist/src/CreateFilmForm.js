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

    useEffect(() => {
        if (film && film.id) {
            setTitle(film.titre || "");
            setDuration(film.duree || "");
            setSelectedRealisateur(film.realisateurId || "");
        }
    }, [film]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Film envoyé au back :", { id: film?.id, titre, duree, realisateurId: selectedRealisateur });
        onSubmit({ id: film?.id, titre, duree, realisateurId: selectedRealisateur || null });
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Titre"
                value={titre}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                margin="normal"
                sx={{
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#ccc" },  // Bordure normale
                        "&:hover fieldset": { borderColor: "green" },  // Bordure au survol
                        "&.Mui-focused fieldset": { borderColor: "green" }  // Bordure quand on clique
                    },
                    "& .MuiInputLabel-root": { color: "green" },  // Label par défaut en vert
                    "& .MuiInputLabel-root.Mui-focused": { color: "green" }  // Label en vert quand focus
                }}
            />
            <TextField
                label="Durée"
                value={duree}
                onChange={(e) => setDuration(e.target.value)}
                fullWidth
                margin="normal"
                sx={{
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#ccc" },  // Bordure normale
                        "&:hover fieldset": { borderColor: "green" },  // Bordure au survol
                        "&.Mui-focused fieldset": { borderColor: "green" }  // Bordure quand on clique
                    },
                    "& .MuiInputLabel-root": { color: "green" },  // Label par défaut en vert
                    "& .MuiInputLabel-root.Mui-focused": { color: "green" }  // Label en vert quand focus
                }}
            />
            <FormControl fullWidth margin="normal"
                         sx={{
                             "& .MuiOutlinedInput-root": {
                                 "& fieldset": { borderColor: "#ccc" },  // Bordure normale
                                 "&:hover fieldset": { borderColor: "green" },  // Bordure au survol
                                 "&.Mui-focused fieldset": { borderColor: "green" }  // Bordure quand on clique
                             },
                             "& .MuiInputLabel-root": { color: "green" },  // Label par défaut en vert
                             "& .MuiInputLabel-root.Mui-focused": { color: "green" }  // Label en vert quand focus
                         }}>
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
            <Button type="submit" variant="contained" color="primary" style={{
                backgroundColor: "#bdcf47",
                fontFamily: 'Poppins, sans-serif',
                margin: "10px auto",
                padding: "8px 12px",
                color: "#484e23",
                borderRadius: "5px",
                cursor: "pointer",
                display: "block",
            }}>
                {film.id ? "Modifier" : "Créer"}
            </Button>
        </form>
    );
}
