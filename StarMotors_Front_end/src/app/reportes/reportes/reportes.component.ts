import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { GarantiasControllerService } from "app/Services/NOSQL/angular_api_client";
import {
  ClienteControllerService,
  FacturaReparacionControllerService,
  VehiculoControllerService,
} from "app/Services/SQL/angular_api_client";
import { RepuestoControllerService } from "app/Services/SQL/angular_api_client";
import { Chart, registerables } from "chart.js";
import { SolicitudRepuestos } from "app/Services/NOSQL/angular_api_client/model/solicitudRepuestos";
import { TblEjemplar } from "app/Services/SQL/angular_api_client/model/tblEjemplar";
@Component({
  selector: "app-reportes",
  templateUrl: "./reportes.component.html",
  styleUrls: ["./reportes.component.css"],
})
export class ReportesComponent implements OnInit {
  // Array para listar los datos del cliente

  // Array para listar las garantias
  listGarantias = [];

  // Array para de IDs Clientes
  listaClientesid = [];

  // Array para listar los datos del cliente
  ListaClientes = [];

  //Declaracion y sobrecarga de Estados
  pendiente = 1;
  procesado = 2;
  eliminada = 3;
  rechazado = 4;
  aceptado = 5;
  finalizado = 6;
  listaGarantias = [];
  listaGarantiasFecha = [];
  listVehiculosId = [];
  listVehiculos: TblEjemplar[];

  listEjemplares = [];
  listCantidadVehiculos = [];
  listCantidadRepuestos = [];
  listVehiculosModelos = [];
  listRepuestosNombres = [];

  chart: any = [];
  chartR: any = [];

  //Reporte de Vehiculos y Repuestos
  idsVehiculos = [];
  idsRepuestos = [];

  vecesRepetidasVehiculos = [];
  vecesRepetidasRepuestos = [];

  //Reporte de Costos Garantia
  totalFa = [];
  total: number;
  totalF: number;
  garantiasAplicadas: number;
  fechaInicio: string;
  fechaFinal: string;
  fechaInicioFactura: string;
  fechaFinalFactura: string;
  listClientes = [];
  listGarantiaClientes = [];
  listFacturaClientes = [];
  costosFactura = []

  //filtros
  filtro = "";
  anio: number;
  ocultar: boolean = false;

  constructor(
    private garantiaService: GarantiasControllerService,
    private router: Router,
    private vehiculoService: VehiculoControllerService,
    private repuestoService: RepuestoControllerService,
    private clienteService: ClienteControllerService,
    private facturaService: FacturaReparacionControllerService
  ) {
    Chart.register(...registerables);
  }
  ngOnInit(): void {
    //this.findGarantias(false);

    this.findVehiculosGAplicadas();
    this.generarChartVehiculosGarantia();
    
  }

  filtrarGarantiasByStatus(estado: number) {
    //Formateamos la lista
    this.listGarantias = [];
    this.listaClientesid = [];
    console.log(estado);
    this.garantiaService
      .listSolicitudesGarantiaByStatusUsingGET(estado, 1)
      .subscribe((data) => {
        //Cargamos la nueva lista
        this.listGarantias = data;
        console.log("Listado de Garantias segun el estado");
        //Filtros de todos los IDs de clientes
        data.forEach((element) => {
          this.listaClientesid.push(element.idCliente);
        });

        // Busqueda de clientes con la lista de filtro previo
        /*  this.cliente
             .listClientByIdUsingGET(this.listaClientesid)
             .subscribe((data) => {
               this.ListaClientes = data;
             });
    */
      });
  }

  //--- Busqueda de Garantias Aplicadas, basandose en la existencia del informe del taller
  findVehiculosGAplicadas() {
    this.garantiaService
      .listInformeTallerbyExistsUsingGET()
      .subscribe((data) => {
        this.listGarantias = data;
        console.log("Garantias Exist", this.listGarantias);
        var id = [];
        var solicitudes = [];

        data.forEach((element, index) => {
          id.push(element.idVehiculo);
          solicitudes =
            element.reclamo.informeProformaReparacion.ordenReparacion
              .informeReparacionTaller.solicitudRepuestos;
        });

        console.log("Repuestos en las solicitudes", solicitudes);
        var listIdRepuestos = [];
        solicitudes.forEach((element, index) => {
          for (let index = 0; index < element.repuestosList.length; index++) {
            listIdRepuestos.push(
              element.repuestosList[index].idRepuestoAPIRestSQL
            );
          }
        });
        listIdRepuestos.sort((a, b) => a - b);
        console.log("Lista de IDs Repuestos Ordenados ", listIdRepuestos);
        let contadorR = 1;
        for (let i = 0; i < listIdRepuestos.length; i++) {
          if (listIdRepuestos[i + 1] === listIdRepuestos[i]) {
            contadorR++;
          } else {
            this.idsRepuestos.push(listIdRepuestos[i]);
            this.vecesRepetidasRepuestos.push(contadorR);
            contadorR = 1;
          }
        }
        console.log("Elementos unicos Repuestos ", this.idsRepuestos);
        console.log("Veces Repetidas Repuestos", this.vecesRepetidasRepuestos);
        console.log("Lista de IDs Repuestos Consultados ", listIdRepuestos);

        //
        //consulta de los datos del repuesto
        this.repuestoService
          .listAllByIdUsingGET(this.idsRepuestos)
          .subscribe((data) => {
            data.forEach((repuesto) => {
              this.listRepuestosNombres.push(repuesto.repNombre);
            });
          });
        console.log(
          "Lista de Nombres Repuestos Consultados ",
          this.listRepuestosNombres
        );
        this.generarChartRepuestos();

        ///

        let contador = 1;
        for (let i = 0; i < id.length; i++) {
          if (id[i + 1] === id[i]) {
            contador++;
          } else {
            this.idsVehiculos.push(id[i]);
            this.vecesRepetidasVehiculos.push(contador);
            contador = 1;
          }
        }

        console.log("Elementos unicos ", this.idsVehiculos);
        console.log("Veces Repetidas", this.vecesRepetidasVehiculos.reverse());
        this.vehiculoService
          .listVehiculofindByIdUsingGET(this.idsVehiculos)
          .subscribe((data) => {
            data.forEach((vehiculo) => {
              this.listVehiculosModelos.push(
                vehiculo.ejemplar.modelo.modNombre
              );
            });
          });

        console.log("Modelos ", this.listVehiculosModelos);

        let resultadoID = id.filter((item, index) => {
          return id.indexOf(item) === index;
        });
        resultadoID
          .sort((a, b) => a - b)
          .forEach((e) => {
            this.garantiaService
              .countGarantiaByIdVehiculoUsingGET(e)
              .subscribe((data) => {
                this.listCantidadVehiculos.push(data);
              });
          });
        console.log("Lista Cantidad de Vehiculos", this.listCantidadVehiculos);

        this.vehiculoService
          .listEjemplaresByIdUsingGET(id)
          .subscribe((data) => {
            console.log("Lista de Ejmplares ", this.listEjemplares);
            data.forEach((element) => {
              //console.log('estos son los modelos',element.modelo.modNombre);
              this.listEjemplares.push(element.modelo.modNombre);
              console.log("estos son los modelos", this.listEjemplares);
            });
          });
      });
  }

  onClick() {
    console.log("ocultar");
    this.ocultar = false;
  }

  generarChartVehiculosGarantia() {
    this.vecesRepetidasVehiculos.reverse();
    this.chart = new Chart("canvas", {
      type: "bar",
      data: {
        // array modelos de vehiculos en orden
        labels: this.listEjemplares,
        datasets: [
          {
            label: "# Solicitudes Aplicadas",
            // valores repetidos en orden
            data: this.vecesRepetidasVehiculos,
            backgroundColor: "rgba(93, 175, 89, 0.1)",
            borderColor: "#3e95cd",
            borderWidth: 4,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  generarChartRepuestos() {
    console.log(this.listRepuestosNombres);
    this.chartR = new Chart("chartR", {
      type: "bar",
      data: {
        // array modelos de vehiculos en orden
        labels: this.listRepuestosNombres,
        datasets: [
          {
            label: "# Mayor Demanda",
            // valores repetidos en orden
            data: this.vecesRepetidasRepuestos,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 4,
          },
        ],
      },
    });
  } 

  findGarantias(exists: boolean) {
    this.listVehiculosId = [];
    this.listVehiculos = [];
    this.garantiaService
      .listGarantiasbyExistsUsingGET(exists)
      .subscribe((data) => {
        this.listGarantias = data;
        data.forEach((e) => {
          this.listVehiculosId.push(e.idVehiculo);
        });
        console.log("Id De los vehiculos findGarantias", this.listVehiculosId);
        this.garantiaService.countGarantiaByIdVehiculoUsingGET();
        this.vehiculoService
          .listEjemplaresByIdUsingGET(this.listVehiculosId)
          .subscribe((data) => {
            this.listVehiculos = data;
            console.log("Los Vehiculos cargados ahora ", this.listVehiculos);
          });
      });
  }

  /// buscar por anio
  findForAnio(anio: number) {
    this.vehiculoService
      .listEjemplaresByIdUsingGET(this.listVehiculosId)
      .subscribe((data) => {
        this.listVehiculos = data;
        console.log(this.listVehiculos);
        this.listVehiculos = data.filter(function (element, index) {
          return data[index].modelo.modAnio === anio;
        });
        console.log("Filtrados ", this.listVehiculos);
      });
  }

  refresh() {
    this.vehiculoService
      .listEjemplaresByIdUsingGET(this.listVehiculosId)
      .subscribe((data) => {
        this.listVehiculos = data;
      });
  }

  // Buscar Costo de garantias por fechas
  getCostobyMonth() {
    var costosGarantia = [];
    console.log(this.fechaInicio);
    console.log(this.fechaFinal);
    this.garantiaService
      .listGarantiaByAnioUsingGET(this.fechaFinal, this.fechaInicio)
      .subscribe((data) => {
        this.listaGarantiasFecha = data;
        this.garantiasAplicadas = data.length;
        data.forEach((gar) => {
          costosGarantia.push(
            gar.reclamo.informeProformaReparacion.ordenReparacion
              .informeReparacionTaller.informeReparacionComercializadora
              .ircGarantia
          );
          console.log("Costos de la Garantia ", costosGarantia);
          console.log("Id de la Garantia ", gar.idGarantia);
        });
        const reducer = (previousValue, currentValue) =>
          previousValue + currentValue;
        this.total = costosGarantia.reduce(reducer);
        console.log("Es la Suma Total de las garantias ", this.total);
      });
  }

  getFacturabyMonth() {
    var garantia: number;
    var idsClientes = [];
    var costosFactura = [];
    var idsFacturas = [];
    this.garantiaService
      .listGarantiaByAnioUsingGET(
        this.fechaFinalFactura,
        this.fechaInicioFactura
      )
      .subscribe((data) => {
        this.listGarantiaClientes = data;
        console.log(this.listGarantiaClientes)
        data.forEach((element) => {
          idsClientes.push(element.idCliente);
          garantia =
            element.reclamo.informeProformaReparacion.ordenReparacion
              .informeReparacionTaller.informeReparacionComercializadora
              .ircGarantia;
          idsFacturas.push(
            element.reclamo.informeProformaReparacion.ordenReparacion
              .informeReparacionTaller.informeReparacionComercializadora
              .idFacturacionApiSql
          );
          console.log("ids De las facturas ", idsFacturas);
        });
        this.clienteService
          .listClientByIdUsingGET(idsClientes)
          .subscribe((data) => {
            this.listClientes = data;
            console.log("El cliente ", this.listClientes);
          });
        this.facturaService
          .findByListIdUsingGET(idsFacturas)
          .subscribe((data) => {
            console.log(data);
            this.listFacturaClientes = data;
            data.forEach((element) => {
              costosFactura.push(element.enfrTotal);
              console.log("Es la Suma Total de las Facturas ", costosFactura);
             
            });
            const reducer = (previousValue, currentValue) =>
            previousValue + currentValue;
          this.totalF = costosFactura.reduce(reducer);
           console.log("Es la Suma Total de las Facturas ", this.totalF);
          });
       /*  if (this.costosFactura.length >= 1) {
          const reducer = (previousValue, currentValue) =>
            previousValue + currentValue;
          this.totalF = this.costosFactura.reduce(reducer);
          console.log("Es la Suma Total de las Facturas ", this.totalF);
        } else {
          this.totalF = this.costosFactura[0];
          console.log("Es la Suma Total de las Facturas ", this.totalF);
        } */
      });
  }
}
