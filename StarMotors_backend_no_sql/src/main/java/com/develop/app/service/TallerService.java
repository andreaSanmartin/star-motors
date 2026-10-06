package com.develop.app.service;

import com.develop.app.model.Garantia;
import com.develop.app.model.ManoObra;
import com.develop.app.model.Repuestos;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface TallerService {

    ResponseEntity<?> postSolicitudRepuestos(Integer idGarantia, Integer idEmpleadoSolicitaAPIRestSQL, String detalle, List<Repuestos> repuestosList, String fecha);

    List<Garantia> listSolicitudRepuestosByStatus(Integer idConcesionaria, Integer estado);

    ResponseEntity<?> updateStatusSolicitudRepuestos(Integer idGarantia, Integer estado, Integer indexSolicitudRepuestos, Integer idEmpleadoDespAPIRestSQL, String fecha);

    ResponseEntity<?> postInformeReparacion(Integer idGarantia, String fecha, String descripcion, List<ManoObra> manoObraList, Integer idEmpleadoCreaAPIRestSQL);

    List<Garantia> listInformeReparacionByStatus(Integer idConcesionaria, Integer estado);

    ResponseEntity<?> updateManoObra(Integer idGarantia, Integer idEmpleadoDespAPIRestSQL, Integer moHoras, Double moPrecioHora);

    ResponseEntity<?> updateStatusInformeReparacion(Integer idGarantia, Integer status);

}
