package com.ensta.myfilmlist.controller.impl;

import com.ensta.myfilmlist.controller.RealisateurResource;
import com.ensta.myfilmlist.dto.RealisateurDTO;
import com.ensta.myfilmlist.exception.ControllerException;
import com.ensta.myfilmlist.form.FilmForm;
import com.ensta.myfilmlist.form.RealisateurForm;
import com.ensta.myfilmlist.service.MyFilmsService;
import com.ensta.myfilmlist.service.ServiceException;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/realisateur")
@Validated
@CrossOrigin(origins = "http://localhost:3000/")
public class RealisateurResourceImpl implements RealisateurResource {
    @Autowired
    private MyFilmsService myFilmsService;

    /**
     * Renvoie la liste non nulle de tous les realisateurs
     * @return la liste non nulle des réalisateurs
     * @throws ControllerException en cas d'erreur de traitement
     */
    @GetMapping
    public ResponseEntity<List<RealisateurDTO>> getAllRealisateurs() throws ControllerException {
        try{
            return ResponseEntity.status(HttpStatus.OK).body(myFilmsService.findAllRealisateurs());
        } catch (Exception e) {
            throw new ControllerException(e);
        }
    }

    /**
     * Renvoie le realisateur ayant l'identifiant donné ou une erreur 404 si la ressource n'a pas été trouvée
     * @param id l'identifiant du realisateur à trouver
     * @return le RealisateurDTO correspondant à l'identifiant ou une erreur 404 si pas de realisateur trouvé
     * @throws ControllerException en cas d'erreur de traitement
     */
    @GetMapping("/{id}")
    public ResponseEntity<RealisateurDTO> getRealisateurById(@PathVariable long id) throws ControllerException {
        try{
            RealisateurDTO realisateurDTO = myFilmsService.findRealisateurDTOById(id).get();
            return ResponseEntity.status(HttpStatus.OK).body(realisateurDTO);
        } catch (ServiceException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            throw new ControllerException(e);
        }
    }


    /**
     * Crée le réalisateur avec les paramètres donnés et le renvoie avec son identifiant une fois créé.
     * Code http est 201
     * @param realisateurForm le formulaire avec les paramètres du realisateur
     * @return le realisateurDTO et son id créé
     * @throws ControllerException en cas d'erreur de traitement
     */
    @PostMapping
    public ResponseEntity<RealisateurDTO> createRealisateur(@RequestBody RealisateurForm realisateurForm) throws ControllerException {
        try{
            RealisateurDTO realisateur = myFilmsService.createRealisateur(realisateurForm);
            return ResponseEntity.status(HttpStatus.CREATED).body(realisateur);
        } catch (ServiceException e) {
            throw new ControllerException(e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRealisateur(@PathVariable long id) throws ControllerException {
        try {
            myFilmsService.deleteRealisateur(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception e) {
            throw new ControllerException(e);
        }
    }
}