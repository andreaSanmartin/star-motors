package com.develop.app.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
public class TblEncFacturaReparacion {
 
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idEncFacturaReparacion;
	
	private Date enfrFecha;
	private Double enfrTotal;
	private Double enfrGarantiaCubierta;
		
	@ManyToOne
	@JoinColumn(name = "idConcesionaria", referencedColumnName = "idConcesionaria")
    private TblConcesionaria concesionaria;
	
	@ManyToOne
	@JoinColumn(name = "idCliente", referencedColumnName = "idCliente")
    private TblCliente cliente;
	
	
}
