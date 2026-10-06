package com.develop.app.service.implementation;

import com.develop.app.Enums.RequestStatusEnums;
import com.develop.app.model.Cliente;
import com.develop.app.model.Cotizaciones;
import com.develop.app.repository.CotizacionesRepository;
import com.develop.app.service.CotizacionesService;
import com.develop.app.tools.EmpleadoTools;
import com.develop.app.tools.GlobalTools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CotizacionesServiceImp implements CotizacionesService {

    @Autowired
    CotizacionesRepository cotizacionesRepository;

    @Autowired
    EmpleadoTools empleadoTools;

    @Autowired
    GlobalTools globalTools;

    @Override
    public ResponseEntity<?> postCotizacion(Cotizaciones cotizacion) {
        return new ResponseEntity<>(cotizacionesRepository.save(cotizacion), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<?> postCotizacion(String cotFecha, String cotDescripcion, Integer idConcesionaria, Integer idEjemplar, String perCedula, String perNombre, String perApellido, String perEmail, String perFechaNacimiento, String perTelefono) {

        Cliente cliente = new Cliente();
        cliente.setPerCedula(perCedula);
        cliente.setPerNombre(perNombre);
        cliente.setPerApellido(perApellido);
        cliente.setPerEmail(perEmail);
        cliente.setPerTelefono(perTelefono);
        cliente.setPerFechaNacimiento(perFechaNacimiento);

        Cotizaciones cotizacion = new Cotizaciones();
        List<Cotizaciones> idCotizacion = cotizacionesRepository.findMaxId();
        if(idCotizacion.isEmpty()){
            cotizacion.setIdCotizacion(Long.parseLong("1"));
        }else{
            cotizacion.setIdCotizacion(idCotizacion.get(0).getIdCotizacion()+1);
        }
        cotizacion.setCliente(cliente);
        cotizacion.setCotFecha(cotFecha);
        cotizacion.setCotDescripcion(cotDescripcion);
        cotizacion.setCotEstado(RequestStatusEnums.PENDIENTE.idStatus);
        cotizacion.setIdEjemplar(idEjemplar);

        cotizacion.setIdConcesionaria(idConcesionaria);

        return new ResponseEntity<>(cotizacionesRepository.save(cotizacion), HttpStatus.CREATED);
    }

    @Override
    public List<Cotizaciones> listAll(Integer idConcesionaria) {
        return cotizacionesRepository.findByIdConcesionaria(idConcesionaria);
    }

    @Override
    public ResponseEntity<?> updateStatusCotizacion(Integer idCotizacion, Integer estado, Integer idEmpleadoAPIRestSQL) {
        Cotizaciones cotizacion = cotizacionesRepository.findById(idCotizacion).get();
        cotizacion.setCotEstado(estado);
        cotizacion.setEmpleado(empleadoTools.findEmpleadoByIdAPIRestSQL(idEmpleadoAPIRestSQL));
        return new ResponseEntity<>(cotizacionesRepository.save(cotizacion), HttpStatus.OK);
    }

    @Override
    public List<Cotizaciones> findByIdEjemplar(Integer idEjemplar, Integer idConcesionaria) {
        return cotizacionesRepository.findByIdEjemplarAndIdConcesionaria(idEjemplar, idConcesionaria);
    }

    @Override
    public List<Cotizaciones> findByCedulaCliente(String cedula, Integer idConcesionaria, Integer estado) {
        return cotizacionesRepository.findByCliente_PerCedulaAndIdConcesionariaAndCotEstado(cedula, idConcesionaria, estado);
    }

    @Override
    public List<Cotizaciones> findByEstado(Integer estado, Integer idConcesionaria) {
        return cotizacionesRepository.findByCotEstadoAndIdConcesionaria(estado, idConcesionaria);
    }

    @Override
    public Cotizaciones findByById(Integer idCotizacion) {
        return cotizacionesRepository.findById(idCotizacion).get();
    }

}
