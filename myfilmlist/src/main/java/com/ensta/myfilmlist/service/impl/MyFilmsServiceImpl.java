package com.ensta.myfilmlist.service.impl;

import com.ensta.myfilmlist.dao.FilmDAO;
import com.ensta.myfilmlist.dao.RealisateurDAO;
import com.ensta.myfilmlist.dao.UtilisateurDAO;
import com.ensta.myfilmlist.dto.FilmDTO;
import com.ensta.myfilmlist.dto.RealisateurDTO;
import com.ensta.myfilmlist.dto.UtilisateurDTO;
import com.ensta.myfilmlist.form.FilmForm;
import com.ensta.myfilmlist.form.RealisateurForm;
import com.ensta.myfilmlist.form.UtilisateurForm;
import com.ensta.myfilmlist.model.Film;
import com.ensta.myfilmlist.model.Realisateur;
import com.ensta.myfilmlist.model.Utilisateur;
import com.ensta.myfilmlist.service.MyFilmsService;
import com.ensta.myfilmlist.service.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

import static com.ensta.myfilmlist.mapper.FilmMapper.*;
import static com.ensta.myfilmlist.mapper.RealisateurMapper.*;
import static com.ensta.myfilmlist.mapper.UtilisateurMapper.*;

@Service
public class MyFilmsServiceImpl implements MyFilmsService {
    private static final int NB_FILMS_MIN_REALISATEUR_CELEBRE = 3;
    //private final FilmDAO filmDAO = new JdbcFilmDAO();
    //private final RealisateurDAO realisateurDAO = new JdbcRealisateurDAO();
    @Autowired
    private FilmDAO filmDAO;

    @Autowired
    private RealisateurDAO realisateurDAO;

    @Autowired
    private UtilisateurDAO utilisateurDAO;

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
    @Transactional
    public FilmDTO createFilm(FilmForm filmForm) throws ServiceException {
        try {
            Film newFilm = convertFilmFormToFilm(filmForm);
            Optional<Realisateur> realisateurOpt = realisateurDAO.findById(newFilm.getRealisateurId());
            if (realisateurOpt.isEmpty()) {
                throw new ServiceException("Le realisateur n'existe pas");
            }

            newFilm = filmDAO.save(newFilm);

            Realisateur realisateur = realisateurOpt.get();
            List<Film> filmRealises = filmDAO.findByRealisateurId(realisateur.getId());
            realisateur.setFilmRealises(filmRealises);
            realisateur=MyFilmsService.updateRealisateurCelebre(realisateur);
            realisateurDAO.update(realisateur);

            return convertFilmToFilmDTO(newFilm);
        } catch (Exception e) {
            throw new ServiceException(e.getMessage());
        }
    }

    /**
     * création d'un réalisateur
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

    /**
     * création d'un utilisateur
     * @param utilisateurForm l'utilisateur à créer
     * @return l'utilisateurDTO correspondant à l'utilisateur créé avec l'utilisateurForm
     * @throws ServiceException
     */
    @Override
    public UtilisateurDTO createUtilisateur(UtilisateurForm utilisateurForm) throws ServiceException {
        try {
            Utilisateur newUtilisateur = convertUtilisateurFormToUtilisateur(utilisateurForm);
            newUtilisateur = utilisateurDAO.save(newUtilisateur);
            return convertUtilisateurToUtilisateurDTO(newUtilisateur);
        } catch (Exception e) {
            throw new ServiceException(e.getMessage());
        }    }


    /**
     * Renvoie la liste de tous les réalisateurs
     * @return la liste des realisateurDTOs
     * @throws ServiceException
     */
    @Override
    public List<RealisateurDTO> findAllRealisateurs () throws ServiceException {
        try {
            List<Realisateur> liste = realisateurDAO.findAll();
            return convertRealisateurToRealisateurDTOs(liste);
        } catch (Exception e) {
            throw new ServiceException(e.getMessage()) ;
        }
    }

    /**
     * Renvoie la liste de tous les utilisateurs
     * @return la liste des utilisateursDTOs
     * @throws ServiceException
     */
    @Override
    public List<UtilisateurDTO> findAllUtilisateurs() throws ServiceException{
        try {
            List<Utilisateur> liste = utilisateurDAO.findAll();
            return convertUtilisateurToUtilisateurDTOs(liste);
        } catch (Exception e) {
            throw new ServiceException(e.getMessage()) ;
        }
    }

    @Override
    public Optional<UtilisateurDTO> findUtilisateurDTOById(long id) {
        try {
            Utilisateur utilisateur = utilisateurDAO.findById(id).get();
            return Optional.of(convertUtilisateurToUtilisateurDTO(utilisateur));
        } catch (Exception e) {
            return Optional.empty();
        }
    }


    @Override
    public RealisateurDTO findRealisateurByNomAndPrenom(String nom, String prenom) throws ServiceException {
        try {
            Realisateur realisateur = realisateurDAO.findByNomAndPrenom(nom, prenom);
            return convertRealisateurToRealisateurDTO(realisateur);
        } catch (Exception e) {
            throw new ServiceException(e.getMessage());
        }
    }

    @Override
    public Optional<RealisateurDTO> findRealisateurDTOById(long id) throws ServiceException {
        try {
            Realisateur realisateur = realisateurDAO.findById(id).get();
            return Optional.of(convertRealisateurToRealisateurDTO(realisateur));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    @Override
    public FilmDTO findFilmById(long id) throws ServiceException {
        try{
            Film film = filmDAO.findById(id).get();
            return convertFilmToFilmDTO(film);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    @Transactional
    public void deleteFilm(long id) throws ServiceException {
        try {
            Optional<Film> filmOpt = filmDAO.findById(id);
            if (filmOpt.isEmpty()) {
                throw new ServiceException("Suppression d'un film : film introuvable pour cet identifiant");
            }
            Film film = filmOpt.get();
            Optional<Realisateur> realisateurOpt = realisateurDAO.findById(film.getRealisateurId());

            filmDAO.delete(film);
            if (realisateurOpt.isPresent()) {
                Realisateur realisateur = realisateurOpt.get();
                List<Film> filmRealises = filmDAO.findByRealisateurId(realisateur.getId());
                realisateur.setFilmRealises(filmRealises);
                realisateur = MyFilmsService.updateRealisateurCelebre(realisateur);
                realisateurDAO.update(realisateur);
            }

        } catch (Exception e) {
            throw new ServiceException(e.getMessage());
        }
    }

    @Override
    public void deleteRealisateur(long id) throws ServiceException {
        try {
            Optional<Realisateur> realisateurOpt = realisateurDAO.findById(id);
            if (realisateurOpt.isEmpty()) {
                throw new ServiceException("Suppression d'un réalisateur : réalisateur introuvable pour cet identifiant");
            }
            Realisateur realisateur = realisateurOpt.get();
            realisateurDAO.delete(realisateur);
        } catch (Exception e) {
            throw new ServiceException(e.getMessage());
        }
    }

    @Override
    public void deleteUtilisateur(long id) throws ServiceException {
        try {
            Optional<Utilisateur> utilisateurOpt = utilisateurDAO.findById(id);
            if (utilisateurOpt.isEmpty()) {
                throw new ServiceException("Suppression d'un utilisateur : utilisateur introuvable pour cet identifiant");
            }
            Utilisateur utilisateur = utilisateurOpt.get();
            utilisateurDAO.delete(utilisateur);
        } catch (Exception e) {
            throw new ServiceException(e.getMessage());
        }
    }

}
