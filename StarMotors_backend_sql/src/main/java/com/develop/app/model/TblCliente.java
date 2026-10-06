package com.develop.app.model;


import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class TblCliente {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idCliente;

	@Column(unique = true, length = 50)
	private String cliUsername;
	
	@Column(length = 20)
	private String cliPassword;

	@OneToOne
	@JoinColumn(name = "idPersona", referencedColumnName = "idPersona", nullable = false, unique = true, updatable = true)
	private TblPersona persona;
}
