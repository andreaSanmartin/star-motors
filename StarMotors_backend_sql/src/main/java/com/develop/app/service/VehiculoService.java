package com.develop.app.service;

import com.develop.app.model.TblEjemplar;
import com.develop.app.model.TblMarca;
import com.develop.app.model.TblModelo;
import com.develop.app.model.TblVehiculo;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface VehiculoService {

    TblVehiculo findById(Integer idVehiculo);

    List<TblEjemplar> getAllEjemplar(Integer idConcesionaria);
    List<TblEjemplar> getAllByMarca(Integer idMarca, Integer idConcesionaria);
    List<TblEjemplar> getAllByModelo(Integer idModelo, Integer idConcesionaria);
    List<TblEjemplar> getAllByAnio(Integer anio, Integer idConcesionaria);

    List<TblMarca> getAllMarca(Integer idConcesionaria);
    List<TblModelo> getAllModelo(Integer idConcesionaria);
    List<TblVehiculo> getVehiculoByClient(Integer idCliente);

    List<TblEjemplar> getListEjemplarById(Integer[] listEjemplarId);

    TblEjemplar getEjemplarById(Integer idEjemplar);

    ResponseEntity<?> findDisponibleByIdEjemplar(Integer idEjemplar);

    List<TblModelo> findModeloByMarca(Integer idMarca);

    List<TblVehiculo> getAllfindById(Integer [] idVehiculo);

    List<TblVehiculo> listVehiculoByNombreModelo(String modNombre, Integer[] listIdVehiculo, Integer idConcesionaria);

    List<TblVehiculo> listEjemplaresByAnio(Integer anio, Integer[] listIdVehiculos);
}
