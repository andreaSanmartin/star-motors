package com.develop.app.controller;

import com.develop.app.service.NominaEmpleadosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
public class NominaEmpleadosController {

    @Autowired
    NominaEmpleadosService nominaEmpleadosService;

    @PostMapping("/nomina/addEmpleado")
    public ResponseEntity<?> addEmpleado(@RequestParam(value = "idConcesionaria") Integer idConcesionaria,
                                         @RequestParam(value = "idTaller") Integer idTaller,
                                         @RequestParam(value = "idComercializadora") Integer idComercializadora,
                                         @RequestParam(value = "idEmpleadoAPIRestSQL") Integer idEmpleadoAPIRestSQL){
        return nominaEmpleadosService.addEmpleado(idConcesionaria, idTaller, idComercializadora, idEmpleadoAPIRestSQL);
    }

    @GetMapping("/nomina/getEmpleadoByIdSQL")
    public ResponseEntity<?> getEmpleadoByIdSQL(@RequestParam(value = "idEmpleadoAPIRestSQL") Integer idEmpleadoAPIRestSQL){
        return nominaEmpleadosService.getEmpleadoByIdSQL(idEmpleadoAPIRestSQL);
    }
}
