import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
    Garantia,
    GarantiasControllerService,
    OrdenReparacionControllerService,
    ReclamoControllerService
} from 'app/Services/NOSQL/angular_api_client';
import {ClienteControllerService, TblCliente, TblVehiculo, VehiculoControllerService} from 'app/Services/SQL/angular_api_client';

@Component({
    selector: 'app-generar-orden-reparacion',
    templateUrl: './generar-orden-reparacion.component.html',
    styleUrls: ['./generar-orden-reparacion.component.css']
})
export class GenerarOrdenReparacionComponent implements OnInit {


    // ---------------------------------------------------------DECLARACION DE VARIABLES--------------------------------------------------------------------
    cliente: TblCliente = {};

    message = false;
    vehiculo: TblVehiculo = {};
    garantia: Garantia = {};
    // Variables para la fecha en la factura
    date = new Date();
    estado: number;
    fecha = '';
    inputDescripcion: string;
    descripcion: string;
    ordenesReparacion = [];
    listProformas = [];
    listEjemplaresId = [];
    listEjemplares = [];
    listVehiculos = [];
    listClientes = [];
    listIdVehiculos = [];
    listIdClientes = [];

    estadoProcesado = false;

    // ----------------------------------------------------------METODOS INICIALIZADOS-----------------------------------------------------------------------
    constructor(private ordenService: OrdenReparacionControllerService,
                private vehiculoService: VehiculoControllerService,
                private routera: ActivatedRoute,
                private router: Router,
                private reclamo: ReclamoControllerService,
                private clienteService: ClienteControllerService,
                private garantiaService: GarantiasControllerService) {
    }

    ngOnInit(): void {
        this.mostrar();
    }

    // -------------------------------- OTROS MEOTODOS -------------------------------------
    volver() {
        this.router.navigate(['ListProformaReparacion']);
    }

    mostrar() {
        // obtener la fecha
        this.fecha = this.date.toLocaleDateString();
//mostrar los datos de la proforma que se selecciono
        this.routera.paramMap.subscribe((params) => {
                //listar la garantia
                this.garantiaService.findGarantiaByIdUsingGET(parseInt(params.get('idGarantia'))).subscribe(data => {
                        this.garantia = data;

                        if (this.garantia.reclamo.recEstado === 2) {
                            this.estadoProcesado = true;
                        }

                        console.log('garantia', data);
                        if (data !== null) {
                            //traer los datos del vehiculo
                            this.vehiculoService.findVehiculoByIdUsingGET(data.idVehiculo).subscribe(data => {
                                this.vehiculo = data;
                            })
                            //Traer los datos del cliente
                            this.clienteService.findClienteByIdUsingGET(data.idCliente).subscribe(data => {
                                this.cliente = data
                                console.log('cliente:', data)
                            })

                            // lsitamos todos los listados de informes de reclamo de la comercializadora
                            this.ordenService.listInformeReparacionComercializadoraUsingGET(data.idConcesionaria, 1).subscribe(data => {
                                this.ordenesReparacion = data;
                            });
                            console.log('Informes', this.ordenesReparacion);
                            this.reclamo.listInformeProformaReparacionUsingGET(this.estado, 1).subscribe(infoProforma => {
                                    this.listProformas = infoProforma;
                                    console.log('proformas', this.listProformas);
                                }
                            )
                        }
                        data.reclamo.informeProformaReparacion.prEstado == this.estado;
                    }
                )
            }
        )
    }

    GuardarOrden() {

        this.ordenService.postOrdenReparacionUsingPOST(
            this.inputDescripcion,
            this.fecha,
            this.cliente.idCliente,
            this.garantia.idGarantia,
        )
            .subscribe((data) => {
                alert('Se generó con exito la orden de reparación');
                this.volver();
            });

    }
}
