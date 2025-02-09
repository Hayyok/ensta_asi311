package com.ensta.myfilmlist.dto;

import java.util.List;

public class UtilisateurDTO {
    private long id;
    private String username;
    private String password;
    private String role;
    private List<Long> filmsFavorisId;

    // Getters et Setters
    public void setId(long id) { this.id = id; }
    public long getId() { return id; }

    public void setUsername(String username) { this.username = username; }
    public String getUsername() { return username; }

    public void setPassword(String password) { this.password = password; }
    public String getPassword() { return password; }

    public void setRole(String role) { this.role = role; }
    public String getRole() { return role; }

    public void setFilmsFavorisId(List<Long> filmsFavorisId) { this.filmsFavorisId = filmsFavorisId; }
    public List<Long> getFilmsFavorisId() { return filmsFavorisId; }
}
