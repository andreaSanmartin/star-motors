package com.develop.app.service.implementation;

import com.develop.app.model.TblConcesionaria;
import com.develop.app.model.TblMarca;
import com.develop.app.model.TblPermisos;
import com.develop.app.model.TblRespuestos;
import com.develop.app.repository.ConcesionariaRepository;
import com.develop.app.repository.MarcaRepository;
import com.develop.app.repository.PermisosRepository;
import com.develop.app.repository.RepuestosRepository;
import com.develop.app.service.RepuestoService;
import com.develop.app.tools.ValidacionesTools;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RepuestoServiceImp implements RepuestoService {

    @Autowired
    RepuestosRepository repuestosRepository;
    
    @Autowired
    ConcesionariaRepository concesionariaRepository;
    
    @Autowired
    MarcaRepository marcaRepository;
    
    @Autowired
    PermisosRepository permisosRepository;
    
    @Autowired
    ValidacionesTools validaciones;


    @Override
    public TblRespuestos findById(Integer idRepuesto) {
        return repuestosRepository.findById(idRepuesto).get();
    }

    @Override
    public List<TblRespuestos> listAllById(Integer[] listIdRepuestos) {
        if (listIdRepuestos.length!=0){
            List<TblRespuestos> tblRespuestosList = new ArrayList<>();
            for (Integer id: listIdRepuestos){
                tblRespuestosList.add(repuestosRepository.findById(id).get());
            }
            return tblRespuestosList;
        }
        return new ArrayList<>();
    }

	@Override
	public List<TblRespuestos> listAll() {
		List<TblRespuestos> listRepuestos = repuestosRepository.findAll();
		return listRepuestos;
	}

	@Override
	public List<TblRespuestos> getAllByIdMarca(Integer idMarca, Integer idConcesionaria) {
		if(validaciones.validarPermisosVenta(idConcesionaria, idMarca)) {
			List<TblRespuestos> listRepuestos = repuestosRepository.findByMarca(marcaRepository.findById(idMarca).get());
			return listRepuestos;
		}
		return null;
	}
	

}
