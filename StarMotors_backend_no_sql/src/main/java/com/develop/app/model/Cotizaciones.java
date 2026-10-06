package com.develop.app.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document
public class Cotizaciones {

    @Id
    private Long idCotizacion;
    private String cotFecha;
    private String cotDescripcion;
    private Integer cotEstado;
    private int idEjemplar;

    private Cliente cliente;

    //Si se necesita saber mas informacion del empleado se debe consultar en la APIRestSQL
    private Empleado empleado;

    private int idConcesionaria;
}