import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { GarantiasControllerService, NominaEmpleadosControllerService } from "app/Services/NOSQL/angular_api_client";
import Swal from 'sweetalert2'

import {
  ClienteControllerService, ConcesionariaControllerService, TblConcesionaria,
} from "app/Services/SQL/angular_api_client";
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";

@Component({
  selector: "app-garantias",
  templateUrl: "./garantias.component.html",
  styleUrls: ["./garantias.component.css"],
})
export class GarantiasComponent implements OnInit {


  // variable para filtrar en la tabla dinamica
  filtro = "";
  datefilter = "";

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

  mostrar: true;
  estados: number;

  fechaGarantia = "";
  idGarantia : number;
  NombreCliente = "";
  ApellidosCliente = "";

  IDEMPLEADO: number;
  idconcesionaria: number;

  
  constructor(
    private garantias: GarantiasControllerService,
    private cliente: ClienteControllerService,
    private router: Router,
    private nominaEmpleadosService: NominaEmpleadosControllerService,
    private concesionariaService: ConcesionariaControllerService
  ) {

    
  }

  

  ngOnInit(): void {

    this.filtrarGarantiasByStatus(1);
 
  }

  // Metodo para ver con mas detalle la garantia seleccionada
  verGaranita(idGarantia: number) {
    this.router.navigate([idGarantia, "detalleG"]);
  }

  
 

  //Metodo para filtrar las garantias por estados
  filtrarGarantiasByStatus(estado: number) {
    //Formateamos la lista
    this.fechaGarantia = "";
    this.idGarantia = 0;
    this.NombreCliente = "";
    this.ApellidosCliente = "";
    this.listGarantias = [];
    this.listaClientesid = [];
    this.listaClientesid = [];
    this.ListaClientes = [];

 

    this.IDEMPLEADO = parseInt(localStorage.getItem('idEmpleado'));
 
    
    if (!isNaN(this.IDEMPLEADO)) {
        this.nominaEmpleadosService.getEmpleadoByIdSQLUsingGET(parseInt(localStorage.getItem('idEmpleado'))).subscribe(dataEmpleado => {
            this.concesionariaService.findConcesionariaByIdUsingGET(dataEmpleado.idConcesionaria).subscribe(dataConcesionaria => {
                       
      
    

    this.garantias
      .listSolicitudesGarantiaByStatusUsingGET(estado,  dataConcesionaria.idConcesionaria)
      .subscribe((data) => {
        //Cargamos la nueva lista
        console.log("este es el data" , data);
        
        this.listGarantias = data;
     

        //Filtros de todos los IDs de clientes
        data.forEach((element) => {
          this.listaClientesid.push(element.idCliente);
          this.fechaGarantia = element.garFecha
          this.idGarantia = element.idGarantia;
         
        });

        // Busqueda de clientes con la lista de filtro previo
        this.cliente
          .listClientByIdUsingGET(this.listaClientesid)
          .subscribe((data) => {
            this.ListaClientes = data;
           console.log("aqui me mustran todos los clinetes",this.ListaClientes);
           
          });
      });
    });
  });
    }

      
  }


  EliminarSolicitudesGarantia(idGarantia: number){
    Swal.fire({
      title: 'Estas Seguro?',
      text: "No se podra recuperar este dato",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.garantias
        .updateEstadoGarantiaUsingPUT(
          this.eliminada,
          parseInt(localStorage.getItem("idEmpleado")),
          idGarantia
        )
        .subscribe((data) => {
          this.listGarantias = data;
          this.filtrarGarantiasByStatus(1);
        });

        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })

   

  }
  

}


