package com.ensta.myfilmlist.dao.impl;

import com.ensta.myfilmlist.dao.UtilisateurDAO;
import com.ensta.myfilmlist.model.Utilisateur;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Optional;

@Repository
public class JdbcUtilisateurDAO implements UtilisateurDAO {
    @Autowired
    JdbcTemplate jdbcTemplate;

    // RowMapper for Utilisateur
    private final RowMapper<Utilisateur> utilisateurRowMapper = (resultSet, rowNum) -> {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setId(resultSet.getInt("id"));
        utilisateur.setNom(resultSet.getString("nom"));
        utilisateur.setPrenom(resultSet.getString("prenom"));
        return utilisateur;
    };

    @Override
    public List<Utilisateur> findAll(){
        String query = "SELECT id, nom, prenom FROM Utilisateur";
        try{
            return jdbcTemplate.query(query, utilisateurRowMapper);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    @Override
    public Utilisateur save(Utilisateur utilisateur){
        String query = "INSERT INTO Utilisateur (nom, prenom) VALUES (?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        PreparedStatementCreator creator = conn -> {
            PreparedStatement statement = conn.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, utilisateur.getNom());
            statement.setString(2, utilisateur.getPrenom());
            return statement;
        };

        jdbcTemplate.update(creator, keyHolder);
        utilisateur.setId(keyHolder.getKey().longValue());
        return utilisateur;
    }

    @Override
    public void delete(Utilisateur utilisateur){
        String query = "DELETE FROM Utilisateur WHERE id = ?";
        jdbcTemplate.update(query, utilisateur.getId());
    }

    @Override
    public Optional<Utilisateur> findById(long id) {
        String query = "SELECT id, nom, prenom FROM Utilisateur WHERE id = ?";
        try {
            Utilisateur utilisateur = jdbcTemplate.queryForObject(query, utilisateurRowMapper, id);
            return Optional.of(utilisateur);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty(); // Aucun résultat trouvé
        }
    }
}
