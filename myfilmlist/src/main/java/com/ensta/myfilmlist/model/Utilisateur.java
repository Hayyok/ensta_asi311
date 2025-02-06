package com.ensta.myfilmlist.model;

import java.util.List;

public class Utilisateur {
    private long id;
    private String nom;
    private String prenom;
    private List<Film> filmsFavoris;

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

    public List<Film> getFilmsFavoris() { return filmsFavoris; }
    public void setFilmsFavoris(List<Film> filmsFavoris) { this.filmsFavoris = filmsFavoris; }
}
