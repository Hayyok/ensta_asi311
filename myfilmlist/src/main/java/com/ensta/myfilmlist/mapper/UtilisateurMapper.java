package com.ensta.myfilmlist.mapper;

import com.ensta.myfilmlist.dto.UtilisateurDTO;
import com.ensta.myfilmlist.form.UtilisateurForm;
import com.ensta.myfilmlist.model.Utilisateur;

import java.util.List;
import java.util.stream.Collectors;

import static com.ensta.myfilmlist.mapper.FilmMapper.*;

/**
 * Effectue les conversions des Utilisateurs entre les couches de l'application
 */
public class UtilisateurMapper {

    /**
     * Convertit un utilisateur en utilisateurDTO
     * @param utilisateur l'utilisateur à convertir
     * @return un DTO construit à partir de l'utilisateur
     */
    public static UtilisateurDTO convertUtilisateurToUtilisateurDTO(Utilisateur utilisateur) {
        UtilisateurDTO utilisateurDTO = new UtilisateurDTO();
        utilisateurDTO.setId(utilisateur.getId());
        utilisateurDTO.setUsername(utilisateur.getUsername());
        utilisateurDTO.setPassword(utilisateur.getPassword());
        utilisateurDTO.setRole(utilisateur.getRole());
        if(utilisateur.getFilmsFavorisId()!=null) {
            utilisateurDTO.setFilmsFavorisId(utilisateur.getFilmsFavorisId());
        } else { utilisateurDTO.setFilmsFavorisId(null); }
        return utilisateurDTO;
    }

    /**
     * Convertit une liste d'utilisateurs en une liste d'utilisateurDTO
     * @param utilisateurs la liste d'utilisateur à convertir
     * @return la liste d'utilisateurDTO convertit
     */
    public static List<UtilisateurDTO> convertUtilisateurToUtilisateurDTOs(List<Utilisateur> utilisateurs){
        return utilisateurs.stream()
                .map(UtilisateurMapper::convertUtilisateurToUtilisateurDTO)
                .collect(Collectors.toList());
    }

    /**
     * Convertit un utilisateurDTO en utilisateur
     * @param utilisateurDTO l'utilisateurDTO à convertir
     * @return l'utilisateur
     */
    public static Utilisateur convertUtilisateurDTOToUtilisateur(UtilisateurDTO utilisateurDTO) {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setId(utilisateurDTO.getId());
        utilisateur.setUsername(utilisateurDTO.getUsername());
        utilisateur.setPassword(utilisateurDTO.getPassword());
        utilisateur.setRole(utilisateurDTO.getRole());
        if(utilisateurDTO.getFilmsFavorisId()!=null) {
            utilisateur.setFilmsFavorisId(utilisateurDTO.getFilmsFavorisId());
        } else { utilisateur.setFilmsFavorisId(null); }
        return utilisateur;
    }

    public static Utilisateur convertUtilisateurFormToUtilisateur(UtilisateurForm utilisateurForm){
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setUsername(utilisateurForm.getUsername());
        utilisateur.setPassword(utilisateurForm.getPassword());
        return utilisateur;
    }

}
