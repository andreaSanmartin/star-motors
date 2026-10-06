package com.develop.app.service.implementation;

import com.develop.app.Enums.RequestStatusEnums;
import com.develop.app.model.*;
import com.develop.app.repository.GarantiasRepository;
import com.develop.app.service.TallerService;
import com.develop.app.tools.EmpleadoTools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TallerServiceImp implements TallerService {

    @Autowired
    GarantiasRepository garantiasRepository;

    @Autowired
    EmpleadoTools empleadoTools;

    @Override
    public ResponseEntity<?> postSolicitudRepuestos(Integer idGarantia, Integer idEmpleadoSolicitaAPIRestSQL, String detalle, List<Repuestos> repuestosList, String fecha) {
        if (idGarantia != 0) {
            Garantia garantia = garantiasRepository.findById(idGarantia.longValue()).get();

            SolicitudRepuestos solicitudRepuestos = new SolicitudRepuestos();
            solicitudRepuestos.setRepuestosList(repuestosList);
            solicitudRepuestos.setEmpleadoSolicitaRepuestos(empleadoTools.findEmpleadoByIdAPIRestSQL(idEmpleadoSolicitaAPIRestSQL));
            solicitudRepuestos.setSrDetalle(detalle);
            solicitudRepuestos.setSrEstado(RequestStatusEnums.PENDIENTE.idStatus);
            solicitudRepuestos.setIdGarantia(idGarantia);
            solicitudRepuestos.setSrFechaSolicitud(fecha);

            //Validamos si existe el informe de reparacion inicial creado
            if (garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().getInformeReparacionTaller() == null) {
                //Inicializamos el informe de reparacion inicial
                garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().setInformeReparacionTaller(new InformeReparacionTaller());
                //Inicializamos la lista de solicitudes de repuestos
                garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().getInformeReparacionTaller().setSolicitudRepuestos(new ArrayList<>());
                //Actualizamos el estado del orden de reparacion
                garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().setRepEstado(RequestStatusEnums.PROCESADO.idStatus);
            } else if (garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().getInformeReparacionTaller().getSolicitudRepuestos() == null) {
                //Inicializamos la lista de solicitudes
                garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().getInformeReparacionTaller().setSolicitudRepuestos(new ArrayList<>());
            }
            //Agregamos la nueva solicitud de repuestos
            garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().getInformeReparacionTaller().getSolicitudRepuestos().add(solicitudRepuestos);

            return new ResponseEntity<>(garantiasRepository.save(garantia), HttpStatus.CREATED);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @Override
    public List<Garantia> listSolicitudRepuestosByStatus(Integer idConcesionaria, Integer estado) {
        return garantiasRepository.listGarantiasWithPartsRequestsByStatus(idConcesionaria, estado);
    }

    @Override
    public ResponseEntity<?> updateStatusSolicitudRepuestos(Integer idGarantia, Integer estado, Integer indexSolicitudRepuestos, Integer idEmpleadoDespAPIRestSQL, String fecha) {
        if (idGarantia != 0) {
            Garantia garantia = garantiasRepository.findById(idGarantia.longValue()).get();

            garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().getInformeReparacionTaller().getSolicitudRepuestos().get(indexSolicitudRepuestos).setEmpleadoDespachaRepuestos(empleadoTools.findEmpleadoByIdAPIRestSQL(idEmpleadoDespAPIRestSQL));
            garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().getInformeReparacionTaller().getSolicitudRepuestos().get(indexSolicitudRepuestos).setSrEstado(estado);
            garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().getInformeReparacionTaller().getSolicitudRepuestos().get(indexSolicitudRepuestos).setSrFechaDespacho(fecha);
            return new ResponseEntity<>(garantiasRepository.save(garantia), HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @Override
    public ResponseEntity<?> postInformeReparacion(Integer idGarantia, String fecha, String descripcion, List<ManoObra> manoObraList, Integer idEmpleadoCreaAPIRestSQL) {
        if (idGarantia != 0) {
            //Buscamos el documento de garantia
            Garantia garantia = garantiasRepository.findById(idGarantia.longValue()).get();

            if (garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().getInformeReparacionTaller() == null) {
                //Inicializamos el informe
                garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().setInformeReparacionTaller(new InformeReparacionTaller());
            }
            //Llenamos el informe
            garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().getInformeReparacionTaller().setManoObraList(manoObraList);
            garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().getInformeReparacionTaller().setIreFecha(fecha);
            garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().getInformeReparacionTaller().setIreDescripcion(descripcion);
            garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().getInformeReparacionTaller().setEmpleado(empleadoTools.findEmpleadoByIdAPIRestSQL(idEmpleadoCreaAPIRestSQL));
            garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().getInformeReparacionTaller().setIreEstado(RequestStatusEnums.PENDIENTE.idStatus);

            return new ResponseEntity<>(garantiasRepository.save(garantia), HttpStatus.CREATED);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @Override
    public List<Garantia> listInformeReparacionByStatus(Integer idConcesionaria, Integer estado) {
        if (idConcesionaria != 0 && estado != 0) {
            return garantiasRepository.findByIdConcesionariaAndReclamo_InformeProformaReparacion_OrdenReparacion_InformeReparacionTaller_IreEstado(idConcesionaria, estado);
        }
        return null;
    }

    @Override
    public ResponseEntity<?> updateManoObra(Integer idGarantia, Integer idEmpleadoDespAPIRestSQL, Integer moHoras, Double moPrecioHora) {
        if (idGarantia != 0) {
            Garantia garantia = garantiasRepository.findById(idGarantia.longValue()).get();

            if(garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().getInformeReparacionTaller() == null){
                garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().setInformeReparacionTaller(new InformeReparacionTaller());
                List<ManoObra> mano_new = new ArrayList<ManoObra>();
                garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().getInformeReparacionTaller().setManoObraList(mano_new);
            }
            else if (garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().getInformeReparacionTaller().getManoObraList() == null){
                List<ManoObra> mano_new = new ArrayList<ManoObra>();
                garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().getInformeReparacionTaller().setManoObraList(mano_new);
            }  
     
            Empleado empleado = empleadoTools.findEmpleadoByIdAPIRestSQL(idEmpleadoDespAPIRestSQL);
            List<ManoObra> manoList = new ArrayList<>();
            ManoObra mano = new ManoObra();
            mano.setCantidadHoras(moHoras);
            mano.setMoPrecioHora(moPrecioHora);
            mano.setMoHoras(moHoras);
            mano.setEmpleadoManoObra(empleado);
            manoList.add(mano);
            List<ManoObra> mano_ = garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().getInformeReparacionTaller().getManoObraList();
            mano_.add(mano);
            garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().getInformeReparacionTaller().setManoObraList(mano_);

            return new ResponseEntity<>(garantiasRepository.save(garantia), HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @Override
    public ResponseEntity<?> updateStatusInformeReparacion(Integer idGarantia, Integer status) {
        if (idGarantia != 0) {
            Garantia garantia = garantiasRepository.findById(idGarantia.longValue()).get();
            garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().getInformeReparacionTaller().setIreEstado(status);
            return new ResponseEntity<>(garantiasRepository.save(garantia), HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
