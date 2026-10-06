package com.develop.app.service;

import com.develop.app.model.TblConcesionaria;

import java.util.List;

public interface ConcesionariaService {

    TblConcesionaria findById(Integer id);

    List<TblConcesionaria> findByIdComercializadora(Integer idComercializadora);
}
