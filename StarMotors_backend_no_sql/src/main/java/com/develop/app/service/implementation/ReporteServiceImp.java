package com.develop.app.service.implementation;

import com.develop.app.Enums.RequestStatusEnums;
import com.develop.app.model.*;
import com.develop.app.repository.GarantiasRepository;
import com.develop.app.service.ReporteService;
import com.develop.app.tools.EmpleadoTools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReporteServiceImp implements ReporteService {

    @Autowired
    GarantiasRepository garantiasRepository;

    @Autowired
    EmpleadoTools empleadoTools;

    @Override
    public String reporteRepuestosMayorDemanda(Integer idConcesionaria) {

        List<Garantia> garantiaList;

        return null;
    }

    @Override
    public ResponseEntity<?> sobreCargarDatos() {

        //GARANTIA
        Garantia garantia = new Garantia();
        List<Garantia> idGarantia = garantiasRepository.findMaxId();
        if (idGarantia.isEmpty()) {
            garantia.setIdGarantia(Long.parseLong("1"));
        } else {
            garantia.setIdGarantia(idGarantia.get(0).getIdGarantia() + 1);
        }
        garantia.setGarFecha("10-12-2021");
        garantia.setIdCliente(5);
        garantia.setIdVehiculo(4);
        garantia.setIdConcesionaria(1);
        garantia.setGarEstado(RequestStatusEnums.PENDIENTE.idStatus);
        garantia.setGarDescripcion("Solicito que la concesionaria cubra los gastos de reparacion de mi vehiculo.");
        String[] fallos = {"Sistema de combustible, Sistema Hidraulico, Sistema de Frenos"};
        garantia.setFallosSistemasVehiculo(fallos);

        //RECLAMO
        Reclamo reclamo = new Reclamo();
        reclamo.setRecFecha("11-12-2021");
        reclamo.setRecDescripcion("El cliente solicita que se le cubra los gastos de la garantia, a presentado los falos del vehiculo");
        String[] razones = {"Fallo de Fabrica", " Sistema de energia con fallos" , "Fallos en todos los sitemas"};
        reclamo.setRazonesReclamo(razones);
        reclamo.setRecDanio("El daño es alto, se estima que su costo de reparacion sobrepasaran los 4000$");
        reclamo.setEmpleado(empleadoTools.findEmpleadoByIdAPIRestSQL(6));
        reclamo.setRecEstado(RequestStatusEnums.PROCESADO.idStatus);
        //Guardamos el reclamo en el documento del proceso de reclamo de la garantia
        garantia.setReclamo(reclamo);
        garantia.setGarEstado(RequestStatusEnums.PROCESADO.idStatus);


        //PROFORMA DE REPARACION
        InformeProformaReparacion informeProformaReparacion = new InformeProformaReparacion();
        informeProformaReparacion.setPrFecha("15-12-2021");
        informeProformaReparacion.setPrDetalle("Se realizo la revision del vehiculo y se notifica que la comercializadora cubraria parte de los gastos. El cliente debera pagar la mano de obra");
        informeProformaReparacion.setPrSubTotalManoObra(12.50);
        informeProformaReparacion.setPrSubTotalRepuestos(1500.00);
        informeProformaReparacion.setPrEstado(RequestStatusEnums.PENDIENTE.idStatus);
        //Guardamos al empleado que crea el informe
        informeProformaReparacion.setEmpleado(empleadoTools.findEmpleadoByIdAPIRestSQL(3));
        //Guardamos la profonrma de reparacion en el documento y la enviamos al correo
        garantia.getReclamo().setInformeProformaReparacion(informeProformaReparacion);
        //Actualizamos el estado del reclamo
        garantia.getReclamo().setRecEstado(RequestStatusEnums.ACEPTADO.idStatus);

        //ORDEN REPARACION
        OrdenReparacion ordenReparacion = new OrdenReparacion();
        ordenReparacion.setOrFecha("11-12-2021");
        ordenReparacion.setOrDescripcion("Se ordena reparar el vehiculo");
        ordenReparacion.setRepEstado(RequestStatusEnums.PENDIENTE.idStatus);
        ordenReparacion.setEmpleado(empleadoTools.findEmpleadoByIdAPIRestSQL(3));
        //Guardamos el orden de repacion
        garantia.getReclamo().getInformeProformaReparacion().setOrdenReparacion(ordenReparacion);
        //Actualizamos el estado de la proforma de reparacion enviada previamente
        garantia.getReclamo().getInformeProformaReparacion().setPrEstado(RequestStatusEnums.ACEPTADO.idStatus);


        //LISTA DE REPUESTOS
        SolicitudRepuestos solicitudRepuestos = new SolicitudRepuestos();
        List<Repuestos> repuestosList = new ArrayList<>();
        Repuestos repuesto1 = new Repuestos();
        repuesto1.setIdRepuestoAPIRestSQL(2);
        repuesto1.setCantidad(1);
        Repuestos repuesto2 = new Repuestos();
        repuesto2.setIdRepuestoAPIRestSQL(3);
        repuesto2.setCantidad(2);
        Repuestos repuesto3 = new Repuestos();
        repuesto3.setIdRepuestoAPIRestSQL(4);
        repuesto3.setCantidad(2);
        repuestosList.add(repuesto1);
        repuestosList.add(repuesto2);
        repuestosList.add(repuesto3);

        //SOLICITUD DE REPUESTOS
        solicitudRepuestos.setRepuestosList(repuestosList);
        solicitudRepuestos.setEmpleadoSolicitaRepuestos(empleadoTools.findEmpleadoByIdAPIRestSQL(7));
        solicitudRepuestos.setSrDetalle("Se necesitan los siguientes repuestos para la reparacion del vehiculo");
        solicitudRepuestos.setSrEstado(RequestStatusEnums.PENDIENTE.idStatus);
        //Validamos si existe el informe de reparacion inicial creado
        if (garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().getInformeReparacionTaller() == null) {
            //Inicializamos el informe de reparacion inicial
            garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().setInformeReparacionTaller(new InformeReparacionTaller());
            //Inicializamos la lista de solicitudes de repuestos
            garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().getInformeReparacionTaller().setSolicitudRepuestos(new ArrayList<>());
            //Agregamos la nueva solicitud de repuestos
            garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().getInformeReparacionTaller().getSolicitudRepuestos().add(solicitudRepuestos);
            //Actualizamos el estado del orden de reparacion
            garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().setRepEstado(RequestStatusEnums.PROCESADO.idStatus);
        } else {
            //Agregamos la nueva solicitud de repuestos
            garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().getInformeReparacionTaller().getSolicitudRepuestos().add(solicitudRepuestos);
        }

        //DESPACHAR REPUESTOS
        garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().getInformeReparacionTaller().getSolicitudRepuestos().get(0).setEmpleadoDespachaRepuestos(empleadoTools.findEmpleadoByIdAPIRestSQL(3));
        garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().getInformeReparacionTaller().getSolicitudRepuestos().get(0).setSrEstado(RequestStatusEnums.PROCESADO.idStatus);


        //LISTA DE MANO DE OBRA
        List<ManoObra> manoObraList = new ArrayList<>();
        ManoObra manoObra1 = new ManoObra();
        manoObra1.setEmpleadoManoObra(empleadoTools.findEmpleadoByIdAPIRestSQL(2));
        manoObra1.setCantidadHoras(10);
        manoObra1.setMoPrecioHora(5);
        manoObra1.setMoHoras(1);
        ManoObra manoObra2 = new ManoObra();
        manoObra2.setEmpleadoManoObra(empleadoTools.findEmpleadoByIdAPIRestSQL(2));
        manoObra2.setCantidadHoras(20);
        manoObra2.setMoPrecioHora(5);
        manoObra2.setMoHoras(1);
        manoObraList.add(manoObra1);

        //INFORME DE REPARACION DEL TALLER
        garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().getInformeReparacionTaller().setManoObraList(manoObraList);
        garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().getInformeReparacionTaller().setIreFecha("16-12-2021");
        garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().getInformeReparacionTaller().setIreDescripcion("Se arreglo el vehiculo con exito");
        garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().getInformeReparacionTaller().setEmpleado(empleadoTools.findEmpleadoByIdAPIRestSQL(2));

        //INFORME DE REPARACION COMERCIALIZADORA
        //Creamos el informe de reparacion de la comercializadora
        InformeReparacionComercializadora reparacionComercializadora = new InformeReparacionComercializadora();
        reparacionComercializadora.setIrcFecha("20-12-2021");
        reparacionComercializadora.setIrcDescripcion("El vehiculo fue reparado con exito, a continuacion los detalles de reparacion. El empleado debera pagar el precio de mano de obra");
        reparacionComercializadora.setIrcGarantia(1500);
        reparacionComercializadora.setEmpleadoCreaInformeComercializadora(empleadoTools.findEmpleadoByIdAPIRestSQL(3));
        reparacionComercializadora.setIrcEstado(RequestStatusEnums.PENDIENTE.idStatus);

        //Guardamos el informe
        garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().getInformeReparacionTaller().setInformeReparacionComercializadora(reparacionComercializadora);

        //Actualizamos el estado del informe de reparacion del taller
        garantia.getReclamo().getInformeProformaReparacion().getOrdenReparacion().getInformeReparacionTaller().setIreEstado(RequestStatusEnums.PROCESADO.idStatus);


        return new ResponseEntity<>(garantiasRepository.save(garantia) ,HttpStatus.CREATED);
    }

}
