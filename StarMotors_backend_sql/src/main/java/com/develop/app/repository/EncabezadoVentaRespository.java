package com.develop.app.repository;

import com.develop.app.model.TblCliente;
import com.develop.app.model.TblEncabezadoVenta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EncabezadoVentaRespository extends JpaRepository<TblEncabezadoVenta, Integer>{

    List<TblEncabezadoVenta> findByCliente(TblCliente cliente);

    @Query("select max(ev.idEncabezadoVenta) from TblEncabezadoVenta ev")
    Integer findMaxId();

    List<TblEncabezadoVenta> findByConcesionaria_IdConcesionariaAndIdCotizacionPreviaIsAfter(Integer idConcesionaria, Integer idCotizacionBase);
}
