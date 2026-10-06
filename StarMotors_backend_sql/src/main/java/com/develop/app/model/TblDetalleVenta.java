package com.develop.app.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import lombok.Data;

@Data
@Entity
public class TblDetalleVenta {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idDetalleVenta;
    
    @ManyToOne
	@JoinColumn(name = "idEncabezadoVenta", nullable = false, referencedColumnName = "idEncabezadoVenta")
    private TblEncabezadoVenta encabezadoVenta;
    
	@OneToOne
	@JoinColumn(name = "idVehiculo", referencedColumnName = "idVehiculo", nullable = false, unique = true, updatable = true)
	private TblVehiculo vehiculo;
	
}