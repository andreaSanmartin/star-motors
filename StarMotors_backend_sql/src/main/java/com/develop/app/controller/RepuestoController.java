package com.develop.app.controller;

import com.develop.app.model.TblRespuestos;
import com.develop.app.service.RepuestoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/repuesto")
public class RepuestoController {

    @Autowired
    RepuestoService repuestoService;

    @GetMapping("/findById")
    public TblRespuestos findById(@RequestParam(value = "idRepuesto") Integer idRepuesto) {
        return repuestoService.findById(idRepuesto);
    }

    @GetMapping("/listAllById")
    public List<TblRespuestos> listAllById(@RequestParam(value = "listIdRepuestos") Integer[] listIdRepuestos) {
        return repuestoService.listAllById(listIdRepuestos);
    }
    
    @GetMapping("/listAll")
    public List<TblRespuestos> listAllRepuestos() {
        return repuestoService.listAll();
    }
    
    @GetMapping("/listRepuestosByMarca")
    public List<TblRespuestos> listRepuestosByMarca(@RequestParam(value = "idMarca") Integer idMarca, @RequestParam(value = "idConcesionaria") Integer idConcesionaria) {
    	return repuestoService.getAllByIdMarca(idMarca, idConcesionaria);
    }
}
