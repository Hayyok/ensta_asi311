const mockCommentaires = [
    {
        id: 1,
        auteur: "Utilisateur 1",
        contenu: "Pouvez-vous ajouter le film 'Inception' réalisé par Christopher Nolan ?",
    },
    {
        id: 2,
        auteur: "Utilisateur 2",
        contenu: "Serait-il possible d'ajouter Quentin Tarantino comme réalisateur ?",
    },
];

export function getCommentaires() {
    return Promise.resolve(mockCommentaires);
}

export function ajouterCommentaire(commentaire) {
    const newCommentaire = {
        id: mockCommentaires.length + 1,
        ...commentaire,
    };
    mockCommentaires.push(newCommentaire);
    return Promise.resolve(newCommentaire);
}
