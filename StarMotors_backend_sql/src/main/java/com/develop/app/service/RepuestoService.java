package com.develop.app.service;

import com.develop.app.model.TblRespuestos;

import java.util.List;

public interface RepuestoService {

    TblRespuestos findById(Integer idRepuesto);
    List<TblRespuestos> listAllById(Integer[] listIdRepuestos);
    List<TblRespuestos> listAll();
    List<TblRespuestos> getAllByIdMarca (Integer idMarca, Integer idConcesionaria);

}
