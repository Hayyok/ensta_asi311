package com.ensta.myfilmlist.model;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

/**
 * Represente un Realisateur.
 */
//@Entity
//@Table(name = "réalisateur")
public class Realisateur {
    //@Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String nom;
    private String prenom;
    private LocalDate dateNaissance;

    //@OneToMany(mappedBy = "realisateur")
    private List<Film> filmRealises;

    private boolean celebre;

    // Getters et Setters
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }
    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }
    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public LocalDate getDateNaissance() {
        return dateNaissance;
    }
    public void setDateNaissance(LocalDate dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public List<Film> getFilmRealises() {
        return filmRealises;
    }
    public void setFilmRealises(List<Film> filmRealises) {
        this.filmRealises = filmRealises;
    }

    public boolean isCelebre() {
        return celebre;
    }
    public void setCelebre(boolean celebre) {
        this.celebre = celebre;
    }
}
