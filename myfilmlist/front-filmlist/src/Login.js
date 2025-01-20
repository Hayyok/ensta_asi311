import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Pour rediriger vers une autre page
import { TextField, Button, Typography, Box } from "@mui/material";
import turtleImage from "./assets/turtle.png";
import { login } from "./mock/UserMock"; // Importez la fonction login depuis UserMock.js

export default function Login({ onLoginSuccess }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(username, password);
            if (response.success) {
                setError(null);
                onLoginSuccess(response); // Passe les infos utilisateur au composant parent
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px" }}>
            <img src={turtleImage} alt="Tortue" style={{ width: "200px", marginBottom: "20px" }} />
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", width: "300px" }}>
                <input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ padding: "10px", marginBottom: "10px" }}
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ padding: "10px", marginBottom: "10px" }}
                />
                <button
                    type="submit"
                    style={{
                        backgroundColor: "green",
                        color: "white",
                        padding: "10px 20px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Connexion
                </button>
                {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
            </form>
        </div>
    );
}