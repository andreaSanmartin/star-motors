package com.develop.app.service;

import org.springframework.http.ResponseEntity;

public interface ReporteService {

    String reporteRepuestosMayorDemanda(Integer idConcesionaria);


    ResponseEntity<?> sobreCargarDatos();
}
