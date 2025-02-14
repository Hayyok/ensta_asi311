package com.ensta.myfilmlist.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.ensta.myfilmlist.dto.FilmDTO;
import com.ensta.myfilmlist.form.FilmForm;
import com.ensta.myfilmlist.model.Film;

import static com.ensta.myfilmlist.mapper.RealisateurMapper.convertRealisateurDTOToRealisateur;
import static com.ensta.myfilmlist.mapper.RealisateurMapper.convertRealisateurToRealisateurDTO;

/**
 * Effectue les conversions des Films entre les couches de l'application.
 */
public class FilmMapper {

	/**
	 * Convertit une liste de films en liste de DTO.
	 * 
	 * @param films la liste des films
	 * @return Une liste non nulle de dtos construite a partir de la liste des films.
	 */
	public static List<FilmDTO> convertFilmToFilmDTOs(List<Film> films) {
		return films.stream()
				.map(FilmMapper::convertFilmToFilmDTO)
				.collect(Collectors.toList());
	}

	/**
	 * Convertit une liste de filmDTOs en liste de films.
	 *
	 * @param filmDTOs la liste des filmDTOs
	 * @return Une liste non nulle de films construite a partir de la liste des filmDTOs.
	 */
	public static List<Film> convertFilmDTOToFilms(List<FilmDTO> filmDTOs) {
		return filmDTOs.stream()
				.map(FilmMapper::convertFilmDTOToFilm)
				.collect(Collectors.toList());
	}

	/**
	 * Convertit un film en DTO.
	 * 
	 * @param film le film a convertir
	 * @return Un DTO construit a partir des donnees du film.
	 */
	public static FilmDTO convertFilmToFilmDTO(Film film) {
		FilmDTO filmDTO = new FilmDTO();
		filmDTO.setId(film.getId());
		filmDTO.setTitre(film.getTitre());
		filmDTO.setDuree(film.getDuree());
		filmDTO.setRealisateurDTOId(film.getRealisateurId());
		filmDTO.setNote(film.getNote());
		filmDTO.setNb_note(film.getNb_note());

		return filmDTO;
	}

	/**
	 * Convertit un DTO en film.
	 * 
	 * @param filmDTO le DTO a convertir
	 * @return Un Film construit a partir des donnes du DTO.
	 */
	public static Film convertFilmDTOToFilm(FilmDTO filmDTO) {
		Film film = new Film();
		film.setId(filmDTO.getId());
		film.setTitre(filmDTO.getTitre());
		film.setDuree(filmDTO.getDuree());
		film.setRealisateurId(filmDTO.getRealisateurDTOId());
		film.setNote(filmDTO.getNote());
		film.setNb_note(filmDTO.getNb_note());

		return film;
	}

	/**
	 * Convertit un Form en film.
	 * 
	 * @param filmForm le Form a convertir
	 * @return Un Film construit a partir des donnes du Form.
	 */
	public static Film convertFilmFormToFilm(FilmForm filmForm) {
		Film film = new Film();
		film.setTitre(filmForm.getTitre());
		film.setDuree(filmForm.getDuree());
		film.setRealisateurId(filmForm.getRealisateurId());


		return film;
	}
}
