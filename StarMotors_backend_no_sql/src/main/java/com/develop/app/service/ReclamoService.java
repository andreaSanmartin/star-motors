package com.develop.app.service;

import com.develop.app.model.Garantia;
import com.develop.app.model.ManoObra;
import com.develop.app.model.Repuestos;

import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ReclamoService {

    ResponseEntity<?> postReclamoGarantia(Integer idGarantia, String fecha, String descripcion, String[] razonesReclamo, String danio, Integer idEmpleadoAPIRestSQL);

    List<Garantia> listReclamoByStatus(Integer idConcesionaria, Integer estado);

    ResponseEntity<?> postInformeRechazoGarantia(Integer idGarantia, Integer idEmpleadoAPIRestSQL, String fecha, String descripcion);

    ResponseEntity<?> postInformeProformaReparacion(Integer idGarantia, String fecha, String detalle, Double subTotalManoObra, Double subTotalRepuestos, Integer idEmpleadoAPIRestSQL , String manoObraList, String repuestoList);

    List<Garantia> listInformeProformaReparacionByStatus(Integer idConcesionaria, Integer estado);


}
