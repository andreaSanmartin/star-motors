package com.develop.app.model;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class InformeProformaReparacion {

    private String prFecha;
    private String prDetalle;
	private List<Repuestos> repuestosList;
	private List<ManoObra> manoDeObraList;
    private Double prSubTotalManoObra;
    private Double prSubTotalRepuestos;
    private Integer prEstado;//ACEPTADO-PENDIENTE-RECHAZADO

    //Empleado de la comercializadora que genero el informe de aceptacion
    private Empleado empleado;

    private OrdenReparacion ordenReparacion;
}
