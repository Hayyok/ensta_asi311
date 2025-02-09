package com.ensta.myfilmlist.controller;

import com.ensta.myfilmlist.dto.FilmDTO;
import com.ensta.myfilmlist.dto.UtilisateurDTO;
import com.ensta.myfilmlist.exception.ControllerException;
import com.ensta.myfilmlist.form.UtilisateurForm;
import org.springframework.http.ResponseEntity;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import javax.validation.Valid;
import java.util.List;

@Api(tags = "Utilisateur")
@Tag(name = "Utilisateur", description = "Opérations sur les utilisateurs")
public interface UtilisateurResource {
    @ApiOperation(value = "Lister les utilisateurs", notes = "Permet de renvoyer la liste de tous les utilisateurs.", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "La liste des utilisateurs a été renvoyée correctement")
    })
    ResponseEntity<List<UtilisateurDTO>> getAllUtilisateurs() throws ControllerException;

    @ApiOperation(value = "Donner l'utilisateur cherché par id", notes = "Permet de renvoyer l'utilisateur correspondant à l'identifiant renseigné", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "L'utilisateur a bien été trouvé et renvoyé correctement"),
            @ApiResponse(code = 404, message = "L'utilisateur n'a pas été trouvé")
    })
    ResponseEntity<UtilisateurDTO> getUtilisateurById(long id) throws ControllerException;

    @ApiOperation(value = "Donner la liste des films favoris d'un utilisateur", notes = "Permet de renvoyer la liste des films favoris d'un utilisateur", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "La liste des films favoris de l'utilisateur a été renvoyée correctement")
    })
    ResponseEntity<List<FilmDTO>> getFilmsFavorisByUtilisateurId(long id) throws ControllerException;

    @ApiOperation(value = "Ajout d'un film dans la liste des films favoris d'un utilisateur", notes = "Permet d'ajouter un film grâce à son identifiant dans la liste des films favoris d'un utilisateur par son identifiant", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Le film a été ajouté correctement à la liste des films favoris de l'utilisateur")
    })
    ResponseEntity<FilmDTO> addFilmFavorisForUtilisateurIdByFilmId(long utilisateurId, long filmId) throws ControllerException;

    @ApiOperation(value = "Création d'un utilisateur", notes = "Permet de créer un utilisateur avec les paramètres donnés", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "L'utilisateur a bien été créé")
    })
    ResponseEntity<UtilisateurDTO> createUtilisateur(@Valid UtilisateurForm utilisateurForm) throws ControllerException;

    @ApiOperation(value = "Suppression d'un utilisateur", notes = "Permet de supprimer un utilisateur en fonction de l'id", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 204, message = "L'utilisateur a bien été supprimé")
    })
    ResponseEntity<?> deleteUtilisateur(long id) throws ControllerException;

}
