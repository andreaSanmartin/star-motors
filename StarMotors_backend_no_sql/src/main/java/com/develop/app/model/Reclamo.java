package com.develop.app.model;

import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.Date;
import java.util.List;

@Data
public class Reclamo {

    private String recFecha;
    private String recDescripcion;
    private String razonesReclamo[];
    private String recDanio;
    private Integer recEstado;

    //Empleado de la concesionaria que genero el reclamo
    //Si se desea saber mas acerca del empleado que genero el reclamo se debe consultar en la APIRestSQL
    private Empleado empleado;

    //En caso de que la concesionaria rechace el reclamo se genera el informe de rechazo
    private InformeRechazo informeRechazo;

    //En caso de que la comercializadora acepte el reclamo se genera el informe de la proforma de reparacion
    private InformeProformaReparacion informeProformaReparacion;

}
