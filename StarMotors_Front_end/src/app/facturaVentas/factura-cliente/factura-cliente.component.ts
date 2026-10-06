import {Component, OnInit} from '@angular/core';
import {
    ClienteControllerService,
    ConcesionariaControllerService,
    FacturaVentaControllerService,
    TblCliente,
    TblConcesionaria,
    TblEjemplar,
    TblMarca,
    TblModelo,
    TblVehiculo,
    VehiculoControllerService
} from 'app/Services/SQL/angular_api_client';
import {ActivatedRoute, Router} from '@angular/router';
import {
    Cotizaciones,
    CotizacionesControllerService,
    EmailControllerService,
    NominaEmpleadosControllerService
} from '../../Services/NOSQL/angular_api_client';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as jsPDF from 'jspdf';
import * as _html2canvas from 'html2canvas';
import Swal from 'sweetalert2';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase';

@Component({
    selector: 'app-factura-cliente',
    templateUrl: './factura-cliente.component.html',
    styleUrls: ['./factura-cliente.component.css']
})
export class FacturaClienteComponent implements OnInit {

    // ------------------------------------------------DECLARACION DE VARIABLES-------------------------------------------------------------


    facturaCreada = false;
    clienteBuscado = false;

    // COTIZACION
    idCotizacionExist = 0;
    cotizacion: Cotizaciones = {};
    ventanaEnlaceCotizacion = false;
    aplicaCotizacion = false;

    // ENLAZAR COTIZACION
    listCotizaciones = [];
    listIdEjemplaresCotizados = [];
    listEjemplaresCotizados = [];
    cedulaCotizacion: string;

    // ENCABEZADO FACTURA
    IDEMPLEADO: number;
    concesionaria: TblConcesionaria;
    fechaEmision: Date;
    fechaExpiracion: Date;
    cliente: TblCliente;
    nroFactura: number;

    // DETALLE FACTURA
    listDetalleVehiculos: TblVehiculo [] = [];
    subtotal: number;
    total: number;
    descuento: number;
    iva12: number;
    iva: number;

    // Array meses
    monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    // VARIABLES PARA ESCOGER EL VEHICULO A COMPRAR
    listMarca: TblMarca[];
    listModelos: TblModelo[];
    listEjemplares: TblEjemplar [];
    vehiculoSeleccionado: TblVehiculo;
    ventanaSeleccionVehiculo = false;
    disponible = false;
    noDiponible = false;

    // pdf
    html2canvas: any = _html2canvas;

    // ENVIO FACTURA
    ventanaEnvioFactura = false;
    archivos: any;
    ventanaFlotante = false;

    // Formularios Reactivos
    formFactura: FormGroup;
    formSeleccionVehiculo: FormGroup;

    // --------------------------------------------------METODOS INICIALIZADOS--------------------------------------------------------------

    constructor(private vehiculoService: VehiculoControllerService,
                private facturaVentaService: FacturaVentaControllerService,
                private cotizacionService: CotizacionesControllerService,
                private routerActivated: ActivatedRoute,
                private clienteService: ClienteControllerService,
                private AuthService: AngularFireAuth,
                private concesionariaService: ConcesionariaControllerService,
                private emailService: EmailControllerService,
                private nominaEmpleadosService: NominaEmpleadosControllerService,
                private formBuider: FormBuilder,
                private router: Router
    ) {
        this.cotizacion.cliente = {};
    }

    ngOnInit(): void {
        this.formatearVariables();
        this.buscarConcesionaria();
        this.buidFormFactura();
        this.routerActivated.data.subscribe(value => {
            if (value != null) {
                this.buscarCotizacion(0);

            }
        });
    }

    // --------------------------------------------------- CONTROL VISTA --------------------------------------------------------------
    formatearVariables() {
        this.fechaEmision = new Date();
        this.fechaExpiracion = new Date();
        this.fechaExpiracion.setDate(this.fechaEmision.getDate() + 1825);
        this.listMarca = [];
        this.listModelos = [];
        this.cliente = {
            cliPassword: '',
            cliUsername: '',
            idCliente: 0,
            persona: {
                idPersona: 0,
                perApellido: '',
                perCedula: '',
                perDireccion: '',
                perEmail: '',
                perFechaNacimiento: '',
                perNombre: '',
                perTelefono: ''
            }
        };

        this.concesionaria = {
            comercializadora: {},
            conCorreo: '',
            conDireccion: '',
            conFoto: '',
            conNombre: '',
            conTelefono: '',
            idConcesionaria: 0
        }

        // Formatear form facturas
        this.formFactura = new FormGroup({
            perCedula: new FormControl(),
            perNombre: new FormControl(),
            perApellido: new FormControl(),
            perDireccion: new FormControl(),
            perTelefono: new FormControl(),
            perEmail: new FormControl(),
            perFechaNacimiento: new FormControl()
        });

        // Formatear form seleccion vehiculo
        this.formSeleccionVehiculo = new FormGroup({
            idMarca: new FormControl(),
            idModelo: new FormControl(),
            idEjemplar: new FormControl()
        });

        this.subtotal = 0.00;
        this.iva12 = 0.00;
        this.descuento = 0.00;
        this.total = 0.00;
    }


    getLongMonthName = function (monthNumber): string {
        return this.monthNames[monthNumber];
    }


    // -------------------------------------------------GENERACION DEL PDF----------------------------------------------------------------

    public downloadFacturaPDF() {
        const element = document.getElementById('facturaVenta');
        html2canvas(element).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const doc = new jsPDF();
            const imgHeight = (canvas.height * 208) / canvas.width;
            doc.addImage(imgData, 3, 3, 202, imgHeight);
            doc.save('factura.pdf');
        });
    }

    // -------------------------------------------------CONSUMO DE APIREST NoSQL----------------------------------------------------------------
    // Buscar cotizacion
    buscarCotizacion(idCotizacion: number) {
        // Buscamos el idCotizacion recibido en caso de existir una
        this.routerActivated.paramMap.subscribe(params => {
            if (idCotizacion === 0) {
                this.idCotizacionExist = parseInt(params.get('idCotizacion'));
            } else {
                this.idCotizacionExist = idCotizacion;
            }

            if (!isNaN(this.idCotizacionExist) && this.idCotizacionExist > 0) {
                this.cotizacionService.findByIdUsingGET(this.idCotizacionExist).subscribe(data => {
                    this.cotizacion = data;
                    this.formFactura.patchValue({
                        perCedula: this.cotizacion.cliente.perCedula,
                        perNombre: this.cotizacion.cliente.perNombre,
                        perApellido: this.cotizacion.cliente.perApellido,
                        perTelefono: this.cotizacion.cliente.perTelefono,
                        perFechaNacimiento: this.cotizacion.cliente.perFechaNacimiento,
                        perEmail: this.cotizacion.cliente.perEmail
                    });
                    this.aplicaCotizacion = true;
                    this.vehiculoService.findVehiculoDisponibleByIdEjemplarUsingGET(this.cotizacion.idEjemplar).subscribe(data => {
                            this.listDetalleVehiculos.push(data);
                            this.calcularTotales();
                        }, (error) => {
                            this.ShowDialogErrAddCar();
                        }
                    );
                });
            } else {
                this.idCotizacionExist = 0;
                this.aplicaCotizacion = false;
            }

        });
    }

    // listar cotizacion por estado y concesionaria
    listCotizacionesByStatus() {
        this.listCotizaciones = [];

        // Consumimos la lista de cotizaciones
        this.cotizacionService.findByEstadoUsingGET(2, this.concesionaria.idConcesionaria).subscribe(dataCotizaciones => {
            this.listCotizaciones = dataCotizaciones;

            // Buscamos las cotizaciones que ya fueron enlazadas
            this.facturaVentaService.findEnlacesCotizacioUsingGET(this.concesionaria.idConcesionaria).subscribe(dataEnlaces => {
                this.listCotizaciones.forEach((cotizacion, index, array) => {
                    if (dataEnlaces.includes(cotizacion.idCotizacion)) {
                        array.splice(index, 1);
                    }
                });
                this.findListEjemplaresById();
            });
        });
    }

    findByClienteEjemplar() {
        if (this.cedulaCotizacion === '') {
            this.listCotizacionesByStatus();
        } else {
            this.cotizacionService.findByCedulaClienteUsingGET(this.cedulaCotizacion, 2, this.concesionaria.idConcesionaria)
                .subscribe((data) => {
                    this.listCotizaciones = data;
                });
        }
    }

    // -------------------------------------------------CONSUMO DE APIREST SQL----------------------------------------------------------------

    // Obtener datos de la concesionaria
    buscarConcesionaria() {
        this.IDEMPLEADO = parseInt(localStorage.getItem('idEmpleado'));
        if (!isNaN(this.IDEMPLEADO)) {
            this.nominaEmpleadosService.getEmpleadoByIdSQLUsingGET(parseInt(localStorage.getItem('idEmpleado'))).subscribe(dataEmpleado => {
                this.concesionariaService.findConcesionariaByIdUsingGET(dataEmpleado.idConcesionaria).subscribe(dataConcesionaria => {
                    this.concesionaria = dataConcesionaria;
                    this.listMarcaByConcesionaria();

                    this.facturaVentaService.findMaxIdFacturaUsingGET1().subscribe(value => {
                        this.nroFactura = value;
                    })
                });
            });
        }
    }

    // Listar marcas de la concesionaria
    listMarcaByConcesionaria() {
        this.vehiculoService.listMarcasUsingGET(this.concesionaria.idConcesionaria).subscribe(data => {
            this.listMarca = data;
        });
    }

    // ON CHANGE PARA LA TABLA DE BUSQUEDA DE VEHICULOS DISPONIBLES
    onChangeMarca(idMarca: number) {
        this.vehiculoService.findModeloByMarcaUsingGET(idMarca).subscribe(data => {
            this.listModelos = data;
        });
    }

    onChangeModelo(idModelo: number) {
        this.vehiculoService.listEjemplaresByModeloUsingGET(this.concesionaria.idConcesionaria, idModelo).subscribe(data => {
            this.listEjemplares = data;
        });
    }

    onChangeEjemplar(idEjemplar: number) {
        this.vehiculoService.findVehiculoDisponibleByIdEjemplarUsingGET(idEjemplar).subscribe(data => {
                this.vehiculoSeleccionado = data;
                this.disponible = true;
                this.noDiponible = false;
            }, (error) => {
                this.vehiculoSeleccionado = null;
                this.disponible = false;
                this.noDiponible = true;

            }
        );
    }

    // Obtener lista de ejemplares por id
    findListEjemplaresById() {
        this.listEjemplaresCotizados = [];
        // Obtenemos todos los idEjemplares
        this.listCotizaciones.forEach((element) => {
            this.listIdEjemplaresCotizados.push(element.idEjemplar);
        });

        // Buscamos los ejemplares
        this.vehiculoService.listEjemplaresByIdUsingGET(this.listIdEjemplaresCotizados).subscribe(data => {
            data.forEach(data => {
                this.listEjemplaresCotizados.push(data);
            });
        });
    }

    postFactura() {
        if (this.formFactura.valid && this.listDetalleVehiculos.length > 0 && this.formFactura.get('perFechaNacimiento').value !== '') {
            // Validamos si existe el cliente
            this.clienteService.findByCedulaUsingGET(this.formFactura.get('perCedula').value).subscribe(dataCliente => {
                if (dataCliente === null) {
                    this.clienteService.addClientUsingPOST(
                        this.formFactura.get('perApellido').value,
                        this.formFactura.get('perCedula').value,
                        this.formFactura.get('perDireccion').value,
                        this.formFactura.get('perEmail').value,
                        this.formFactura.get('perFechaNacimiento').value,
                        this.formFactura.get('perNombre').value,
                        this.formFactura.get('perCedula').value, this.formFactura.get('perTelefono').value
                    ).subscribe(data => {
                        this.cliente = data;
                        this.logOrCreateFirebase();
                    });
                } else {
                    this.cliente = dataCliente;
                    this.logOrCreateFirebase();
                }
            });
        } else {
            this.ShowDialogFacturaIncompleta();
        }
    }

    logOrCreateFirebase() {
        // LOGEAMOS AL CLIENTE
        firebase.auth().signInWithEmailAndPassword(this.cliente.cliUsername, this.cliente.cliPassword).then((userCredential) => {
            // Signed in
            firebase.auth().signOut().then(() => {
                    // Sign-out successful.
                    this.crearFactura();
                },
            );


        }, (error) => {
            // Registramos al cliente en firebase
            this.AuthService.createUserWithEmailAndPassword(this.cliente.cliUsername, this.cliente.cliPassword).then((result) => {
                result.user.updateProfile({
                    displayName: this.cliente.persona.perNombre + ' ' + this.cliente.persona.perApellido
                });
                firebase.auth().signOut().then(() => {
                    },
                );
                this.crearFactura();
            });

        });
    }

    crearFactura() {
        const listIdVehiculosDetalle = [];
        this.listDetalleVehiculos.forEach(vehiculo => {
            listIdVehiculosDetalle.push(vehiculo.idVehiculo);
        });
        // CREAMOS LA FACTURA
        this.facturaVentaService.addFacturaUsingPOST1(
            this.descuento,
            (this.fechaEmision.getFullYear().toString() + '-' + this.fechaEmision.getMonth() + 1 + '-' + this.fechaEmision.getDate().toString()),
            this.cliente.idCliente,
            this.concesionaria.idConcesionaria,
            this.idCotizacionExist,
            12,
            listIdVehiculosDetalle,
            this.subtotal,
            this.total
        ).subscribe(dataFactura => {
            this.facturaCreada = true;
            this.ShowDialogSuccesVenta();
        }, (error) => {
            this.ShowDialogErrVenta();
            this.facturaCreada = false;
        });
    }

    findClientByCedula() {
        if (this.formFactura.get('perCedula').value !== '') {
            this.clienteService.findByCedulaUsingGET(this.formFactura.get('perCedula').value).subscribe(value => {
                this.formFactura.patchValue({
                    perCedula: value.persona.perCedula,
                    perNombre: value.persona.perNombre,
                    perApellido: value.persona.perApellido,
                    perTelefono: value.persona.perTelefono,
                    perFechaNacimiento: value.persona.perFechaNacimiento,
                    perEmail: value.persona.perEmail,
                    perDireccion: value.persona.perDireccion
                });
                this.clienteBuscado = true;
            });
        }
    }

    // ---------------------------------------------------------OTROS METODOS----------------------------------------------------------------

    toogleVentanaVehiculo() {
        if (this.ventanaSeleccionVehiculo) {
            this.ventanaSeleccionVehiculo = false;
        } else {
            this.ventanaSeleccionVehiculo = true;
        }
    }

    toogleVentanaEnlaceCotizacion() {
        if (this.ventanaEnlaceCotizacion) {
            this.ventanaEnlaceCotizacion = false;
        } else {
            this.listCotizacionesByStatus();
            this.ventanaEnlaceCotizacion = true;
        }
    }

    toogleVentanaEnvioFactura() {
        this.ventanaEnvioFactura = !this.ventanaEnvioFactura;
    }

    addDetalleVehiculos() {
        if (this.disponible) {
            let addBoolean = true;
            this.listDetalleVehiculos.forEach(vehiculo => {
                if (vehiculo.idVehiculo === this.vehiculoSeleccionado.idVehiculo) {
                    addBoolean = false;
                }
            });

            if (addBoolean) {
                this.listDetalleVehiculos.push(this.vehiculoSeleccionado);
            }

            this.ShowDialogSuccesAddCar();
            this.calcularTotales();
            this.toogleVentanaVehiculo();
        } else {
            this.ShowDialogErrAddCar();
        }
    }

    deleteDetalleVehiculo(idVehiculo: number) {
        this.listDetalleVehiculos.forEach((value, index, array) => {
            if (value.idVehiculo === idVehiculo) {
                array.splice(index, 1);
            }
        });
    }

    calcularTotales() {
        if (this.listDetalleVehiculos.length >= 0) {
            this.listDetalleVehiculos.forEach(vehiculo => {
                this.subtotal = this.subtotal + vehiculo.vehPrecio;
                this.iva12 = this.iva12 + (this.subtotal * 12 / 100);
            });
            this.total = this.subtotal + this.iva12;
        }
    }


    enlazarCotizacion(idCotizacion: number) {
        this.idCotizacionExist = idCotizacion;
        this.aplicaCotizacion = true;
        if (this.listDetalleVehiculos.length <= 0) {
            this.buscarCotizacion(idCotizacion);
        }
        this.toogleVentanaEnlaceCotizacion();
    }

    buidFormFactura() {
        this.formFactura = this.formBuider.group({
            perCedula: ['', [Validators.required]],
            perNombre: ['', [Validators.required]],
            perApellido: ['', [Validators.required]],
            perTelefono: ['', [Validators.required]],
            perFechaNacimiento: ['', Validators.required],
            perEmail: ['', Validators.required],
            perDireccion: ['', Validators.required],
        })
    }

    async capturarFile(event) {
        if (event.target.files.length > 0) {
            this.archivos = event.target.files[0];
        }

    }

    subirArchivo() {
        this.toogleVentanaEnvioFactura();
        this.ventanaFlotante = true;
        try {
            const FacturaFile = new FormData();
            FacturaFile.append('files', this.archivos);

            this.emailService.sendEmailWithAttachmentUsingPOSTForm(
                this.archivos,
                this.cliente.persona.perEmail
            )
                .subscribe(
                    (data) => {

                        this.ventanaFlotante = false;
                        this.ShowDialogEnvioFacturaErr();
                    }, (error) => {
                        this.ventanaFlotante = false;
                        this.ShowDialogEmailSuccess();
                    }
                );
        } catch (error) {
            this.ShowDialogEnvioFacturaErr();
        }
    }


    crearPDF() {
// Guardamos el pdf
        const element = document.getElementById('facturaVenta');
        html2canvas(element).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const doc = new jsPDF();
            const imgHeight = (canvas.height * 208) / canvas.width;
            doc.addImage(imgData, 3, 3, 202, imgHeight);
            doc.save('factura.pdf');
        });
    }

    eliminarClienteEnlazado() {
        this.cliente = {};
        this.formFactura.patchValue({
            perCedula: '',
            perNombre: '',
            perApellido: '',
            perTelefono: '',
            perFechaNacimiento: '',
            perEmail: '',
            perDireccion: ''
        });
        this.clienteBuscado = false;
    }

    // --------------------------------------SWEET ALERTS---------------------------------------
    ShowDialogSuccesAddCar() {
        Swal.fire({
            icon: 'success',
            title: 'Vehículo Agregado Exitosamente',
        })
    }

    ShowDialogErrAddCar() {
        Swal.fire({
            icon: 'error',
            title: 'Vehículo No Disponible',
            text: 'No existen Vehiculos Disponibles para el Modelo Escogido!',
        })
    }

    ShowDialogErrVenta() {
        Swal.fire({
            icon: 'error',
            title: 'Error al crear la factura',
            text: 'No se pudo registrar la venta!',
        })
    }

    ShowDialogSuccesVenta() {
        Swal.fire({
            icon: 'success',
            title: 'Venta registrada exitosamente!',
            confirmButtonText: 'Save',
        }).then((result) => {
            if (result.isConfirmed) {
                // this.crearPDF();
            }
        })
    }


    ShowDialogEnvioFacturaSucces() {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Factura enviada exitosamente',
            showConfirmButton: false,
            timer: 1500
        })
    }

    ShowDialogEnvioFacturaErr() {
        Swal.fire({
            icon: 'error',
            title: 'Error al enviar la factura',
            text: 'No se pudo registrar la venta!',
        })
    }

    ShowDialogFacturaIncompleta() {
        Swal.fire({
            icon: 'error',
            title: 'Factura Incompleta',
            text: 'Factura incompleta, por favor llene los campos e intente nuevamente.',
        })
    }

    ShowDialogEliminarEnlaceCotizacion() {
        Swal.fire({
            title: '¿Esta seguro que desea desenlazar la cotización??',
            text: 'Se eliminara el enlace con la cotización y no si desea volver a enlazarla tendra que buscarla nuevamente.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            if (result.isConfirmed) {
                this.idCotizacionExist = 0;
                this.aplicaCotizacion = false;
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }

    ShowDialogSalir() {
        Swal.fire({
            title: '¿Esta seguro que desea salir?',
            text: 'Se perdera la información cargada.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                this.router.navigate(['dashboard']);
            }
        })
    }

    ShowDialogEmailSuccess() {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title:
                'Factura enviada con exito a: ' + '' + this.cliente.persona.perEmail,
            showConfirmButton: false,
            timer: 3500,
        });
    }

}
