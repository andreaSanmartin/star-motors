package com.develop.app.service;

import com.develop.app.model.Garantia;
import com.develop.app.model.ManoObra;
import com.develop.app.model.Repuestos;
import com.develop.app.model.SolicitudRepuestos;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface GarantiasService {

    Garantia findById(Integer idGarantia);

    ResponseEntity<?> postSolicitudGarantia(String garFecha, int idVehiculo, int idCliente, String garDescripcion, int idConcesionaria, String[] fallosSistemasVehiculos);

    ResponseEntity<?> updateSolicitudGarantia(Integer idGarantia , Integer idEmpleadoApiSql, Integer IdFacturaReparacionApiSql);

    List<Garantia> listSolicitudesGarantia(Integer idConcesionaria);

    ResponseEntity<?> updateEstadoGarantia(Integer idGarantia, Integer Estado, Integer idEmpleadoAPIRestSQ);

    List<Garantia> listSolicitudesGarantiaByStatus(Integer idConcesionaria, Integer estado);

    List<Garantia> listSolicitudesGarantiaByClient(Integer idConcesionaria, Integer idCliente);

    List<Garantia> listSolicitudesGarantiaByClientAndVehiculo(Integer idConcesionaria, Integer idCliente, Integer idVehiculo);

    List<Garantia> listGarantiaExists(boolean exists);
    
    List<Garantia> listInformeTallerExists();
    
    Integer countGarantias(Integer ListIdVehiculo);
    
    Integer countInformeTallerExists(Integer idVehiculo);
    
    List<Garantia> findGarantiaByAnio(String fechaInicio, String fechaFinal);
}
