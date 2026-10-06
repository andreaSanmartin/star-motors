package com.develop.app.repository;

import com.develop.app.model.TblMarca;
import com.develop.app.model.TblModelo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ModeloRepository extends JpaRepository<TblModelo, Integer> {

    List<TblModelo> findByMarca(TblMarca marca);
    List<TblModelo> findByModAnio(Integer anio);
}
