package com.develop.app.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class TblModelo {
  
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idModelo;
	
	@Column(length = 100)
	private String modNombre;
	private int modAnio;
	
	@Column(length = 20)
	private String modPotencia;
	
	@Column(length = 1000)
	private String modFoto;
	
	private String modCilindraje;
	
	@ManyToOne
	@JoinColumn(name = "idMarca", referencedColumnName = "idMarca")
    private TblMarca marca;

	@ManyToOne
	@JoinColumn(name = "idTipoCombustible", referencedColumnName = "idTipoCombustible")
	private TblTipoCombustible tipoCombustible;

	@OneToOne
	@JoinColumn(name = "idPais", referencedColumnName = "idPais", nullable = false)
	private TblPais paisOrigen;

	private Integer modKmGarantia;
}
