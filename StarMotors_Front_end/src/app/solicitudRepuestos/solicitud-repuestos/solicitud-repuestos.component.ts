import {Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, FormsModule} from '@angular/forms';
import {Garantia, GarantiasControllerService, Repuestos, TallerControllerService,} from 'app/Services/NOSQL/angular_api_client';
import {
    RepuestoControllerService,
    TblCliente,
    TblConcesionaria,
    TblMarca,
    TblModelo,
    TblRespuestos,
    TblVehiculo,
    VehiculoControllerService,
} from 'app/Services/SQL/angular_api_client';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-solicitud-repuestos',
    templateUrl: './solicitud-repuestos.component.html',
    styleUrls: ['./solicitud-repuestos.component.css'],
})
export class SolicitudRepuestosComponent implements OnInit {
    garantia: Garantia = {};
    cliente: TblCliente = {};
    vehiculo: TblVehiculo = {};
    repuesto: TblRespuestos = {};
    listSelecRepuestos = [];
    repuestos: TblRespuestos[] = [];
    listaRepuestosId = [];
    repuestoNosql: Repuestos[] = [];
    listModelos: TblModelo[];
    //Necesarios
    listMarcas: TblMarca []
    arrayRepuestos: Repuestos[] = [];
    arrarCantidades = [];
    concesionaria: TblConcesionaria;

    //Formularios Reactivos
    formSeleccionRepuesto: FormGroup;
    formData: FormGroup;

    //idRepuestoSelected: number = 0;
    idMarca: number;
    cantidad: number;
    precio: number = 0;
    parentSelector: boolean = false;
    ventanaSeleccionRepuesto = false;

    //SELECCION DE REPUESTOS
    idRepuestoSelecccionado = 0;
    repuestoSelected = {};
    listRepuestosPost = [];
    listRepuestosSelected = [];

    /////Para post
    IDEMPLEADO;
    detalleSo = '';
    fechaData = '';
    //post Detail Vehiculo
    marca = '';
    modelo = '';
    matricula;
    idGarantia;

    fechaEmision: Date = new Date();
    date: Date = new Date();


    constructor(
        private form: FormsModule,
        private router: ActivatedRoute,
        private garantiaService: GarantiasControllerService,
        private vehiculoService: VehiculoControllerService,
        private repuestoService: RepuestoControllerService,
        private tallerService: TallerControllerService,
        private routerActivated: ActivatedRoute,
        private routers: Router,
        inputfechaEmi: ElementRef
    ) {
        this.cliente.persona = {};
        this.vehiculo.ejemplar = {};
        this.vehiculo.ejemplar.modelo = {};
        this.vehiculo.ejemplar.modelo.marca = {};
    }

    ngOnInit(): void {
        this.router.paramMap.subscribe((params) => {
            this.idGarantia = parseInt(params.get('idGarantia'));
        });
        this.router.paramMap.subscribe((params) => {
            this.garantiaService.findGarantiaByIdUsingGET(parseInt(params.get('idGarantia'))).subscribe((data) => {
                this.garantia = data;
                // console.log('idGarantia',this.garantia)
                this.vehiculoService.findVehiculoByIdUsingGET(this.garantia.idVehiculo).subscribe((dataVehiculo) => {
                    this.vehiculo = dataVehiculo;
                    this.listarRepuestos(1, dataVehiculo.ejemplar.modelo.marca.idMarca);
                    //  this.listMarcaByConcesionaria();
                });
                console.log('LOG VEHICULO ' + this.vehiculo);
                // console.log('Fecha de emis',this.inputfechaEmi);

                this.getAllMarcas();
                this.IDEMPLEADO = parseInt(localStorage.getItem('idEmpleado'));

                this.formSeleccionRepuesto = new FormGroup({
                    idRepuestoAPIRestSQL: new FormControl(),
                    cantidad: new FormControl(),
                });

                this.formData = new FormGroup({
                    descripcion: new FormControl(),
                });
            });
        });
    }

    // ON CHANGE PARA LA TABLA DE BUSQUEDA DE VEHICULOS DISPONIBLES
    onChangeMarca(idMarca: number) {
        this.repuestoService
            .listRepuestosByMarcaUsingGET(this.garantia.idConcesionaria, idMarca)
            .subscribe((data) => {
                this.repuestos = data;

            });
    }

    // Listar marcas de la concesionaria
    /*  listMarcaByConcesionaria() {
      this.vehiculoService
        .listMarcasUsingGET(this.concesionaria.idConcesionaria)
        .subscribe((data) => {
          this.listMarca = data;
        });
    }*/

    toogleVentanaRepuesto() {
        if (this.ventanaSeleccionRepuesto) {
            this.ventanaSeleccionRepuesto = false;
        } else {
            this.ventanaSeleccionRepuesto = true;
        }
    }


    onChangeRepuesto(idRepuesto: number) {
        this.repuestoService.findByIdUsingGET(idRepuesto).subscribe(value => {
            this.repuestoSelected = value;
        });
        // this.repuestoService
        // .findByIdUsingGET(repuesto)
        // .subscribe((data) => {
        //   this.repuestos2 = data;
        //
        // });
    }

    addListRepuestos() {
        let objRepuesto: Repuestos;
        objRepuesto = this.formSeleccionRepuesto.value;
        console.log('repuesto: ' + objRepuesto);
        this.listRepuestosPost.push(objRepuesto);
        this.listRepuestosSelected.push(this.repuestoSelected);
        console.log('NUEVA LISTA: ' + this.listRepuestosSelected);
        this.ShowDialogSucces();
        this.toogleVentanaRepuesto();
        this.cleanDataRep();
        // }
    }

    reomeveItem(index: number) {
        if (index > -1) {
            this.listRepuestosSelected.splice(index, 1);
            this.listRepuestosPost.splice(index, 1);
        }
    }

    removeRepuesto(index) {
        Swal.fire({
            title: 'Estas Seguro?',
            text: 'No se podra recuperar este dato',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si, borrar!',
        }).then((result) => {
            if (result.isConfirmed) {
                this.reomeveItem(index);

                Swal.fire(
                    'Eliminado!',
                    'El repuesto ha silo eliminado de la lista.',
                    'success'
                );
            }
        });
    }

    //Lista los detalles del vehiculo que necesitamos reparar
    listarVehiculo(idVehiculo: number) {
        this.vehiculoService
            .findVehiculoByIdUsingGET(idVehiculo)
            .subscribe((data) => {
                this.vehiculo = data;
                //console.log('idModelo',this.vehiculo.ejemplar.modelo.idModelo)
                this.listarRepuestos(1, this.vehiculo.ejemplar.modelo.marca.idMarca);
            });
    }

    //Lista todos los repuestos
    listarRepuestos(idConcesionaria: number, idMarca: number) {
        this.repuestoService
            .listRepuestosByMarcaUsingGET(idConcesionaria, idMarca)
            .subscribe((data) => {
                this.repuestos = data;
                // console.log(this.repuestos);
            });
    }

    //Traer todas las marcas
    getAllMarcas() {
        this.vehiculoService.listMarcasUsingGET(this.garantia.idConcesionaria).subscribe(data => {
            this.listMarcas = data;

        })
    }

    //Enviar solicitud de Repuestos
    postSolicitud() {
        console.log('array de rep', this.arrayRepuestos);

        if (this.listRepuestosPost.length === 0 || this.detalleSo === '') {
            this.errorLlenarCampos();
        } else {
            Swal.fire({
                title: '¿Enviar solicitud?',
                text: 'No podra editar la solicitud',
                icon: 'success',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Sí, enviar !',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.IDEMPLEADO = parseInt(localStorage.getItem('idEmpleado'));

                    this.tallerService.postSolicitudRepuestosUsingPOST(
                        this.listRepuestosPost,
                        this.detalleSo,
                        (this.fechaEmision.getFullYear().toString() + '-' + this.fechaEmision.getMonth() + 1 + '-' + this.fechaEmision.getDate().toString()),
                        this.IDEMPLEADO,
                        this.idGarantia).subscribe(value => {
                        this.ShowDialogSuccessAddSolicitud();
                    }, error => {
                        this.ShowDialogErrorAddSolicitud();
                    });
                }
            });
            this.cleanDataDet();
        }
    }

    //Limpiar Campos
    cleanDataRep() {
        this.formSeleccionRepuesto.patchValue({
            idRepuesto: '',
            cantidadF: '',
        });
    }

    cleanDataDet() {
        this.formData.patchValue({
            descripcion: '',
        });
    }

    volver() {
        this.routers.navigate(['detalleOrdenReparacion']);
    }

    // ------------------------------------------------------SWEET ALERTS --------------------------------
    ShowDialogSucces() {
        Swal.fire({
            icon: 'success',
            title: 'Repuesto Agregado Existosamente!',
        });
    }

    ShowDialogSuccessAddSolicitud() {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
        });
        Toast.fire({
            icon: 'success',
            title: 'Solicitud enviada satisfactoriamente',
        });
    }

    ShowDialogErrorAddSolicitud() {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
        });
        Toast.fire({
            icon: 'error',
            title: 'A ocurrido un error al enviar la solicitud',
        });
    }

    mensajeError() {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
        });
        Toast.fire({
            icon: 'error',
            title: 'Rellene Todos los campos',
        });
    }

    errorLlenarCampos(){
        Swal.fire({
            icon: 'error',
            title: 'No se puede enviar la información',
            text: 'LLene los campos primero!',
        });
    }
}
