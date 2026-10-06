import { Component, OnInit } from "@angular/core";
import { ReclamoControllerService } from "../Services/NOSQL/angular_api_client/api/reclamoController.service";
import {
  EmailControllerService,
  Garantia,
  GarantiasControllerService,
  NominaEmpleadosControllerService,
} from "app/Services/NOSQL/angular_api_client";
import {
  ClienteControllerService,
  ComercializadoraControllerService,
  ConcesionariaControllerService,
  TblCliente,
  TblComercializadora,
  TblConcesionaria,
  TblVehiculo,
  VehiculoControllerService,
} from "app/Services/SQL/angular_api_client";
import { ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-info-rechazog",
  templateUrl: "./info-rechazog.component.html",
  styleUrls: ["./info-rechazog.component.css"],
})
export class InfoRechazogComponent implements OnInit {

  



  Garantia: Garantia = {};
  Vehiculo: TblVehiculo = {};
  Cliente: TblCliente = {};

  Concesionaria: TblConcesionaria = {};
  comercializadora: TblComercializadora = {};
  idConcesionaria: number = 0;
  IDEMPLEADO: number;

  visible = true;

  reclamo: string;
  listreclamos = [];

  date = new Date();
  fecha = "";

  archivos: any;

  ventanaFlotante = false;
  Ventanainput = false;

  IdGarantiaExist = 0;
  constructor(
    private clienteService: ClienteControllerService,
    private concesionariaService: ConcesionariaControllerService,
    private reclamoService: ReclamoControllerService,
    private router: ActivatedRoute,
    private garantiaService: GarantiasControllerService,
    private vehiculoServicio: VehiculoControllerService,
    private email: EmailControllerService,
    private comercializadoraService: ComercializadoraControllerService,
    private nominaEmpleadosService: NominaEmpleadosControllerService,
  ) {
    this.Cliente.persona = {};
    this.Vehiculo.ejemplar = {};
    this.Vehiculo.ejemplar.modelo = {};
    this.Vehiculo.ejemplar.modelo.marca = {};
    this.fecha = this.date.toLocaleDateString();
  }

  ngOnInit(): void {
    this.router.data.subscribe((value) => {
      if (value != null) {
        this.SobrecargaData();
        this.searchEmpleadoAndConcesionaria()
        
      }
    });
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
                        this.comercializadora.comNombre
                    });
            });
    }
}

  
  SobrecargaData() {
    this.router.paramMap.subscribe(params => {
      this.IdGarantiaExist = parseInt(params.get("idGarantia"));
     console.log(this.IdGarantiaExist);
     
      if (!isNaN(this.IdGarantiaExist)) {
        this.garantiaService
          .findGarantiaByIdUsingGET(this.IdGarantiaExist)
          .subscribe((data) => {
            this.Garantia = data;
            this.BuscarVehiculo(data.idVehiculo);
            this.BuscarCliente(data.idCliente);
            //this.ConsultarIdEmpleado();
          });
      }
    });
    // this.ConsultarIdEmpleado();
  }
// // consultamos el id  del empleado mediante el localStorage
/* ConsultarIdEmpleado() {
  var idEmpleado = parseInt(localStorage.getItem("idEmpleado"));
  this.nominaEmpleadosService
    .getEmpleadoByIdSQLUsingGET(idEmpleado)
    .subscribe((data) => {
      this.idConcesionaria = data.idConcesionaria;

      this.concesionariaService
        .findConcesionariaByIdUsingGET(this.idConcesionaria)
        .subscribe((data) => {
          this.Concesionaria = data;

        
        });
    });
} */

  BuscarVehiculo(idVehiculo: number) {
    // consultamos el Vehiculo que requeria la garantia
    this.vehiculoServicio
      .findVehiculoByIdUsingGET(idVehiculo)
      .subscribe((data) => {
        this.Vehiculo = data;
      });
  }

  BuscarCliente(idCliente: number) {
    // Consultamos el cliente que requeria la garantia
    this.clienteService.findClienteByIdUsingGET(idCliente).subscribe((data) => {
      this.Cliente = data;
    });
  }

  desabilitarbotonoes() {
    this.visible = false;
  }

  mostrarventanaInput() {
    this.Ventanainput = true;
  }

  // metodo para cerrar la ventana flotante
  cerrar() {
    this.Ventanainput = false;
  }
  agregarRazones() {
    this.listreclamos.push(this.reclamo);
    this.reclamo = "";
  }

  reomeveItem(index: number) {
    console.log(index);
    if (index > -1) {
      this.listreclamos.splice(index, 1);
    }
  }

  GuardarRechazo() {
    var idEmpleado = parseInt(localStorage.getItem("idEmpleado"));
    this.reclamoService
      .postInformeRechazoGarantiaUsingPUT(
        this.listreclamos.toString(),
        this.fecha.toString(),
        idEmpleado,
        this.Garantia.idGarantia
      )
      .subscribe(
        (data) => {
          this.ShowDialogMessageGodd();
        },
        (err) => {
          this.ShowDialogMessageError();
        }
      );
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

      this.email
        .sendEmailWithAttachmentUsingPOSTForm(
          this.archivos,
          // this.Cliente.persona.perEmail
          "xavierchuchuca18@.com"
        )
        .subscribe(
          (data) => {},
          (error) => {
            this.ventanaFlotante = false;
            this.ShowDialogEmailSuccess();
          }
        );
    } catch (error) {}
  }

  ShowDialogEmailSuccess() {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title:
        "Informe de Rechazo enviada con exito a: " +
        "" +
        this.Cliente.persona.perEmail,
      showConfirmButton: false,
      timer: 3500,
    });
  }

  ShowDialogMessageGodd() {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Informe Guardado",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  ShowDialogMessageError() {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Informe Guardado",
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
