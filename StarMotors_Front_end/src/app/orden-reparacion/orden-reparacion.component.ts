import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GarantiasControllerService, OrdenReparacionControllerService } from 'app/Services/NOSQL/angular_api_client';
import {  EmpeladoControllerService, TblCliente, TblEmpleado, TblVehiculo, VehiculoControllerService } from 'app/Services/SQL/angular_api_client';
@Component({
  selector: 'app-orden-reparacion',
  templateUrl: './orden-reparacion.component.html',
  styleUrls: ['./orden-reparacion.component.css']
})
export class OrdenReparacionComponent implements OnInit {
  listOrdenes = [];
  listaEmpleadosid = [];
  listaVehiculosId = [];
  idEmpleadoUnique = [];
  idVehiculoUnique = [];
 // idEmpleadoUnique =[];
  emple:TblEmpleado;
  vehicle:TblVehiculo;
  //emple:TblEmpleado;
  empleados: TblEmpleado [] = [];
  vehiculos: TblVehiculo [] =[];
  //employe: TblEmpleado[]=[];
  
 
 constructor(private garantias: GarantiasControllerService,
  private router: Router,
  private ordenes: OrdenReparacionControllerService,
   private vehiculo:VehiculoControllerService,
   private empleado:EmpeladoControllerService) { }

 ngOnInit(): void {
  this.traerDatos(1, 1);
 }
 verOrden(idOrden: number) {
  this.router.navigate(["/dashboard", idOrden, "informeTallerDetalle"]);
}



traerDatos(estado:number, idConcesionaria:number){
  this.ordenes.listOrdenReparacionByStatusUsingGET(estado, idConcesionaria)
    .subscribe((data)=>{
      this.listOrdenes = data;

       data.forEach((element) => {
      
        this.listaEmpleadosid.push(element.idCliente);
    
        this.listaVehiculosId.push(element.idVehiculo);
     
        this.idEmpleadoUnique = this.listaEmpleadosid.filter((item, index)=>{
          return this.listaEmpleadosid.indexOf(item)===index;
        })
      
        this.idVehiculoUnique = this.listaVehiculosId.filter((item, index)=>{
          return this.listaVehiculosId.indexOf(item)===index;
        })
      });
    
    
      this.idEmpleadoUnique.forEach((element)=>{
        this.buscarEmpleado(element);
      })
      console.log(this.empleados);

  
      this.idVehiculoUnique.forEach((element)=>{
        this.buscarVehiculo(element);
      })
    });      
}

buscarEmpleado(idEmpleado:number) {
  this.empleado.findEmpleadoByIdUsingGET(idEmpleado)
  .subscribe((data)=>{
    this.emple = data;
    this.empleados.push(this.emple);
  })
}

buscarVehiculo(idVehiculo:number){
  this.vehiculo.findVehiculoByIdUsingGET(idVehiculo)
  .subscribe((data)=>{
    this.vehicle = data;
    this.vehiculos.push(this.vehicle);
  })
}


 
}
