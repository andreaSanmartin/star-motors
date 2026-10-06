package com.develop.app.service;

import org.springframework.http.ResponseEntity;

public interface FacturaReparacionService {

   ResponseEntity<?> addFacturaReparacion(
           String fecha,
           Integer idConcesionaria,
           Integer idCliente,
           String numChasis,
           String detalleReparacion,
           String detalleRepuestos,
           String detalleManoObra,
           Double Subtotal,
           Double Descuento,
           Double Garantia,
           Double Total

           );

    ResponseEntity<?> findMaxIdFactura();

    ResponseEntity<?> findByListId(Integer[] listIdFacturas);
}
