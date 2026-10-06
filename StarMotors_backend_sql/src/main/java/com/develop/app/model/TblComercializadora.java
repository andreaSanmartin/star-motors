package com.develop.app.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class TblComercializadora {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idComercializadora;

	@Column(length = 50)
	private String comNombre;
	
	@Column(length = 100)
	private String comDireccion;

	@Column(length = 100)
	private String comCorreo;

	@Column(length = 15)
	private  String comTelefono;
}
