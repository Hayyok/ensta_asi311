import axios from 'axios';

const FILM_URI = 'http://localhost:8080/film'
export function getAllFilms(){
    return axios.get(FILM_URI);
}
export function postFilm(film){
    return axios.post(FILM_URI, film);
}
export function putFilm(id, film){
    return axios.put(`http://localhost:8080/film/${id}`, film);
}
export function deleteFilm(id){
    return axios.delete(`${FILM_URI}/${id}`);
}