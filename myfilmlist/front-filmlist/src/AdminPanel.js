import React, { useState, useEffect } from "react";
import { getAllRealisateurs, postRealisateur, deleteRealisateur } from "./api/RealisateurAPI";

export default function AdminPanel() {
    const [realisateurs, setRealisateurs] = useState([]);
    const [newRealisateur, setNewRealisateur] = useState({nom: "", prenom:"", dateNaissance: ""});
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
            if (!newRealisateur.nom || !newRealisateur.prenom || !newRealisateur.dateNaissance) {
                setError("Tous les champs sont obligatoires !");
                return;
            }

            // Convertir la date au format dd-MM-yyyy
            const dateObj = new Date(newRealisateur.dateNaissance);
            const formattedDate = `${("0" + dateObj.getDate()).slice(-2)}/${("0" + (dateObj.getMonth() + 1)).slice(-2)}/${dateObj.getFullYear()}`;

            // Vérification que les champs ne sont pas vides après trim()
            const realisateurData = {
                nom: newRealisateur.nom.trim(),
                prenom: newRealisateur.prenom.trim(),
                dateNaissance: formattedDate, // Format correct pour le backend
            };

            // Vérification avant l'envoi
            if (!realisateurData.nom || !realisateurData.prenom || !realisateurData.dateNaissance) {
                setError("Tous les champs doivent être remplis !");
                return;
            }

            console.log("Données envoyées :", realisateurData); // Debug

            // Envoi à l'API avec la date formatée
            const response = await postRealisateur(realisateurData);
            setRealisateurs([...realisateurs, response.data]);
            setNewRealisateur({ nom: "", prenom: "", dateNaissance: "" });
            setError(null);
        } catch (err) {
            console.error("Erreur lors de l'ajout :", err.response?.data || err.message);
            setError(err.response?.data?.message || "Erreur lors de l'ajout");
        }
    };



    const handleDeleteRealisateur = async (id) => {
        try {
            await deleteRealisateur(id);
            setRealisateurs(realisateurs.filter((r) => r.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={{margin: "20px"}}>
            <h2>Gestion des Réalisateurs</h2>
            {error && <p style={{color: "red"}}>{error}</p>}
            <ul>
                {realisateurs.map((realisateur) => (
                    <li key={realisateur.id}>
                        {`${realisateur.prenom || "Inconnu"} ${realisateur.nom || "Inconnu"} - ${realisateur.dateNaissance || "Date inconnue"}`}
                        <button onClick={() => handleDeleteRealisateur(realisateur.id)}>Supprimer</button>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                placeholder="Prénom"
                value={newRealisateur.prenom}
                onChange={(e) => setNewRealisateur({...newRealisateur, prenom: e.target.value})}
            />
            <input
                type="text"
                placeholder="Nom"
                value={newRealisateur.nom}
                onChange={(e) => setNewRealisateur({...newRealisateur, nom: e.target.value})}
            />
            <input
                type="date"
                placeholder="Date de naissance"
                value={newRealisateur.dateNaissance}
                onChange={(e) => setNewRealisateur({...newRealisateur, dateNaissance: e.target.value})}
            />
            <button onClick={handleAddRealisateur}>Ajouter</button>
        </div>
    );
}
/*
<div style={{marginTop: "20px"}}>
                <input
                    type="text"
                    placeholder="Nom complet du réalisateur"
                    value={newRealisateur}
                    onChange={(e) => setNewRealisateur(e.target.value)}
                    style={{padding: "10px", marginRight: "10px"}}
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
                {error && <p style={{color: "red", marginTop: "10px"}}>{error}</p>}
            </div>
 */