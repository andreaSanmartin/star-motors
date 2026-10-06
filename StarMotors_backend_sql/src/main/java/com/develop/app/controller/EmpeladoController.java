package com.develop.app.controller;

import com.develop.app.model.TblEmpleado;
import com.develop.app.service.EmpleadoService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/empleado")
@CrossOrigin(origins = "*")
public class EmpeladoController {

    @Autowired
    EmpleadoService empleadoService;

    @GetMapping(value = "/findById")
    public TblEmpleado findEmpleadoById(@RequestParam(value = "idEmpleado") Integer idEmpleado){
        return empleadoService.findById(idEmpleado);
    }

    @GetMapping(value = "/findByUsernameAndPassword")
    public ResponseEntity<?> findEmpleadoByUsernameAndPassword(@RequestParam(value = "empUsername") String empUsername,
                                                            @RequestParam(value = "empPassword") String empPassword){
        return empleadoService.findByUsernameByPassword(empUsername,empPassword);
    }
    
    @GetMapping("/listEmpleadoById")
    public List<TblEmpleado> listClientById(@RequestParam(value = "idEmpleado") Integer[] idEmpleado) {
        return empleadoService.findAllEmpleadoById(idEmpleado);
    }
    @GetMapping(value = "/findByCedula")
    public TblEmpleado findEmpleadoByCedula(@RequestParam(value = "cedula") String cedula){
        return empleadoService.findByCedula(cedula);
    }

}
