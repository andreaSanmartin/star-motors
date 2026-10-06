import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InformeProformaReparacionComponent } from 'app/infoProformaReparacion/informe-proforma-reparacion/informe-proforma-reparacion.component';
import { GarantiasControllerService, NominaEmpleadosControllerService, OrdenReparacionControllerService, InformeProformaReparacion, ReclamoControllerService, CotizacionesControllerService } from 'app/Services/NOSQL/angular_api_client';
import { ClienteControllerService, ConcesionariaControllerService, EmpeladoControllerService, TblCliente, TblConcesionaria, VehiculoControllerService } from 'app/Services/SQL/angular_api_client';

@Component({
  selector: 'app-proforma-list',
  templateUrl: './proforma-list.component.html',
  styleUrls: ['./proforma-list.component.css']
})
export class ProformaListComponent implements OnInit {
  cliente: TblCliente = {};
  infoProforma: InformeProformaReparacion;
  // ---------------------------------------------------------DECLARACION DE VARIABLES--------------------------------------------------------------------

  ordenesReparacion = [];

  listProformas = [];
  listCotizaciones = [];
  listEmpleado = [];
  listEjemplares = [];
  listVehiculos = [];
  listClientes = [];
  listIdVehiculos = [];
  listIdClientes = [];
  datefilter = "";
  statusFind = 0;
  detallefilter = "";
  IDEMPLEADO: number;
  idCLiente: 0;
  concesionaria: TblConcesionaria;
  idConsesionara : number;


  // ----------------------------------------------------------METODOS INICIALIZADOS-----------------------------------------------------------------------
  constructor(
    private router: Router,
    private reclamo: ReclamoControllerService,
    private nominaEmpleadosService: NominaEmpleadosControllerService,
    private concesionariaService: ConcesionariaControllerService
  ) {
  }

  ngOnInit(): void {
    this.listProformaByStatus(2);
    this.buscarConcesionaria();

  }

  // ------------------------------------------------------METODOS DE CONSUMO APIREST NO SQL--------------------------------------------------------------
  // listar cotizacion por estado y concesionaria
  listProformaByStatus(status: number) {

    // Formateamos las listas

    this.listEmpleado = [];
    this.listEjemplares = [];

    // listamos todos los listados de las proformas 
   // this.reclamo.listInformeProformaReparacionUsingGET(status, this.idConsesionara).subscribe(infoProforma => {
    this.reclamo.listInformeProformaReparacionUsingGET(status,1).subscribe(infoProforma => {
      this.listProformas = infoProforma;
      console.log("proformas", this.listProformas);

        /**Sacamos los ids de los vehiculos y clientes
        this.ordenesReparacion.forEach(element => {
          this.listIdVehiculos.push(element.idVehiculo);
          console.log("vehiculos",this.listIdVehiculos);
          
        });*/

        // listamos todos los clientes 
        /** this.clienteService.listClientByIdUsingGET(this.listIdClientes).subscribe(data => {
           this.listClientes = data;
           console.log("lista de clientes", this.listClientes);
         });
   
         
        */
    }
    
    )
  }
  buscarConcesionaria() {
    this.IDEMPLEADO = parseInt(localStorage.getItem('idEmpleado'));
    if (!isNaN(this.IDEMPLEADO)) {
        this.nominaEmpleadosService.getEmpleadoByIdSQLUsingGET(parseInt(localStorage.getItem('idEmpleado'))).subscribe(dataEmpleado => {
            this.concesionariaService.findConcesionariaByIdUsingGET(dataEmpleado.idConcesionaria).subscribe(dataConcesionaria => {
                this.concesionaria = dataConcesionaria;
                this.idConsesionara = this.concesionaria.idConcesionaria;
            });
        });
    }
  }

    verDetalleProforma(idGarantia: number) {
      this.router.navigate([idGarantia, "generarOrdenReparacion"]);
    }
}
