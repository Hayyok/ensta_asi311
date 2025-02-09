import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function Header() {
    return (
        <AppBar position="static" style={{
        backgroundColor: "#bdcf47",
            fontFamily: 'Poppins, sans-serif',
            padding: "8px 12px",
            color: "#484e23",
            borderRadius: "5px",
            cursor: "pointer",
            display: "block",
    }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    My Films
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
