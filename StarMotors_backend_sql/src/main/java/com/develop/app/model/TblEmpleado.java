package com.develop.app.model;

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
public class TblEmpleado {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idEmpleado;
	
	@Column(unique = true, length = 10)
	private String empUsername;
	
	@Column(length = 20)
	private String empPassword;
	
	@ManyToOne
	@JoinColumn(name = "idPersona", referencedColumnName = "idPersona", insertable = true, updatable = false)
	private TblPersona persona;
	
	@ManyToOne
	@JoinColumn(name = "idRol", referencedColumnName = "idRol", insertable = true, updatable = true)
	private TblRoles roles;
	
	
}
