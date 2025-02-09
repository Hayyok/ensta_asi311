import React, {useState} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { addFilmFavoris } from "./api/UserAPI";
import { Box } from "@mui/material";




export default function FilmCard({ film, userId, userRole, onEdit, onDelete, onSelect, isFavoris }) {
    const [isFavorited, setIsFavorited] = useState(false); // État local pour indiquer si le film est ajouté

    const handleClickOnDeleteButton = (e) => {
        e.stopPropagation(); // Empêche le clic global sur la carte
        if (onDelete) onDelete(film.id);
    };

    const handleClickOnEditButton = (e) => {
        e.stopPropagation(); // Empêche le clic global sur la carte
        if (onEdit) onEdit(film);
    };

    const handleClickCard = () => {
        if (onSelect) onSelect(film);
    };

    const handleAddToFavorites = (e) => {
        e.stopPropagation(); // Empêche le clic global sur la carte
        addFilmFavoris(userId, film.id)
            .then(() => setIsFavorited(true)) // Met à jour l'état pour indiquer que le film est en favoris
            .catch((err) => console.error("Erreur lors de l'ajout aux favoris :", err));
    };

    return (
        <Card
            variant="outlined"
            sx={{ marginBottom: 2, display: "flex", justifyContent: "space-between", padding: 2 }}
            onClick={handleClickCard} // Ajoutez l'événement ici
        >
            <CardContent sx={{ flex: 1 }}>
                <Typography variant="h5" gutterBottom>
                    {film.titre}
                </Typography>
                {userRole === "admin" && (
                    <>
                        <IconButton onClick={handleClickOnEditButton}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={handleClickOnDeleteButton}>
                            <DeleteIcon />
                        </IconButton>
                    </>
                )}
            </CardContent>

            {/* Bouton Ajouter aux Favoris (uniquement pour les utilisateurs non-admins) */}
            {userRole !== "admin" && !isFavoris && (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        justifyContent: "center",
                    }}
                >
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ marginBottom: "5px", fontSize: "12px" }}
                    >
                        Ajouter aux favoris
                    </Typography>
                    <IconButton
                        onClick={handleAddToFavorites}
                        color={isFavorited ? "success" : "primary"} // Change la couleur si ajouté
                    >
                        <AddIcon />
                    </IconButton>
                </Box>
            )}
        </Card>
    );
}
