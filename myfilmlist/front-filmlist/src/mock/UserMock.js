// Simule un backend avec des utilisateurs enregistrés
const mockUsers = [
    { username: "john_doe", password: "password123", userId: 1 },
    { username: "jane_doe", password: "secure456", userId: 2 },
    { username: "turtle_lover", password: "iloveturtles", userId: 3 },
];

// Fonction pour simuler la connexion
export const login = async (username, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = mockUsers.find(
                (u) => u.username === username && u.password === password
            );

            if (user) {
                // Simule un token ou une session utilisateur
                resolve({ success: true, userId: user.userId, token: "mock-token" });
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
