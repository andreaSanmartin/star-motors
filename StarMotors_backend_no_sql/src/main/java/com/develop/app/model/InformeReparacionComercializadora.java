package com.develop.app.model;

import lombok.Data;

import java.util.List;

@Data
public class InformeReparacionComercializadora {

    private String ircFecha;
    private String ircDescripcion;
    private Integer ircGarantia;
    private Integer ircEstado;

    //Empleado que genera la factura de reparacion en la comercializadora
    private Empleado empleadoCreaInformeComercializadora;
    private Empleado empleadoActualizaInformeComercializadora;
    private Integer idFacturacionApiSql;

}
