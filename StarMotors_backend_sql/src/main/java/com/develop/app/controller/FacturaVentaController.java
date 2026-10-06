package com.develop.app.controller;

import com.develop.app.service.FacturaVentaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin(origins = "*")
@RequestMapping("/venta/factura")
public class FacturaVentaController {
    @Autowired
    FacturaVentaService facturaVentaService;

    @PostMapping("/add")
    public ResponseEntity<?> addFactura(@RequestParam(value = "idCliente") Integer idCliente,
                                        @RequestParam(value = "idConcesionaria") Integer idConcesionaria,
                                        @RequestParam(value = "fecha") String fecha,
                                        @RequestParam(value = "total") Double total,
                                        @RequestParam(value = "idCotizacionPrevia") Integer idCotizacionPrevia,
                                        @RequestParam(value = "descuento") Double descuento,
                                        @RequestParam(value = "iva") Integer iva,
                                        @RequestParam(value = "listIdVehiculo") Integer[] listIdVehiculo,
                                        @RequestParam(value = "subTotal") Double subtotal) {
        return facturaVentaService.addFacturaVenta(idCliente, idConcesionaria, fecha, total, idCotizacionPrevia, descuento, iva, listIdVehiculo, subtotal);
    }

    @GetMapping("/maxId")
    public ResponseEntity<?> findMaxIdFactura() {
        return facturaVentaService.findMaxIdFactura();
    }

    @GetMapping("/findDetalleByVehiculo")
    public ResponseEntity<?> findDetalleByIdVehiculo(@RequestParam(value = "idVehiculo") Integer idVehiculo) {
        return facturaVentaService.findDetalleByIdVehiculo(idVehiculo);
    }

    @GetMapping("/findEnlacesCotizacion")
    public ResponseEntity<?> findEnlacesCotizacio(@RequestParam(value = "idConcesionaria") Integer idConcesionaria){
        return facturaVentaService.findEnlacesCotizacion(idConcesionaria);
    }
}
