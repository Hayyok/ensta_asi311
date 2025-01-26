package com.ensta.myfilmlist.controller.impl;

import com.ensta.myfilmlist.controller.FilmResource;
import com.ensta.myfilmlist.dto.FilmDTO;
import com.ensta.myfilmlist.exception.ControllerException;
import com.ensta.myfilmlist.form.FilmForm;
import com.ensta.myfilmlist.service.MyFilmsService;
import com.ensta.myfilmlist.service.ServiceException;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import java.util.List;

@RestController
@RequestMapping("/film")
@Validated
public class FilmResourceImpl implements FilmResource {
    @Autowired
    private MyFilmsService myFilmsService;

    /**
     * Renvoie la liste non nulle de tous les films disponibles ainsi que leur Realisateur associé
     * @return la liste non nulle des films et leur réalisateur associé
     * @throws ControllerException en cas d'erreur de traitement
     */
    @GetMapping
    public ResponseEntity<List<FilmDTO>> getAllFilms() throws ControllerException {
        try{
            return ResponseEntity.status(HttpStatus.OK).body(myFilmsService.findAllFilms());
        } catch (Exception e) {
            throw new ControllerException(e);
        }
    }

    /**
     * Renvoie le film ayant l'identifiant donné ou une erreur 404 si la ressource n'a pas été trouvé
     * @param id l'identifiant du film à trouver
     * @return le FilmDTO correspondant à l'identifiant ou une erreur 404 si pas de film trouvé
     * @throws ControllerException en cas d'erreur de traitement
     */
    @GetMapping("/{id}")
    public ResponseEntity<FilmDTO> getFilmById(@PathVariable long id) throws ControllerException {
        try{
            FilmDTO film = myFilmsService.findFilmById(id);
            return ResponseEntity.status(HttpStatus.OK).body(film);
        } catch (ServiceException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            throw new ControllerException(e);
        }
    }

    /**
     * Crée le film avec les paramètres donnés et le renvoie avec son identifiant une fois crée.
     * Code http est 201
     * @param filmForm le formulaire avec les paramètres du film
     * @return le filmDTO et son id créé
     * @throws ControllerException en cas d'erreur de traitement
     */
    @PostMapping
    public ResponseEntity<FilmDTO> createFilm(@RequestBody FilmForm filmForm) throws ControllerException {
        try{
            FilmDTO film = myFilmsService.createFilm(filmForm);
            return ResponseEntity.status(HttpStatus.CREATED).body(film);
        } catch (ServiceException e) {
            throw new ControllerException(e);
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteFilm(@PathVariable long id) throws ControllerException {
        try {
            myFilmsService.deleteFilm(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception e) {
            throw new ControllerException(e);
        }
    }

}
