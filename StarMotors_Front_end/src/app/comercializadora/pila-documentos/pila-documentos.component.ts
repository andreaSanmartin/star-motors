import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import {
  ClienteControllerService,
  ConcesionariaControllerService,
  EmpeladoControllerService,
  TblConcesionaria,
  VehiculoControllerService,
} from "app/Services/SQL/angular_api_client";
import { OrdenReparacionControllerService } from "../../Services/NOSQL/angular_api_client/api/ordenReparacionController.service";


@Component({
  selector: "app-pila-documentos",
  templateUrl: "./pila-documentos.component.html",
  styleUrls: ["./pila-documentos.component.css"],
})
export class PilaDocumentosComponent implements OnInit {
  ordenesReparacion = [];
  listVehiculos = [];
  listClientes = [];

  listIdVehiculos = [];
  listIdClientes = [];

  idConcesionaria: number = 0;
  Concesionaria: TblConcesionaria = {};

  constructor(
    private ordenService: OrdenReparacionControllerService,
    private vehiculoServicio: VehiculoControllerService,
    private clienteService: ClienteControllerService,
    private router: Router,
    private nominaEmpleadoService: EmpeladoControllerService,
    private concesionariaService: ConcesionariaControllerService
  ) {
    this.Concesionaria.comercializadora = {};
  }

  ngOnInit(): void {
    
    this.ConsultarIdEmpleado(1);
  }

  ConsultarIdEmpleado(estado :number) {
    // Hay que consumir el endpint /orden/infRepComer/listByStatus
    // 3 estados de la cotizacion

    // Formateamos los arrays
    this.ordenesReparacion = [];
    this.listVehiculos = [];
    this.listClientes = [];

    this.listIdVehiculos = [];
    this.listIdClientes = [];
    this.nominaEmpleadoService
      .findEmpleadoByIdUsingGET(parseInt(localStorage.getItem("idEmpleado")))
      .subscribe((data) => {
        this.idConcesionaria = data.roles.idRol;
        this.concesionariaService
          .findConcesionariaByIdUsingGET(this.idConcesionaria)
          .subscribe((data) => {
            this.Concesionaria = data;
          });

        // lsitamos todos los listados de informes de reclamo de la comercializadora
        this.ordenService
          .listInformeReparacionComercializadoraUsingGET(
            1,
            this.idConcesionaria
          )
          .subscribe((data) => {
            this.ordenesReparacion = data;
            console.log("Informes", this.ordenesReparacion);

            // Sacamos los ids de los vehiculos y clientes
            this.ordenesReparacion.forEach((element) => {
              this.listIdVehiculos.push(element.idVehiculo);
              this.listIdClientes.push(element.idCliente);
            });

            // listamos todos los clientes
            this.clienteService
              .listClientByIdUsingGET(this.listIdClientes)
              .subscribe((data) => {
                this.listClientes = data;
                console.log("lista de clientes", this.listClientes);
              });

            // listamos todos los vehiculos
            this.vehiculoServicio
              .listEjemplaresByIdUsingGET(this.listIdVehiculos)
              .subscribe((data) => {
                this.listVehiculos = data;
                console.log("Lista de Vehiculos", this.listVehiculos);
              });
          });
      });
  }



  Vermas(idGarantia: number) {
    this.router.navigate([idGarantia, "detalleIfrmReparacion"]);
  }
}
