import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Star } from "lucide-react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import Button from "@mui/material/Button";
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
        <Card variant="outlined" sx={{ padding: 2, marginTop: 2 }}>
            <CardContent>
                <Typography variant="h4" gutterBottom>
                    {film.titre}
                </Typography>

                <div className="flex items-center gap-2">
                    <Rating
                        name="text-feedback"
                        value={film.note}
                        readOnly
                        precision={0.5}
                        emptyIcon={<StarIcon style={{opacity: 0.2}} fontSize="inherit"/>}
                    />
                </div>


                <Typography variant="body1" gutterBottom>
                    Durée : {film.duree} minutes
                </Typography>
                <Typography variant="body1">
                    Réalisateur : {realisateur ? `${realisateur.prenom} ${realisateur.nom}` : "Inconnu"}
                </Typography>


                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => setOpen(true)}>
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
                        <Button variant="contained" sx={{ mt: 2, mr: 1 }} onClick={handleSaveNote}>
                            Valider
                        </Button>
                        <Button variant="outlined" sx={{ mt: 2 }} onClick={() => setOpen(false)}>
                            Annuler
                        </Button>
                    </Box>
                </Modal>

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
