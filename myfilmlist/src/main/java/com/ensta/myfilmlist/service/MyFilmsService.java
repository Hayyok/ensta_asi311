package com.ensta.myfilmlist.service;
import com.ensta.myfilmlist.dto.FilmDTO;
import com.ensta.myfilmlist.dto.RealisateurDTO;
import com.ensta.myfilmlist.form.FilmForm;
import com.ensta.myfilmlist.model.Realisateur;
import com.ensta.myfilmlist.model.Film;

import java.util.ArrayList;
import java.util.List;

/**
 * Interface pour les services liés à la gestion des films et réalisateurs.
 */
public interface MyFilmsService {
    static final int NB_FILMS_MIN_REALISATEUR_CELEBRE = 3;

    /**
     * Met à jour l'attribut celebre d'un Realisateur
     * @param realisateur le realisateur
     * @return Le Realisateur avec l'attribut celebre mis à jour
     * @throws ServiceException si le realisateur ou la liste de ses FilmRealises est null
     */
    static Realisateur updateRealisateurCelebre(Realisateur realisateur) throws ServiceException {
        if (realisateur == null) {
            throw new ServiceException("Le réalisateur ne peut pas être null.");
        }

        if (realisateur.getFilmRealises() == null) {
            throw new ServiceException("La liste des films réalisés ne peut pas être null.");
        }

        // Mise à jour du statut celebre
        boolean estCelebre = realisateur.getFilmRealises().size() >= NB_FILMS_MIN_REALISATEUR_CELEBRE;
        realisateur.setCelebre(estCelebre);

        return realisateur;
    }

    /**
     * Met à jour l'attribut celebre d'une liste de realisateur et renvoie uniquement la liste des realisateur qui sont celebre
     * @param realisateurs la liste de realisateur
     * @return la liste des realisateur qui sont celebres
     * @throws ServiceException si la liste est nulle ou si un des realisateurs de la liste est nul
     */
    static List<Realisateur> updateRealisateurCelebres(List<Realisateur> realisateurs) throws ServiceException {
        if (realisateurs == null) {
            throw new ServiceException("La liste de Realisateur doit être non nulle");
        }
        for (Realisateur realisateur : realisateurs) {
            if (realisateur == null) {
                throw new ServiceException("Les Realisateurs de la liste doivent être non nuls");
            }
        }
        List<Realisateur> realisateursCelebres = new ArrayList<>();
        for (Realisateur realisateur : realisateurs) {
            realisateur = updateRealisateurCelebre(realisateur);
            if (realisateur.isCelebre()) {
                realisateursCelebres.add(realisateur);
            }
        }
        return realisateursCelebres;
    }

    public long calculerDureeTotale(List<Film> films) throws ServiceException;

    public double calculerNoteMoyenne(double[] notes);

    public List<FilmDTO> findAllFilms() throws ServiceException ;

    public FilmDTO createFilm(FilmForm filmForm) throws ServiceException;

    public List<RealisateurDTO> findAllRealisateurs () throws ServiceException;

    public RealisateurDTO findRealisateurByNomAndPrenom(String nom, String prenom) throws ServiceException;
}