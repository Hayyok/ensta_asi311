// Simule un backend avec des utilisateurs enregistrés
import {  mockRealisateurs } from "./RealisateurMock";
const mockUsers = [
    { username: "john_doe", password: "password123", userId: 1, role: "user" },
    { username: "jane_doe", password: "secure456", userId: 2, role: "user" },
    { username: "turtle_lover", password: "iloveturtles", userId: 3,role: "admin" },
    { username: "admin", password: "admin", userId: 4,role: "admin" },
];

// Fonction pour simuler la connexion
export const login = async (username, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = mockUsers.find(
                (u) => u.username === username && u.password === password
            );
            console.log("Utilisateur trouvé :", user);

            if (user) {
                // Simule un token ou une session utilisateur
                resolve({ 
                    success: true,
                    ...user,
                    token: "mock-token" });
            } else {
                reject({ success: false, message: "Nom d'utilisateur ou mot de passe incorrect" });
            }
        }, 500); // Simule un délai réseau
    });
};

// Fonction pour récupérer des informations utilisateur (facultatif)
export const getUserById = async (userId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = mockUsers.find((u) => u.userId === userId);
            if (user) {
                resolve({ success: true, user });
            } else {
                reject({ success: false, message: "Utilisateur introuvable" });
            }
        }, 500);
    });
};

export const addRealisateur = async (fullName, role) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (role !== "admin") {
                reject({ success: false, message: "Action réservée aux administrateurs." });
            } else {
                
                const [prenom, ...rest] = fullName.split(" ");
                const nom = rest.join(" ");
                const alreadyExists = mockRealisateurs.some(
                    (r) => r.prenom === prenom && r.nom === nom
                );
                if (alreadyExists) {
                    reject({ success: false, message: "Le réalisateur existe déjà." });
                    return;
                }
                const newId = mockRealisateurs.length > 0
                    ? Math.max(...mockRealisateurs.map((r) => r.id)) + 1
                    : 1;

                const newRealisateur = {
                    id: newId,
                    prenom: prenom || "Inconnu",
                    nom: nom || "Inconnu",
                };
                mockRealisateurs.push(newRealisateur);
                resolve({ success: true, realisateur: newRealisateur });
            }
        }, 500);
    });
};
