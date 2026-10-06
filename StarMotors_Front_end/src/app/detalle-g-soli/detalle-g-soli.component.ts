import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Garantia, GarantiasControllerService, NominaEmpleadosControllerService} from 'app/Services/NOSQL/angular_api_client';
import {
    ClienteControllerService,
    ComercializadoraControllerService,
    ConcesionariaControllerService,
    FacturaVentaControllerService,
    TblCliente,
    TblComercializadora,
    TblConcesionaria,
    TblVehiculo,
    VehiculoControllerService
} from 'app/Services/SQL/angular_api_client';


@Component({
    selector: 'app-detalle-g-soli',
    templateUrl: './detalle-g-soli.component.html',
    styleUrls: ['./detalle-g-soli.component.css']
})
export class DetalleGSoliComponent implements OnInit {

    // Array meses
    monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    IDEMPLEADO = 0;

    // DETALLE RECLAMO
    cliente: TblCliente = {};
    vehiculo: TblVehiculo = {};
    garantia: Garantia = {};
    comercializadora: TblComercializadora = {};
    concesionaria: TblConcesionaria = {};
    fechaReclamo: Date = new Date();

    // DETALLE GARANTIA
    fechaEmision: Date = new Date();
    fechaExpiracion: Date = new Date();
    kmGarantia = 0;

    constructor(private router: ActivatedRoute,
                private garantiaService: GarantiasControllerService,
                private clienteService: ClienteControllerService,
                private vehiculoService: VehiculoControllerService,
                private routers: Router,
                private nominaEmpleadosService: NominaEmpleadosControllerService,
                private comercializadoraService: ComercializadoraControllerService,
                private concesionariaService: ConcesionariaControllerService,
                private facturaVentaService: FacturaVentaControllerService
    ) {
        this.cliente.persona = {};
        this.vehiculo.ejemplar = {};
        this.vehiculo.ejemplar.modelo = {};
        this.vehiculo.ejemplar.modelo.marca = {};

    }

    ngOnInit(): void {
        this.searchEmpleadoAndComercializadora();
    }

    // ------------------------------------------------------- CONSUMO API SQL ---------------------------------------------------------

    findVehiculo() {
        this.vehiculoService.findVehiculoByIdUsingGET(this.garantia.idVehiculo).subscribe(data => {
            this.vehiculo = data;
            this.findFacturaVentaByVehiculo();
        });
    }

    findCliente() {
        this.clienteService.findClienteByIdUsingGET(this.garantia.idCliente).subscribe(data => {
            this.cliente = data;
        });
    }

    findConcesionaria() {
        this.concesionariaService.findConcesionariaByIdUsingGET(this.garantia.idConcesionaria).subscribe(dataConcesionaria => {
            this.concesionaria = dataConcesionaria;
        });
    }

    findFacturaVentaByVehiculo() {
        this.facturaVentaService.findDetalleByIdVehiculoUsingGET(this.vehiculo.idVehiculo).subscribe(detalle => {
            this.fechaEmision = new Date(detalle.encabezadoVenta.envFecha);
            this.fechaEmision.setDate(this.fechaEmision.getDate() + 1);
            this.fechaExpiracion.setDate(this.fechaEmision.getDate() + 1825);
            this.kmGarantia = detalle.vehiculo.ejemplar.modelo.modKmGarantia;
        });
    }

    // ------------------------------------------------------- CONSUMO API NO SQL ---------------------------------------------------------

    // Obtener datos de la concesionaria
    searchEmpleadoAndComercializadora() {
        this.IDEMPLEADO = parseInt(localStorage.getItem('idEmpleado'));
        if (!isNaN(this.IDEMPLEADO)) {
            this.nominaEmpleadosService.getEmpleadoByIdSQLUsingGET(parseInt(localStorage.getItem('idEmpleado'))).subscribe(dataEmpleado => {
                this.comercializadoraService.findComercializadoraByIdUsingGET(dataEmpleado.idComercializadora).subscribe(dataComercializadora => {
                    this.comercializadora = dataComercializadora;
                    this.findGarantiaReclamo();
                });
            });
        }
    }

    findGarantiaReclamo() {
        this.router.paramMap.subscribe((params) => {
            this.garantiaService.findGarantiaByIdUsingGET(parseInt(params.get('idGarantia'))).subscribe(dataGarantia => {
                this.garantia = dataGarantia;
                this.fechaReclamo = new Date(dataGarantia.reclamo.recFecha);
                this.fechaReclamo.setDate(this.fechaReclamo.getDate() + 1);
                this.findConcesionaria()
                this.findCliente();
                this.findVehiculo();
            });
        });
    }

    // ------------------------------------------------------ REDIRECCIONES ------------------------------------------------------------

    generarInformeProforma(idGarantia: number) {
        this.routers.navigate([idGarantia, 'InformeProformaReparacion']);
    }

    generarInformeRechazo(idGarantia: number) {
        this.routers.navigate([idGarantia, 'informeRechazo']);
    }

    volverListaReclamos() {
        this.routers.navigate(['detalleRGarantia']);
    }

    // ---------------------------------------------------- OTROS METODOS ---------------------------------------------------------
    getLongMonthName = function (monthNumber): string {
        return this.monthNames[monthNumber];
    }

}
