package com.develop.app.repository;

import com.develop.app.model.TblMarca;
import com.develop.app.model.TblRespuestos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RepuestosRepository extends JpaRepository<TblRespuestos, Integer> {
	
	List<TblRespuestos> findByMarca(TblMarca marca);
}
