import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function FilmCard({ film }) {
    return (
        <Card variant="outlined" sx={{ marginBottom: 2 }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {film.titre}
                </Typography>
                <Typography variant="body1">
                    {film.duree} minutes
                </Typography>
            </CardContent>
        </Card>
    );
}
