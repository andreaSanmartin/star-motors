package com.develop.app.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class TblEjemplar {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idEjemplar;

	@Column(length = 20)
	private String ejmColor;

	private Integer ejmStock;

	@ManyToOne
	@JoinColumn(name = "idModelo", referencedColumnName = "idModelo")
    private TblModelo modelo;
	
	
}
