package com.develop.app.service.implementation;

import com.develop.app.model.*;
import com.develop.app.repository.*;
import com.develop.app.service.VehiculoService;
import com.develop.app.tools.ValidacionesTools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class VehiculoServiceImp implements VehiculoService {

    @Autowired
    VehiculoRepository vehiculoRepository;

    @Autowired
    ConcesionariaRepository concesionariaRepository;

    @Autowired
    EjemplarRepository ejemplarRepository;

    @Autowired
    PermisosRepository permisosRepository;

    @Autowired
    ModeloRepository modeloRepository;

    @Autowired
    ComercializadoraRepository comercializadoraRepository;

    @Autowired
    MarcaRepository marcaRepository;

    @Autowired
    DetalleVentaRepository detalleVentaRepository;

    @Autowired
    ClienteRepository clienteRepository;

    @Autowired
    ValidacionesTools validacionesTools;

    @Override
    public TblVehiculo findById(Integer idVehiculo) {
        return vehiculoRepository.findById(idVehiculo).get();
    }

    @Override
    public List<TblEjemplar> getAllEjemplar(Integer idConcesionaria) {

        List<TblMarca> marcaList = marcaRepository.findAll();
        List<TblEjemplar> listaEjemplares = new ArrayList<TblEjemplar>();

        for (TblMarca marca : marcaList) {
            if (validacionesTools.validarPermisosVenta(idConcesionaria, marca.getIdMarca())) {
                listaEjemplares.addAll(getAllByMarca(marca.getIdMarca(), idConcesionaria));
            }
        }
        return listaEjemplares;
    }

    @Override
    public List<TblEjemplar> getAllByMarca(Integer idMarca, Integer idConcesionaria) {

        //Creamos la lista de ejemplares
        List<TblEjemplar> marcaEjemplaresList = new ArrayList<>();
        //Validamos si la concesionaria tiene permisos para vender vehiculos de la marca
        if (validacionesTools.validarPermisosVenta(idConcesionaria, idMarca)) {
            //Buscamos la lista de modelos por marca
            List<TblModelo> modeloList = modeloRepository.findByMarca(marcaRepository.findById(idMarca).get());
            //Corremos la lista de modelos
            for (TblModelo modelo : modeloList) {
                //Llenamos la lista de ejemplares
                marcaEjemplaresList.addAll(ejemplarRepository.findByModelo(modelo));
            }
        }
        return marcaEjemplaresList;
    }

    @Override
    public List<TblEjemplar> getAllByModelo(Integer idModelo, Integer idConcesionaria) {

        //Buscamos el modelo
        TblModelo modelo = modeloRepository.findById(idModelo).get();
        //Cremoas la lista de ejemplares vacia
        List<TblEjemplar> tblEjemplarList = new ArrayList<>();
        //Validamos permisos de venta
        if (validacionesTools.validarPermisosVenta(idConcesionaria, modelo.getMarca().getIdMarca())) {
            //Llenamor la lista de ejemplares
            tblEjemplarList = ejemplarRepository.findByModelo(modelo);
        }
        return tblEjemplarList;
    }

    @Override
    public List<TblEjemplar> getAllByAnio(Integer anio, Integer idConcesionaria) {
        //Buscamos todos los modelos por año
        List<TblModelo> modeloList = modeloRepository.findByModAnio(anio);
        //Creamos la lista para guardar ejemplares
        List<TblEjemplar> listaEjemplares = new ArrayList<>();
        //Corremos un bucle para validar si tiene permisos de venta
        for (TblModelo modelo : modeloList) {
            if (validacionesTools.validarPermisosVenta(idConcesionaria, modelo.getMarca().getIdMarca())) {
                listaEjemplares.addAll(ejemplarRepository.findByModelo(modelo));
            }
        }
        return listaEjemplares;
    }

    @Override
    public List<TblMarca> getAllMarca(Integer idConcesionaria) {

        //Obtenemos todas las marcas
        List<TblMarca> tblMarcaList = marcaRepository.findAll();
        //Validamos los permisos de venta y removemos si no tiene
        tblMarcaList.removeIf(marca -> !validacionesTools.validarPermisosVenta(idConcesionaria, marca.getIdMarca()));
        return tblMarcaList;
    }

    @Override
    public List<TblModelo> getAllModelo(Integer idConcesionaria) {
        //Buscamos todos los modelos
        List<TblModelo> modeloList = modeloRepository.findAll();
        //Validamos permisos y removemos si no tiene
        modeloList.removeIf(modelo -> !validacionesTools.validarPermisosVenta(idConcesionaria, modelo.getMarca().getIdMarca()));
        return modeloList;
    }

    @Override
    public List<TblVehiculo> getVehiculoByClient(Integer idCliente) {
        if (idCliente != 0) {
            List<TblVehiculo> tblVehiculoList = new ArrayList<>();
            List<TblDetalleVenta> tblDetalleVentas = detalleVentaRepository.findByEncabezadoVenta_Cliente(clienteRepository.findById(idCliente).get());
            for (TblDetalleVenta detalleVenta : tblDetalleVentas) {
                tblVehiculoList.add(detalleVenta.getVehiculo());
            }
            return tblVehiculoList;
        }
        return null;
    }

    @Override
    public List<TblEjemplar> getListEjemplarById(Integer[] listEjemplarId) {

        if (listEjemplarId.length != 0) {
            return ejemplarRepository.findByIdEjemplarIn(listEjemplarId);
        }

        return null;
    }

    @Override
    public TblEjemplar getEjemplarById(Integer idEjemplar) {
        return ejemplarRepository.findById(idEjemplar).get();
    }

    @Override
    public ResponseEntity<?> findDisponibleByIdEjemplar(Integer idEjemplar) {
        List<TblVehiculo> tblVehiculoList = vehiculoRepository.findDisponibleByEjemplar(idEjemplar);
        if (tblVehiculoList.size() <= 0) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(tblVehiculoList.get(0), HttpStatus.OK);
        }
    }

    @Override
    public List<TblModelo> findModeloByMarca(Integer idMarca) {
        return modeloRepository.findByMarca(marcaRepository.findById(idMarca).get());
    }

    @Override
    public List<TblVehiculo> getAllfindById(Integer[] idVehiculo) {
        return vehiculoRepository.findTblVehiculoByIdVehiculoIn(idVehiculo);
    }

    @Override
    public List<TblVehiculo> listVehiculoByNombreModelo(String modNombre, Integer[] listIdVehiculo, Integer idConcesionaria) {
        return vehiculoRepository.findByEjemplar_Modelo_ModNombreAndIdVehiculoInAndAndConcesionaria_IdConcesionaria(modNombre, listIdVehiculo, idConcesionaria);
    }

    @Override
    public List<TblVehiculo> listEjemplaresByAnio(Integer anio, Integer[] listIdVehiculos) {
        return vehiculoRepository.findByIdVehiculoInAndEjemplar_Modelo_ModAnio(listIdVehiculos, anio);
    }

}
