import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GarantiasControllerService } from "app/Services/NOSQL/angular_api_client";
import {
  ClienteControllerService,
  RepuestoControllerService,
  VehiculoControllerService,
} from "app/Services/SQL/angular_api_client";
import { Garantia } from "../../Services/NOSQL/angular_api_client/model/garantia";
import { TblVehiculo } from "../../Services/SQL/angular_api_client/model/tblVehiculo";
import { TblCliente } from "../../Services/SQL/angular_api_client/model/tblCliente";

@Component({
  selector: "app-detalle-reparacion",
  templateUrl: "./detalle-reparacion.component.html",
  styleUrls: ["./detalle-reparacion.component.css"],
})
export class DetalleReparacionComponent implements OnInit {

  // creacion de las variables para mostrar datos
  Garantia: Garantia = {};
  Vehiculo: TblVehiculo = {};
  Cliente: TblCliente = {};

  ListRepuestos = [];
  ListIdsRepuestos = [];
  
  ListRepuestos1 = [];

  ListFallos = [];

  constructor(
    private router: ActivatedRoute,
    private rout : Router,
    private garantiaService: GarantiasControllerService,
    private vehiculoServicio: VehiculoControllerService,
    private clienteService: ClienteControllerService,
    private repuestoService: RepuestoControllerService
  ) {
    this.Cliente.persona = {};
    this.Vehiculo.ejemplar = {};
    this.Vehiculo.ejemplar.modelo = {};
    this.Vehiculo.ejemplar.modelo.marca = {};
  }

  ngOnInit(): void {

    // Capturamos el id del paramas para poder mostra los datos 
    this.router.paramMap.subscribe((paramas) => {

      this.garantiaService
        .findGarantiaByIdUsingGET(parseInt(paramas.get("idGarantia")))
        .subscribe((data) => {
          this.Garantia = data;
          
          this.ListRepuestos = data.reclamo.informeProformaReparacion.ordenReparacion.informeReparacionTaller.solicitudRepuestos[0].repuestosList;
          
          this.ListFallos = data.fallosSistemasVehiculo;
          
         this.ListRepuestos.forEach(element => {
             this.ListIdsRepuestos.push(element.idRepuestoAPIRestSQL);
         });
          
          this.vehiculoServicio
          .findVehiculoByIdUsingGET(data.idVehiculo)
          .subscribe((data) => {
            this.Vehiculo = data;
          });

          this.clienteService
          .findClienteByIdUsingGET(data.idCliente)
          .subscribe((data) => {
            this.Cliente = data;
          });

          this.repuestoService.listAllByIdUsingGET(this.ListIdsRepuestos).subscribe(data => {
            this.ListRepuestos1 = data
            console.log( "esta es la lista de repuestos",this.ListRepuestos1);
            
          })
          
        });
    });
  }

  Facturar(idGarantia : number){
    this.rout.navigate([idGarantia,'facturarR']);
  }
}
