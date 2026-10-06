package com.develop.app.repository;

import com.develop.app.model.TblComercializadora;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComercializadoraRepository extends JpaRepository<TblComercializadora, Integer> {
	
}
