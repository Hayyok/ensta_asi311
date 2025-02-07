import axios from 'axios';

const FILM_URI = 'http://localhost:8080/film'
export function getAllFilms(){
    return axios.get(FILM_URI);
}
export function postFilm(){
    return axios.post(FILM_URI);
}
export function putFilm(id){
    return axios.put('http://localhost:8080/film/{id}')
}
export function deleteFilm(id){
    return axios.delete('http://localhost:8080/film/{id}');
}