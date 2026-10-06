package com.develop.app.repository;

import com.develop.app.model.TblDetRepuestos;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DetRepuestosRepository extends JpaRepository<TblDetRepuestos, Integer> {
}
