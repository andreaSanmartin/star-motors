package com.develop.app.controller;

import com.develop.app.model.TblEjemplar;
import com.develop.app.model.TblMarca;
import com.develop.app.model.TblModelo;
import com.develop.app.model.TblVehiculo;
import com.develop.app.service.VehiculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class VehiculoController {

    @Autowired
    VehiculoService vehiculoService;

    @GetMapping(value = "/vehiculo/findById")
    public TblVehiculo findVehiculoById(@RequestParam(value = "idVehiculo") Integer idVehiculo) {
        return vehiculoService.findById(idVehiculo);
    }

    @GetMapping(value = "/vehiculo/listEjemplares")
    public List<TblEjemplar> listEjemplares(@RequestParam(value = "idConcesionaria") Integer idConcesionaria) {
        return vehiculoService.getAllEjemplar(idConcesionaria);
    }

    @GetMapping(value = "/vehiculo/listEjemplaresByMarca")
    public List<TblEjemplar> listEjemplaresByMarca(@RequestParam(value = "idMarca") Integer idMarca, @RequestParam(value = "idConcesionaria") Integer idConcesionaria) {
        return vehiculoService.getAllByMarca(idMarca, idConcesionaria);
    }

    @GetMapping(value = "/vehiculo/listEjemplaresByModelo")
    public List<TblEjemplar> listEjemplaresByModelo(@RequestParam(value = "idConcesionaria") Integer idConcesionaria, @RequestParam(value = "idModelo") Integer idModelo) {
        return vehiculoService.getAllByModelo(idModelo, idConcesionaria);
    }

    @GetMapping(value = "/vehiculo/listEjemplaresByAnio")
    public List<TblEjemplar> listEjemplaresByAnio(@RequestParam(value =  "idConcesionaria") Integer idConcesionaria, @RequestParam(value = "anio") Integer anio){
        return vehiculoService.getAllByAnio(anio, idConcesionaria);
    }

    @GetMapping(value = "/marca/getAll")
    public List<TblMarca> listMarcas(@RequestParam(value = "idConcesionaria") Integer idConcesionaria){
        return vehiculoService.getAllMarca(idConcesionaria);
    }

    @GetMapping(value = "/modelo/getAll")
    public List<TblModelo> listModelos(@RequestParam(value = "idConcesionaria") Integer idConcesionaria){
        return vehiculoService.getAllModelo(idConcesionaria);
    }

    @GetMapping("/vehiculo/getByClient")
    public List<TblVehiculo> listVehiculosByClient(@RequestParam("idCliente") Integer idCLiente){
        return vehiculoService.getVehiculoByClient(idCLiente);
    }

    @GetMapping("/vehiculo/listEjemplaresById")
    public List<TblEjemplar> listEjemplaresById(@RequestParam(value="listEjemplarId") Integer[] listEjemplarId){
        return vehiculoService.getListEjemplarById(listEjemplarId);
    }

    @GetMapping(value = "/vehiculo/findEjemplarById")
    public TblEjemplar findEjemplarById(@RequestParam(value = "idEjemplar") Integer idEjemplar){
        return vehiculoService.getEjemplarById(idEjemplar);
    }

    @GetMapping(value = "/vehiculo/findDisponibleByEjemplar")
    public ResponseEntity<?> findVehiculoDisponibleByIdEjemplar(@RequestParam(value = "idEjemplar") Integer idEjemplar){
        return vehiculoService.findDisponibleByIdEjemplar(idEjemplar);
    }

    @GetMapping(value = "/modelos/findByMarca")
    public  List<TblModelo> findModeloByMarca(@RequestParam(value = "idMarca") Integer idMarca){
        return vehiculoService.findModeloByMarca(idMarca);
    }

    @GetMapping(value = "/vehiculo/listVehiculoFindById")
    public  List<TblVehiculo> listVehiculofindById(@RequestParam(value = "idVehiculo") Integer[] idVehiculo){
        return vehiculoService.getAllfindById(idVehiculo);
    }

    @GetMapping(value = "/vehiculo/listByNombreModelo")
    public List<TblVehiculo> listVehiculoByNombreModelo(@RequestParam(value = "modNombre") String modNombre,
                                                        @RequestParam(value = "listIdVehiculo")Integer[] listIdVehiculo,
                                                        @RequestParam(value = "idConcesionaria") Integer idConcesionaria){
        return vehiculoService.listVehiculoByNombreModelo(modNombre, listIdVehiculo, idConcesionaria);
    }

    @GetMapping(value = "/vehiculo/listByAnio")
    public List<TblVehiculo> listEjemplaresByAnio (@RequestParam(value = "anio") Integer anio,
                                                   @RequestParam(value = "listIdVehiculos") Integer[] listIdVehiculos){
        return vehiculoService.listEjemplaresByAnio(anio, listIdVehiculos);
    }
}
