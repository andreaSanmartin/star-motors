package com.develop.app.repository;

import com.develop.app.model.TblPersona;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonaRepository extends JpaRepository<TblPersona, Integer> {

    TblPersona findByIdPersona(int idpersona);
    TblPersona findByPerCedula(String perCedula);
}