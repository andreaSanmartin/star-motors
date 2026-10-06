package com.develop.app.model;

import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.Date;

@Data
public class InformeRechazo {

    private String irFecha;
    private String irDescripcion;

    //Empleado de la comercializadora que genero el informe de rechazo
    private Empleado empleado;


}
