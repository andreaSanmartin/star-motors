package com.develop.app.service.implementation;

import com.develop.app.Enums.RequestStatusEnums;
import com.develop.app.model.Garantia;
import com.develop.app.model.InformeProformaReparacion;
import com.develop.app.model.InformeRechazo;
import com.develop.app.model.ManoObra;
import com.develop.app.model.Reclamo;
import com.develop.app.model.Repuestos;
import com.develop.app.repository.GarantiasRepository;
import com.develop.app.service.ReclamoService;
import com.develop.app.tools.EmpleadoTools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.json.JSONArray;
import org.json.JSONException;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import com.google.gson.Gson;

@Service
public class ReclamoServiceImp implements ReclamoService {

    @Autowired
    GarantiasRepository garantiasRepository;

    @Autowired
    EmpleadoTools empleadoTools;

    @Override
    public ResponseEntity<?> postReclamoGarantia(Integer idGarantia, String fecha, String descripcion, String[] razonesReclamo, String danio, Integer idEmpleadoAPIRestSQL) {

        //Buscamos la garantia que se esta procesando
        Garantia garantia = garantiasRepository.findById(idGarantia.longValue()).get();
        //Creamos un reclamo
        Reclamo reclamo = new Reclamo();
        reclamo.setRecFecha(fecha);
        reclamo.setRecDescripcion(descripcion);
        reclamo.setRazonesReclamo(razonesReclamo);
        reclamo.setRecDanio(danio);
        reclamo.setEmpleado(empleadoTools.findEmpleadoByIdAPIRestSQL(idEmpleadoAPIRestSQL));
        reclamo.setRecEstado(RequestStatusEnums.PENDIENTE.idStatus);
        //Guardamos el reclamo en el documento del proceso de reclamo de la garantia
        garantia.setReclamo(reclamo);
        garantia.setGarEstado(RequestStatusEnums.PROCESADO.idStatus);
        return new ResponseEntity<>(garantiasRepository.save(garantia), HttpStatus.CREATED);
    }

    @Override
    public List<Garantia> listReclamoByStatus(Integer idConcesionaria, Integer estado) {
        return garantiasRepository.findByIdConcesionariaAndReclamo_RecEstado(idConcesionaria, estado);
    }

    @Override
    public ResponseEntity<?> postInformeRechazoGarantia(Integer idGarantia, Integer idEmpleadoAPIRestSQL, String fecha, String descripcion) {

        //Buscamos la garantia
        Garantia garantia = garantiasRepository.findById(idGarantia.longValue()).get();
        //Creamos el informe de rechazo
        InformeRechazo informeRechazo = new InformeRechazo();
        informeRechazo.setIrFecha(fecha);
        informeRechazo.setIrDescripcion(descripcion);
        informeRechazo.setEmpleado(empleadoTools.findEmpleadoByIdAPIRestSQL(idEmpleadoAPIRestSQL));
        //Guardamos el informe de rechazo en el documento de la garantia
        garantia.getReclamo().setInformeRechazo(informeRechazo);
        //Actualizamos el estado del reclamo
        garantia.getReclamo().setRecEstado(RequestStatusEnums.RECHAZADO.idStatus);
        return new ResponseEntity<>(garantiasRepository.save(garantia), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<?> postInformeProformaReparacion(Integer idGarantia, String fecha, String detalle,  Double subTotalManoObra, Double subTotalRepuestos, Integer idEmpleadoAPIRestSQL,  String manoObraList,  String repuestoList) {
    	 ArrayList<ManoObra> mList = new ArrayList<ManoObra>(); 
    	 ArrayList<Repuestos> rList = new ArrayList<Repuestos>(); 
    	//Buscamos la garantia
    	
    	
        Garantia garantia = garantiasRepository.findById(idGarantia.longValue()).get();
        //Creamos el informe de proforma
        
       
        InformeProformaReparacion informeProformaReparacion = new InformeProformaReparacion();
        informeProformaReparacion.setPrFecha(fecha);
        informeProformaReparacion.setPrDetalle(detalle);
        JSONArray listaManoObra;
        JSONArray listaRepuestos;

        
  
		try {
			listaManoObra = new JSONArray(manoObraList);
			for (int i = 0; i < listaManoObra.length(); i++) {
				Gson gson = new Gson();
				ManoObra m = gson.fromJson(listaManoObra.get(i).toString(), ManoObra.class);
				mList.add(m);
			}
			listaRepuestos = new JSONArray(repuestoList);
			for (int i = 0; i < listaRepuestos.length(); i++) {
				Gson gson = new Gson();
				Repuestos r = gson.fromJson(listaRepuestos.get(i).toString(), Repuestos.class);
				rList.add(r);
			}
			 informeProformaReparacion.setManoDeObraList(mList);
			 informeProformaReparacion.setRepuestosList(rList);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
      
        informeProformaReparacion.setPrSubTotalManoObra(subTotalManoObra);
        informeProformaReparacion.setPrSubTotalRepuestos(subTotalRepuestos);
        informeProformaReparacion.setPrEstado(RequestStatusEnums.PENDIENTE.idStatus);
        //Guardamos al empleado que crea el informe
        informeProformaReparacion.setEmpleado(empleadoTools.findEmpleadoByIdAPIRestSQL(idEmpleadoAPIRestSQL));
        //TODO Implementar la api del gmail
        //Guardamos la profonrma de reparacion en el documento y la enviamos al correo
        garantia.getReclamo().setInformeProformaReparacion(informeProformaReparacion);
        //Actualizamos el estado del reclamo
        garantia.getReclamo().setRecEstado(RequestStatusEnums.ACEPTADO.idStatus);

        return new ResponseEntity<>(garantiasRepository.save(garantia), HttpStatus.CREATED);
       
    }
    

    @Override
    public List<Garantia> listInformeProformaReparacionByStatus(Integer idConcesionaria, Integer estado) {
        return garantiasRepository.findByIdConcesionariaAndReclamo_InformeProformaReparacionPrEstado(idConcesionaria, estado);
    }




}
