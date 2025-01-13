//import axios from 'axios';
import { getAllFilms, postFilm, putFilm, deleteFilm } from "../mock/FilmMock";
export { getAllFilms, postFilm, putFilm, deleteFilm };
const FILM_URI = 'http://localhost:8080/film'

export function getAllFilms(){
    return axios.get(FILM_URI);
}

export function postFilm(film) {
    return axios.post(FILM_URI, film);
}

export function putFilm(id, film) {
    return axios.put(`${FILM_URI}/${id}`, film);
}

export function deleteFilm(id) {
    return axios.delete(`${FILM_URI}/${id}`);
}