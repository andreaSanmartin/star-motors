package com.develop.app.model;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class Empleado {
    //Las siguientes variables se llenaran solo si trabaja en ese lugar y si se desea obtener información acerca del lugar se debe consultar en la APIRest SQL
    private int idConcesionaria;
    private int idTaller;
    private int idComercializadora;
    private int idEmpleadoAPIRestSQL;
}
