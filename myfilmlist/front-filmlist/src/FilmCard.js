import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function FilmCard({ film, onEdit, onDelete }) {
    const handleClickOnDeleteButton = () => {
        if (onDelete) onDelete(film.id);
    };

    const handleClickOnEditButton = () => {
        if (onEdit) onEdit(film);
    };

    return (
        <Card variant="outlined" sx={{ marginBottom: 2 }}>
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
