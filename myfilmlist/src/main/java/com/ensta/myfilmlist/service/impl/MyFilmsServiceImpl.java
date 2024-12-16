package com.ensta.myfilmlist.service.impl;

import com.ensta.myfilmlist.model.Film;
import com.ensta.myfilmlist.model.Realisateur;
import com.ensta.myfilmlist.service.MyFilmsService;
import com.ensta.myfilmlist.service.ServiceException;
import java.util.OptionalDouble;
import java.util.stream.IntStream;
import java.util.stream.Stream;
import java.util.Arrays;
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

        boolean estCelebre = realisateur.getFilmRealises().size() >= NB_FILMS_MIN_REALISATEUR_CELEBRE;
        realisateur.setCelebre(estCelebre);

        return realisateur;
    }

    @Override
    public long calculerDureeTotale(List<Film> films) throws ServiceException {
        if (films == null) {
            throw new ServiceException("La liste de film ne peut pas être null.");
        }

        return films.stream()
                .mapToInt(Film::getDuree)
                .sum();
    }
    @Override
    public double calculerNoteMoyenne(double[] notes) {
        if (notes == null || notes.length == 0) {
            return 0;
        }

        OptionalDouble moyenneOptional = Arrays.stream(notes).average();
        return moyenneOptional.isPresent() ? Math.round(moyenneOptional.getAsDouble() * 100.0) / 100.0 : 0;
    }
}
