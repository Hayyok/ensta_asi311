import axios from 'axios';
//import { getAllRealisateurs } from "../mock/RealisateurMock";

//export { getAllRealisateurs };

const REALISATEUR_URI = 'http://localhost:8080/realisateur';

export function getAllRealisateurs() {
    return axios.get(REALISATEUR_URI);
}

export function postRealisateur(realisateur) {
    const params = new URLSearchParams({
        nom: realisateur.nom,
        prenom: realisateur.prenom,
        dateNaissance: realisateur.dateNaissance, // Garder le bon format
    });

    console.log("URL envoyée :", `${REALISATEUR_URI}?${params.toString()}`); // Debug

    return axios.post(`${REALISATEUR_URI}?${params.toString()}`);
}


export function deleteRealisateur(id){
    return axios.delete(`${REALISATEUR_URI}/${id}`);
}