package com.ensta.myfilmlist.service.impl;

import com.ensta.myfilmlist.dao.FilmDAO;
import com.ensta.myfilmlist.dao.RealisateurDAO;
import com.ensta.myfilmlist.dao.impl.JdbcFilmDAO;
import com.ensta.myfilmlist.dao.impl.JdbcRealisateurDAO;
import com.ensta.myfilmlist.dto.FilmDTO;
import com.ensta.myfilmlist.dto.RealisateurDTO;
import com.ensta.myfilmlist.form.FilmForm;
import com.ensta.myfilmlist.model.Film;
import com.ensta.myfilmlist.model.Realisateur;
import com.ensta.myfilmlist.service.MyFilmsService;
import com.ensta.myfilmlist.service.ServiceException;
import java.util.OptionalDouble;
import java.util.stream.IntStream;
import java.util.stream.Stream;
import java.util.Arrays;
import java.util.List;

import static com.ensta.myfilmlist.mapper.FilmMapper.*;
import static com.ensta.myfilmlist.mapper.RealisateurMapper.convertRealisateurToRealisateurDTO;
import static com.ensta.myfilmlist.mapper.RealisateurMapper.convertRealisateurToRealisateurDTOs;

public class MyFilmsServiceImpl implements MyFilmsService {
    private static final int NB_FILMS_MIN_REALISATEUR_CELEBRE = 3;
    private final FilmDAO filmDAO = new JdbcFilmDAO();
    private final RealisateurDAO realisateurDAO = new JdbcRealisateurDAO();

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

    public FilmDTO createFilm(FilmForm filmForm) throws ServiceException {
        try {
            return convertFilmToFilmDTO(convertFilmFormToFilm(filmForm));
        } catch (Exception e) {
            throw new ServiceException(e.getMessage());
        }
    }

    public List<RealisateurDTO> findAllRealisateurs () throws ServiceException {
        try {
            List<Realisateur> liste = realisateurDAO.findAll();
            return convertRealisateurToRealisateurDTOs(liste);
        } catch (Exception e) {
            throw new ServiceException(e.getMessage());
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
}
