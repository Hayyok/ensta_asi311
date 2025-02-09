import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Card, CardMedia, CardContent } from "@mui/material";
import pessauxPlaceholder from "./assets/francois.jpg"
export default function FilmDetails({ film, realisateurs, onClose }) {
    const realisateur = realisateurs.find((r) => r.id === film.realisateurDTOId);

    return (
        <Dialog open={!!film} onClose={onClose} maxWidth="sm" fullWidth>
            <Card>
                {/* Section Image */}
                <CardMedia
                    component="img"
                    alt={film.titre}
                    height="200"
                    image={pessauxPlaceholder} // Remplacez avec une URL dynamique si possible
                />
                <CardContent>
                    {/* Titre du Film */}
                    <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
                        {film.titre}
                    </Typography>
                    {/* Informations */}
                    <Box sx={{ marginY: 2 }}>
                        <Typography variant="body1" sx={{ marginBottom: 1 }}>
                            <strong>Durée :</strong> {film.duree} minutes
                        </Typography>
                        <Typography variant="body1">
                            <strong>Réalisateur :</strong> {realisateur ? `${realisateur.prenom} ${realisateur.nom}` : "Inconnu"}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
            {/* Boutons */}
            <DialogActions>
                <Button onClick={onClose} variant="outlined" color="primary">
                    Fermer
                </Button>
                <Button onClick={() => alert("Modifier film")} variant="contained" color="secondary">
                    Modifier
                </Button>
            </DialogActions>
        </Dialog>
    );
}
