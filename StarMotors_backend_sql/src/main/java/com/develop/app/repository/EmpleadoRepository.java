package com.develop.app.repository;

import com.develop.app.model.TblEmpleado;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmpleadoRepository extends JpaRepository<TblEmpleado, Integer> {

    TblEmpleado findByIdEmpleado(int idEmpelado);

    TblEmpleado findByEmpUsernameAndEmpPassword(String empUsername, String empPassword);
    
    List<TblEmpleado> findTblEmpleadoByIdEmpleadoIn(Integer[] idEmpleado);
}
