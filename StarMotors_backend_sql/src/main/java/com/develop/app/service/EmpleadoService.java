package com.develop.app.service;

import com.develop.app.model.TblEmpleado;

import java.util.List;

import org.springframework.http.ResponseEntity;

public interface EmpleadoService {

    TblEmpleado findById(Integer idEmpleado);

    ResponseEntity<?> findByUsernameByPassword(String empUsername, String empPassword);
    
    List<TblEmpleado> findAllEmpleadoById(Integer[] idEmpleado);
    
    TblEmpleado findByCedula(String cedula);
}
