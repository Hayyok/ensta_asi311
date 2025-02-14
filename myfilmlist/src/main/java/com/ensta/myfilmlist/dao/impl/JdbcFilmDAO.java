package com.ensta.myfilmlist.dao.impl;

import com.ensta.myfilmlist.dao.FilmDAO;
import com.ensta.myfilmlist.model.Film;
import com.ensta.myfilmlist.model.Realisateur;
import com.ensta.myfilmlist.persistence.ConnectionManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Optional;

@Repository
public class JdbcFilmDAO implements FilmDAO {
    //private JdbcTemplate jdbcTemplate = ConnectionManager.getJdbcTemplate();
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Film> findAll() {
        String query = "SELECT id, titre, duree, realisateur_id, note, nb_note FROM Film";

        RowMapper<Film> rowMapper = (resultSet, rowNum) -> {
            Film film = new Film();
            film.setId(resultSet.getInt("id"));
            film.setTitre(resultSet.getString("titre"));
            film.setDuree(resultSet.getInt("duree"));
            film.setRealisateurId(resultSet.getInt("realisateur_id"));
            film.setNote(resultSet.getFloat("note"));
            film.setNb_note(resultSet.getInt("nb_note"));

            return film;
        };
        try {
            return jdbcTemplate.query(query, rowMapper);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public Film save(Film film) {
        String CREATE_FILM_QUERY = "INSERT INTO Film (titre, duree, realisateur_id) VALUES (?, ?, ?)";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        PreparedStatementCreator creator = conn -> {
            PreparedStatement statement = conn.prepareStatement(CREATE_FILM_QUERY, Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, film.getTitre());
            statement.setInt(2, film.getDuree());
            statement.setLong(3, film.getRealisateurId());
            return statement;
        };

        jdbcTemplate.update(creator, keyHolder);
        film.setId(keyHolder.getKey().longValue());

        return film;
    }

    public Optional<Film> findById(long id){
        String query = "SELECT id, titre, duree, realisateur_id, note, nb_note FROM Film WHERE id = ?";
        RowMapper<Film> filmRowMapper = (resultSet, rowNum) -> {
            Film film = new Film();
            film.setId(resultSet.getInt("id"));
            film.setTitre(resultSet.getString("titre"));
            film.setDuree(resultSet.getInt("duree"));
            film.setRealisateurId(resultSet.getInt("realisateur_id"));
            film.setNote(resultSet.getFloat("note"));
            film.setNb_note(resultSet.getInt("nb_note"));

            return film;
        };
        try {
            Film film = jdbcTemplate.queryForObject(query, filmRowMapper, id);
            return Optional.of(film);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty(); // Aucun résultat trouvé
        }
    }

    public void delete(Film film){
        String query="DELETE FROM Film WHERE id = ?";
        jdbcTemplate.update(query, film.getId());
    }

    public List<Film> findByRealisateurId(long realisateurId){
        String query = "SELECT * FROM Film WHERE realisateur_id = ?";
        RowMapper<Film> rowMapper = (resultSet, rowNum) -> {
            Film film = new Film();
            film.setId(resultSet.getInt("id"));
            film.setTitre(resultSet.getString("titre"));
            film.setDuree(resultSet.getInt("duree"));
            film.setRealisateurId(resultSet.getInt("realisateur_id"));
            film.setNote(resultSet.getFloat("note"));
            film.setNb_note(resultSet.getInt("nb_note"));

            return film;
        };
        try {
            return jdbcTemplate.query(query, rowMapper, realisateurId);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    @Override
    public Film edit(long id, Film editedFilm) {
        String query = "UPDATE Film SET titre = ?, duree = ?, realisateur_id = ?, note = ?, nb_note = ? WHERE id = ?";
        jdbcTemplate.update(query,
                editedFilm.getTitre(),
                editedFilm.getDuree(),
                editedFilm.getRealisateurId(),
                editedFilm.getNote(),
                editedFilm.getNb_note(),
                id);
        Film film = new Film();
        film.setId(id);
        film.setTitre(editedFilm.getTitre());
        film.setDuree(editedFilm.getDuree());
        film.setRealisateurId(editedFilm.getRealisateurId());
        film.setNote(editedFilm.getNote());
        film.setNb_note(editedFilm.getNb_note());
        return film;
    }
}