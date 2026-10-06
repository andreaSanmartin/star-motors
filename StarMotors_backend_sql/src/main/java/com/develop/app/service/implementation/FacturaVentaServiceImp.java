package com.develop.app.service.implementation;

import com.develop.app.model.TblCliente;
import com.develop.app.model.TblDetalleVenta;
import com.develop.app.model.TblEncabezadoVenta;
import com.develop.app.repository.*;
import com.develop.app.service.FacturaVentaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Service
public class FacturaVentaServiceImp implements FacturaVentaService {

    @Autowired
    DetalleVentaRepository detalleVentaRepository;

    @Autowired
    EncabezadoVentaRespository encabezadoVentaRespository;

    @Autowired
    VehiculoRepository vehiculoRepository;

    @Autowired
    ClienteRepository clienteRepository;

    @Autowired
    ConcesionariaRepository concesionariaRepository;

    @Autowired
    PersonaRepository personaRepository;

    @Transactional
    @Override
    public ResponseEntity<?> addFacturaVenta(Integer idCliente, Integer idConcesionaria, String fecha, Double total, Integer idCotizacionPrevia, Double descuento, Integer iva, Integer[] listIdVehiculo, Double subtotal) {

        try {
            //Consultamos al cliente
            TblCliente cliente = clienteRepository.findById(idCliente).get();
            //Creamos el encabezado de la factura
            TblEncabezadoVenta tblEncabezadoVenta = new TblEncabezadoVenta();
            tblEncabezadoVenta.setCliente(cliente);
            tblEncabezadoVenta.setConcesionaria(concesionariaRepository.findById(idConcesionaria).get());
            tblEncabezadoVenta.setIdCotizacionPrevia(idCotizacionPrevia);
            tblEncabezadoVenta.setEnvFecha(Date.valueOf(fecha));
            tblEncabezadoVenta.setEnvDescuento(descuento);
            tblEncabezadoVenta.setEnvIva(iva);
            tblEncabezadoVenta.setEnvSubtotal(subtotal);
            tblEncabezadoVenta.setEnvTotal(total);
            //Guardamos el encabezado
            tblEncabezadoVenta = encabezadoVentaRespository.saveAndFlush(tblEncabezadoVenta);

            //Creamos el detalle y retornamos
            return saveDetalleVenta(tblEncabezadoVenta, listIdVehiculo);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @Override
    public ResponseEntity<?> findMaxIdFactura() {
        return new ResponseEntity<>(encabezadoVentaRespository.findMaxId(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> findDetalleByIdVehiculo(Integer idVehiculo) {
        return new ResponseEntity<>(detalleVentaRepository.findByVehiculo(vehiculoRepository.findById(idVehiculo).get()), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> findEnlacesCotizacion(Integer idConcesionaria) {
        List<TblEncabezadoVenta> list = encabezadoVentaRespository.findByConcesionaria_IdConcesionariaAndIdCotizacionPreviaIsAfter(idConcesionaria, 0);
        List<Integer> listIdEnlaces = new ArrayList<>();
        list.stream().forEach(tblEncabezadoVenta -> listIdEnlaces.add(tblEncabezadoVenta.getIdCotizacionPrevia()));
        return new ResponseEntity<>(listIdEnlaces, HttpStatus.OK);
    }

    private ResponseEntity<?> saveDetalleVenta(TblEncabezadoVenta tblEncabezadoVenta, Integer[] listIdVehiculo) {
        try {
            for (Integer idVehiculo : listIdVehiculo) {
                TblDetalleVenta tblDetalleVenta = new TblDetalleVenta();
                tblDetalleVenta.setEncabezadoVenta(tblEncabezadoVenta);
                tblDetalleVenta.setVehiculo(vehiculoRepository.findById(idVehiculo).get());
                detalleVentaRepository.saveAndFlush(tblDetalleVenta);
            }

            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getCause(), HttpStatus.CONFLICT);
        }
    }

}
