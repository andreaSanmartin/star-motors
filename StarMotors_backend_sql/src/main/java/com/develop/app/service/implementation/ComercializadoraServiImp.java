package com.develop.app.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.develop.app.model.TblComercializadora;
import com.develop.app.repository.ComercializadoraRepository;
import com.develop.app.service.ComercializadoraService;

@Service
public class ComercializadoraServiImp implements ComercializadoraService {

	@Autowired
	ComercializadoraRepository comercializadoraRepository;

	@Override
	public TblComercializadora findById(Integer idComercializadora) {
		return comercializadoraRepository.findById(idComercializadora).get();
	}
	
	
}
