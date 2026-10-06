package com.develop.app.model;


import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class TblTaller {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idTaller;
	
	@Column(length = 50)
	private String taNombre;
	
	@Column(length = 100)
	private String taDireccion;
	
	@ManyToOne
	@JoinColumn(name = "idComercializadora", referencedColumnName = "idComercializadora")
    private TblComercializadora comercializadora;

	@Column(length = 100)
	private String taCorreo;

	@Column(length = 15)
	private  String taTelefono;
}
