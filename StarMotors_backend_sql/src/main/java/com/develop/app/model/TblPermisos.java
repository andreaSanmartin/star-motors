package com.develop.app.model;

import java.util.Date;

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
public class TblPermisos {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idPermiso;
	
	private Date pemFecha;
	
	@Column(length = 200)
	private String pemDescripcion;

	@ManyToOne
	@JoinColumn(name = "idMarca", referencedColumnName = "idMarca")
	private TblMarca marca;

	@ManyToOne
	@JoinColumn(name = "idComercializadora", referencedColumnName = "idComercializadora")
    private TblComercializadora comercializadora;
	}
