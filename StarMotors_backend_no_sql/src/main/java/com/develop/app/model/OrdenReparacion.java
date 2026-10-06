package com.develop.app.model;

import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.Date;
import java.util.List;

@Data
public class OrdenReparacion {

    private String orFecha;
    //Empleado que crea la orden de reparacion
    private Empleado empleado;
    //Estado de la orden
    private Integer repEstado;
    private String orDescripcion;

    private InformeReparacionTaller informeReparacionTaller;
}
