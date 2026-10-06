package com.develop.app.repository;

import com.develop.app.model.Cotizaciones;
import com.develop.app.model.Garantia;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GarantiasRepository extends MongoRepository<Garantia, Long> {

    //Filtrar el max id de las garantias
    @Query(value = "{}", sort = "{ _id : -1 }")
    List<Garantia> findMaxId();

   @Query(value = "{'reclamo.informeProformaReparacion' : {'$exists' : ?0 }}")
    List<Garantia> findBygarantiaExist(boolean exists);
   
   @Query(value = "{'reclamo.informeProformaReparacion.ordenReparacion.informeReparacionTaller.informeReparacionComercializadora' : {'$exists' : ?0 }}")
   List<Garantia> findByInformeTallerExists(boolean exists);
   
   
   @Query(value = "{'idVehiculo': ?0}", count = true)
   Integer countGarantias(Integer ListidVehiculo);
   
   @Query(value = "{'$and': [{'reclamo.informeProformaReparacion.ordenReparacion.informeReparacionTaller.informeReparacionComercializadora' : {'$exists' : true }},{'idVehiculo': ?0}]}", count = true)
   Integer countInformeTallerExists(Integer idVehiculo);
   
   
   @Query(value = "{'$and':[{'reclamo.informeProformaReparacion.ordenReparacion.informeReparacionTaller.informeReparacionComercializadora.ircFecha': {$gte: ?0}},{'reclamo.informeProformaReparacion.ordenReparacion.informeReparacionTaller.informeReparacionComercializadora.ircFecha': {$lte: ?1}},{'reclamo.informeProformaReparacion.ordenReparacion.informeReparacionTaller.informeReparacionComercializadora' : {'$exists' : true }}]}")
   List<Garantia> findGarantiaByAnio(String fechaInicio, String fechaFinal);
   
   @Query(value = "{ 'idConcesionaria' : ?0, $and : [ { 'reclamo.informeProformaReparacion.ordenReparacion.informeReparacionTaller.solicitudRepuestos.0.srEstado' : ?1 } ] }")
   List<Garantia> listGarantiasWithPartsRequestsByStatus(Integer idConcesionaria, Integer estado);

    List<Garantia> findByIdConcesionariaAndGarEstado(int idConcesionaria, int estado);

    List<Garantia> findByIdConcesionariaAndIdCliente(int idConcesionaria, int idCliente);

    List<Garantia> findByIdConcesionariaAndIdClienteAndIdVehiculo(int idConcesionaria, int idCliente, int idVehiculo);

    List<Garantia> findByIdConcesionariaAndReclamo_RecEstado(int idConcesionaria, int estado);

    List<Garantia> findByIdConcesionariaAndReclamo_InformeProformaReparacionPrEstado(int idConcesionaria, int estado);

    List<Garantia> findByIdConcesionariaAndReclamo_InformeProformaReparacion_OrdenReparacion_RepEstado(int idConcesionaria, int estado);

    List<Garantia> findByIdConcesionariaAndReclamo_InformeProformaReparacion_OrdenReparacion_InformeReparacionTaller_IreEstado(int idConcesionaria, int estado);

    List<Garantia> findByIdConcesionariaAndReclamo_InformeProformaReparacion_OrdenReparacion_InformeReparacionTaller_InformeReparacionComercializadora_IrcEstado(int idConcesionaria, int estado);
}
