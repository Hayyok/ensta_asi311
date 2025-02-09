import React, { useState } from "react";
import Login from "./Login";
import FilmContainer from "./FilmContainer";
import AdminPanel from "./AdminPanel";
import Header from "./Header";
import { getFilmsFavorisWithUserId } from "./api/UserAPI";
import FilmsFavorisContainer from "./FilmsFavorisContainer"
import { Button } from "@mui/material";

export default function App() {
    const [user, setUser] = useState(null);
    const [showFavoris, setShowFavoris] = useState(false); // État pour afficher ou masquer les favoris

    const handleLoginSuccess = (userData) => {
        console.log("handleLoginSuccess appelé avec :", userData);
        setUser(userData);
        console.log(userData.role === "admin");
    };

    const handleShowFavoris = () => {
        setShowFavoris(!showFavoris);
    };

    return (
        <div style={{ fontFamily: 'Poppins, sans-serif'}}>
            <Header/>

            {user ? (
                <>
                    {/* Bouton pour afficher/masquer les favoris */}
                    {user.role !== "admin" && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleShowFavoris}
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
                            {showFavoris ? "Masquer les favoris" : "Afficher les favoris"}
                        </Button>
                    )}

                    {/* Affichage des favoris si activé */}
                    {showFavoris && user.role !== "admin" && <FilmsFavorisContainer userId={user.id} />}

                    {/* Affichage des films et gestion admin / utilisateur */}
                    {user.role === "admin" ? (
                        <>
                            <AdminPanel/>
                            <FilmContainer userId={user.id} userRole={user.role}/>
                        </>
                    ) : (
                        <FilmContainer userId={user.id} userRole={user.role}/>
                    )}
                </>
            ) : (
                <Login onLoginSuccess={handleLoginSuccess}/>
            )}
        </div>
    );
}