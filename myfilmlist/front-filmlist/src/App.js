import React, { useState } from "react";
import Login from "./Login";
import FilmContainer from "./FilmContainer";
import AdminPanel from "./AdminPanel";
import Header from "./Header";
import { getFilmsFavorisWithUserId } from "./api/UserAPI";


export default function App() {
    const [user, setUser] = useState(null);
    const [filmsFavoris, setFilmsFavoris] = useState([]);
    const [showFavoris, setShowFavoris] = useState(false);

    const handleLoginSuccess = (userData) => {
        console.log("handleLoginSuccess appelé avec :", userData);
        setUser(userData);
        console.log(userData.role === "admin");
    };

    const handleShowFavoris = () => {
        if (user) {
            getFilmsFavorisWithUserId(user.id)
                .then((response) => {
                    setFilmsFavoris(response.data);
                    setShowFavoris(true);
                })
                .catch((err) => console.error("Erreur lors de la récupération des films favoris :", err));
        }
    };

    return (
        <div>
            <Header />

            {user ? (
                <>
                    {/* Bouton pour afficher les films favoris (uniquement pour les utilisateurs non-admins) */}
                    {user.role !== "admin" && (
                        <button
                            onClick={handleShowFavoris}
                            style={{
                                margin: "10px auto",
                                padding: "8px 12px",
                                backgroundColor: "blue",
                                color: "white",
                                borderRadius: "5px",
                                cursor: "pointer",
                                display: "block",
                            }}
                        >
                            Mes Films Favoris
                        </button>
                    )}

                    {/* Affichage des films favoris */}
                    {showFavoris && (
                        <div>
                            <h2>Mes Films Favoris</h2>
                            <ul>
                                {filmsFavoris.map((film) => (
                                    <li key={film.id}>{film.titre}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Affichage des films (gestion admin / utilisateur classique) */}
                    {user.role === "admin" ? (
                        <>
                            <AdminPanel />
                            <FilmContainer userRole={user.role} />
                        </>
                    ) : (
                        <FilmContainer userRole={user.role} />
                    )}
                </>
            ) : (
                <Login onLoginSuccess={handleLoginSuccess} />
            )}
        </div>
    );
}
