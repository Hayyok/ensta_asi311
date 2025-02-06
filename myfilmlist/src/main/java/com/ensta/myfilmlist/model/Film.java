package com.ensta.myfilmlist.model;

import com.ensta.myfilmlist.dto.RealisateurDTO;

import javax.persistence.*;

/**
 * Represente un Film.
 */
//@Entity
//@Table(name= "film")
public class Film {

	//@Id
	//@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	//@Column(name = "title")
	private String titre;

	private int duree;

	//@ManyToOne
	//@JoinColumn(nullable = false)
	private long realisateurId;

	// Getters et Setters
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

	public long getRealisateurId() {return realisateurId;}
	public void setRealisateurId(long realisateurId) {this.realisateurId = realisateurId;}

	public int getDuree() {
		return duree;
	}
	public void setDuree(int duree) {
		this.duree = duree;
	}


}
