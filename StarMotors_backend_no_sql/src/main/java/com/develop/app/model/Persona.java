package com.develop.app.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
public class Persona {

    private String perCedula;
    private String perNombre;
    private String perApellido;
    private String perEmail;
    private String perFechaNacimiento;
    private String perTelefono;

}