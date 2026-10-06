package com.develop.app.controller;

import com.develop.app.service.ReporteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReportesController {

    @Autowired
    ReporteService reporteService;

    @PostMapping("/sobreCargar")
    public ResponseEntity<?> sobreCargarDatos(){
        return reporteService.sobreCargarDatos();
    }
}
