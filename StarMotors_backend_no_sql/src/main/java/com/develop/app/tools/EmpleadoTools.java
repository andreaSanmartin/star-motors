package com.develop.app.tools;

import com.develop.app.model.Empleado;
import com.develop.app.model.NominaEmpleados;
import com.develop.app.repository.NominaEmpleadosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmpleadoTools {

     @Autowired
    NominaEmpleadosRepository nominaEmpleadosRepository;

    public Empleado findEmpleadoByIdAPIRestSQL(int idEmpleadoAPIRestSQL){
        List<NominaEmpleados> nominaEmpleados = nominaEmpleadosRepository.findAll();
        for (NominaEmpleados nomina: nominaEmpleados) {
            for (Empleado empleadoNomina: nomina.getNominaEmpleados()) {
                if(empleadoNomina.getIdEmpleadoAPIRestSQL()==idEmpleadoAPIRestSQL){
                    return empleadoNomina;
                }
            }
        }
        return  null;
    }

}
