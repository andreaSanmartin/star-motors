package com.develop.app.controller;

import com.develop.app.model.Cotizaciones;
import com.develop.app.service.CotizacionesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cotizaciones")
@CrossOrigin("*")
public class CotizacionesController {

    @Autowired
    CotizacionesService cotizacionesService;

    @PostMapping("/post")
    public ResponseEntity<?> postCotizacion(@RequestBody Cotizaciones cotizacion) {
        return cotizacionesService.postCotizacion(cotizacion);
    }

    @PostMapping("/postByParameters")
    public ResponseEntity<?> postCotizacion(@RequestParam(value = "cotFecha") String cotFecha,
                                            @RequestParam(value = "cotDescripcion") String cotDescripcion,
                                            @RequestParam(value = "idConcesionaria") Integer idConcesionaria,
                                            @RequestParam(value = "idEjemplar") Integer idEjemplar,
                                            @RequestParam(value = "perCedula") String perCedula,
                                            @RequestParam(value = "perNombre") String perNombre,
                                            @RequestParam(value = "perApellido") String perApellido,
                                            @RequestParam(value = "perEmail") String perEmail,
                                            @RequestParam(value = "perFechaNacimiento") String perFechaNacimiento,
                                            @RequestParam(value = "perTelefono") String perTelefono) {
        return cotizacionesService.postCotizacion(cotFecha, cotDescripcion, idConcesionaria, idEjemplar, perCedula, perNombre, perApellido, perEmail, perFechaNacimiento, perTelefono);
    }

    @GetMapping("/list")
    public List<Cotizaciones> listCotizaciones(@RequestParam(value = "idConcesionaria") Integer idConcesionaria) {
        return cotizacionesService.listAll(idConcesionaria);
    }

    @PutMapping("/put")
    public ResponseEntity<?> updateStatusCotizacion(@RequestParam(value = "idCotizacion") Integer idCotizacion,
                                                    @RequestParam(value = "estado") Integer estado,
                                                    @RequestParam(value = "idEmpleadoAPIRestSQL") Integer idEmpleadoAPIRestSQL) {
        return cotizacionesService.updateStatusCotizacion(idCotizacion, estado, idEmpleadoAPIRestSQL);
    }

    @GetMapping("/listByEjemplar")
    public List<Cotizaciones> findByIdEjemplar(@RequestParam(value = "idEjemplar") Integer idEjemplar, @RequestParam(value = "idConcesionaria") Integer idConcesionaria) {
        return cotizacionesService.findByIdEjemplar(idEjemplar, idConcesionaria);
    }

    @GetMapping("/listByCliente")
    public List<Cotizaciones> findByCedulaCliente(@RequestParam(value = "cedula") String cedula,
                                                  @RequestParam(value = "idConcesionaria") Integer idConcesionaria,
                                                  @RequestParam(value = "estado") Integer estado) {
        return cotizacionesService.findByCedulaCliente(cedula, idConcesionaria, estado);
    }

    @GetMapping("/listByEstado")
    public List<Cotizaciones> findByEstado(@RequestParam(value = "estado") Integer estado, @RequestParam(value = "idConcesionaria") Integer idConcesionaria) {
        return cotizacionesService.findByEstado(estado, idConcesionaria);
    }

    @GetMapping("/findById")
    public Cotizaciones findById(@RequestParam(value = "idCotizacion") Integer idCotizacion) {
        return cotizacionesService.findByById(idCotizacion);
    }

}
