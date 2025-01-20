import React, { useState } from "react";
import Login from "./Login";
import FilmContainer from "./FilmContainer";

export default function App() {
    const [user, setUser] = useState(null);

    const handleLoginSuccess = (userData) => {
        setUser(userData); // Stocke les données utilisateur une fois connecté
    };

    return (
        <div>
            {user ? (
                <FilmContainer userId={user.userId} />
            ) : (
                <Login onLoginSuccess={handleLoginSuccess} />
            )}
        </div>
    );
}
