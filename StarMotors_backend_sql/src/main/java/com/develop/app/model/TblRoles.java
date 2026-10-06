package com.develop.app.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class TblRoles {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idRol;
	
	@Column(length = 20)
	private String rolNombre;
}
