package com.develop.app.service;

import com.develop.app.model.TblCliente;
import com.develop.app.model.TblPersona;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ClienteService {

    TblCliente findById(Integer id);

    ResponseEntity<?> addClient(String cedula, String nombre, String apellido, String telefono, String email, String direccion, String fechaNacimiento, String password);

    ResponseEntity<?> updateClient(int idpersona, int idcliente, String cedula, String telefono, String direccion);

    List<TblCliente> listClient();

   TblPersona findByCedula(String perCedula);

   List<TblCliente> findAllClientsById(int[] clientesId);

   TblCliente findByUsername(String username);

    TblCliente findClientByCedula(String cedula);
}
