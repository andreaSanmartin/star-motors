package com.develop.app.service.implementation;

import com.develop.app.model.Empleado;
import com.develop.app.model.NominaEmpleados;
import com.develop.app.repository.NominaEmpleadosRepository;
import com.develop.app.service.NominaEmpleadosService;
import com.develop.app.tools.EmpleadoTools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class NominaEmpleadoServiceImp implements NominaEmpleadosService {


    @Autowired
    NominaEmpleadosRepository nominaEmpleadosRepository;

    @Autowired
    EmpleadoTools empleadoTools;

    @Override
    public ResponseEntity<?> addEmpleado(Integer idConcesionaria, Integer idTaller, Integer idComercializadora, Integer idEmpleadoAPIRestSQL) {

        Empleado empleado = new Empleado();
        empleado.setIdEmpleadoAPIRestSQL(idEmpleadoAPIRestSQL);
        empleado.setIdComercializadora(idComercializadora);
        empleado.setIdConcesionaria(idConcesionaria);
        empleado.setIdTaller(idTaller);

        NominaEmpleados nominaEmpleados = new NominaEmpleados();

        if (nominaEmpleadosRepository.findAll().isEmpty()){
            nominaEmpleados.setIdNominaEmpleados(Long.parseLong("1"));
            nominaEmpleados.setNominaEmpleados(new ArrayList<>());
        }else{
            nominaEmpleados = nominaEmpleadosRepository.findAll().get(0);
        }

        nominaEmpleados.getNominaEmpleados().add(empleado);
        return new ResponseEntity<>(nominaEmpleadosRepository.save(nominaEmpleados), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<?> getEmpleadoByIdSQL(Integer idEmpleadoAPIRestSQL) {
        return new ResponseEntity<>(empleadoTools.findEmpleadoByIdAPIRestSQL(idEmpleadoAPIRestSQL), HttpStatus.OK);
    }
}
