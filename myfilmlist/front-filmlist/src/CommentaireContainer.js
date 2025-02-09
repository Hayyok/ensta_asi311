import React, { useState, useEffect } from "react";
import { getCommentaires, ajouterCommentaire } from "./mock/MockCommentaire";
import {
    Box,
    Typography,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    Divider,
} from "@mui/material";

export default function CommentaireContainer() {
    const [commentaires, setCommentaires] = useState([]);
    const [nouveauCommentaire, setNouveauCommentaire] = useState("");

    useEffect(() => {
        getCommentaires()
            .then((data) => setCommentaires(data))
            .catch((err) => console.error("Erreur lors du chargement des commentaires :", err));
    }, []);

    const handleAddCommentaire = () => {
        if (nouveauCommentaire.trim() === "") return;

        const commentaire = {
            auteur: "Utilisateur standard", // Remplacer par un utilisateur connecté si nécessaire
            contenu: nouveauCommentaire,
        };

        ajouterCommentaire(commentaire)
            .then((newComment) => {
                setCommentaires((prev) => [...prev, newComment]);
                setNouveauCommentaire("");
            })
            .catch((err) => console.error("Erreur lors de l'ajout du commentaire :", err));
    };

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Suggestions pour les admins
            </Typography>
            {/* Liste des commentaires */}
            <List>
                {commentaires.map((commentaire) => (
                    <React.Fragment key={commentaire.id}>
                        <ListItem>
                            <ListItemText
                                primary={commentaire.auteur}
                                secondary={commentaire.contenu}
                            />
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
            {/* Formulaire pour ajouter un commentaire */}
            <Box sx={{ marginTop: 2 }}>
                <TextField
                    label="Ajouter une suggestion"
                    variant="outlined"
                    fullWidth
                    value={nouveauCommentaire}
                    onChange={(e) => setNouveauCommentaire(e.target.value)}
                    multiline
                    rows={3}
                />
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 1 }}
                    onClick={handleAddCommentaire}
                >
                    Envoyer
                </Button>
            </Box>
        </Box>
    );
}
