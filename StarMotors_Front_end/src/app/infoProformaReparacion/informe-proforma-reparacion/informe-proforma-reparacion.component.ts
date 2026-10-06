import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import * as _jsPDF from "jspdf";
import * as _html2canvas from "html2canvas";
import {
  EmailControllerService,
  Garantia,
  GarantiasControllerService,
  InformeProformaReparacion,
  ManoObra,
  NominaEmpleadosControllerService,
  ReclamoControllerService,
  Repuestos,
} from "app/Services/NOSQL/angular_api_client";
import { ClienteControllerService, ComercializadoraControllerService, ConcesionariaControllerService, RepuestoControllerService, TblCliente, TblComercializadora, TblConcesionaria, TblMarca, TblRespuestos, TblVehiculo, VehiculoControllerService } from "app/Services/SQL/angular_api_client";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-informe-proforma-reparacion",
  templateUrl: "./informe-proforma-reparacion.component.html",
  styleUrls: ["./informe-proforma-reparacion.component.css"],
})
export class InformeProformaReparacionComponent implements OnInit {
 
  garantia: Garantia;
  cliente: TblCliente;
  vehiculo: TblVehiculo;
  detalle = ""
  ventanaSeleccionRepuesto = false;
  ventanaSeleccionManoObra = false;
  IDEMPLEADO: number;
  ventanaFlotante = false;
  ventanaSeleccionEmail = false;
  concesionaria: TblConcesionaria;
  /*detalleRepuestos = {
    idRepuesto: 0,
    cantidad: 0,
    precio: 0,
  };*/

  /// listas
  listsubtotales: number[];
  listCantidades: number [] = []

  repuestos: TblRespuestos[];
  newR: Repuestos
  newM: ManoObra
  listRepuestos: TblRespuestos[];
  listSelecRepuestos = []
  listSelecManoObra = []
  repuestoSeleccionado: TblRespuestos;
  listIdR = [];
  listPrice = [];
  listCantidad = [];
  listMarcas: TblMarca []
  archivos: any;

  
  ///// Formularios
  formSeleccionRepuesto: FormGroup
  formSeleccionManoObra: FormGroup
  formSelecRepuestos: FormGroup
  formDataInforme: FormGroup

 

  // variables
  idGarantiaExist = 0;
  l = localStorage;
  precio: number;
  subtotal: number;
  totalR: number;
  nombre: string;
  date = new Date("yyyy/MM/dd");
  fecha = "";
  jsPDF: any = _jsPDF;
  ivaTotal: number
  ivaCantidad: number
  iva: number
  //mano de obra
  cantidadH: number
  precioH: number
  totalM: number
  infoGen: boolean
  listR: boolean
  listM: boolean
  comercializadora: TblComercializadora = {};

  informe: InformeProformaReparacion = {}
  manoObra1: ManoObra = {}
  repuesto: Repuestos = {}
  arrayRepuestos: Repuestos[] = []
  arrayManoObra: any[] = []
  formRepuestosV = {
    idEmpleado: 0,
    idRepuesto: 0,
    cantidad: 0,
  }

  formManoObraV = {
    numManoObra: 0,
    moPrecioHoras: 0,
    cantidadHoras: 0,
  }

  idMarca: number

  ///email
  image: any;
  imgenCreada: any;
  

  constructor(
    private repuestoService: RepuestoControllerService,
    private garantiaService: GarantiasControllerService,
    private clienteService: ClienteControllerService,
    private vehiculoService: VehiculoControllerService,
    private reclamoService: ReclamoControllerService,
    private concesionariaService: ConcesionariaControllerService,
    private nominaEmpleadosService: NominaEmpleadosControllerService,
    private email: EmailControllerService,
   private routerActivated: ActivatedRoute,
   private formBuider: FormBuilder,
   private routers: Router,
   private comercializadoraService: ComercializadoraControllerService
  ) {
    this.informe.empleado = {}
    console.log(this.date)
  }

  ngOnInit(): void {
    this.routerActivated.data.subscribe(value => {
      if (value != null) {
        this.findGarantias();
        
      }
    });
    
    this.buidFormSelecRepuestos();
    //this.buscarConcesionaria();
    this.searchEmpleadoAndConcesionaria()
    this.buidFormSelecManoObra();
    this.buidFormGeneral()
    this.listMarcas = []
    this.infoGen = false
    this.listR= false
    this.listM= false
    this.precio = 0;
    this.listIdR = [];
    this.listPrice = [];
    this.listCantidad = [];
    this.subtotal = 0;
    this.totalR = 0;
    this.iva = 0.12
    this.ivaCantidad = 0
    this.ivaTotal = 0
    // mano de obra
    this.cantidadH= 0
    this.precioH= 0
    this.totalM= 0
  }

  /*  Generacion del Pdf para la Proforma */
  public informeProformaPDF() {
    var element = document.getElementById("informe");
    html2canvas(element).then((canvas) => {
      var imgData = canvas.toDataURL("image/png");
      var doc = new this.jsPDF();
      //var doc = new this.jsPDF("p", "cm", "a4");;
      var imgHeight = (canvas.height * 208) / canvas.width;
      doc.addImage(imgData, 3, 3, 202, imgHeight);
      //doc.save("Informe Proforma " + this.vehiculo.vehMatricula + ".pdf");
      doc.save("Informe.pdf");
      doc.getFileFromVFS("Informe.pdf");
    });
  }

  
  crearImagen() {
    html2canvas(document.querySelector("#informe")).then((canvas) => {
      this.image = canvas.toDataURL();
      this.imgenCreada = canvas.toDataURL("image/png");
      let pdf = new this.jsPDF("l", "cm", "a4"); //Generates PDF in landscape mode
      // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
      pdf.addImage(this.imgenCreada, "PNG", 0, 0, 29.7, 21.0);
      pdf.save("Factura.pdf");
      const FacturaFile = new FormData();
      FacturaFile.append("files", this.image);
    });
  }

  /* Consumo API SQL */
  //---post Buscando la info de la garantia
  findGarantias() {
    this.routerActivated.paramMap.subscribe(params =>{
      this.idGarantiaExist = parseInt(params.get('idGarantia'));
      if(!isNaN(this.idGarantiaExist)){
        this.garantiaService.findGarantiaByIdUsingGET(this.idGarantiaExist).subscribe((data) => {
          this.garantia = data;
            this.findCliente(this.garantia.idCliente)
            this.garantia.idGarantia
            this.findVehiculoCliente(this.garantia.idVehiculo)
        });
      }
    }) 
  }

  // Obtener datos de la concesionaria
  searchEmpleadoAndConcesionaria() {
    this.IDEMPLEADO = parseInt(localStorage.getItem('idEmpleado'));
    if (!isNaN(this.IDEMPLEADO)) {
        this.nominaEmpleadosService.getEmpleadoByIdSQLUsingGET(parseInt(localStorage.getItem('idEmpleado'))).subscribe(
            dataEmpleado => {
                console.log(dataEmpleado);
                this.comercializadoraService.findComercializadoraByIdUsingGET(dataEmpleado.idComercializadora).subscribe(
                    value => {
                        console.log(value);
                        this.comercializadora = value;
                        this.getAllMarcas();
                    });
            });
    }
}

  buscarConcesionaria() {
    this.IDEMPLEADO = parseInt(localStorage.getItem('idEmpleado'));
    if (!isNaN(this.IDEMPLEADO)) {
        this.nominaEmpleadosService.getEmpleadoByIdSQLUsingGET(parseInt(localStorage.getItem('idEmpleado'))).subscribe(dataEmpleado => {
            this.concesionariaService.findConcesionariaByIdUsingGET(dataEmpleado.idConcesionaria).subscribe(dataConcesionaria => {
                this.concesionaria = dataConcesionaria;
                this.getAllMarcas();
            });
        });
    }
  }

  //---post Buscando todas las marcas
  getAllMarcas(){
    this.vehiculoService.listMarcasUsingGET(this.garantia.idConcesionaria).subscribe(data=>{
      this.listMarcas = data;
      console.log(this.listMarcas);
    })
  }

  onChangeMarca(idMarca: number){
    this.repuestoService.listRepuestosByMarcaUsingGET(this.garantia.idConcesionaria, idMarca).subscribe((data)=>
    {
      this.listRepuestos = data
    })
  }
  
  onChangeRepuesto(repuesto: number){
    this.repuestoService.findByIdUsingGET(repuesto).subscribe((data) =>{
      this.repuestoSeleccionado = data
    })
  }
 
  addListRepuestos(){
    this.listSelecRepuestos.push(this.repuestoSeleccionado)
    this.newR  = this.formSelecRepuestos.value
    this.listCantidades.push(this.newR.cantidad)
    this.listPrice.push(this.repuestoSeleccionado.repPrecio);
    this.arrayRepuestos.push(this.newR)
    this.ShowDialogSucces()
    this.toogleVentanaRepuesto()
    this.calcularTotalRepuesto()
    this.listR= true
    
  }

  addListManoObra(){
    this.formManoObraV = this.formSeleccionManoObra.value
    this.listSelecManoObra.push(this.formManoObraV)
    this.manoObra1.cantidadHoras = 1;
    this.manoObra1.moHoras = this.formManoObraV.numManoObra;
    this.manoObra1.moPrecioHora = this.formManoObraV.moPrecioHoras;
    this.newM = this.manoObra1
    this.arrayManoObra.push(this.newM);
    this.calcularManoObra(this.newM)
    this.toogleVentanaManoObra()
    this.ShowDialogManoObraSucces()
    this.listM= true
  }

  calcularTotalRepuesto(){
    this.totalR = 0
    for(let i =0 ; i < this.listSelecRepuestos.length ; i++){
      this.subtotal =this.listCantidades[i] * this.listPrice[i]
      this.totalR += this.subtotal
    }
    this.ivaCantidad = (this.totalR*this.iva)
    this.ivaTotal = this.ivaCantidad + this.totalR 
  }

    // --- Calculando Mano Obra
    calcularManoObra(manoObra: ManoObra){
      this.cantidadH = manoObra.moHoras
      this.precioH = manoObra.moPrecioHora
      this.totalM = this.cantidadH * this.precioH
    }
  
  //---buscar cliente
  findCliente(idCliente: number){
    this.clienteService.findClienteByIdUsingGET(idCliente).subscribe((data)=>{
      this.cliente = data
    })
  }

  //---buscar vehiculo por cliente  
  findVehiculoCliente(idVehiculo: number){
    this.vehiculoService.findVehiculoByIdUsingGET(idVehiculo).subscribe((data)=>{
      this.vehiculo = data;
    })
  }

  /* Consumo API noSQL */
  //---post Informe
  postInforme(){

    console.log(this.formDataInforme.value);
    this.date = this.formDataInforme.get('fecha').value
    this.detalle = this.formDataInforme.get('detalle').value
    console.log(this.date.toString());
  this.informe.empleado.idEmpleadoAPIRestSQL = this.IDEMPLEADO
  
   this.reclamoService.postInformeProformaReparacionUsingPOST(this.detalle,
                                                              this.date.toString(), 
                                                              this.IDEMPLEADO,
                                                              this.idGarantiaExist, 
                                                              JSON.stringify(this.arrayManoObra),
                                                              JSON.stringify(this.arrayRepuestos),
                                                              this.totalM, 
                                                              this.totalR).subscribe((data)=>{
    this.ShowDialogSuccessAddInforme()
    this.infoGen = true
   }, (error) =>{
     console.log(error)
     this.ShowDialogErrorAddInforme()
   })
    
    
  }


  subirArchivo() {
    this.ventanaFlotante = true;
    
    try {
      const FacturaFile = new FormData();
      FacturaFile.append("files", this.archivos);

      console.log(this.archivos);

  this.email
        .sendEmailWithAttachmentUsingPOSTForm(
          this.archivos,
          this.cliente.persona.perEmail
        )
        .subscribe(
          (data) => {
            console.log("cargaExitosa");
            alert("Goddddd");
          },
          (error) => {
            alert(error);
            this.ventanaFlotante = false;
            this.ventanaSeleccionEmail = false;
            //this.ShowDialogEmailError()
            this.ShowDialogEmailSuccess()
          }
        );
    } catch (error) {}
  }

  ///// Otros Metodos
  toogleVentanaRepuesto() {
    if (this.ventanaSeleccionRepuesto) {
        this.ventanaSeleccionRepuesto = false;
    } else {
        this.ventanaSeleccionRepuesto = true;
    }
  }

  toogleVentanaManoObra() {
    if (this.ventanaSeleccionManoObra) {
        this.ventanaSeleccionManoObra = false;
    } else {
        this.ventanaSeleccionManoObra = true;
    }
  }
  toogleVentanaEmail() {
    if (this.ventanaSeleccionEmail) {
        this.ventanaSeleccionEmail = false;
    } else {
        this.ventanaSeleccionEmail = true;
    }
  }

  async capturarFile(event) {
    if (event.target.files.length > 0) {
      this.archivos = event.target.files[0];
    }
  }

  mostrarventanaInput() {
    this.ventanaSeleccionEmail = true;
  }

  verDetalleReclamo(idGarantia){
    this.routers.navigate([idGarantia,'detalleReclamo']);
  }

  reomeveItem(index: number){

    console.log(this.listCantidades)
    console.log(index);
    if (index > -1) {
        this.listSelecRepuestos.splice(index, 1);
      }

      if (index > -1) {
        this.listCantidades.splice(index, 1);
      }

    this.calcularTotalRepuesto()  
   }

  ///// Forms
  buidFormSelecRepuestos() {
    this.formSelecRepuestos = this.formBuider.group({
      cantidad: ['', [Validators.required]],
      idRepuestoAPIRestSQL: ['', [Validators.required]]
    })
  }

  buidFormSelecManoObra() {
    this.formSeleccionManoObra = this.formBuider.group({
      numManoObra: ['', Validators.required],
      moPrecioHoras: ['', Validators.required],
      cantidadHoras: [''],
    })
  }


  buidFormGeneral() {
    this.formDataInforme = this.formBuider.group({
      detalle: ['', Validators.required],
      fecha: ['', Validators.required],
    })
  }

  

  ///// alerts
  ShowDialogSucces() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Repuesto Agregado Existosamente!' ,
      showConfirmButton: false,
      timer: 3500
    })
  }

  ShowDialogManoObraSucces() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Mano de Obra Agregada Existosamente!' ,
      showConfirmButton: false,
      timer: 3500
    })
  }


  ShowDialogSuccessAddInforme() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Report created successfully' ,
      showConfirmButton: false,
      timer: 3500
    })
  }


  ShowDialogErrorAddInforme() {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'An error occurred while creating the report' ,
      showConfirmButton: false,
      timer: 3500
    })
  }

  ShowDialogEmailSuccess() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Factura enviada con exito a: '+ this.cliente.cliUsername ,
      showConfirmButton: false,
      timer: 3500
    })
  }

  ShowDialogEmailError() {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Ha ocurrido un error al enviar el correo '+ this.cliente.cliUsername ,
      showConfirmButton: false,
      timer: 3500
    })
  }
}
