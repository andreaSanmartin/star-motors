package com.develop.app.repository;

import com.develop.app.model.Cotizaciones;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface CotizacionesRepository extends MongoRepository<Cotizaciones, Integer> {

    List<Cotizaciones> findByIdConcesionaria(int idConcesionaria);

    List<Cotizaciones> findByIdEjemplarAndIdConcesionaria(int idEjemplar, int idConcesionaria);

    List<Cotizaciones> findByCliente_PerCedulaAndIdConcesionariaAndCotEstado(String cedula, int idConcesionaria, int estado);

    List<Cotizaciones> findByCotEstadoAndIdConcesionaria(int estado, int idConcesionaria);

    //Filtrar el max id de las cotizaciones
    @Query(value = "{}", sort = "{ _id : -1 }")
    List<Cotizaciones> findMaxId();
}
