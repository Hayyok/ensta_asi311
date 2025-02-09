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
        <Box >
            <Typography variant="h5" gutterBottom>
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
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#ccc" },  // Bordure normale
                            "&:hover fieldset": { borderColor: "green" },  // Bordure au survol
                            "&.Mui-focused fieldset": { borderColor: "green" }  // Bordure quand on clique
                        },
                        "& .MuiInputLabel-root": { color: "green" },  // Label par défaut en vert
                        "& .MuiInputLabel-root.Mui-focused": { color: "green" }  // Label en vert quand focus
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 1 }}
                    onClick={handleAddCommentaire}
                    style={{
                        backgroundColor: "#bdcf47",
                        fontFamily: 'Poppins, sans-serif',
                        margin: "10px auto",
                        padding: "8px 12px",
                        color: "#484e23",
                        borderRadius: "5px",
                        cursor: "pointer",
                        display: "block",
                    }}
                >
                    Envoyer
                </Button>
            </Box>
        </Box>
    );
}
