package com.develop.app.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class TblConcesionaria {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idConcesionaria;
	
	@Column(length = 50)
    private String conNombre;
	
	@Column(length = 100)
    private String conDireccion;
    
    @ManyToOne
	@JoinColumn(name = "idComercializadora", nullable = false, referencedColumnName = "idComercializadora")
    private TblComercializadora comercializadora;

	@Column(length = 100)
	private String conCorreo;

	@Column(length = 15)
	private  String conTelefono;

	@Column(length = 1000)
	private String conFoto;
}
