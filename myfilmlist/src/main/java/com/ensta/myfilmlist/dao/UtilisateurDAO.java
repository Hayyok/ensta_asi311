package com.ensta.myfilmlist.dao;

import com.ensta.myfilmlist.model.Film;
import com.ensta.myfilmlist.model.Utilisateur;

import java.util.Dictionary;
import java.util.List;
import java.util.Optional;

public interface UtilisateurDAO {
    List<Utilisateur> findAll();

    Utilisateur save(Utilisateur utilisateur);

    void delete(Utilisateur utilisateur);

    Optional<Utilisateur> findById(long id);
}
