package com.develop.app.repository;

import com.develop.app.model.TblConcesionaria;
import com.develop.app.model.TblVehiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface VehiculoRepository extends JpaRepository<TblVehiculo, Integer> {

    TblVehiculo findByVehNumChasis(String veh_numChasis);
    List<TblVehiculo> findByConcesionaria(TblConcesionaria tblConcesionaria);

    List<TblVehiculo> findTblVehiculoByIdVehiculoIn(Integer[] idVehiculo);

    @Query("select v from TblVehiculo v join TblEjemplar e on e.idEjemplar = v.ejemplar.idEjemplar where v.idVehiculo not in (select tdv.vehiculo.idVehiculo from TblDetalleVenta tdv) and e.idEjemplar = :idEjemplar")
    List<TblVehiculo> findDisponibleByEjemplar(@RequestParam int idEjemplar);

    List<TblVehiculo> findByEjemplar_Modelo_ModNombreAndIdVehiculoInAndAndConcesionaria_IdConcesionaria(String modNombre, Integer[] listIdVehiculo, Integer idConcesionaria);

    List<TblVehiculo> findByIdVehiculoInAndEjemplar_Modelo_ModAnio(Integer[] listIdVehiculo, Integer anio);
}
