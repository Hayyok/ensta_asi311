import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


export default function FilmCard({ film, onEdit, onDelete, onSelect }) {
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
                <Typography variant="body1">
                    {film.duree} minutes
                </Typography>
                <IconButton onClick={handleClickOnEditButton}>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={handleClickOnDeleteButton}>
                    <DeleteIcon />
                </IconButton>
            </CardContent>
        </Card>
    );
}
