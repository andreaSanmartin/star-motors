package com.develop.app.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data

public class SolicitudRepuestos {
	
	

    private List<Repuestos> repuestosList;
    private String srDetalle;
    private Integer srEstado;
    private Integer idGarantia;

    //Empleado que hace la solicitud de repuestos
    private Empleado empleadoSolicitaRepuestos;
    //Empleado que despacha los repuestos
    private Empleado empleadoDespachaRepuestos;

    private String srFechaSolicitud;
    private String srFechaDespacho;

}
