package com.develop.app.service;

import org.springframework.http.ResponseEntity;

public interface NominaEmpleadosService {

    ResponseEntity<?> addEmpleado(Integer idConcesionaria, Integer idTaller, Integer idComercializadora, Integer idEmpleadoAPIRestSQL);

    ResponseEntity<?> getEmpleadoByIdSQL(Integer idEmpleadoAPIRestSQL);
}
