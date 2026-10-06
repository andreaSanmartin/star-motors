package com.develop.app.service;

import org.springframework.http.ResponseEntity;

public interface FacturaVentaService {

	ResponseEntity<?> addFacturaVenta(Integer idCliente, Integer idConcesionaria, String fecha, Double total, Integer idCotizacionPrevia, Double descuento, Integer iva, Integer[] listIdVehiculo, Double subtotal);

	ResponseEntity<?> findMaxIdFactura();

    ResponseEntity<?> findDetalleByIdVehiculo(Integer idVehiculo);

    ResponseEntity<?> findEnlacesCotizacion(Integer idConcesionaria);
}
