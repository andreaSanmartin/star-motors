package com.develop.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.develop.app.model.TblComercializadora;
import com.develop.app.service.ComercializadoraService;

@RestController
@RequestMapping("/comercializadora")
@CrossOrigin(origins = "*")
public class ComercializadoraController {
	
	@Autowired
	ComercializadoraService comercializadoraService;
	
	@GetMapping("/findById")
	public TblComercializadora findComercializadoraById(@RequestParam(value = "idComercializadora") Integer idComercializadora) {
		return comercializadoraService.findById(idComercializadora);
	}

}
