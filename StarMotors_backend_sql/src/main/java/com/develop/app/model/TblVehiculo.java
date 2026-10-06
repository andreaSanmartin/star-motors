package com.develop.app.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Entity
public class TblVehiculo {

	@Id
	@NotNull
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idVehiculo;

	@NotNull
	@Column(unique = true, nullable = false)
	private String vehNumChasis;

	@NotNull
	@Column(unique = true, nullable = false)
	private String vehNumMotor;

	@NotNull
	@Column(unique = true, nullable = false)
	private String vehRAMV;
	private String vehMatricula;
	private Double vehPrecio;

	@ManyToOne
	@JoinColumn(name = "idConcesionaria", referencedColumnName = "idConcesionaria")
	private TblConcesionaria concesionaria;
	
	@ManyToOne
	@JoinColumn(name = "idEjemplar", referencedColumnName = "idEjemplar")
	private TblEjemplar ejemplar;

}
