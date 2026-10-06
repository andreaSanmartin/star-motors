package com.develop.app.service.implementation;

import com.develop.app.model.TblCliente;
import com.develop.app.model.TblPersona;
import com.develop.app.repository.ClienteRepository;
import com.develop.app.repository.PersonaRepository;
import com.develop.app.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;


@Service
public class ClienteServiceImp implements ClienteService {

    @Autowired
    ClienteRepository clienteRepository;

    @Autowired
    PersonaRepository personaRepository;

    @Override
    public TblCliente findById(Integer idCliente) {
        return clienteRepository.findById(idCliente).get();
    }

    @Override
    public ResponseEntity<?> addClient(String cedula, String nombre, String apellido, String telefono, String email, String direccion, String fechaNacimiento, String password) {

        try {
            //Validamos si existe el cliente
            TblCliente cliente = clienteRepository.findByPersona_PerCedula(cedula);
            if (cliente == null) {
                //Validamos si existe la persona registrada
                TblPersona persona = personaRepository.findByPerCedula(cedula);
                if (persona == null) {
                    persona = new TblPersona();
                    persona.setPerCedula(cedula);
                    persona.setPerNombre(nombre);
                    persona.setPerApellido(apellido);
                    persona.setPerTelefono(telefono);
                    persona.setPerEmail(email);
                    persona.setPerDireccion(direccion);
                    persona.setPerFechaNacimiento(Date.valueOf(fechaNacimiento));
                    persona = personaRepository.saveAndFlush(persona);
                } else {
                    persona.setPerTelefono(telefono);
                    persona.setPerEmail(email);
                    persona.setPerDireccion(direccion);
                    persona = personaRepository.saveAndFlush(persona);
                }

                cliente = new TblCliente();
                cliente.setPersona(persona);
                cliente.setCliUsername(email);
                cliente.setCliPassword(cedula);
                return new ResponseEntity<>(clienteRepository.saveAndFlush(cliente), HttpStatus.CREATED);
            } else {
                cliente.getPersona().setPerTelefono(telefono);
                cliente.getPersona().setPerEmail(email);
                cliente.getPersona().setPerDireccion(direccion);
                cliente.setCliUsername(email);
                cliente.setCliPassword(cedula);
                return new ResponseEntity<>(clienteRepository.saveAndFlush(cliente), HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @Override
    public ResponseEntity<?> updateClient(int idpersona,
                                          int idcliente,
                                          String cedula,
                                          String telefono,
                                          String direccion) {

        // Primera consulta para Editar la tabla persona
        TblPersona persona = personaRepository.findByIdPersona(idpersona);
        persona.setPerCedula(cedula);
        persona.setPerTelefono(telefono);
        persona.setPerDireccion(direccion);

        persona = personaRepository.saveAndFlush(persona);

        // Segunda Consulta por ID para actualizar la tabla Cliente
        TblCliente tblCliente = clienteRepository.findTblClienteByIdCliente(idcliente);
        tblCliente.setPersona(persona);

        //Guardar la actualizacion de la tabla cliente que esta relacionada con persona
        return new ResponseEntity<>(clienteRepository.saveAndFlush(tblCliente), HttpStatus.CREATED);
    }

    @Override
    public List<TblCliente> listClient() {
        List<TblCliente> listacliente = clienteRepository.findAll();
        return listacliente;
    }

    @Override
    public TblPersona findByCedula(String perCedula) {
        return personaRepository.findByPerCedula(perCedula);
    }

    @Override
    public List<TblCliente> findAllClientsById(int[] clientesId) {
        return clienteRepository.findByIdClienteIn(clientesId);
    }

    @Override
    public TblCliente findByUsername(String username) {
        return clienteRepository.findTblClienteByCliUsername(username);
    }

    @Override
    public TblCliente findClientByCedula(String cedula) {
        return clienteRepository.findByPersona_PerCedula(cedula);
    }


}
