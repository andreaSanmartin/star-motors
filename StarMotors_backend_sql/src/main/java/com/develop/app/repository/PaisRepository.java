package com.develop.app.repository;

import com.develop.app.model.TblPais;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaisRepository extends JpaRepository<TblPais, Integer> {
}
