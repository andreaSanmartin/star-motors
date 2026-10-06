import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
    GarantiasControllerService,
    OrdenReparacionControllerService,
    SolicitudRepuestos,
    TallerControllerService
} from 'app/Services/NOSQL/angular_api_client';
import {
    EmpeladoControllerService,
    RepuestoControllerService,
    TblCliente,
    TblRespuestos,
    TblVehiculo
} from 'app/Services/SQL/angular_api_client';
import {VehiculoControllerService} from '../../Services/SQL/angular_api_client/api/vehiculoController.service';
import {Garantia} from '../../Services/NOSQL/angular_api_client/model/garantia';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-detalle-despascho-repuestos',
    templateUrl: './detalle-despacho-repuestos.component.html',
    styleUrls: ['./detalle-despacho-repuestos.component.css']
})
export class DetalleDespaschoRepuestosComponent implements OnInit {

    cliente: TblCliente = {};
    Vehiculo: TblVehiculo = {};
    listRepuestos: TblRespuestos[];
    listIdR = [];
    garantia: Garantia = {};
    ordenesReparacion = [];
    repuestoSolicitud: SolicitudRepuestos = {};
    listEmpleadoDespacha = [];
    fallosSistemas = [];
    idGarantia = 0;
    estado = 0;
    hoy = new Date();
    fecha = '';
    index: number;
    solicitudDespachada = false;

    constructor(
        private router: ActivatedRoute,
        private garantiaService: GarantiasControllerService,
        private repuestoService: RepuestoControllerService,
        private vehiculoServicio: VehiculoControllerService,
        private routers: Router,
        private ordenService: OrdenReparacionControllerService,
        private tallerService: TallerControllerService,
        private empleadoService: EmpeladoControllerService,
        private routerA: ActivatedRoute
    ) {
        this.cliente.persona = {};
        this.Vehiculo.ejemplar = {};
        this.Vehiculo.ejemplar.modelo = {};
        this.Vehiculo.ejemplar.modelo.marca = {};

    }

    ngOnInit(): void {
        this.listRepuestos = [];
        this.repuestoSolicitud = {};
        this.listIdR = [];

        this.findListSolicitudRepuestosById();

        this.obtenerFechaActual();

        const listidRepuestos = [];
        this.router.paramMap.subscribe((params) => {

            this.garantiaService.findGarantiaByIdUsingGET(parseInt(params.get('idGarantia'))).subscribe((data) => {
                this.garantia = data;
                this.index = parseInt(params.get('index'));

                this.fallosSistemas = data.fallosSistemasVehiculo;

                this.vehiculoServicio
                    .findVehiculoByIdUsingGET(data.idVehiculo)
                    .subscribe((data) => {
                        this.Vehiculo = data;
                    });

                this.repuestoSolicitud = this.garantia.reclamo.informeProformaReparacion.ordenReparacion.informeReparacionTaller.solicitudRepuestos[this.index];

                if (this.repuestoSolicitud.srEstado === 2) {
                    this.solicitudDespachada = true;
                }
                this.repuestoSolicitud.repuestosList.forEach(value => {
                    let addRepuesto = true;
                    if (listidRepuestos.includes(value.idRepuestoAPIRestSQL)) {
                        addRepuesto = false;
                    }
                    if (addRepuesto) {
                        listidRepuestos.push(value.idRepuestoAPIRestSQL);
                    }
                })
                console.log(this.listIdR);
                this.findRepuestos(listidRepuestos);
            })
        });

    }

    //---buscando repuestos
    findRepuestos(list: number []) {

        this.repuestoService.listAllByIdUsingGET(list)
            .subscribe((data) => {
                this.listRepuestos = data;
                console.log('info repuestos', data);
            });
    }

    findListSolicitudRepuestosById() {

        this.empleadoService.findEmpleadoByIdUsingGET(parseInt(localStorage.getItem('idEmpleado'))).subscribe(
            (empleado: any) => {
                this.listEmpleadoDespacha.push(empleado);
            }
        )
    }

    despacharRepuestos() {
        this.tallerService.updateStatusSolicitudRepuestosUsingPUT(2, this.fecha, parseInt(localStorage.getItem('idEmpleado')), this.garantia.idGarantia, this.index)
            .subscribe((data) => {
                this.ShowDialogSucces();
                this.solicitudDespachada = true;
            }, error => {
                this.ShowDialogErr();
            });
    }

    volver() {
        this.routers.navigate(['generarRepuestos']);
        this.obtenerFechaActual();
    }

    obtenerFechaActual() {
        this.fecha = this.hoy.getFullYear() + '/' + (this.hoy.getMonth() + 1) + '/' + this.hoy.getDate();
        console.log('fecha', this.fecha);
    }

    ShowDialogSucces() {
        Swal.fire({
            icon: 'success',
            title: 'Se despacharon los repuestos correctamente',
        })
    }

    ShowDialogErr() {
        Swal.fire({
            icon: 'error',
            title: '¡ERROR!',
            text: 'Error al despachar los repuestos.',
        })
    }
}
