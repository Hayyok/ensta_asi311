import axios from 'axios';

const FILM_URI = 'http://localhost:8080/film'
export function getAllFilms(){
    return axios.get(FILM_URI);
}
export function postFilm(film){
    const params = new URLSearchParams({
        titre: film.titre,
        duree: film.duree,
        realisateurId: film.realisateurId,
    });
    console.log("URL envoyée :", `${FILM_URI}?${params.toString()}`); // Debug
    return axios.post(`${FILM_URI}?${params.toString()}`);
}

export function putFilm(id, film){
    const params = new URLSearchParams({
        titre: film.titre,
        duree: film.duree,
        realisateurId: film.realisateurId,
    });
    console.log("URL envoyée :", `${FILM_URI}/${id}?${params.toString()}`); // Debug
    return axios.put(`${FILM_URI}/${id}?${params.toString()}`);
}
export function deleteFilm(id){
    return axios.delete(`${FILM_URI}/${id}`);
}