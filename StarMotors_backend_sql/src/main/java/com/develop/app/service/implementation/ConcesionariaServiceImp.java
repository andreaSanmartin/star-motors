package com.develop.app.service.implementation;

import com.develop.app.model.TblConcesionaria;
import com.develop.app.repository.ConcesionariaRepository;
import com.develop.app.service.ConcesionariaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConcesionariaServiceImp implements ConcesionariaService {

    @Autowired
    ConcesionariaRepository concesionariaRepository;


    @Override
    public TblConcesionaria findById(Integer id) {
        return concesionariaRepository.findById(id).get();
    }

    @Override
    public List<TblConcesionaria> findByIdComercializadora(Integer idComercializadora) {
        return concesionariaRepository.findByComercializadora_IdComercializadora(idComercializadora);
    }
}
