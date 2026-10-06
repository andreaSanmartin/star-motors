package com.develop.app.service;

import com.develop.app.model.Cotizaciones;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CotizacionesService {

    ResponseEntity<?> postCotizacion(Cotizaciones cotizacion);

    ResponseEntity<?> postCotizacion(String cotFecha, String cotDescripcion, Integer idConcesionaria, Integer idEjemplar, String perCedula, String perNombre, String perApellido, String perEmail, String perFechaNacimiento, String perTelefono);

    List<Cotizaciones> listAll(Integer idConcesionaria);

    ResponseEntity<?> updateStatusCotizacion(Integer idCotizacion, Integer estado, Integer idEmpleadoAPIRestSQL);

    List<Cotizaciones> findByIdEjemplar(Integer idEjemplar, Integer idConcesionaria);

    List<Cotizaciones> findByCedulaCliente(String cedula, Integer idConcesionaria, Integer estado);

    List<Cotizaciones> findByEstado(Integer estado, Integer idConcesionaria);

    Cotizaciones findByById(Integer idCotizacion);
}
