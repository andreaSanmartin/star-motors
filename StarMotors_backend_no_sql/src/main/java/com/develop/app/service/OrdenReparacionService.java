package com.develop.app.service;

import com.develop.app.model.Garantia;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface OrdenReparacionService {

    ResponseEntity<?> postOrdenReparacion(Integer idGarantia, String fecha, String descripcion, Integer idEmpleadoAPIRestSQL);

    List<Garantia> listOrdenReparacionByStatus(Integer idConcesionaria, Integer estado);

    ResponseEntity<?> postInformeReparacionComercializadora(Integer idGarantia, String fecha, String descripcion, Integer garantiaCubre, Integer idEmpleadoCreaAPIRestSQL);

    List<Garantia> listInformeReparacionComercializadora(Integer idConcesionaria, Integer estado);
}
