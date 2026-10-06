package com.develop.app.controller;

import com.develop.app.model.Garantia;
import com.develop.app.service.GarantiasService;
import com.develop.app.service.OrdenReparacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orden")
@CrossOrigin("*")
public class OrdenReparacionController {

    @Autowired
    OrdenReparacionService ordenReparacionService;


    @PostMapping("/post")
    public ResponseEntity<?> postOrdenReparacion(@RequestParam(value = "idGarantia") Integer idGarantia,
                                                 @RequestParam(value = "fecha") String fecha,
                                                 @RequestParam(value = "idEmpleadoAPIRestSQL") Integer idEmpleadoAPIRestSQ,
                                                 @RequestParam(value = "descripcion") String descripcion) {
        return ordenReparacionService.postOrdenReparacion(idGarantia, fecha, descripcion, idEmpleadoAPIRestSQ);
    }

    @GetMapping("/listByStatus")
    public List<Garantia> listOrdenReparacionByStatus(@RequestParam(value = "idConcesionaria") Integer idConcesionaria,
                                                      @RequestParam(value = "estado") Integer estado) {
        return ordenReparacionService.listOrdenReparacionByStatus(idConcesionaria, estado);
    }

    @PostMapping("/infRepComer/post")
    public ResponseEntity<?> postInformeReparacionComercializadora(@RequestParam(value = "idGarantia") Integer idGarantia,
                                                            @RequestParam(value = "fecha") String fecha,
                                                            @RequestParam(value = "descripcion") String descripcion,
                                                            @RequestParam(value = "garantiaCubre") Integer garantiaCubre,
                                                            @RequestParam(value = "idEmpleadoCreaAPIRestSQL") Integer idEmpleadoCreaAPIRestSQL){
        return ordenReparacionService.postInformeReparacionComercializadora(idGarantia, fecha, descripcion, garantiaCubre, idEmpleadoCreaAPIRestSQL);
    }

    @GetMapping("/infRepComer/listByStatus")
    public List<Garantia> listInformeReparacionComercializadora(Integer idConcesionaria, Integer estado) {
        return ordenReparacionService.listInformeReparacionComercializadora(idConcesionaria, estado);
    }
}
