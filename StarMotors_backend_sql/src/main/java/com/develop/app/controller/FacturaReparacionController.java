package com.develop.app.controller;

import com.develop.app.service.FacturaReparacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin(origins = "*")
@RequestMapping("/reparacion/factura")
public class FacturaReparacionController {

    @Autowired
    FacturaReparacionService facturaReparacionService;

    @PostMapping("/add")
    public ResponseEntity<?> addFactura(@RequestParam(value = "fecha") String fecha,
                                        @RequestParam(value = "idConcesionaria") Integer idConcesionaria,
                                        @RequestParam(value = "idCliente") Integer idCliente,
                                        @RequestParam(value = "numChasis") String numChasis,
                                        @RequestParam(value = "detalleReparacion") String detalleReparacion,
                                        @RequestParam(value = "detalleRepuestos") String detalleRepuestos,
                                        @RequestParam(value = "detalleManoObra") String detalleManoObra,
                                        @RequestParam(value = "Subtotal")  Double Subtotal,
                                        @RequestParam(value = "Descuento") Double Descuento,
                                        @RequestParam(value = "Garantia") Double Garantia,
                                        @RequestParam(value = "Total") Double Total ) {
        return facturaReparacionService.addFacturaReparacion(fecha, idConcesionaria, idCliente, numChasis, detalleReparacion, detalleRepuestos, detalleManoObra,Subtotal,Descuento,Garantia,Total);

    }

    @GetMapping("/maxId")
    public ResponseEntity<?> findMaxIdFactura() {
        return facturaReparacionService.findMaxIdFactura();
    }

    @GetMapping("/findByListId")
    public ResponseEntity<?> findByListId(@RequestParam(value = "listIdFacturas") Integer [] listIdFacturas){
        return facturaReparacionService.findByListId(listIdFacturas);
    }

}

