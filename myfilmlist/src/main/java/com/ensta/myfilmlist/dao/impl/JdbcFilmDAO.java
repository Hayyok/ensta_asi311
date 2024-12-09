package com.ensta.myfilmlist.dao.impl;

import com.ensta.myfilmlist.dao.FilmDAO;
import com.ensta.myfilmlist.model.Film;
import com.ensta.myfilmlist.persistence.ConnectionManager;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class JdbcFilmDAO implements FilmDAO {
    private DataSource dataSource = ConnectionManager.getDataSource();

    @Override
    public List<Film> findAll() {
        List<Film> films = new ArrayList<>();
        String query = "SELECT id, titre, duree FROM Film";

        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(query);
             ResultSet resultSet = statement.executeQuery()) {

            while (resultSet.next()) {
                Film film = new Film();
                film.setId(resultSet.getInt("id"));
                film.setTitre(resultSet.getString("titre"));
                film.setDuree(resultSet.getInt("duree"));
                films.add(film);
            }
        } catch (SQLException e) {
            e.printStackTrace(); // Gérer ou enregistrer les exceptions comme approprié
        }

        return films;
    }
}
