package com.ensta.myfilmlist.service.impl;

import com.ensta.myfilmlist.dao.FilmDAO;
import com.ensta.myfilmlist.dao.RealisateurDAO;
import com.ensta.myfilmlist.dto.FilmDTO;
import com.ensta.myfilmlist.dto.RealisateurDTO;
import com.ensta.myfilmlist.form.FilmForm;
import com.ensta.myfilmlist.form.RealisateurForm;
import com.ensta.myfilmlist.model.Film;
import com.ensta.myfilmlist.model.Realisateur;
import com.ensta.myfilmlist.service.MyFilmsService;
import com.ensta.myfilmlist.service.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

import static com.ensta.myfilmlist.mapper.FilmMapper.*;
import static com.ensta.myfilmlist.mapper.RealisateurMapper.*;

@Service
public class MyFilmsServiceImpl implements MyFilmsService {
    private static final int NB_FILMS_MIN_REALISATEUR_CELEBRE = 3;
    //private final FilmDAO filmDAO = new JdbcFilmDAO();
    //private final RealisateurDAO realisateurDAO = new JdbcRealisateurDAO();
    @Autowired
    private FilmDAO filmDAO;

    @Autowired
    private RealisateurDAO realisateurDAO;

    /**
     * Calcule la somme des durées d'une liste de films
     * @param films la liste de films dont on veut connaître la durée
     * @return la durée totale d'une liste de films
     * @throws ServiceException si la liste de films donnée en paramètre est null
     */
    @Override
    public long calculerDureeTotale(List<Film> films) throws ServiceException {
        if (films == null) {
            throw new ServiceException("La liste de film ne peut pas être null.");
        }

        return films.stream()
                .mapToInt(Film::getDuree)
                .sum();
    }

    /**
     * Calcule la moyenne d'une liste de notes
     * @param notes la liste de notes
     * @return la moyenne des notes
     */
    @Override
    public double calculerNoteMoyenne(double[] notes) {
        if (notes == null || notes.length == 0) {
            return 0;
        }

        OptionalDouble moyenneOptional = Arrays.stream(notes).average();
        return moyenneOptional.isPresent() ? Math.round(moyenneOptional.getAsDouble() * 100.0) / 100.0 : 0;
    }

    /**
     * Récupère l'ensemble des films
     * @return une liste de l'ensemble des films DTO
     * @throws ServiceException en cas d'erreur
     */
    @Override
    public List<FilmDTO> findAllFilms() throws ServiceException {
        try {
            List<Film> liste = filmDAO.findAll();
            return convertFilmToFilmDTOs(liste);
        } catch (Exception e) {
            throw new ServiceException(e.getMessage());
        }
    }

    /**
     * création d'un film si il est bien rattaché à un réalisateur existant
     * @param filmForm le film à créer
     * @return le FilmDTO correspondant au film créé avec l'id du FilmForm
     * @throws ServiceException
     */
    @Override
    public FilmDTO createFilm(FilmForm filmForm) throws ServiceException {
        try {
            Film newFilm = convertFilmFormToFilm(filmForm);
            Optional<Realisateur> realisateurOpt = realisateurDAO.findById(newFilm.getRealisateurId());
            if (realisateurOpt.isEmpty()) {
                throw new ServiceException("Le realisateur n'existe pas");
            }
            newFilm = filmDAO.save(newFilm);
            if (realisateurOpt.isPresent()) {
                Realisateur realisateur = realisateurOpt.get();
                List<Film> filmRealises = filmDAO.findByRealisateurId(realisateur.getId());
                realisateur.setFilmRealises(filmRealises);
                realisateur=MyFilmsService.updateRealisateurCelebre(realisateur);
                realisateurDAO.update(realisateur);
            }
            return convertFilmToFilmDTO(newFilm);
        } catch (Exception e) {
            throw new ServiceException(e.getMessage());
        }
    }

    /**
     * Renvoie la liste de tous les réalisateurs
     * @return la liste des realisateurDTOs
     * @throws ServiceException
     */
    public List<RealisateurDTO> findAllRealisateurs () throws ServiceException {
        try {
            List<Realisateur> liste = realisateurDAO.findAll();
            return convertRealisateurToRealisateurDTOs(liste);
        } catch (Exception e) {
            throw new ServiceException(e.getMessage()) ;
        }
    }

    public RealisateurDTO findRealisateurByNomAndPrenom(String nom, String prenom) throws ServiceException {
        try {
            Realisateur realisateur = realisateurDAO.findByNomAndPrenom(nom, prenom);
            return convertRealisateurToRealisateurDTO(realisateur);
        } catch (Exception e) {
            throw new ServiceException(e.getMessage());
        }
    }

    public Optional<RealisateurDTO> findRealisateurDTOById(long id) throws ServiceException {
        try {
            Realisateur realisateur = realisateurDAO.findById(id).get();
            return Optional.of(convertRealisateurToRealisateurDTO(realisateur));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public FilmDTO findFilmById(long id) throws ServiceException {
        try{
            Film film = filmDAO.findById(id).get();
            return convertFilmToFilmDTO(film);
        } catch (Exception e) {
            return null;
        }
    }

    public void deleteFilm(long id) throws ServiceException {
        try{
            Optional<Film> filmOpt = filmDAO.findById(id);
            if (filmOpt.isEmpty()){
                throw new ServiceException("Suppression d'un film : film introuvable pour cet identifiant");
            }
            Film film = filmOpt.get();
            Optional<Realisateur> realisateurOpt = realisateurDAO.findById(film.getRealisateurId());

            filmDAO.delete(film);
            if (realisateurOpt.isPresent()) {
                Realisateur realisateur = realisateurOpt.get();
                List<Film> filmRealises = filmDAO.findByRealisateurId(realisateur.getId());
                realisateur.setFilmRealises(filmRealises);
                realisateur=MyFilmsService.updateRealisateurCelebre(realisateur);
                realisateurDAO.update(realisateur);
            }

        } catch (Exception e) {
            throw new ServiceException(e.getMessage());
        }
    }

    /**
     * création d'un rélisateur
     * @param realisateurForm le réalisateur à créer
     * @return le RealisateurDTO correspondant au réalisateur créé avec l'id du RealisateurForm
     * @throws ServiceException
     */
    @Override
    public RealisateurDTO createRealisateur(RealisateurForm realisateurForm) throws ServiceException {
        try {
            Realisateur newRealisateur = convertRealisateurFormToRealisateur(realisateurForm);
            newRealisateur = realisateurDAO.save(newRealisateur);
            return convertRealisateurToRealisateurDTO(newRealisateur);
        } catch (Exception e) {
            throw new ServiceException(e.getMessage());
        }
    }


}
