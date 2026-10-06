package com.develop.app.service.implementation;

import com.develop.app.model.*;
import com.develop.app.repository.*;
import com.develop.app.service.FacturaReparacionService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Date;

@Service
public class FacturaReparacionServiceImp implements FacturaReparacionService {

    @Autowired
    ConcesionariaRepository concesionariaRepository;

    @Autowired
    ClienteRepository clienteRepository;

    @Autowired
    VehiculoRepository vehiculoRepository;

    @Autowired
    EncFacturaReparacionRepository encFacturaReparacionRepository;

    @Autowired
    DetFacturaReparacionRepository detFacturaReparacionRepository;

    @Autowired
    DetManoObraRepository detManoObraRepository;

    @Autowired
    DetRepuestosRepository detRepuestosRepository;

    @Autowired
    MarcaRepository marcaRepository;

    @Autowired
    RepuestosRepository repuestosRepository;

    @Transactional
    @Override
    public ResponseEntity<?> addFacturaReparacion(String fecha,
                                                  Integer idConcesionaria,
                                                  Integer idCliente,
                                                  String numChasis,
                                                  String detalleReparacion,
                                                  String detalleRepuestos,
                                                  String detalleManoObra,
                                                  Double Subtotal,
                                                  Double Descuento,
                                                  Double Garantia,
                                                  Double Total) {


        try {
            //Creamos el encabezado de la factura
            TblEncFacturaReparacion tblEncFacturaReparacion = new TblEncFacturaReparacion();
            tblEncFacturaReparacion.setConcesionaria(concesionariaRepository.findById(idConcesionaria).get());
            tblEncFacturaReparacion.setCliente(clienteRepository.findById(idCliente).get());
            tblEncFacturaReparacion.setEnfrFecha(Date.valueOf(fecha));
            tblEncFacturaReparacion.setEnfrTotal(Total);
            tblEncFacturaReparacion.setEnfrGarantiaCubierta(Garantia);
            tblEncFacturaReparacion = encFacturaReparacionRepository.saveAndFlush(tblEncFacturaReparacion);

            //Creamos el primer detalle
            TblDetFacturaReparacion tblDetFacturaReparacion = saveDetFacturaReparacion(tblEncFacturaReparacion, detalleReparacion, numChasis);
            //Creamos el segundo detalle
            saveDetRepuestos(detalleRepuestos, tblDetFacturaReparacion);
            //Creamos el tercer detalle
            saveDetManoObra(detalleManoObra, tblDetFacturaReparacion);

            return new ResponseEntity<>(tblEncFacturaReparacion, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @Override
    public ResponseEntity<?> findMaxIdFactura() {
        return new ResponseEntity<>(encFacturaReparacionRepository.findMaxId(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> findByListId(Integer[] listIdFacturas) {
        return new ResponseEntity<>(encFacturaReparacionRepository.findByIdEncFacturaReparacionIn(listIdFacturas), HttpStatus.OK);
    }

    private TblDetFacturaReparacion saveDetFacturaReparacion(TblEncFacturaReparacion tblEncFacturaReparacion, String detalleReparacion, String numChasis) {

        TblDetFacturaReparacion tblDetFacturaReparacion = new TblDetFacturaReparacion();
        tblDetFacturaReparacion.setEncFacturaReparacion(tblEncFacturaReparacion);
        tblDetFacturaReparacion.setDefrDetalleReparacion(detalleReparacion);
        tblDetFacturaReparacion.setVehiculo(vehiculoRepository.findByVehNumChasis(numChasis));

        return detFacturaReparacionRepository.saveAndFlush(tblDetFacturaReparacion);
    }

    private void saveDetManoObra(String detManoObraList, TblDetFacturaReparacion tblDetFacturaReparacion) {

        try {
            JSONArray jsonArray = new JSONArray(detManoObraList);
            for (int i = 0; i < jsonArray.length(); i++) {
                JSONObject jsonObject = new JSONObject(jsonArray.get(0).toString());
                TblDetManoObra detManoObra = new TblDetManoObra();
                detManoObra.setDetalleFacturaReparacion(tblDetFacturaReparacion);
                detManoObra.setDemoNumHoras(jsonObject.getInt("cantidadHoras"));
                detManoObra.setDemoPrecioHora(jsonObject.getDouble("moPrecioHora"));
                detManoObraRepository.saveAndFlush(detManoObra);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void saveDetRepuestos(String detRepuestosList, TblDetFacturaReparacion tblDetFacturaReparacion) {
        try {
            JSONArray jsonArray = new JSONArray(detRepuestosList);
            for (int i = 0; i < jsonArray.length(); i++) {
                JSONObject jsonObject = new JSONObject(jsonArray.get(0).toString());
                TblRespuestos tblRespuestos = repuestosRepository.findById(jsonObject.getInt("idRepuestoAPIRestSQL")).get();
                TblDetRepuestos tblDetRepuestos = new TblDetRepuestos();
                tblDetRepuestos.setRepuestos(tblRespuestos);
                tblDetRepuestos.setDetalleFacturaReparacion(tblDetFacturaReparacion);
                tblDetRepuestos.setDetrCantidad(jsonObject.getInt("cantidad"));
                detRepuestosRepository.saveAndFlush(tblDetRepuestos);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
