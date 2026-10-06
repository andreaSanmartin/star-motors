package com.develop.app.model;

import lombok.Data;

import javax.persistence.*;
import java.sql.Date;

@Data
@Entity
public class TblPersona {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idPersona;

	@Column(length = 10, nullable = false, unique = true)
	private String perCedula;

	@Column(length = 50)
	private String perNombre;

	@Column(length = 50)
	private String perApellido;

	@Column(length = 13)
	private String perTelefono;

	@Column(length = 50)
	private String perEmail;
	
	@Column(length = 50)
	private String perDireccion;

	private Date perFechaNacimiento;

}
