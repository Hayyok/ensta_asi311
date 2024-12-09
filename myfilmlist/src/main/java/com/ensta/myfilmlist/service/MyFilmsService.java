package com.ensta.myfilmlist.service;

import com.ensta.myfilmlist.exception.ServiceException;
import com.ensta.myfilmlist.model.Film;
import com.ensta.myfilmlist.model.Realisateur;

import java.util.List;

public interface MyFilmsService {

    void MyFilmsService();

    /**
     *
     * @param realisateur
     * @return
     * @throws ServiceException
     */
    Realisateur updateRealisateurCelebre(Realisateur realisateur) throws ServiceException;

    /**
     *
     * @param Film
     * @return
     */
    int calculerDureeTotale(List<Film> Film);

    /**
     *
     * @param tab
     * @return
     */
    double calculerNoteMoyenne(double[] tab);
}
