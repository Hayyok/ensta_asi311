import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Pour rediriger vers une autre page
import { TextField, Button, Typography, Box } from "@mui/material";
import turtleImage from "./assets/turtle.png";
//import { login } from "./mock/UserMock";
import { getAllUtilisateur } from "./api/UserAPI"
import CreateUtilisateurForm from "./CreateUtilisateurForm"; // Importer le formulaire de création


export const login = async (username, password) => {
    try {
        const response = await getAllUtilisateur(); // Attendre que la requête API soit complétée
        const allUtilisateurs = response.data; // Récupérer les utilisateurs depuis la réponse API

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = allUtilisateurs.find(
                    (u) => u.username === username && u.password === password
                );
                console.log("Utilisateur trouvé :", user);

                if (user) {
                    resolve({
                        success: true,
                        ...user,
                        token: "mock-token"
                    });
                } else {
                    reject({ success: false, message: "Nom d'utilisateur ou mot de passe incorrect" });
                }
            }, 500);
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
        throw new Error("Problème de connexion au serveur");
    }
};


export default function Login({ onLoginSuccess }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [showCreateAccount, setShowCreateAccount] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(username, password);
            console.log("Réponse après login :", response);
            if (response.success) {
                setError(null);
                onLoginSuccess(response); // Passe toutes les infos utilisateur
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCreateAccountClick = () => {
        setShowCreateAccount(true);
    };

    const handleAccountCreated = () => {
        setShowCreateAccount(false);
    };

    return (
        <div style={{ fontFamily: 'Poppins' , display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px",  }}>
            <img src={turtleImage} alt="Tortue" style={{ width: "200px", marginBottom: "20px" }} />
            {showCreateAccount ? (
                <CreateUtilisateurForm onAccountCreated={handleAccountCreated} />
            ) : (
                <>
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", width: "300px" }}>
                        <TextField

                            label="Nom d'utilisateur"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            fullWidth
                            margin="normal"
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
                        <TextField
                            label="Mot de passe"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            margin="normal"
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
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{
                                backgroundColor: "#bdcf47",
                                fontFamily: 'Poppins, sans-serif',
                                margin: "10px auto",
                                color: "#484e23",
                                cursor: "pointer",
                            }}
                        >
                            Connexion
                        </Button>
                        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
                    </form>
                    <Button
                        color="secondary"
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
                        onClick={handleCreateAccountClick}
                    >
                        Créer un compte
                    </Button>
                </>
            )}
        </div>
    );
}
