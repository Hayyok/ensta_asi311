package com.ensta.myfilmlist.dao.impl;

import com.ensta.myfilmlist.dao.FilmDAO;
import com.ensta.myfilmlist.model.Film;
import com.ensta.myfilmlist.model.Realisateur;
import com.ensta.myfilmlist.persistence.ConnectionManager;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

public class JdbcFilmDAO implements FilmDAO {
    private JdbcTemplate jdbcTemplate = ConnectionManager.getJdbcTemplate();

    @Override
    public List<Film> findAll() {
        String query = "SELECT id, titre, duree FROM Film";

        RowMapper<Film> rowMapper = (resultSet, rowNum) -> {
            Film film = new Film();
            film.setId(resultSet.getInt("id"));
            film.setTitre(resultSet.getString("titre"));
            film.setDuree(resultSet.getInt("duree"));
            return film;
        };

        return jdbcTemplate.query(query, rowMapper);
    }

    public Film save(Film film) {
        String CREATE_FILM_QUERY = "INSERT INTO Film (id, titre, duree, realisateur_id) VALUES (?, ?, ?)";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        PreparedStatementCreator creator = conn -> {
            PreparedStatement statement = conn.prepareStatement(CREATE_FILM_QUERY, Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, film.getTitre());
            statement.setInt(2, film.getDuree());
            statement.setLong(3, film.getRealisateur().getId());
            return statement;
        };

        jdbcTemplate.update(creator, keyHolder);
        film.setId(keyHolder.getKey().longValue());

        return film;
    }
}