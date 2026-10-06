import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TallerControllerService } from "app/Services/NOSQL/angular_api_client";
import { ClienteControllerService, VehiculoControllerService } from "app/Services/SQL/angular_api_client";

@Component({
  selector: "app-informes-taller",
  templateUrl: "./informes-taller.component.html",
  styleUrls: ["./informes-taller.component.css"],
})
export class InformesTallerComponent implements OnInit {
  listIformes = [];
  FallosSistemasVehiculo = [];
  listVehiculos = [];
 // Array para de IDs Clientes
 listaClientesid = [];

 // Array para listar los datos del cliente
 ListaClientes = [];
  ListIdVehiculos = [];

  constructor(
    private tallerService: TallerControllerService,
    private vehiculoService: VehiculoControllerService,
    private cliente: ClienteControllerService,
     private router : Router
) {}

  ngOnInit(): void {
    this.ListarIformesReparacionByStatus(1);
  }

  ListarIformesReparacionByStatus(status: number) {
    this.listIformes = [];
    this.FallosSistemasVehiculo = [];
    this.listVehiculos = [];
  
    this.ListIdVehiculos = [];

    this.tallerService
      .listInformeReparacionByStatusUsingGET(status, 1)
      .subscribe((data) => {
        this.listIformes = data;
        console.log("informes",this.listIformes);


        this.listIformes.forEach((element) => {
          this.FallosSistemasVehiculo.push(element.fallosSistemasVehiculo);
          this.ListIdVehiculos.push(element.idVehiculo);

        });
         //Filtros de todos los IDs de clientes
         data.forEach((element) => {
          this.listaClientesid.push(element.idCliente);
        });

        // Busqueda de clientes con la lista de filtro previo
        this.cliente
          .listClientByIdUsingGET(this.listaClientesid)
          .subscribe((data) => {
            this.ListaClientes = data;

          });

        this.vehiculoService
          .listEjemplaresByIdUsingGET(this.ListIdVehiculos)
          .subscribe((data) => {
            data.forEach((data) => {
              this.listVehiculos.push(data);
              console.log(this.listVehiculos);
            });
         
          });
      });
  }

  Vermas(idGarantia: number){
   this.router.navigate([idGarantia,'detalleInfomeTaller'])
   
  }
}
