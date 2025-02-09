package com.ensta.myfilmlist.dto;

/**
 * Contient les donnees d'un Film.
 */
public class FilmDTO {

	private long id;
	private String titre;
	private int duree;
	private long realisateurDTOId;
	private float note;
	private int nb_note;


	public long getRealisateurDTOId() { return realisateurDTOId; }
	public void setRealisateurDTOId(long realisateurDTOId) { this.realisateurDTOId = realisateurDTOId; }

	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}

	public String getTitre() {
		return titre;
	}
	public void setTitre(String titre) {
		this.titre = titre;
	}

	public int getDuree() {
		return duree;
	}
	public void setDuree(int duree) {
		this.duree = duree;
	}

	public float getNote() {return note;}
	public void setNote(float note) {this.note = note;}

	public int getNb_note() {return nb_note;}
	public void setNb_note(int nb_note) {this.nb_note = nb_note;}

	@Override
	public String toString() {
		return "FilmDTO [id=" + id + ", titre=" + titre + ", duree=" + duree + "]";
	}

}
