export const mockRealisateurs = [
    { id: 1, prenom: "Christopher", nom: "Nolan" },
    { id: 2, prenom: "Quentin", nom: "Tarantino" },
    { id: 3, prenom: "Martin", nom: "Scorsese" },
];

export function getAllRealisateurs() {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ data: mockRealisateurs }), 500);
    });
}
