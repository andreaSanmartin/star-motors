package com.develop.app.repository;

import com.develop.app.model.TblConcesionaria;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConcesionariaRepository extends JpaRepository<TblConcesionaria, Integer> {

    List<TblConcesionaria> findByComercializadora_IdComercializadora(Integer idComercializadora);
}
