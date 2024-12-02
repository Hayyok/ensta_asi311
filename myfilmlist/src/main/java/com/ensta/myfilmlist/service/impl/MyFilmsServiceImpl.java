package com.ensta.myfilmlist.service.impl;

import com.ensta.myfilmlist.exception.ServiceException;
import com.ensta.myfilmlist.model.Film;
import com.ensta.myfilmlist.model.Realisateur;
import com.ensta.myfilmlist.service.MyFilmsService;

import java.util.List;

public class MyFilmsServiceImpl implements MyFilmsService {
    @Override
    public void MyFilmsService(){

    }

    public static final int NB_FILMS_MIN_REALISATEUR_CELEBRE = 3;
    public Realisateur updateRealisateurCelebre(Realisateur realisateur) throws ServiceException {
        List<Film> Filmrealises =realisateur.getFilmRealises();
        if (Filmrealises.isEmpty()) {
            throw new ServiceException("La liste de film du réalisateur est vide");
        }
        if (Filmrealises.size() > 2) {
            realisateur.setCelebre(true);
        } else {
            realisateur.setCelebre(false);
        }
        return realisateur;
    }
}
