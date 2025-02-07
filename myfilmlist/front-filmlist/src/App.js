import React, { useState } from "react";
import Login from "./Login";
import FilmContainer from "./FilmContainer";
import AdminPanel from "./AdminPanel";
import Header from "./Header";

export default function App() {
    const [user, setUser] = useState(null);

    const handleLoginSuccess = (userData) => {
        console.log("handleLoginSuccess appelé avec :", userData);
        setUser(userData);
        console.log(userData.role === "admin");
    };

    return (
        <div>
            <Header/>
            <FilmContainer />
        </div>
    );
}
/* juste après le header, je le décommente parce que ça soule de devoir se reconnecter tout le temps
            {user ? (
                user.role === "admin" ? (
                    <AdminPanel role={user.role} />
                ) : (
                    <FilmContainer userId={user.userId} />
                )
            ) : (
                <Login onLoginSuccess={handleLoginSuccess} />
            )}
 */