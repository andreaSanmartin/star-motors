package com.develop.app.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Data;

@Data
@Entity
public class TblDetFacturaReparacion {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idDetFacturaReparacion;

	@Column(length = 150)
	private String defrDetalleReparacion;

	@ManyToOne
	@JoinColumn(name = "idEncFacturaReparacion", nullable = false, referencedColumnName = "idEncFacturaReparacion")
	private TblEncFacturaReparacion encFacturaReparacion;
	
	@ManyToOne
	@JoinColumn(name = "idVehiculo", nullable = false, referencedColumnName = "idVehiculo")
	private TblVehiculo vehiculo;

}