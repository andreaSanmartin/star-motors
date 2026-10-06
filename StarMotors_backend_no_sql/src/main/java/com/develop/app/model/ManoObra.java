package com.develop.app.model;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class ManoObra {

    //Empleado al que le pertenece los datos de mano de obra
    private Empleado empleadoManoObra;
    private int moHoras;
    private double moPrecioHora;
    private int cantidadHoras;
}
