package com.develop.app.service.implementation;

import com.develop.app.model.TblEmpleado;
import com.develop.app.repository.EmpleadoRepository;
import com.develop.app.service.EmpleadoService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class EmpleadoServiceImp implements EmpleadoService {

    @Autowired
    EmpleadoRepository empleadoRepository;

    @Override
    public TblEmpleado findById(Integer idEmpleado) {
        return empleadoRepository.findById(idEmpleado).get();
    }

    @Override
    public ResponseEntity<?> findByUsernameByPassword(String empUsername, String empPassword) {
        if(!empUsername.isEmpty() || !empPassword.isEmpty()){
            TblEmpleado empleado = empleadoRepository.findByEmpUsernameAndEmpPassword(empUsername,empPassword);

            if(empleado != null){
                return new ResponseEntity<>(empleado, HttpStatus.OK);
            }else{
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }else {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }


	@Override
	public List<TblEmpleado> findAllEmpleadoById(Integer[] idEmpleado) {
                 return empleadoRepository.findTblEmpleadoByIdEmpleadoIn(idEmpleado);
	}

    @Override
    public TblEmpleado findByCedula(String cedula) {
        List<TblEmpleado> empleadoList = empleadoRepository.findAll();
        for (TblEmpleado tblEmpleado : empleadoList) {
            if (tblEmpleado.getPersona().getPerCedula().equals(cedula)){
                System.out.println(tblEmpleado);
                return tblEmpleado;
            }
        }
        return null;
    }



	

}
