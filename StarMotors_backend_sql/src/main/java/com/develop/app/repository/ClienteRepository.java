package com.develop.app.repository;

import com.develop.app.model.TblCliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface ClienteRepository extends JpaRepository<TblCliente, Integer> {


     TblCliente findTblClienteByCliUsername(String username);
     TblCliente findTblClienteByIdCliente(int idCliente);

     @Query("select max(tc.idCliente) from TblCliente tc ")
     Integer findMaxId();

     List<TblCliente> findByIdClienteIn(int[] idCliente);

     TblCliente findByPersona_IdPersona(int idPersona);

     TblCliente findByPersona_PerCedula(String perCedula);
}
