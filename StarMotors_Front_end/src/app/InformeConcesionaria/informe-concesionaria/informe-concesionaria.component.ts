import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailControllerService, Garantia, GarantiasControllerService, ManoObra, OrdenReparacionControllerService } from 'app/Services/NOSQL/angular_api_client';
import { ClienteControllerService, RepuestoControllerService, TblCliente, TblRespuestos, TblVehiculo, VehiculoControllerService } from 'app/Services/SQL/angular_api_client';
import { error } from 'console';
import Swal from 'sweetalert2';
import { environment } from 'environments/environment';
import * as _jsPDF from "jspdf";
import * as _html2canvas from "html2canvas";

@Component({
  selector: 'app-informe-concesionaria',
  templateUrl: './informe-concesionaria.component.html',
  styleUrls: ['./informe-concesionaria.component.css']
})
export class InformeConcesionariaComponent implements OnInit {
  

  imgcreada = false;
  imgenCreada: any;
  html2canvas: any = _html2canvas;
  jsPDF: any = _jsPDF;
  image: any;
  archivos: any;
  // variables para mostrar ventanas emergentes
  ventanaFlotante = false;
  Ventanainput = false;
  //variables de Garantia
  descripcion = ''
  garantiaCubre: number;
  idEmpleado = ''
  idGarantia = ''
  date = new Date("yyyy/MM/dd");
  Garantia: Garantia = {};
  Vehiculo: TblVehiculo = {};
  Cliente: TblCliente = {};
 
  //variables para mostrar la mano de obra
  manoObra: ManoObra;
  cantidadHora: number = 0;
  precioHora: number = 0;
  // variables para mostrar los fallos del sistema
  fallosSistema = [];
  //variables para mostrar los repuestos
  repuestos = [];
  repuestosb: TblRespuestos[] = [];
  repuestosA = [];

  constructor(private router: ActivatedRoute,
    private rout: Router,
    private garantiaService: GarantiasControllerService,
    private vehiculoServicio: VehiculoControllerService,
    private clienteService: ClienteControllerService,
    private informeService: OrdenReparacionControllerService,
    private repuestosService: RepuestoControllerService,
    private email: EmailControllerService) {

    //inicializar las variables
    this.Cliente.persona = {};
    this.Vehiculo.ejemplar = {};
    this.Vehiculo.ejemplar.modelo = {};
    this.Vehiculo.ejemplar.modelo.marca = {};
    this.Garantia.reclamo = {};
    this.Garantia.reclamo.informeProformaReparacion = {};
    this.Garantia.reclamo.informeProformaReparacion.ordenReparacion = {};
    this.Garantia.reclamo.informeProformaReparacion.ordenReparacion.informeReparacionTaller = {};
    this.Garantia.reclamo.informeProformaReparacion.ordenReparacion.informeReparacionTaller.informeReparacionComercializadora = {};
    this.Garantia.reclamo.informeProformaReparacion.ordenReparacion.informeReparacionTaller.manoObraList = [];
    this.Garantia.reclamo.informeProformaReparacion.ordenReparacion.informeReparacionTaller.solicitudRepuestos = [];


  }

  ngOnInit(): void {

    // Capturamos el id del paramas para poder mostra los datos 
    this.router.paramMap.subscribe((paramas) => {
      this.garantiaService
        .findGarantiaByIdUsingGET(parseInt(paramas.get("idGarantia")))
        .subscribe((data) => {
          this.Garantia = data;
          this.repuestos.push(data.reclamo.informeProformaReparacion.ordenReparacion.informeReparacionTaller.solicitudRepuestos[0].repuestosList);
          data.reclamo.informeProformaReparacion.ordenReparacion.informeReparacionTaller.solicitudRepuestos[0].repuestosList.forEach(e => {
            const repues = e.idRepuestoAPIRestSQL;
            this.repuestosA.push(repues);


          })
          //buscamos los repuestos por lista de respuestos
          this.buscarRepuestos();
          console.log('lista repuestos ', this.repuestos);
          //mostramos la lista de los fallos del vehiculo
          this.fallosSistema.push(data.fallosSistemasVehiculo);
          console.log(this.Garantia.idVehiculo);

          this.vehiculoServicio
            .findVehiculoByIdUsingGET(data.idVehiculo)
            .subscribe((data) => {
              this.Vehiculo = data;
            });

          this.clienteService
            .findClienteByIdUsingGET(data.idCliente)
            .subscribe((data) => {
              this.Cliente = data;
            });

          //buscamos por la cantidad y la hora de la mano de obra
          this.cantidadHora = this.Garantia.reclamo.informeProformaReparacion.ordenReparacion.informeReparacionTaller.manoObraList[0].cantidadHoras;
          console.log('horas', this.cantidadHora);
          this.precioHora = this.Garantia.reclamo.informeProformaReparacion.ordenReparacion.informeReparacionTaller.manoObraList[0].moPrecioHora;
          console.log('precio', this.precioHora);
        });
    });

  }


  mostrarventanaInput() {
    this.Ventanainput = true;
  }
  //buscamos los repuestos por lista de respuestos

  buscarRepuestos() {
    this.repuestosService.listAllByIdUsingGET(this.repuestosA).subscribe((data) => {

      this.repuestosb = data;
      console.log('nombres repuestos ', this.repuestosb)
    }, (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'no hay repuestos!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
    });

  }
  //creamos el informe para enviar a la concesionaria

  CrearInformeComercializadora() {
    this.informeService.postInformeReparacionComercializadoraUsingPOST(this.descripcion, this.date.toString(), this.garantiaCubre, parseInt(localStorage.getItem("idEmpleado")), this.Garantia.idGarantia).subscribe(data => {
      Swal.fire({
        title: 'SE GUARDO CON EXITO',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })


    }, (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'POR FAVOR LLENE BIEN LOS DATOS!',
        footer: ''
      })
    });

  }

  crearImagen() {
    html2canvas(document.querySelector("#factura")).then((canvas) => {
      this.image = canvas.toDataURL();

      this.imgenCreada = canvas.toDataURL("image/png");

      let pdf = new this.jsPDF("l", "cm", "a4"); //Generates PDF in landscape mode
      // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
      pdf.addImage(this.imgenCreada, "PNG", 0, 0, 29.7, 21.0);
      pdf.save("Informe.pdf");
      const FacturaFile = new FormData();
      FacturaFile.append("files", this.image);
    });
  }

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
      FacturaFile.append("files", this.archivos);

      console.log(this.archivos);

  this.email
        .sendEmailWithAttachmentUsingPOSTForm(
          this.archivos,
          // this.Cliente.persona.perEmail
          environment.reportEmail
        )
        .subscribe(
          (data) => {
            console.log("cargaExitosa");
            alert("Goddddd");
          },
          (error) => {
            this.ventanaFlotante = false;
            this.ShowDialogEmailSuccess()
          }
        );
    } catch (error) {}
  }
  // Metodo para mostar el mensaje de Error
  // al momento de facturar
  ShowDialogErr() {
    Swal.fire({
      icon: "error",
      title: "Revise los Datos",
      text: "Informe Fallida!",
    });
  }

  // Metodo para mostrar el mensaje de Completado
  //al momento de facturar
  ShowDialogSucces() {
    Swal.fire({
      icon: "success",
      title: "Bien Hecho",
      text: "Facturacion Good!",
    });
  }

  ShowDialogEmailSuccess() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Informe enviada con exito a: ' + '' + 'xavierchuchuca18@gmail.com',
      showConfirmButton: false,
      timer: 3500
    })
  }

}