import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function FilmCard({ userId, film, onEdit, onDelete }) {
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
                {userId === "admin" && (
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
        </Card>
    );
}

