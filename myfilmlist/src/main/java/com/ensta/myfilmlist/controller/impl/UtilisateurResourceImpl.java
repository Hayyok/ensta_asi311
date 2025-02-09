package com.ensta.myfilmlist.controller.impl;

import com.ensta.myfilmlist.controller.UtilisateurResource;
import com.ensta.myfilmlist.dto.FilmDTO;
import com.ensta.myfilmlist.dto.RealisateurDTO;
import com.ensta.myfilmlist.dto.UtilisateurDTO;
import com.ensta.myfilmlist.exception.ControllerException;
import com.ensta.myfilmlist.form.UtilisateurForm;
import com.ensta.myfilmlist.service.MyFilmsService;
import com.ensta.myfilmlist.controller.FilmResource;
import com.ensta.myfilmlist.service.ServiceException;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.Valid;
import java.util.List;

import static java.lang.System.in;

@RestController
@RequestMapping("/utilisateur")
@Validated
@CrossOrigin(origins = "http://localhost:3000")
public class UtilisateurResourceImpl implements UtilisateurResource {
    @Autowired
    private MyFilmsService myFilmsService;

    /**
     * Renvoie la liste de tous les utilisateurs
     * @return la liste des utilisateurs
     * @throws ControllerException en cas d'erreur
     */
    @GetMapping
    public ResponseEntity<List<UtilisateurDTO>> getAllUtilisateurs() throws ControllerException {
        try{
            return ResponseEntity.status(HttpStatus.OK).body(myFilmsService.findAllUtilisateurs());
        } catch (Exception e) {
            throw new ControllerException(e);
        }
    }

    /**
     * Renvoie l'utilisateur ayant l'identifiant donné ou une erreur 404 si la ressource n'a pas été trouvée
     * @param id l'identifiant de l'utilisateur à trouver
     * @return l'UtilisateurDTO correspondant à l'identifiant ou une erreur 404 si pas de realisateur trouvé
     * @throws ControllerException en cas d'erreur de traitement
     */
    @GetMapping("/{id}")
    public ResponseEntity<UtilisateurDTO> getUtilisateurById(@PathVariable long id) throws ControllerException {
        try{
            UtilisateurDTO utilisateurDTO = myFilmsService.findUtilisateurDTOById(id).get();
            return ResponseEntity.status(HttpStatus.OK).body(utilisateurDTO);
        } catch (Exception e) {
            throw new ControllerException(e);
        }
    }

    @GetMapping("/{id}/filmsFavoris")
    public ResponseEntity<List<FilmDTO>> getFilmsFavorisByUtilisateurId(@PathVariable long id) throws ControllerException {
        try{
            List<FilmDTO> filmsFavoris = myFilmsService.findFilmsFavorisByUtilisateurId(id);
            return ResponseEntity.status(HttpStatus.OK).body(filmsFavoris);
        } catch (Exception e) {
            throw new ControllerException(e);
        }
    }

    @PostMapping("/{id}/filmsFavoris")
    public ResponseEntity<FilmDTO> addFilmFavorisForUtilisateurIdByFilmId(@PathVariable long id, long filmId) throws ControllerException {
        try{
            FilmDTO filmFavoris = myFilmsService.addFilmFavorisForUtilisateurIdByFilmId(id, filmId);
            return ResponseEntity.status(HttpStatus.OK).body(filmFavoris);
        } catch (ServiceException e) {
            throw new ControllerException(e);
        }
    }

    /**
     * Crée l'utilisateur avec les paramètres donnés et le renvoie avec son identifiant une fois créé.
     * Code http est 201
     * @param utilisateurForm le formulaire avec les paramètres de l'utilisateur
     * @return l'utilisateurDTO et son id créé
     * @throws ControllerException en cas d'erreur de traitement
     */
    @PostMapping
    public ResponseEntity<UtilisateurDTO> createUtilisateur(@Valid UtilisateurForm utilisateurForm) throws ControllerException {
        try{
            UtilisateurDTO utilisateur = myFilmsService.createUtilisateur(utilisateurForm);
            return ResponseEntity.status(HttpStatus.CREATED).body(utilisateur);
        } catch (ServiceException e) {
            throw new ControllerException(e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUtilisateur(long id) throws ControllerException {
        try {
            myFilmsService.deleteUtilisateur(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception e) {
            throw new ControllerException(e);
        }
    }

}
