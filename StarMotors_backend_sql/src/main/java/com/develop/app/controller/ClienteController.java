package com.develop.app.controller;

import com.develop.app.model.TblCliente;
import com.develop.app.model.TblPersona;
import com.develop.app.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/client")
@CrossOrigin(origins = "*")
public class ClienteController {

    @Autowired
    ClienteService clienteService;


    @GetMapping(value = "/findById")
    public TblCliente findClienteById(@RequestParam(value = "idCliente") Integer idCliente) {
        return clienteService.findById(idCliente);
    }

    @PostMapping("/add")
    ResponseEntity<?> addClient(@RequestParam(value = "cedula", required = true) String cedula,
                                @RequestParam(value = "nombre") String nombre,
                                @RequestParam(value = "apellido") String apellido,
                                @RequestParam(value = "telefono") String telefono,
                                @RequestParam(value = "email") String email,
                                @RequestParam(value = "direccion") String direccion,
                                @RequestParam(value = "fechaNacimiento") String fechaNacimiento,
                                @RequestParam(value = "password", required = true) String password) {

        return clienteService.addClient(cedula, nombre, apellido, telefono, email, direccion, fechaNacimiento, password);
    }

    @PutMapping("/update")
    ResponseEntity<?> updateClient(
            @RequestParam("idpersona") int idpersona,
            @RequestParam("idcliente") int idcliente,
            @RequestParam("cedula") String cedula,
            @RequestParam("telefono") String telefono,
            @RequestParam("direccion") String direccion) {

        return clienteService.updateClient(idpersona, idcliente, cedula, telefono, direccion);
    }

    @GetMapping("/listAllCLient")
    public List<TblCliente> allClient() {
        return clienteService.listClient();
    }

    @GetMapping(value = "/findByCedula")
    public TblPersona findClienteByCedula(@RequestParam(value = "perCedula") String perCedula) {
        return clienteService.findByCedula(perCedula);
    }

    @GetMapping("/listClientById")
    public List<TblCliente> listClientById(@RequestParam(value = "clientsId") int[] clientesId) {
        return clienteService.findAllClientsById(clientesId);
    }

    @GetMapping("/findByUsername")
    public TblCliente findByUsername(@RequestParam(value = "username") String username) {
        return clienteService.findByUsername(username);
    }

    @GetMapping("/findClientByCedula")
    public TblCliente findByCedula(@RequestParam(value = "cedula") String cedula){
        return clienteService.findClientByCedula(cedula);
    }
}
