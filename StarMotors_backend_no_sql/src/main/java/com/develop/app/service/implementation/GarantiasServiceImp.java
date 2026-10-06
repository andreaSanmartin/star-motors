package com.develop.app.service.implementation;

import com.develop.app.Enums.RequestStatusEnums;
import com.develop.app.model.*;
import com.develop.app.repository.GarantiasRepository;
import com.develop.app.service.GarantiasService;
import com.develop.app.tools.EmpleadoTools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GarantiasServiceImp implements GarantiasService {

    @Autowired
    GarantiasRepository garantiasRepository;

    @Autowired
    EmpleadoTools empleadoTools;

    @Override
    public Garantia findById(Integer idGarantia) {
        if (idGarantia != 0) {
            return garantiasRepository.findById(idGarantia.longValue()).get();
        }
        return null;
    }

    @Override
    public ResponseEntity<?> postSolicitudGarantia(String garFecha, int idVehiculo, int idCliente, String garDescripcion, int idConcesionaria, String[] fallosSistemasVehiculos) {

        Garantia garantia = new Garantia();
        garantia.setGarFecha(garFecha);
        garantia.setIdCliente(idCliente);
        garantia.setIdVehiculo(idVehiculo);
        garantia.setIdConcesionaria(idConcesionaria);
        garantia.setGarEstado(RequestStatusEnums.PENDIENTE.idStatus);
        garantia.setGarDescripcion(garDescripcion);
        garantia.setFallosSistemasVehiculo(fallosSistemasVehiculos);

        List<Garantia> idGarantia = garantiasRepository.findMaxId();

        if (idGarantia.isEmpty()) {
            garantia.setIdGarantia(Long.parseLong("1"));
        } else {
            garantia.setIdGarantia(idGarantia.get(0).getIdGarantia() + 1);
        }

        return new ResponseEntity<>(garantiasRepository.save(garantia), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<?> updateSolicitudGarantia(Integer idGarantia, Integer idEmpleadoApiSql, Integer IdFacturaReparacionApiSql) {

        if (idGarantia != null){

            Garantia Garantia = garantiasRepository.findById(idGarantia.longValue()).get();

            //Garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().getInformeReparacionTaller().getInformeReparacionComercializadora().setEmpleadoActualizaInformeComercializadora(new Empleado());
            Garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().getInformeReparacionTaller().getInformeReparacionComercializadora().setEmpleadoActualizaInformeComercializadora(empleadoTools.findEmpleadoByIdAPIRestSQL(idEmpleadoApiSql));
            Garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().getInformeReparacionTaller().getInformeReparacionComercializadora().setIdFacturacionApiSql(IdFacturaReparacionApiSql);
            Garantia.setGarEstado(RequestStatusEnums.FINALIZADO.idStatus);
            Garantia.getReclamo().setRecEstado(RequestStatusEnums.FINALIZADO.idStatus);
            Garantia.getReclamo().getInformeProformaReparacion().setPrEstado(RequestStatusEnums.FINALIZADO.idStatus);
            Garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().setRepEstado(RequestStatusEnums.FINALIZADO.idStatus);
            Garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().getInformeReparacionTaller().setIreEstado(RequestStatusEnums.FINALIZADO.idStatus);
            Garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().getInformeReparacionTaller().getInformeReparacionComercializadora().setIrcEstado(RequestStatusEnums.FINALIZADO.idStatus);
            return new ResponseEntity<>(garantiasRepository.save(Garantia), HttpStatus.CREATED);
        }else{
            return new ResponseEntity<>( HttpStatus.CONFLICT);
        }
    }


    @Override
    public List<Garantia> listSolicitudesGarantia(Integer idConcesionaria) {
        return garantiasRepository.findByIdConcesionariaAndGarEstado(idConcesionaria, RequestStatusEnums.PENDIENTE.idStatus);
    }

    @Override
    public ResponseEntity<?> updateEstadoGarantia(Integer idGarantia, Integer Estado, Integer idEmpleadoAPIRestSQL) {

        Garantia solicitudGarantia = garantiasRepository.findById(idGarantia.longValue()).get();
        solicitudGarantia.setGarEstado(Estado);
        solicitudGarantia.setEmpleadoAtendioGarantia(empleadoTools.findEmpleadoByIdAPIRestSQL(idEmpleadoAPIRestSQL));
        return new ResponseEntity<>(garantiasRepository.save(solicitudGarantia), HttpStatus.ACCEPTED);
    }

    @Override
    public List<Garantia> listSolicitudesGarantiaByStatus(Integer idConcesionaria, Integer estado) {
        return garantiasRepository.findByIdConcesionariaAndGarEstado(idConcesionaria, estado);
    }

    @Override
    public List<Garantia> listSolicitudesGarantiaByClient(Integer idConcesionaria, Integer idCliente) {
        return garantiasRepository.findByIdConcesionariaAndIdCliente(idConcesionaria, idCliente);
    }

    @Override
    public List<Garantia> listSolicitudesGarantiaByClientAndVehiculo(Integer idConcesionaria, Integer idCliente, Integer idVehiculo) {
        return garantiasRepository.findByIdConcesionariaAndIdClienteAndIdVehiculo(idConcesionaria, idCliente, idVehiculo);
    }

    @Override
    public List<Garantia> listGarantiaExists(boolean exists) {
        return garantiasRepository.findBygarantiaExist(exists);
    }

	@Override
	public Integer countGarantias(Integer ListIdVehiculo) {
		return garantiasRepository.countGarantias(ListIdVehiculo);
	}
	
	@Override
	public Integer countInformeTallerExists(Integer idVehiculo) {
		return garantiasRepository.countInformeTallerExists(idVehiculo);
	}

	@Override
	public List<Garantia> listInformeTallerExists() {
		return garantiasRepository.findByInformeTallerExists(true);
	}

	@Override
	public List<Garantia> findGarantiaByAnio(String fechaInicio, String fechaFinal) {
		return garantiasRepository.findGarantiaByAnio(fechaInicio, fechaFinal);
	}


}
