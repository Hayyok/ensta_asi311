package com.ensta.myfilmlist.service;
import com.ensta.myfilmlist.model.Realisateur;
import com.ensta.myfilmlist.model.Film;
import java.util.List;

/**
 * Interface pour les services liés à la gestion des films et réalisateurs.
 */
public interface MyFilmsService {
    static final int NB_FILMS_MIN_REALISATEUR_CELEBRE = 3;
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


    long calculerDureeTotale(List<Film> films) throws ServiceException;
    double calculerNoteMoyenne(double[] notes);
}