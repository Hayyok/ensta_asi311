package com.ensta.myfilmlist.controller;

import com.ensta.myfilmlist.dto.FilmDTO;
import com.ensta.myfilmlist.exception.ControllerException;
import com.ensta.myfilmlist.form.FilmForm;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;

import javax.validation.Valid;
import java.util.List;

@Api(tags = "Film")
@Tag(name = "Film", description = "Opération sur les films")
public interface FilmResource {

    @ApiOperation(value = "Lister les films", notes = "Permet de renvoyer la liste de tous les films.", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "La liste des films a été renvoyée correctement")
    })
    ResponseEntity<List<FilmDTO>> getAllFilms() throws ControllerException;

    @ApiOperation(value = "Donner le film cherché par id", notes = "Permet de renvoyer le film correspondant à l'identifiant renseigné", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Le film a bien été trouvé et renvoyé correctement"),
            @ApiResponse(code = 404, message = "Le film n'a pas été trouvé")
    })
    ResponseEntity<FilmDTO> getFilmById(long id) throws ControllerException;

    @ApiOperation(value = "Création d'un film", notes = "Permet de créer un film avec les paramètres donnés", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Le film a bien été créé")
    })
    ResponseEntity<FilmDTO> createFilm(@Valid FilmForm filmForm) throws ControllerException ;

    @ApiOperation(value = "Modification d'un film", notes = "Permet de modifier les informations d'un film en fonction de son id et des paramètres donnés", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Le film a bien été édité")

    })
    public ResponseEntity<FilmDTO> editFilm(@PathVariable long id, @RequestBody FilmForm filmForm) throws ControllerException;


    @ApiOperation(value = "Suppression d'un film", notes = "Permet de supprimer un film en fonction de l'id", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 204, message = "Le film a bien été supprimé")
    })
    ResponseEntity<?> deleteFilm(long id) throws ControllerException;
}
