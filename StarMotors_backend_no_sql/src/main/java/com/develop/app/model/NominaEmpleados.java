package com.develop.app.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document
public class NominaEmpleados {

    @Id
    private Long idNominaEmpleados;
    private List<Empleado> nominaEmpleados;
}
