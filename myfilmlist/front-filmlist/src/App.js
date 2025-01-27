import React, { useState } from "react";
import Login from "./Login";
import FilmContainer from "./FilmContainer";
import AdminPanel from "./AdminPanel";

export default function App() {
    const [user, setUser] = useState(null);

    const handleLoginSuccess = (userData) => {
        console.log("handleLoginSuccess appelé avec :", userData);
        setUser(userData);
        console.log(userData.role === "admin");
    };

    return (
        <div>
            {user ? (
                user.role === "admin" ? (
                    <AdminPanel role={user.role} />
                ) : (
                    <FilmContainer userId={user.userId} />
                )
            ) : (
                <Login onLoginSuccess={handleLoginSuccess} />
            )}
        </div>
    );
}
