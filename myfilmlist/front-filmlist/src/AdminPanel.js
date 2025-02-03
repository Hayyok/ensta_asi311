import React, { useState, useEffect } from "react";
import { addRealisateur } from "./mock/UserMock";
import { getAllRealisateurs } from "./mock/RealisateurMock";

export default function AdminPanel({ role }) {
    const [realisateurs, setRealisateurs] = useState([]);
    const [newRealisateur, setNewRealisateur] = useState("");
    const [error, setError] = useState(null);

    // Chargement initial des réalisateurs
    useEffect(() => {
        getAllRealisateurs()
            .then((response) => setRealisateurs(response.data)) // Correction ici : utiliser response.data
            .catch((err) => console.error(err));
    }, []);

    // Gestion de l'ajout d'un réalisateur
    const handleAddRealisateur = async () => {
        try {
            const response = await addRealisateur(newRealisateur, role);
            if (response.success) {
                setRealisateurs([...realisateurs, response.realisateur]);
                setNewRealisateur("");
                setError(null);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={{ margin: "20px" }}>
            <h2>Gestion des Réalisateurs</h2>
            <ul>
                {realisateurs.map((realisateur) => (
                    <li key={realisateur.id}>
                        {`${realisateur.prenom || "Inconnu"} ${realisateur.nom || "Inconnu"}`}
                    </li>
                ))}
            </ul>
            <div style={{ marginTop: "20px" }}>
                <input
                    type="text"
                    placeholder="Nom complet du réalisateur"
                    value={newRealisateur}
                    onChange={(e) => setNewRealisateur(e.target.value)}
                    style={{ padding: "10px", marginRight: "10px" }}
                />
                <button
                    onClick={handleAddRealisateur}
                    style={{
                        backgroundColor: "green",
                        color: "white",
                        padding: "10px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Ajouter
                </button>
                {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
            </div>
        </div>
    );
}
