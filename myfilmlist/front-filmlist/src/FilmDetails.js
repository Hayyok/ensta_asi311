import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function FilmDetails({ film, realisateurs, onClose }) {
    if (!film) return null;
    const realisateur = realisateurs.find((r) => r.id === film.realisateurId);
    return (
        <Card variant="outlined" sx={{ padding: 2, marginTop: 2 }}>
            <CardContent>
                <Typography variant="h4" gutterBottom>
                    {film.titre}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Durée : {film.duree} minutes
                </Typography>
                <Typography variant="body1">
                Réalisateur : {realisateur ? `${realisateur.prenom} ${realisateur.nom}` : "Inconnu"}
                </Typography>
                <button 
                    onClick={onClose}
                    style={{
                        marginTop: "20px",
                        backgroundColor: "red",
                        color: "white",
                        padding: "10px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Fermer
                </button>
            </CardContent>
        </Card>
    );
}
