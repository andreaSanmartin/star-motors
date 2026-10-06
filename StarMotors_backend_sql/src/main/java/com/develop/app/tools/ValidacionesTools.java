package com.develop.app.tools;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.develop.app.model.TblConcesionaria;
import com.develop.app.model.TblMarca;
import com.develop.app.model.TblPermisos;
import com.develop.app.repository.ConcesionariaRepository;
import com.develop.app.repository.MarcaRepository;
import com.develop.app.repository.PermisosRepository;

@Service
public class ValidacionesTools {
	
	 @Autowired
	    ConcesionariaRepository concesionariaRepository;
	 
	 @Autowired
	    MarcaRepository marcaRepository;
	 
	 @Autowired
	    PermisosRepository permisosRepository;
	
	 public Boolean validarPermisosVenta(Integer idConcesionaria, Integer idMarca) {
	        //Buscamos la concesionaria
	        TblConcesionaria concesionaria = concesionariaRepository.findById(idConcesionaria).get();
	        //Buscamos la marca
	        TblMarca marca = marcaRepository.findById(idMarca).get();
	        //Obtenemos el permiso
	        TblPermisos permiso = permisosRepository.findByComercializadoraAndMarca(concesionaria.getComercializadora(), marca);
	        //Retornamos si existe o no permisos de venta
	        return permiso != null;
	    }

}
