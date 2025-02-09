import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Card, CardMedia, CardContent } from "@mui/material";
import pessauxPlaceholder from "./assets/space_turtle5.png"
import { Star } from "lucide-react";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Modal from "@mui/material/Modal";


export default function FilmDetails({ film, realisateurs, onClose, onRate }) {
    const [open, setOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState(film.note || 2.5);
    if (!film) return null;
    const realisateur = realisateurs.find((r) => r.id === film.realisateurDTOId);
    console.log("Film :", film);
    console.log("Realisateurs :", realisateurs);


    const renderStars = (note) => {
        const stars = [];
        const fullStars = Math.floor(note);

        for (let i = 0; i < 5; i++) {
            const isFilled = i < fullStars;
            stars.push(
                <Star
                    key={i}
                    className={isFilled ? "text-yellow-400" : "text-gray-300"}
                    size={24}
                    fill={isFilled ? "currentColor" : "none"}
                    strokeWidth={1}
                />
            );
        }

        return stars;
    };

    const labels = {
        0.5: "Ma treizième raison",
        1: "Les Tuche 1",
        1.5: "Ni fait ni à faire",
        2: "Nan mais il est gentil",
        2.5: "Un petit gout de réchauffé",
        3: "OK tier",
        3.5: "Pâtes knacki avec du ketchup",
        4: "Très bon",
        4.5: "Divin",
        5: "Transcendant",
    };

    const handleSaveNote = () => {
        if (typeof onRate === "function") {
            onRate(selectedNote);
        }
        setOpen(false);
    };

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

                    {/*Note*/}
                    <div className="flex items-center gap-2">
                        <Rating
                            name="text-feedback"
                            value={film.note}
                            readOnly
                            precision={0.5}
                            emptyIcon={<StarIcon style={{opacity: 0.2}} fontSize="inherit"/>}
                        />
                    </div>
                    {/* Informations */}
                    <Box sx={{marginY: 2}}>
                        <Typography variant="body1" sx={{marginBottom: 1}}>
                            <strong>Durée :</strong> {film.duree} minutes
                        </Typography>
                        <Typography variant="body1">
                            <strong>Réalisateur
                                :</strong> {realisateur ? `${realisateur.prenom} ${realisateur.nom}` : "Inconnu"}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
            {/* Boutons */}
            <DialogActions sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                <Button variant="contained" color="primary" style={{
                    mt: 2,
                    backgroundColor: "#bdcf47",
                    fontFamily: 'Poppins, sans-serif',
                    color: "#484e23",
                }} onClick={() => setOpen(true)}>
                    Noter
                </Button>

                <Modal open={open} onClose={() => setOpen(false)}>
                    <Box sx={{ p: 4, backgroundColor: "white", borderRadius: 2, width: 300, mx: "auto", mt: 10 }}>
                        <Typography variant="h6">Attribuer une note</Typography>
                        <Rating
                            name="half-rating"
                            value={selectedNote}
                            precision={0.5}
                            onChange={(event, newValue) => setSelectedNote(newValue)}
                        />
                        <Box sx={{ mt: 2 }}>{labels[selectedNote]}</Box>
                        <Button variant="contained" sx={{ mt: 2, mr: 1 }} onClick={handleSaveNote} style={{
                            backgroundColor: "#bdcf47",
                            fontFamily: 'Poppins, sans-serif',
                            color: "#484e23",
                        }}>
                            Valider
                        </Button>
                        <Button  variant="outlined" sx={{
                            mt: 2,
                            fontFamily: 'Poppins, sans-serif',
                            color: "#484e23",      // Couleur du texte
                            borderColor: "#484e23" // Couleur du contour
                        }}  onClick={() => setOpen(false)} style={{
                            fontFamily: 'Poppins, sans-serif',
                            color: "#484e23",
                        }}>
                            Annuler
                        </Button>
                    </Box>
                </Modal>

                <Button onClick={onClose} variant="outlined" color="primary" sx={{
                    fontFamily: 'Poppins, sans-serif',
                    color: "#484e23",      // Couleur du texte
                    borderColor: "#484e23" // Couleur du contour
                }}>
                    Fermer
                </Button>

            </DialogActions>
        </Dialog>
    )
}
