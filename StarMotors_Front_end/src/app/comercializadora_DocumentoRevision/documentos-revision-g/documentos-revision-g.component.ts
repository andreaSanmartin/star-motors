import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NominaEmpleadosControllerService, ReclamoControllerService} from 'app/Services/NOSQL/angular_api_client';
import {
    ClienteControllerService,
    ComercializadoraControllerService,
    ConcesionariaControllerService,
    TblComercializadora,
    TblConcesionaria,
    VehiculoControllerService
} from 'app/Services/SQL/angular_api_client';

@Component({
    selector: 'app-documentos-revision-g',
    templateUrl: './documentos-revision-g.component.html',
    styleUrls: ['./documentos-revision-g.component.css']
})
export class DocumentosRevisionGComponent implements OnInit {

    // -------------------------------------------------------- VARIABLES -----------------------------------------------------------

    // Datos empleado y concecionaria
    IDEMPLEADO = 0;
    comercializadora: TblComercializadora = {};
    concesionaria: TblConcesionaria = {};
    listConcesionaria = [];

    //Variable para el pipe
    datefilter = "";
    nombres = "";

    //variables para los filtros
    modeloVehiculo = "";
    idsVehiculos = [];

    // Reclamos
    listReclamos = [];
    listClientes = [];
    listVehiculos = [];

    constructor(private reclamoService: ReclamoControllerService,
                private nominaEmpleadosService: NominaEmpleadosControllerService,
                private concesionariaService: ConcesionariaControllerService,
                private routers: Router,
                private clienteService: ClienteControllerService,
                private vehiculoService: VehiculoControllerService,
                private comercializadoraService: ComercializadoraControllerService
    ) {
    }


    // --------------------------------------------------- METODOS INICIALIZADOS -------------------------------------------------
    ngOnInit(): void {
        this.searchEmpleadoAndConcesionaria();
    }

    // -------------------------------------------------- CONSUMO API SQL --------------------------------------------------------

    // Obtener datos de la concesionaria
    searchEmpleadoAndConcesionaria() {
        this.IDEMPLEADO = parseInt(localStorage.getItem('idEmpleado'));
        if (!isNaN(this.IDEMPLEADO)) {
            this.nominaEmpleadosService.getEmpleadoByIdSQLUsingGET(parseInt(localStorage.getItem('idEmpleado'))).subscribe(
                dataEmpleado => {
                    console.log(dataEmpleado);
                    this.comercializadoraService.findComercializadoraByIdUsingGET(1).subscribe(
                        value => {
                            console.log(value);
                            this.comercializadora = value;
                            this.listConcesionarias();
                        });
                });
        }
    }

    // Listar los clientes por array de ids
    listClientesByListId() {
        const listClientesId = [];
        this.listReclamos.forEach(reclamo => {
            listClientesId.push(reclamo.idCliente);
        });
        this.clienteService.listClientByIdUsingGET(listClientesId).subscribe(data => {
            this.listClientes = data;
        });
    }

    // Listar los vehiculos por array de ids
    listVehiculoByListId() {
        const listVehiculosId = [];
        this.listReclamos.forEach(data => {
            listVehiculosId.push(data.idVehiculo);
            this.idsVehiculos.push(data.idVehiculo);
        });
        this.vehiculoService.listVehiculofindByIdUsingGET(listVehiculosId).subscribe(value => {
            this.listVehiculos = value;
        });
    }

    listConcesionarias() {
        this.listConcesionaria = [];
        this.concesionariaService.findByIdComercializadoraUsingGET(this.comercializadora.idComercializadora).subscribe(dataConcesionarias => {
            this.listConcesionaria = dataConcesionarias;
            this.concesionaria = this.listConcesionaria [0];
            this.listReclamosGarantia(1);
        })
    }

    buscarConcesionaria(concesionaria: TblConcesionaria) {
        this.concesionaria = concesionaria;
    }

    // --------------------------------------------------- CONSUMO API NO SQL -----------------------------------------------------------
    listReclamosGarantia(estado: number) {
        this.listReclamos = [];
        this.listVehiculos = [];
        this.listClientes = [];
        this.reclamoService.listReclamoByStatusUsingGET(estado, this.concesionaria.idConcesionaria).subscribe(data => {
            this.listReclamos = data;
            this.listClientesByListId();
            this.listVehiculoByListId();
        });
    }

    // ------------------------------------------------------- OTROS METODOS -------------------------------------------------
    verDetalleReclamo(idGarantia: number) {
        this.routers.navigate([idGarantia, 'detalleReclamo']);
    }


    findByModelos(){
        this.vehiculoService.listVehiculoByNombreModeloUsingGET(this.concesionaria.idConcesionaria,this.idsVehiculos,this.modeloVehiculo).subscribe(data => {
            this.listVehiculos =  data;

            this.listReclamos.forEach((index,array,value) => {
              
            })
        })
    }
  
}
