import {Component, OnInit} from '@angular/core';
import {Cotizaciones, CotizacionesControllerService} from '../../Services/NOSQL/angular_api_client';
import {ActivatedRoute, Router} from '@angular/router';
import {TblEjemplar, VehiculoControllerService} from '../../Services/SQL/angular_api_client';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-detalle-cotizacion',
    templateUrl: './detalle-cotizacion.component.html',
    styleUrls: ['./detalle-cotizacion.component.css']
})
export class DetalleCotizacionComponent implements OnInit {

    cotizacion: Cotizaciones = {};
    ejemplar: TblEjemplar = {};

    fechaEmision: Date = new Date();
    fechaExpiracion: Date = new Date();

    cotizacionAtendida = false;
    cotizacionEliminada = false;

    // Array meses
    monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    // ------------------------------------------------METODOS INICIALIZADOS-------------------------------------------------------
    constructor(private cotizacionService: CotizacionesControllerService, private vehiculoService: VehiculoControllerService, private routerActivated: ActivatedRoute, private router: Router) {
        this.ejemplar.modelo = {};
        this.ejemplar.modelo.marca = {};
    }

    ngOnInit(): void {
        // Buscamos el idCotizacion recibido
        this.routerActivated.paramMap.subscribe(params => {
            // Buscamos la cotizacion
            this.findCotizacionesById(parseInt(params.get('idCotizacion')));
        });
    }

    // -----------------------------------------------------METODOS DE CONSUMO APIREST NOSQL-----------------------------------------------------------
    // Consultar cotizacion
    findCotizacionesById(idCotizacion: number) {
        this.cotizacionService.findByIdUsingGET(idCotizacion).subscribe(data => {
            console.log(data);
            this.cotizacion = data;
            if (this.cotizacion.cotEstado === 2) {
                this.cotizacionAtendida = true;
            } else if (this.cotizacion.cotEstado === 3) {
                this.cotizacionAtendida = true;
                this.cotizacionEliminada = true;
            }
            this.fechaEmision = new Date(data.cotFecha);
            this.fechaEmision.setDate(this.fechaEmision.getDate() + 1);
            this.fechaExpiracion.setDate(this.fechaEmision.getDate() + 30);
            this.findEjemplarOfModeloById(this.cotizacion.idEjemplar);
        });
    }

    // Actualizar estado de la cotizacion
    updateStatusCotizacion(estado: number) {
        this.cotizacionService.updateStatusCotizacionUsingPUT(estado, this.cotizacion.idCotizacion, parseInt(localStorage.getItem('idEmpleado'))).subscribe(data => {
            this.ShowDialogSucces();
            this.cotizacionAtendida = true;
        });
    }

    // -----------------------------------------------------METODOS DE CONSUMO APIREST SQL ---------------------------------------------------------------
    // Consultar ejemplar de modelo
    findEjemplarOfModeloById(idEjemplar: number) {
        this.vehiculoService.findEjemplarByIdUsingGET(idEjemplar).subscribe(data => {
            this.ejemplar = data;
        })
    }

    // -------------------------------- OTROS MEOTODOS -------------------------------------
    // Enviar idCotizacion para generar la factura de venta
    generarVenta() {
        this.router.navigate([this.cotizacion.idCotizacion, 'facturaVenta']);
    }

    getLongMonthName = function (monthNumber): string {
        return this.monthNames[monthNumber];
    }

    ShowDialogSucces() {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Cotizacion Atendida',
            showConfirmButton: false,
            timer: 1500
        })
    }
}
