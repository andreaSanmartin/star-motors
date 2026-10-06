package com.develop.app.controller;

import com.develop.app.model.Garantia;
import com.develop.app.model.ManoObra;
import com.develop.app.model.Repuestos;
import com.develop.app.service.ReclamoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reclamo")
@CrossOrigin("*")
public class ReclamoController {

    @Autowired
    ReclamoService reclamoService;

    @PostMapping("/post")
    public ResponseEntity<?> postReclamoGarantia(@RequestParam(value = "idGarantia") Integer idGarantia,
                                                 @RequestParam(value = "fecha") String fecha,
                                                 @RequestParam(value = "descripcion") String descripcion,
                                                 @RequestParam(value = "razonesReclamo") String[] razonesReclamo,
                                                 @RequestParam(value = "danio") String danio,
                                                 @RequestParam(value = "idEmpleadoAPIRestSQL") Integer idEmpleadoAPIRestSQL) {
        return reclamoService.postReclamoGarantia(idGarantia, fecha, descripcion, razonesReclamo, danio, idEmpleadoAPIRestSQL);
    }

    @GetMapping("/listByStatus")
    public List<Garantia> listReclamoByStatus(@RequestParam(value = "idConcesionaria") Integer idConcesionaria,
                                              @RequestParam(value = "estado") Integer estado) {
        return reclamoService.listReclamoByStatus(idConcesionaria, estado);
    }

    @PutMapping("/rechazo/post")
    public ResponseEntity<?> postInformeRechazoGarantia(@RequestParam(value = "idGarantia") Integer idGarantia,
                                                        @RequestParam(value = "idEmpleadoAPIRestSQL") Integer idEmpleadoAPIRestSQL,
                                                        @RequestParam(value = "fecha") String fecha,
                                                        @RequestParam(value = "descripcion") String descripcion) {
        return reclamoService.postInformeRechazoGarantia(idGarantia, idEmpleadoAPIRestSQL, fecha, descripcion);
    }

    @PostMapping("/proforma/post")
    public ResponseEntity<?> postInformeProformaReparacion(@RequestParam(value = "idGarantia") Integer idGarantia,
                                                           @RequestParam(value = "fecha") String fecha,
                                                           @RequestParam(value = "detalle") String detalle,
                                                           @RequestParam(value = "subTotalManoObra") Double subTotalManoObra,
                                                           @RequestParam(value = "subTotalRepuestos") Double subTotalRepuestos,
                                                           @RequestParam(value = "idEmpleadoAPIRestSQL") Integer idEmpleadoAPIRestSQL,
                                                           @RequestParam(value = "listaManoObra") String manoObraList,
                                                           @RequestParam(value = "listaRepuestos") String repuestosList) {
        return reclamoService.postInformeProformaReparacion(idGarantia, fecha, detalle, subTotalManoObra, subTotalRepuestos, idEmpleadoAPIRestSQL, manoObraList, repuestosList);
    }

    @GetMapping("/proforma/listByStatus")
    public List<Garantia> listInformeProformaReparacion(@RequestParam(value = "idConcesionaria") Integer idConcesionaria,
                                                        @RequestParam(value = "estado") Integer estado) {
        return reclamoService.listInformeProformaReparacionByStatus(idConcesionaria, estado);
    }

}
