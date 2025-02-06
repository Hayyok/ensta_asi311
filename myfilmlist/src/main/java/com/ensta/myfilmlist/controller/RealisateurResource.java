package com.ensta.myfilmlist.controller;

import com.ensta.myfilmlist.dto.FilmDTO;
import com.ensta.myfilmlist.dto.RealisateurDTO;
import com.ensta.myfilmlist.exception.ControllerException;
import com.ensta.myfilmlist.form.FilmForm;
import com.ensta.myfilmlist.form.RealisateurForm;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import javax.validation.Valid;
import java.util.List;
@Api(tags = "Realisateur")
@Tag(name = "Realisateur", description = "Opération sur les réalisateurs")
public interface RealisateurResource {
    @ApiOperation(value = "Lister les réalisateurs", notes = "Permet de renvoyer la liste de tous les réalisateurs.", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "La liste des réalisateurs a été renvoyée correctement")
    })
    ResponseEntity<List<RealisateurDTO>> getAllRealisateurs() throws ControllerException;

    @ApiOperation(value = "Donner le réalisteur cherché par id", notes = "Permet de renvoyer le réalisateur correspondant à l'identifiant renseigné", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Le réalisateur a bien été trouvé et renvoyé correctement"),
            @ApiResponse(code = 404, message = "Le réalisateur n'a pas été trouvé")
    })
    ResponseEntity<RealisateurDTO> getRealisateurById(long id) throws ControllerException;

    @ApiOperation(value = "Création d'un réalisateur", notes = "Permet de créer un réalisateur avec les paramètres donnés", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Le réalisateur a bien été créé")
    })
    ResponseEntity<RealisateurDTO> createRealisateur(@Valid RealisateurForm realisateurForm) throws ControllerException ;

    /*@ApiOperation(value = "Suppression d'un réalisateur", notes = "Permet de supprimer un réalisateur en fonction de l'id", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 204, message = "Le réalisateur a bien été supprimé")
    })
    ResponseEntity<?> deleteRealisateur(long id) throws ControllerException;*/
}
