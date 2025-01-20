package com.ensta.myfilmlist.dao.impl;

import com.ensta.myfilmlist.dao.RealisateurDAO;
import com.ensta.myfilmlist.model.Realisateur;
import com.ensta.myfilmlist.persistence.ConnectionManager;
import com.ensta.myfilmlist.service.ServiceException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import com.ensta.myfilmlist.model.Film;
import com.ensta.myfilmlist.model.Realisateur;
import com.ensta.myfilmlist.service.MyFilmsService;

import java.util.List;
import java.util.Optional;

public class JdbcRealisateurDAO implements RealisateurDAO {
    static final int NB_FILMS_MIN_REALISATEUR_CELEBRE = 3;
    private JdbcTemplate jdbcTemplate = ConnectionManager.getJdbcTemplate();

    // RowMapper for Realisateur
    private final RowMapper<Realisateur> realisateurRowMapper = (resultSet, rowNum) -> {
        Realisateur realisateur = new Realisateur();
        realisateur.setId(resultSet.getLong("id"));
        realisateur.setNom(resultSet.getString("nom"));
        realisateur.setPrenom(resultSet.getString("prenom"));
        realisateur.setDateNaissance(resultSet.getDate("date_naissance").toLocalDate());
        realisateur.setCelebre(resultSet.getBoolean("celebre"));

        List<Film> films = findFilmsByRealisateurId(realisateur.getId());
        realisateur.setFilmRealises(films);
        return realisateur;
    };

    private List<Film> findFilmsByRealisateurId(long realisateurId) {
        String query = "SELECT f.id, f.titre, f.duree FROM Film f WHERE f.realisateur_id = ?";
        RowMapper<Film> filmRowMapper = (resultSet, rowNum) -> {
            Film film = new Film();
            film.setId(resultSet.getInt("id"));
            film.setTitre(resultSet.getString("titre"));
            film.setDuree(resultSet.getInt("duree"));
            return film;
        };
        try {
            return jdbcTemplate.query(query, filmRowMapper, realisateurId);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    @Override
    public List<Realisateur> findAll() {
        String query = "SELECT id, nom, prenom, date_naissance, celebre FROM Realisateur";
        try {
            return jdbcTemplate.query(query, realisateurRowMapper);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    @Override
    public Realisateur findByNomAndPrenom(String nom, String prenom) {
        String query = "SELECT id, nom, prenom, date_naissance, celebre FROM Realisateur WHERE nom = ? AND prenom = ?";
        try {
            return jdbcTemplate.queryForObject(query, realisateurRowMapper, nom, prenom);
        } catch (EmptyResultDataAccessException e) {
            return null; // Aucun résultat trouvé
        }
    }

    @Override
    public Optional<Realisateur> findById(long id) {
        String query = "SELECT id, nom, prenom, date_naissance, celebre FROM Realisateur WHERE id = ?";
        try {
            Realisateur realisateur = jdbcTemplate.queryForObject(query, realisateurRowMapper, id);
            return Optional.of(realisateur);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty(); // Aucun résultat trouvé
        }
    }

    public Realisateur update(Realisateur realisateur){

        String query = "UPDATE Realisateur SET nom = ?, prenom = ?, date_naissance = ?, celebre = ? WHERE id = ?";
        jdbcTemplate.update(query,
                realisateur.getNom(),
                realisateur.getPrenom(),
                java.sql.Date.valueOf(realisateur.getDateNaissance()),
                realisateur.isCelebre(),
                realisateur.getId()
        );
        return realisateur;
    }
}