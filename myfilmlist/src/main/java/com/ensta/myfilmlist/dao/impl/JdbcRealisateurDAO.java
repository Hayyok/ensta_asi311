package com.ensta.myfilmlist.dao.impl;

import com.ensta.myfilmlist.dao.RealisateurDAO;
import com.ensta.myfilmlist.model.Realisateur;
import com.ensta.myfilmlist.persistence.ConnectionManager;
import com.ensta.myfilmlist.service.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.RowMapper;

import com.ensta.myfilmlist.model.Film;
import com.ensta.myfilmlist.model.Realisateur;
import com.ensta.myfilmlist.service.MyFilmsService;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Optional;

@Repository
public class JdbcRealisateurDAO implements RealisateurDAO {
    static final int NB_FILMS_MIN_REALISATEUR_CELEBRE = 3;
    //private JdbcTemplate jdbcTemplate = ConnectionManager.getJdbcTemplate();
    @Autowired
    JdbcTemplate jdbcTemplate;

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

    @Override
    public List<Film> findFilmsByRealisateurId(long realisateurId) {
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

    public Realisateur save(Realisateur realisateur) {
        String CREATE_REALISATEUR_QUERY = "INSERT INTO Realisateur (nom, prenom, date_naissance) VALUES (?, ?, ?)";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        PreparedStatementCreator creator = conn -> {
            PreparedStatement statement = conn.prepareStatement(CREATE_REALISATEUR_QUERY, Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, realisateur.getNom());
            statement.setString(2, realisateur.getPrenom());
            statement.setDate(3, Date.valueOf(realisateur.getDateNaissance()));
            return statement;
        };

        jdbcTemplate.update(creator, keyHolder);
        realisateur.setId(keyHolder.getKey().longValue());

        return realisateur;
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

    @Override
    public void delete(Realisateur realisateur) {
        String query="DELETE FROM Realisateur WHERE id = ?";
        jdbcTemplate.update(query, realisateur.getId());
    }
}