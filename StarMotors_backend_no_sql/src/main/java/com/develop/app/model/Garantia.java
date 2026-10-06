package com.develop.app.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@Document
public class Garantia {

    @Id
    private Long idGarantia;
    private String garFecha;
    private int idVehiculo;
    private int idCliente;
    private String garDescripcion;
    private Integer garEstado;//REPORTADA-ELIMINADA-PENDIENTE

    //private Cliente cliente;

    private String fallosSistemasVehiculo[];

    //Genera un reclamo
    private Reclamo reclamo;

    private int idConcesionaria;

    private Empleado empleadoAtendioGarantia;
}
