package com.ensta.myfilmlist.service.impl;

import com.ensta.myfilmlist.model.Film;
import com.ensta.myfilmlist.model.Realisateur;
import com.ensta.myfilmlist.service.MyFilmsService;
import com.ensta.myfilmlist.service.ServiceException;

import java.util.List;

public class MyFilmsServiceImpl implements MyFilmsService {
    private static final int NB_FILMS_MIN_REALISATEUR_CELEBRE = 3;


    public Realisateur updateRealisateurCelebre(Realisateur realisateur) throws ServiceException {
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
    public long calculerDureeTotale(List<Film> films) throws ServiceException{
        if (films == null) {
            throw new ServiceException("La liste de film ne peut pas être null.");
        }
        int dureeTotale = 0;
        for (Film film : films) {
            if (film.getDuree() > 0) {
                dureeTotale += film.getDuree();
            }
            else {
                throw new ServiceException("Un film est null");
            }
        }
        return dureeTotale;
    }
    public double calculerNoteMoyenne(double[] notes) {
        if (notes == null || notes.length == 0) {
            return 0;
        }

        double somme = 0;
        for (double note : notes) {
            somme += note;
        }

        double moyenne = somme / notes.length;
        return Math.round(moyenne * 100.0) / 100.0; // Arrondi à 2 chiffres après la virgule
    }

}
