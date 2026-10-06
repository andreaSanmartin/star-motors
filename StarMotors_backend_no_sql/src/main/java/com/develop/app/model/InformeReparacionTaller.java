package com.develop.app.model;

import lombok.Data;

import java.util.List;

@Data
public class InformeReparacionTaller {

    private String ireFecha;
    private String ireDescripcion;
    private Integer ireEstado;

    private List<SolicitudRepuestos> solicitudRepuestos;
    private List<ManoObra> manoObraList;

    //Empleado que crea el informe de reparacion en el taller
    private Empleado empleado;

    private InformeReparacionComercializadora informeReparacionComercializadora;
}
