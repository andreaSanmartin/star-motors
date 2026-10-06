package com.develop.app.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
public class TblEncabezadoVenta {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idEncabezadoVenta;

	private Date envFecha;
	private int idCotizacionPrevia;
	private Double envDescuento;
	private int envIva;
	private Double envSubtotal;
	private Double envTotal;
	
	
	@ManyToOne
	@JoinColumn(name = "idConcesionaria", referencedColumnName = "idConcesionaria")
    private TblConcesionaria concesionaria;
	
	@ManyToOne
	@JoinColumn(name = "idCliente", referencedColumnName = "idCliente")
    private TblCliente cliente;
	

}
