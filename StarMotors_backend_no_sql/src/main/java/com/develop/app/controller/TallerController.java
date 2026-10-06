package com.develop.app.controller;

import com.develop.app.model.Garantia;
import com.develop.app.model.ManoObra;
import com.develop.app.model.Repuestos;
import com.develop.app.service.TallerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/taller")
@CrossOrigin("*")
public class TallerController {

    @Autowired
    TallerService tallerService;


    @PostMapping("/solicitudRepuestos/post")
    public ResponseEntity<?> postSolicitudRepuestos(@RequestParam(value = "idGarantia") Integer idGarantia,
                                                    @RequestParam(value = "idEmpleadoSolicitaAPIRestSQL") Integer idEmpleadoSolicitaAPIRestSQL,
                                                    @RequestParam(value = "detalle") String detalle,
                                                    @RequestBody List<Repuestos> repuestosList,
                                                    @RequestParam(value = "fecha") String fecha) {
        return tallerService.postSolicitudRepuestos(idGarantia, idEmpleadoSolicitaAPIRestSQL, detalle, repuestosList, fecha);
    }

    @GetMapping("/solicitudRepuestos/list")
    public List<Garantia> listSolicitudRepuestosByStatus(@RequestParam(value = "idConcesionaria") Integer idConcesionaria,
                                                         @RequestParam(value = "estado") Integer estado) {
        return tallerService.listSolicitudRepuestosByStatus(idConcesionaria, estado);
    }

    @PutMapping("/solicitudRepuestos/updateStatus")
    public ResponseEntity<?> updateStatusSolicitudRepuestos(@RequestParam(value = "idGarantia") Integer idGarantia,
                                                            @RequestParam(value = "estado") Integer estado,
                                                            @RequestParam(value = "indexSolicitudRepuestos") Integer indexSolicitudRepuestos,
                                                            @RequestParam(value = "idEmpleadoDespAPIRestSQL") Integer idEmpleadoDespAPIRestSQL,
                                                            @RequestParam(value = "fecha") String fecha) {
        return tallerService.updateStatusSolicitudRepuestos(idGarantia, estado, indexSolicitudRepuestos, idEmpleadoDespAPIRestSQL, fecha);
    }

    @PostMapping("/infReparacion/post")
    ResponseEntity<?> postInformeReparacion(@RequestParam(value = "idGarantia") Integer idGarantia,
                                            @RequestParam(value = "fecha") String fecha,
                                            @RequestParam(value = "descripcion") String descripcion,
                                            @RequestParam(value = "manoObraList") List<ManoObra> manoObraList,
                                            @RequestParam(value = "idEmpleadoCreaAPIRestSQL") Integer idEmpleadoCreaAPIRestSQL) {
        return tallerService.postInformeReparacion(idGarantia, fecha, descripcion, manoObraList, idEmpleadoCreaAPIRestSQL);
    }

    @GetMapping("/infReparacion/list")
    List<Garantia> listInformeReparacionByStatus(@RequestParam(value = "idConcesionaria") Integer idConcesionaria,
                                                 @RequestParam(value = "estado") Integer estado) {
        return tallerService.listInformeReparacionByStatus(idConcesionaria, estado);
    }

    @PostMapping(value = "/update/mano")
    public ResponseEntity<?> updateManoObra(@RequestParam(value = "idGarantia") Integer idGarantia,
                                            @RequestParam(value = "idEmpleadoDespAPIRestSQL") Integer idEmpleadoDespAPIRestSQL,
                                            @RequestParam(value = "moHoras") Integer moHoras,
                                            @RequestParam(value = "moPrecioHora") Double moPrecioHora) {
        return tallerService.updateManoObra(idGarantia, idEmpleadoDespAPIRestSQL, moHoras, moPrecioHora);
    }

    @PutMapping(value = "/informeReparacion/updateStatus")
    public ResponseEntity<?> updateEstadoInformeReparacion(@RequestParam(value = "idGarantia") Integer idGarantia, @RequestParam(value = "estado") Integer estado) {
        return tallerService.updateStatusInformeReparacion(idGarantia, estado);
    }
}
