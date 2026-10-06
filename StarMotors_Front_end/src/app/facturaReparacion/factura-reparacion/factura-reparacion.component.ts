import {Component, OnInit} from '@angular/core';
import {
    EmailControllerService,
    Garantia,
    GarantiasControllerService,
    NominaEmpleadosControllerService,
} from 'app/Services/NOSQL/angular_api_client';
import {
    ClienteControllerService,
    ConcesionariaControllerService,
    FacturaReparacionControllerService,
    RepuestoControllerService,
    TblCliente,
    TblConcesionaria,
    TblVehiculo,
    VehiculoControllerService,
} from 'app/Services/SQL/angular_api_client';
import * as _jsPDF from 'jspdf';
import * as _html2canvas from 'html2canvas';
import Swal from 'sweetalert2';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-factura-reparacion',
    templateUrl: './factura-reparacion.component.html',
    styleUrls: ['./factura-reparacion.component.css'],
})
export class FacturaReparacionComponent implements OnInit {
    imgcreada = false;
    imgenCreada: any;
    html2canvas: any = _html2canvas;
    jsPDF: any = _jsPDF;
    image: any;
    archivos: any;

    // Lista creada para Listar el detalle de la reparacion
    listReparacion = [];

    // Array meses
    monthNames = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
    ];

    fechaEmision: Date;
    fechaExpiracion: Date;

    // Lista creada para Listar los Ids de Repuestos
    ListIdsRepuestos = [];

    // lista para creada para listar el detalle de repuestos
    ListRepuestos = [];

    // lista creada para listar el detalle de la mano de obra
    listManoObras = [];

    // Variables instanciadas el data de los End-Points
    Garantia: Garantia = {};
    Vehiculo: TblVehiculo = {};
    Cliente: TblCliente = {};

    // Variables para la fecha en la factura
    date = new Date("yyyy/MM/dd");
    fecha = '';

    // variable para mostar el id de la factura
    idFactura = 0;
    // Variable para sacar la suma de la mano de obra
    totalObra: number = 0;

    // variable para sacar la cantidad de repuestos
    cantidad = [];

    // variable para sacar el precio de los repuestos
    precio = [];

    // variable para sacar el total de los repuestos utilizados
    totalPrecio = [];

    // variable para sumar todos los totales de los detalles
    subtotalArray = [];

    // variable para sacar el iva
    subtotal: number = 0;

    // variable para el subtotal con iva ya incluido
    Subtotales: number = 0;
    decimalSubtotal = '';

    // variable para la lista de repuestos
    ListaRepuestos = [];

    // variable para sacar la garantia que cubre
    GarantiaComercializadora = 0;

    // variable para representar el monto a pagar por el cliente
    TotalFinal = 0;

    // variable para sacar la informacion emitida en los informes por la comercializadora
    descripcionComercializadora = '';

    // variable para sacar el id de la concesionaria
    idConcesionaria: number = 0;

    // variable para sacar los datos de la concesionaria
    Concesionaria: TblConcesionaria = {};

    // variables para mostrar ventanas emergentes
    ventanaFlotante = false;
    Ventanainput = false;

    constructor(
        private facturaReparacion: FacturaReparacionControllerService,
        private email: EmailControllerService,
        private router: ActivatedRoute,
        private garantiaService: GarantiasControllerService,
        private vehiculoServicio: VehiculoControllerService,
        private clienteService: ClienteControllerService,
        private repuestoService: RepuestoControllerService,
        private nominaEmpleadoService: NominaEmpleadosControllerService,
        private concesionariaService: ConcesionariaControllerService
    ) {
        // Inicializamos las Variables
        this.Cliente.persona = {};
        this.Vehiculo.ejemplar = {};
        this.Vehiculo.ejemplar.modelo = {};
        this.Vehiculo.ejemplar.modelo.marca = {};
    }

    ngOnInit(): void {
        this.llenarFactura();
        this.precioRepuestos();
        this.SumarSubtotales();
        this.SumarGarantia();
        this.ConsultarIdEmpleado();
    }

    llenarFactura() {
        this.fecha = this.date.toLocaleDateString();
        this.fechaEmision = new Date();
        this.fechaExpiracion = new Date();
        this.fechaExpiracion.setDate(this.fechaEmision.getDate() + 31);

        //Formateamos todas las listas
        this.listReparacion = [];
        this.ListIdsRepuestos = [];
        this.ListRepuestos = [];
        this.listManoObras = [];

        // Metodo para consultar y llenar los datos de la factura
        this.router.paramMap.subscribe((paramas) => {
            this.garantiaService
                .findGarantiaByIdUsingGET(parseInt(paramas.get('idGarantia')))
                .subscribe((data) => {
                    this.Garantia = data;

                    // consultamos todas las Reparaciones
                    this.listReparacion =
                        data.reclamo.informeProformaReparacion.ordenReparacion.informeReparacionTaller.solicitudRepuestos[0].repuestosList;

                    // consultamos los repuestos
                    this.ListaRepuestos =
                        data.reclamo.informeProformaReparacion.ordenReparacion.informeReparacionTaller.solicitudRepuestos;

                    // consultamos la garantia que va a cubrir la comercializadora
                    this.GarantiaComercializadora =
                        data.reclamo.informeProformaReparacion.ordenReparacion.informeReparacionTaller.informeReparacionComercializadora.ircGarantia;

                    // consultamos la descripcion de los informes que emite la comercializadora
                    this.descripcionComercializadora =
                        data.reclamo.informeProformaReparacion.ordenReparacion.informeReparacionTaller.informeReparacionComercializadora.ircDescripcion;
                    // consultamos todas las detalles de la mano de obra
                    this.listManoObras =
                        data.reclamo.informeProformaReparacion.ordenReparacion.informeReparacionTaller.manoObraList;

                    this.listReparacion.forEach((item) => {
                        this.cantidad.push(item.cantidad);
                    });
                    this.precioManoObra();

                    // recorremos la lista de Reparacion para sacar los idRepuestos
                    // y poder listar los Repuestos
                    this.listReparacion.forEach((element) => {
                        this.ListIdsRepuestos.push(element.idRepuestoAPIRestSQL);
                    });

                    // consultamos el Vehiculo que requeria la garantia
                    this.vehiculoServicio
                        .findVehiculoByIdUsingGET(data.idVehiculo)
                        .subscribe((data) => {
                            this.Vehiculo = data;
                        });

                    // Consultamos el cliente que requeria la garantia
                    this.clienteService
                        .findClienteByIdUsingGET(data.idCliente)
                        .subscribe((data) => {
                            this.Cliente = data;
                        });

                    this.facturaReparacion
                        .findMaxIdFacturaUsingGET()
                        .subscribe((data) => {
                            this.idFactura = data;
                        });

                    // consultamos los repuestos requeridos
                    // para cubrir el daño del carro
                    this.repuestoService
                        .listAllByIdUsingGET(this.ListIdsRepuestos)
                        .subscribe((data) => {
                            this.ListRepuestos = data;
                            this.ListRepuestos.forEach((element) => {
                                this.precio.push(element.repPrecio);
                            });
                            this.precioRepuestos();
                            this.SumarSubtotales();
                            this.SumarGarantia();
                        });
                });
        });
    }

    precioManoObra() {
        //Metodo para ver el total a pagar la mano de obra
        this.listManoObras.forEach((listo) => {
            this.totalObra = listo.cantidadHoras * listo.moPrecioHora;
        });
    }

    // metodo para abrir la ventana flotante
    mostrarventanaInput() {
        this.Ventanainput = true;
    }

    // metodo para calcular el precio de los repuestos
    precioRepuestos() {
        var r = [];
        for (let index = 0; index < this.cantidad.length; index++) {
            r[index] = this.cantidad[index] * this.precio[index];
            this.totalPrecio = r;
        }
    }

    // metodo para calcular los subtotales mas el iva
    SumarSubtotales() {
        var sub: number;
        const reducer = (previousValue, currentValue) =>
            previousValue + currentValue;
        this.subtotalArray = this.totalPrecio.concat(this.totalObra);
        sub = this.subtotalArray.reduce(reducer);
        this.subtotal = (sub * 12) / 100;
        this.Subtotales = this.subtotal + sub;

        this.decimalSubtotal = this.Subtotales.toFixed(2);

        console.log('El resultado de los decimales', this.decimalSubtotal);
    }

    // metodo para sumar el total final
    SumarGarantia() {
        this.TotalFinal =
            parseFloat(this.decimalSubtotal) - this.GarantiaComercializadora;
    }

    getLongMonthName = function (monthNumber): string {
        return this.monthNames[monthNumber];
    };

    // consultamos el id  del empleado mediante el localStorage
    ConsultarIdEmpleado() {
        this.nominaEmpleadoService
            .getEmpleadoByIdSQLUsingGET(parseInt(localStorage.getItem('idEmpleado')))
            .subscribe((data) => {
                this.idConcesionaria = data.idConcesionaria;

                this.concesionariaService
                    .findConcesionariaByIdUsingGET(this.idConcesionaria)
                    .subscribe((data) => {
                        this.Concesionaria = data;

                        console.log(this.Concesionaria);
                    });
            });
    }

    // metodo para cerrar la ventana flotante
    cerrar() {
        this.Ventanainput = false;
    }

    // Metodo para genera la factura de Reparacion
    GenerarFacturaReparacion() {

     var IdFactura : number;

        this.facturaReparacion
            .addFacturaUsingPOST(
                0,
                this.GarantiaComercializadora,
                this.Subtotales,
                this.TotalFinal,
                JSON.stringify(this.listManoObras),
                this.descripcionComercializadora,
                JSON.stringify(this.listReparacion),
                this.date.toString(),
                this.Cliente.idCliente,
                this.idConcesionaria,
                this.Vehiculo.vehNumChasis
            )
            .subscribe(
                (data) => {
                    IdFactura = data.idEncFacturaReparacion
                    this.ShowDialogSucces();
                    this.garantiaService.updateSolicitudGarantiaUsingPUT(IdFactura,parseInt(localStorage.getItem("idEmpleado")),this.Garantia.idGarantia).subscribe(data => {

                    })
                },
                (err) => {
                    this.ShowDialogErr();
                }
            );


           
            }

    crearImagen() {
        html2canvas(document.querySelector('#factura')).then((canvas) => {
            this.image = canvas.toDataURL();

            this.imgenCreada = canvas.toDataURL('image/png');

            let pdf = new this.jsPDF('l', 'cm', 'a4'); //Generates PDF in landscape mode
            // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
            pdf.addImage(this.imgenCreada, 'PNG', 0, 0, 29.7, 21.0);
            pdf.save('Factura.pdf');
            const FacturaFile = new FormData();
            FacturaFile.append('files', this.image);
        });
    }

    // crearImagen() {
    //   const DATA = document.getElementById("factura") as HTMLCanvasElement;
    //   const doc = new this.jsPDF("p", "pt", "a4");
    //   const options = {
    //     background: "white",
    //     scale: 3,
    //   };
    //   html2canvas(DATA, options)
    //     .then((canvas) => {
    //       const img = canvas.toDataURL("image/PNG");

    //       // Add image Canvas to PDF
    //       const bufferX = 15;
    //       const bufferY = 15;
    //       const imgProps = (doc as any).getImageProperties(img);
    //       const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
    //       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    //       doc.addImage(
    //         img,
    //         "PNG",
    //         bufferX,
    //         bufferY,
    //         pdfWidth,
    //         pdfHeight,
    //         undefined,
    //         "FAST"
    //       );

    //       return doc;
    //     })
    //     .then((docResult) => {
    //       docResult.save("Factura.pdf");
    //     });
    // }

    async capturarFile(event) {
        if (event.target.files.length > 0) {
            this.archivos = event.target.files[0];
        }
    }

    subirArchivo() {
        this.Ventanainput = false;
        this.ventanaFlotante = true;
        try {
            const FacturaFile = new FormData();
            FacturaFile.append('files', this.archivos);

            this.email
                .sendEmailWithAttachmentUsingPOSTForm(
                    this.archivos,
                    this.Cliente.persona.perEmail
                )
                .subscribe(
                    (data) => {

                    },
                    (error) => {
                        this.ventanaFlotante = false;
                        this.ShowDialogEmailSuccess();
                    }
                );
        } catch (error) {
        }
    }

    // Metodo para mostar el mensaje de Error
    // al momento de facturar
    ShowDialogErr() {
        Swal.fire({
            icon: 'error',
            title: 'Revise los Datos',
            text: 'Facturacion Fallida!',
        });
    }

    // Metodo para mostrar el mensaje de Completado
    //al momento de facturar
    ShowDialogSucces() {
        Swal.fire({
            icon: 'success',
            title: 'Bien Hecho',
            text: 'Facturacion Good!',
        });
    }

    ShowDialogEmailSuccess() {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title:
                'Factura enviada con exito a: ' + '' + 'xavierchuchuca18@gmail.com',
            showConfirmButton: false,
            timer: 3500,
        });
    }
}
