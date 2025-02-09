import axios from 'axios';

const UTILISATEUR_URI = 'http://localhost:8080/utilisateur';

export function getAllUtilisateur() {
    return axios.get(UTILISATEUR_URI);
}

export function postUtilisateur(utilisateur) {
    const params = new URLSearchParams({
        username: utilisateur.username,
        password: utilisateur.password,
    });

    return axios.post(`${UTILISATEUR_URI}?${params.toString()}`);
}


export function deleteUtilisateur(id){
    return axios.delete(`${UTILISATEUR_URI}/${id}`);
}