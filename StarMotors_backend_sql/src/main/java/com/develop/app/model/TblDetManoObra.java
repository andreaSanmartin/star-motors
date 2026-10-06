package com.develop.app.model;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Data;


@Data
@Entity
public class TblDetManoObra {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idDetManoObra;
	
	private int demoNumHoras;
	private Double demoPrecioHora;
	
	
	@ManyToOne
	@JoinColumn(name = "idDetFacturaReparacion", referencedColumnName = "idDetFacturaReparacion")
    private TblDetFacturaReparacion detalleFacturaReparacion;
}
