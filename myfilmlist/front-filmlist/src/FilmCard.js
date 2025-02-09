import React, {useState} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { addFilmFavoris } from "./api/UserAPI";



export default function FilmCard({ film, userId, userRole, onEdit, onDelete, onSelect }) {
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
            sx={{ marginBottom: 2 }}
            onClick={handleClickCard} // Ajoutez l'événement ici
        >
            <CardContent>
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
                {/* Bouton Ajouter aux Favoris (uniquement pour les utilisateurs non-admins) */}
                {userRole !== "admin" && (
                    <IconButton
                        onClick={handleAddToFavorites}
                        style={{
                            fontFamily: 'Poppins, sans-serif',
                            color: "#484e23",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                        color={isFavorited ? "success" : "primary"} // Change la couleur si ajouté
                    >
                        <AddIcon />
                    </IconButton>
                )}
            </CardContent>
        </Card>
    );
}
