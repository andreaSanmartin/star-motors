import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TallerControllerService} from 'app/Services/NOSQL/angular_api_client';
import {EmpeladoControllerService} from 'app/Services/SQL/angular_api_client';

@Component({
    selector: 'app-despachar-repuestos',
    templateUrl: './despachar-repuestos.component.html',
    styleUrls: ['./despachar-repuestos.component.css']
})
export class DespacharRepuestosComponent implements OnInit {


    // ---------------------------------------------------------DECLARACION DE VARIABLES--------------------------------------------------------------------
    // Lista de garantias por estado
    listGarantias = [];
    listEmpleadoSolicita = [];
    listSolicitudRepuestos = [];
    // Estado para validar los filtros de estado
    estadoFilter = 1;


    datefilter = '';
    namefilter = '';


    constructor(private routers: Router, private tallerService: TallerControllerService, private empleadoServide: EmpeladoControllerService) {
    }

    ngOnInit(): void {
        this.listDespachoByStatus(this.estadoFilter);
        // this.findListSolicitudRepuestosById();
    }

    title = 'Listado de solicitudes de despacho de repuestos';

    // ------------------------------------------------------METODOS DE CONSUMO APIREST NO SQL--------------------------------------------------------------
    // listar cotizacion por estado y concesionaria
    listDespachoByStatus(status: number) {

        // Formateamos las listas
        this.listGarantias = [];
        this.listEmpleadoSolicita = [];
        this.listSolicitudRepuestos = [];
        // Guardamos el estado
        this.estadoFilter = status;
        // Consumimos la lista de cotizaciones
        this.tallerService.listSolicitudRepuestosByStatusUsingGET(status, 1).subscribe(dataGarantias => {
            this.listGarantias = dataGarantias;
            this.findEmpleados();
        });
    }

    findEmpleados() {
        this.listGarantias.forEach(garantia => {
            let lista = [];
            lista = garantia.reclamo.informeProformaReparacion.ordenReparacion.informeReparacionTaller.solicitudRepuestos;
            lista.forEach(solicitud => {
                console.log(solicitud.srEstado);
                if (solicitud.srEstado === this.estadoFilter) {
                    this.listSolicitudRepuestos.push(solicitud);
                    this.empleadoServide.findEmpleadoByIdUsingGET(solicitud.empleadoSolicitaRepuestos.idEmpleadoAPIRestSQL).subscribe(
                        (empleado: any) => {
                            var addEmploye = true;
                            this.listEmpleadoSolicita.forEach(value => {
                                if (value.idEmpleado === empleado.idEmpleado) {
                                    addEmploye = false;
                                }
                            });
                            if (addEmploye) {
                                this.listEmpleadoSolicita.push(empleado);
                            }
                        }
                    )
                }
            });
        });
    }


    // METODO DE REDIRECCION
    verSolicitudR(idGarantia: number, index: number) {
        this.routers.navigate([idGarantia, index, 'detalleSolRep']);
    }

}
