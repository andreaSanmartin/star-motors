package com.develop.app.controller;

import com.develop.app.model.TblConcesionaria;
import com.develop.app.service.ConcesionariaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/concesionaria")
@CrossOrigin(origins = "*")
public class ConcesionariaController {
    @Autowired
     ConcesionariaService concesionariaService;

    @GetMapping(value = "/findById")
    public TblConcesionaria findConcesionariaById(@RequestParam(value = "idConcesionaria") Integer idConcesionaria) {
        return concesionariaService.findById(idConcesionaria);
    }

    @GetMapping("/findByIdComercializadora")
    public List<TblConcesionaria> findByIdComercializadora(@RequestParam(value = "idComercializadora") Integer idComercializadora){
        return concesionariaService.findByIdComercializadora(idComercializadora);
    }
}
