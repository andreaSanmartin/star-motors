import {Component, OnInit} from '@angular/core';
import {CotizacionesControllerService, NominaEmpleadosControllerService} from 'app/Services/NOSQL/angular_api_client';

import {ConcesionariaControllerService, TblConcesionaria, VehiculoControllerService} from 'app/Services/SQL/angular_api_client';
import {Router} from '@angular/router';

@Component({
    selector: 'app-cotizacion',
    templateUrl: './cotizacion.component.html',
    styleUrls: ['./cotizacion.component.css'],
})
export class CotizacionComponent implements OnInit {
    // ---------------------------------------------------------DECLARACION DE VARIABLES--------------------------------------------------------------------
    listCotizaciones = [];
    listEjemplaresId = [];
    listEjemplares = [];
    Cedula = '';
    datefilter = '';
    statusFind = 0;
    IDEMPLEADO = 0;
    concesionaria: TblConcesionaria = {};

    // ----------------------------------------------------------METODOS INICIALIZADOS-----------------------------------------------------------------------
    constructor(
        private cotizacionesService: CotizacionesControllerService,
        private vehiculoService: VehiculoControllerService,
        private router: Router,
        private nominaEmpleadosService: NominaEmpleadosControllerService,
        private concesionariaService: ConcesionariaControllerService
    ) {
    }

    ngOnInit(): void {
        this.findEmpleadoLogeadoAndConcesionaria();
    }

    // ------------------------------------------------------METODOS DE CONSUMO APIREST NO SQL--------------------------------------------------------------
    // listar cotizacion por estado y concesionaria
    listCotizacionesByStatus(status: number) {
        // Formateamos las listas
        this.listCotizaciones = [];
        this.listEjemplaresId = [];
        this.listEjemplares = [];
        this.statusFind = status;

        // Consumimos la lista de cotizaciones
        this.cotizacionesService
            .findByEstadoUsingGET(status, this.concesionaria.idConcesionaria)
            .subscribe((data) => {
                this.listCotizaciones = data;
                //
                this.findListEjemplaresById();
            });
    }

    // Validar usuario logeado
    // Obtener datos de la concesionaria
    findEmpleadoLogeadoAndConcesionaria() {
        this.IDEMPLEADO = parseInt(localStorage.getItem('idEmpleado'));
        if (!isNaN(this.IDEMPLEADO)) {
            this.nominaEmpleadosService.getEmpleadoByIdSQLUsingGET(parseInt(localStorage.getItem('idEmpleado'))).subscribe(dataEmpleado => {
                this.concesionariaService.findConcesionariaByIdUsingGET(dataEmpleado.idConcesionaria).subscribe(dataConcesionaria => {
                    this.concesionaria = dataConcesionaria;
                    this.listCotizacionesByStatus(1);
                });
            });
        }
    }

    // ---------------------------------------------------------METODOS DE CONSUMO APIREST SQL--------------------------------------------------------------

    // Obtener lista de ejemplares por id
    findListEjemplaresById() {
        // Obtenemos todos los idEjemplares
        this.listCotizaciones.forEach((element) => {
            this.listEjemplaresId.push(element.idEjemplar);
        });

        // Buscamos los ejemplares
        this.vehiculoService
            .listEjemplaresByIdUsingGET(this.listEjemplaresId)
            .subscribe((data) => {
                this.listEjemplares = data;
            });
    }

    // -------------------------------- OTROS MEOTODOS -------------------------------------
    verDetalleCotizacion(idCotizacion: number) {
        this.router.navigate([idCotizacion, 'detalleCotizacion']);
    }

    findByClienteEjemplar() {
        if (this.Cedula === '') {
            this.listCotizacionesByStatus(this.statusFind);
        } else {
            this.cotizacionesService.findByCedulaClienteUsingGET(this.Cedula, this.statusFind, this.concesionaria.idConcesionaria)
                .subscribe((data) => {
                    this.listCotizaciones = data;
                    this.findListEjemplaresByIdandCedula();

                });
        }
    }

    findListEjemplaresByIdandCedula() {
        // Obtenemos todos los idEjemplares
        this.listCotizaciones.forEach((element) => {
            this.listEjemplaresId.push(element.idEjemplar);
        });

        // Buscamos los ejemplares
        this.vehiculoService
            .listEjemplaresByIdUsingGET(this.listEjemplaresId)
            .subscribe((data) => {
                this.listEjemplares = data;
            });
    }
}
