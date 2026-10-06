package com.develop.app.repository;

import com.develop.app.model.TblComercializadora;
import com.develop.app.model.TblMarca;
import com.develop.app.model.TblPermisos;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PermisosRepository extends JpaRepository<TblPermisos, Integer> {

    List<TblPermisos> findByComercializadora(TblComercializadora comercializadora);
    TblPermisos findByComercializadoraAndMarca(TblComercializadora comercializadora, TblMarca marca);
}
