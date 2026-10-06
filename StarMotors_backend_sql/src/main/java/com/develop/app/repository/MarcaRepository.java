package com.develop.app.repository;

import com.develop.app.model.TblMarca;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MarcaRepository extends JpaRepository<TblMarca, Integer> {
}
