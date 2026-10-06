package com.develop.app.repository;

import com.develop.app.model.TblEncFacturaReparacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EncFacturaReparacionRepository extends JpaRepository<TblEncFacturaReparacion, Integer> {

    @Query("select max(er.idEncFacturaReparacion) from TblEncFacturaReparacion er")
    Integer findMaxId();

    List<TblEncFacturaReparacion> findByIdEncFacturaReparacionIn(Integer[] listIdFacturas);
}
