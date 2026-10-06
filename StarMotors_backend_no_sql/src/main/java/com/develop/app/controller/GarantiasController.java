package com.develop.app.controller;

import com.develop.app.model.Garantia;
import com.develop.app.service.GarantiasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/garantia")
@CrossOrigin("*")
public class GarantiasController {

    @Autowired
    GarantiasService garantiasService;
    

    @PutMapping("/postSolicitud")
    public ResponseEntity<?> updateSolicitudGarantia(@RequestParam(value = "idGarantia") Integer idGarantia,
                                                   @RequestParam(value = "idEmpleadoApiSql") Integer idEmpleadoApiSql,
                                                   @RequestParam(value = "IdFacturaReparacionApiSql") Integer IdFacturaReparacionApiSql) {
        return garantiasService.updateSolicitudGarantia(idGarantia,idEmpleadoApiSql,IdFacturaReparacionApiSql);
    }

    @PostMapping("/postSolicitudByParameters")
    public ResponseEntity<?> postSolicitudGarantiaByParameters(@RequestParam(value = "garFecha") String garFecha,
                                                               @RequestParam(value = "idVehiculo") Integer idVehiculo,
                                                               @RequestParam(value = "idCliente") Integer idCliente,
                                                               @RequestParam(value = "garDescripcion") String garDescripcion,
                                                               @RequestParam(value = "idConcesionaria") Integer idConcesionaria,
                                                               @RequestParam(value = "fallosSistemasVehiculos") String[] fallosSistemasVehiculos) {
        return garantiasService.postSolicitudGarantia(garFecha, idVehiculo, idCliente, garDescripcion, idConcesionaria, fallosSistemasVehiculos);
    }

    @GetMapping("/listSolicitudes")
    public List<Garantia> listSolicitudesGarantia(@RequestParam(value = "idConcesionaria") Integer idConcesionaria) {
        return garantiasService.listSolicitudesGarantia(idConcesionaria);
    }

    @PutMapping("/updateSolicitud")
    public ResponseEntity<?> updateEstadoGarantia(@RequestParam(value = "idGarantia") Integer idGarantia,
                                                  @RequestParam(value = "estado") Integer estado,
                                                  @RequestParam(value = "idEmpleadoAPIRestSQ") Integer idEmpleadoAPIRestSQ) {
        return garantiasService.updateEstadoGarantia(idGarantia, estado, idEmpleadoAPIRestSQ);
    }

    @GetMapping("/listByStatus")
    public List<Garantia> listSolicitudesGarantiaByStatus(@RequestParam(value = "idConcesionaria") Integer idConcesionaria,
                                                          @RequestParam(value = "estado") Integer estado) {
        return garantiasService.listSolicitudesGarantiaByStatus(idConcesionaria, estado);
    }

    @GetMapping("/findByClient")
    public List<Garantia> listSolicitudesByClient(@RequestParam(value = "idConcesionaria") Integer idConcesionaria,
                                                  @RequestParam(value = "idCliente") Integer idCliente) {
        return garantiasService.listSolicitudesGarantiaByClient(idConcesionaria, idCliente);
    }

    @GetMapping("/findByClientAndVehiculo")
    public List<Garantia> listSolicitudesByClientAndVehiculo(@RequestParam(value = "idConcesionaria") Integer idConcesionaria,
                                                             @RequestParam(value = "idCliente") Integer idCliente,
                                                             @RequestParam(value = "idVehiculo") Integer idVehiculo) {
        return garantiasService.listSolicitudesGarantiaByClientAndVehiculo(idConcesionaria, idCliente, idVehiculo);
    }

    @GetMapping("/findById")
    public Garantia findGarantiaById(@RequestParam(value = "idGarantia") Integer idGarantia){
        return garantiasService.findById(idGarantia);
    }

    @GetMapping("/listByGarantiaExists")
    public List<Garantia> listGarantiasbyExists(boolean exists) {
        return garantiasService.listGarantiaExists(exists);
    }
    
    @GetMapping("/listByInformeTallerExists")
    public List<Garantia> listInformeTallerbyExists() {
        return garantiasService.listInformeTallerExists();
    }
    
    @GetMapping("/countGarantiaByIdVehiculo")
    public Integer countGarantiaByIdVehiculo(Integer ListIdVehiculo) {
        return garantiasService.countGarantias(ListIdVehiculo);
    }
    
    @GetMapping("/countInformeTallerExists")
    public Integer countInformeTallerExists(Integer idVehiculo) {
        return garantiasService.countInformeTallerExists(idVehiculo);
    }
    
    @GetMapping("/listGarantiaByAnio")
    public List<Garantia> listGarantiaByAnio(String fechaInicio, String fechaFinal) {
        return garantiasService.findGarantiaByAnio(fechaInicio, fechaFinal);
    }
}
