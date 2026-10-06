package com.develop.app.model;

import javax.persistence.*;

import lombok.Data;

@Data
@Entity
public class TblRespuestos {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idRepuesto;

	private Double repPrecio;

	@Column(length = 100)
	private String repNombre;

	@ManyToOne
	@JoinColumn(name = "idMarca", referencedColumnName = "idMarca")
	private TblMarca marca;
}
