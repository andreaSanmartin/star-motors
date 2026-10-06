import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GarantiasControllerService, NominaEmpleadosControllerService } from "app/Services/NOSQL/angular_api_client";
import { TblCliente, TblVehiculo } from "app/Services/SQL/angular_api_client";
import { ClienteControllerService } from "../../Services/SQL/angular_api_client/api/clienteController.service";
import { VehiculoControllerService } from "../../Services/SQL/angular_api_client/api/vehiculoController.service";
import { Garantia } from '../../Services/NOSQL/angular_api_client/model/garantia';


@Component({
  selector: "app-detalle-garantia",
  templateUrl: "./detalle-garantia.component.html",
  styleUrls: ["./detalle-garantia.component.css"],
})
export class DetalleGarantiaComponent implements OnInit {
  
  cliente: TblCliente = {};
  vehiculo: TblVehiculo = {};
  garantia : Garantia = {};

  IDEMPLEADO: number = 0;

  constructor(
    private router: ActivatedRoute,
    private garantiaService: GarantiasControllerService,
    private clienteService: ClienteControllerService,
    private vehiculoService: VehiculoControllerService,
    private routers : Router,

  ) {
    this.cliente.persona = {};
    this.vehiculo.ejemplar = {};
    this.vehiculo.ejemplar.modelo = {};
    this.vehiculo.ejemplar.modelo.marca = {};
    
  }

  ngOnInit(): void {


    this.router.paramMap.subscribe((params) => {
     this.garantiaService.findGarantiaByIdUsingGET(parseInt(params.get("idGarantia"))).subscribe(data => {
      this.garantia = data;

      this.vehiculoService.findVehiculoByIdUsingGET(data.idVehiculo).subscribe(data => {
        this.vehiculo = data;
      })

      this.clienteService.findClienteByIdUsingGET(data.idCliente).subscribe(data => {
        this.cliente = data;
      })
     })      
    });
  }

 

  verGarantia(idGarantia: number) {
 
    this.routers.navigate([idGarantia,"generarReclamo"]);
  }
  volver() {
    this.routers.navigate(["garantias"]);
  }

 

}
