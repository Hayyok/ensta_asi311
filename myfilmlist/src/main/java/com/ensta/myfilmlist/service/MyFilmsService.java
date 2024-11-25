package com.ensta.myfilmlist.service;

import com.ensta.myfilmlist.exception.ServiceException;
import com.ensta.myfilmlist.model.Realisateur;

public interface MyFilmsService {

    void MyFilmsService();

    /**
     *
     * @param realisateur
     * @return
     * @throws ServiceException
     */
    Realisateur updateRealisateurCelebre(Realisateur realisateur) throws ServiceException;


}
