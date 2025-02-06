/*package com.ensta.myfilmlist;


import com.ensta.myfilmlist.dao.impl.JdbcFilmDAO;
import com.ensta.myfilmlist.form.FilmForm;
import com.ensta.myfilmlist.mapper.FilmMapper;
import com.ensta.myfilmlist.model.Film;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.JdbcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;


import java.util.List;
import java.util.Optional;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;


@SpringBootTest
@ActiveProfiles("test")
@Sql(scripts = "/clean_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(scripts = "/data_test.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
public class MyFilmsDaoTests {


    @Autowired
    private JdbcFilmDAO filmDAO;


    @Test
    public void testFindById() {
        Optional<Film> film = filmDAO.findById(1);
        assertTrue(film.isPresent());
        assertEquals("avatar", film.get().getTitre());
        assertEquals(162, film.get().getDuree());
    }


    @Test
    public void testFindByRealisateurId() {
        List<Film> films = filmDAO.findByRealisateurId(2);
        assertEquals(3, films.size());
    }


    @Test
    public void testFindNbFilmsByRealisateurId() {
        List<Film> films = filmDAO.findByRealisateurId(2);
        assertEquals(3, films.size());
    }


    @Test
    public void testFindAll() {
        List<Film> films = filmDAO.findAll();
        assertEquals(4, films.size());
    }


    @Test
    public void testSave() {
        Film newFilm = new Film();
        newFilm.setTitre("Titanic");
        newFilm.setDuree(195);
        newFilm.setRealisateurId(1);
        filmDAO.save(newFilm);

        List<Film> films = filmDAO.findAll();
        assertEquals(5, films.size());
    }


    @Test
    public void testUpdate() {
        Film updatedFilm = new Film();
        updatedFilm.setTitre("Avatar Remastered");
        updatedFilm.setDuree(170);
        updatedFilm.setRealisateurId(1);
        filmDAO.save(updatedFilm);


        Optional<Film> film = filmDAO.findById(1);
        assertTrue(film.isPresent());
        assertEquals("Avatar Remastered", film.get().getTitre());
        assertEquals(170, film.get().getDuree());
    }


    @Test
    public void testDeleteById() {
        filmDAO.delete(filmDAO.findById(1).get());


        List<Film> films = filmDAO.findAll();
        assertEquals(3, films.size());
    }
}
*/
