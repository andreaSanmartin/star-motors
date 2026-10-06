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
public class TblDetRepuestos {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	 private int idDetRepuesto;
	
	private int detrCantidad;
	
	//relacion deon el detallefacturaReparacion
	//Relacion con repuesto
	
	@ManyToOne
	@JoinColumn(name = "idDetFacturaReparacion", referencedColumnName = "idDetFacturaReparacion")
    private TblDetFacturaReparacion detalleFacturaReparacion;
	
	@ManyToOne
	@JoinColumn(name = "idRepuesto", referencedColumnName = "idRepuesto")
    private TblRespuestos repuestos;
}
