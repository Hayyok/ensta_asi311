import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { postUtilisateur } from "./api/UserAPI";

export default function CreateUtilisateurForm({ onAccountCreated }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await postUtilisateur({ username, password });
            setError(null);
            onAccountCreated(); // Indique que le compte a été créé avec succès
        } catch (err) {
            setError("Erreur lors de la création de l'utilisateur. Essayez encore.");
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px" }}>
            <Typography variant="h5" gutterBottom>Créer un compte</Typography>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", width: "300px" }}>
                <TextField
                    label="Nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Mot de passe"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{
                        backgroundColor: "#bdcf47",
                        fontFamily: 'Poppins, sans-serif',
                        marginTop: "20px",
                        margin: "10px auto",
                        padding: "8px 12px",
                        color: "#484e23",
                        borderRadius: "5px",
                        cursor: "pointer",
                        display: "block",
                    }}
                >
                    Créer un compte
                </Button>
                {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
            </form>
        </div>
    );
}
