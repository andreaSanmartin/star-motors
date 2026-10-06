package com.develop.app.service.implementation;

import com.develop.app.Enums.RequestStatusEnums;
import com.develop.app.model.Garantia;
import com.develop.app.model.InformeReparacionComercializadora;
import com.develop.app.model.OrdenReparacion;
import com.develop.app.repository.GarantiasRepository;
import com.develop.app.service.OrdenReparacionService;
import com.develop.app.tools.EmpleadoTools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrdenReparacionServiceImp implements OrdenReparacionService {

    @Autowired
    GarantiasRepository garantiasRepository;

    @Autowired
    EmpleadoTools empleadoTools;

    @Override
    public ResponseEntity<?> postOrdenReparacion(Integer idGarantia, String fecha, String descripcion, Integer idEmpleadoAPIRestSQL) {

        if (idGarantia != 0) {
            //Buscamos el docuemtno de la garantia
            Garantia garantia = garantiasRepository.findById(idGarantia.longValue()).get();
            //Creamos el orden de reparacion
            OrdenReparacion ordenReparacion = new OrdenReparacion();
            ordenReparacion.setOrFecha(fecha);
            ordenReparacion.setOrDescripcion(descripcion);
            ordenReparacion.setRepEstado(RequestStatusEnums.PENDIENTE.idStatus);
            ordenReparacion.setEmpleado(empleadoTools.findEmpleadoByIdAPIRestSQL(idEmpleadoAPIRestSQL));
            //Guardamos el orden de repacion
            garantia.getReclamo().getInformeProformaReparacion().setOrdenReparacion(ordenReparacion);
            //Actualizamos el estado de la proforma de reparacion enviada previamente
            garantia.getReclamo().getInformeProformaReparacion().setPrEstado(RequestStatusEnums.ACEPTADO.idStatus);
            //Guardamos el documento y retornamos el resultado
            return new ResponseEntity<>(garantiasRepository.save(garantia), HttpStatus.CREATED);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @Override
    public List<Garantia> listOrdenReparacionByStatus(Integer idConcesionaria, Integer estado) {
        return garantiasRepository.findByIdConcesionariaAndReclamo_InformeProformaReparacion_OrdenReparacion_RepEstado(idConcesionaria, estado);
    }

    @Override
    public ResponseEntity<?> postInformeReparacionComercializadora(Integer idGarantia, String fecha, String descripcion, Integer garantiaCubre, Integer idEmpleadoCreaAPIRestSQL) {

        if (idGarantia!=0){
            //Buscamos el documento garantia
            Garantia garantia = garantiasRepository.findById(idGarantia.longValue()).get();

            //Creamos el informe de reparacion de la comercializadora
            InformeReparacionComercializadora reparacionComercializadora = new InformeReparacionComercializadora();
            reparacionComercializadora.setIrcFecha(fecha);
            reparacionComercializadora.setIrcDescripcion(descripcion);
            reparacionComercializadora.setIrcGarantia(garantiaCubre);
            reparacionComercializadora.setEmpleadoCreaInformeComercializadora(empleadoTools.findEmpleadoByIdAPIRestSQL(idEmpleadoCreaAPIRestSQL));
            reparacionComercializadora.setIrcEstado(RequestStatusEnums.PENDIENTE.idStatus);

            //Guardamos el informe
            garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().getInformeReparacionTaller().setInformeReparacionComercializadora(reparacionComercializadora);

            //Actualizamos el estado del informe de reparacion del taller
            garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().getInformeReparacionTaller().setIreEstado(RequestStatusEnums.PROCESADO.idStatus);

            //Guardamos y retornamos
            return new ResponseEntity<>(garantiasRepository.save(garantia), HttpStatus.CREATED);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @Override
    public List<Garantia> listInformeReparacionComercializadora(Integer idConcesionaria, Integer estado) {

        //Validamos
        if(idConcesionaria!=0 && estado!=0){
            //Retornamos
            return garantiasRepository.findByIdConcesionariaAndReclamo_InformeProformaReparacion_OrdenReparacion_InformeReparacionTaller_InformeReparacionComercializadora_IrcEstado(idConcesionaria, estado);
        }
        return null;
    }
}
