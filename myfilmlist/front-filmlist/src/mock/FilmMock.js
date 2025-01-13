export const mockFilms = [
    { id: 1, title: "Inception", duration: 148, realisateurId: 1 },
    { id: 2, title: "The Dark Knight", duration: 152, realisateurId: 2 },
    { id: 3, title: "Interstellar", duration: 169, realisateurId: 1 },
];

export function getAllFilms() {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ data: mockFilms }), 500);
    });
}

export function postFilm(newFilm) {
    return new Promise((resolve) => {
        setTimeout(() => {
            mockFilms.push({ id: mockFilms.length + 1, ...newFilm });
            resolve({ data: newFilm });
        }, 500);
    });
}

export function putFilm(id, updatedFilm) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const index = mockFilms.findIndex((film) => film.id === id);
            if (index !== -1) {
                mockFilms[index] = { ...mockFilms[index], ...updatedFilm };
                resolve({ data: mockFilms[index] });
            }
        }, 500);
    });
}

export function deleteFilm(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const index = mockFilms.findIndex((film) => film.id === id);
            if (index !== -1) {
                mockFilms.splice(index, 1);
            }
            resolve({ data: null });
        }, 500);
    });
}
