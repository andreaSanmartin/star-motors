package com.develop.app.repository;

import com.develop.app.model.TblEjemplar;
import com.develop.app.model.TblModelo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EjemplarRepository extends JpaRepository<TblEjemplar, Integer> {

    List<TblEjemplar> findByModelo(TblModelo modelo);

    List<TblEjemplar> findByIdEjemplarIn(Integer[] listEjemplarId);

    TblEjemplar findByIdEjemplar(int idEjemplar);
}
