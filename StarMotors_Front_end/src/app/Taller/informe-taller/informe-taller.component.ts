import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Garantia } from '../../Services/NOSQL/angular_api_client/model/garantia';
import { ManoObra } from '../../Services/NOSQL/angular_api_client/model/manoObra';
import { TblCliente } from '../../Services/SQL/angular_api_client/model/tblCliente';
import { TblVehiculo } from '../../Services/SQL/angular_api_client/model/tblVehiculo';
import { TblEmpleado } from '../../Services/SQL/angular_api_client/model/tblEmpleado';
import { TblRespuestos } from '../../Services/SQL/angular_api_client/model/tblRespuestos';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Repuestos } from '../../Services/NOSQL/angular_api_client/model/repuestos';
import { ActivatedRoute, Router } from '@angular/router';
import { GarantiasControllerService, TallerControllerService } from 'app/Services/NOSQL/angular_api_client';
import { ClienteControllerService, EmpeladoControllerService, RepuestoControllerService, VehiculoControllerService } from 'app/Services/SQL/angular_api_client';
import { element } from 'protractor';
import { Subscription } from 'rxjs';
import * as _html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-informe-taller',
  templateUrl: './informe-taller.component.html',
  styleUrls: ['./informe-taller.component.css']
})
export class InformeTallerComponent implements OnInit {

  garantia: Garantia = {};
  manoObraList: ManoObra[] = [];
  manoObra: ManoObra = {};
  cliente: TblCliente = {};
  vehiculo: TblVehiculo = {};
  empleado: TblEmpleado = {};
  manoObras: ManoObra[] = [];
  repuestos: TblRespuestos[] = [];
  id: String = "";
  manoObraForm: FormGroup;
  repuesto: TblRespuestos = {};
  listaRepuestosId = [];
  repuestoNosql: Repuestos[] = [];
  r_: Repuestos = {}
  dataRepuesto = []
  dataManoDeObra = []
  suscription: Subscription;
  idGarantia: number;
  alert: boolean = false;

  cantidad: number = 0;
  precio: number = 0;
  idEmpleado: number = 0;
  @ViewChild('_nombre') inputNombre;
  @ViewChild('_cedula') inputCedula;
  @ViewChild('_cantidad') inputCantidad;
  @ViewChild('_precio') inputPrecio;
  @ViewChild('_idEmpleado') inputIdEmpleado;
  _nombre = "";
  _cedula = "";
  _cantidad = "";
  _precio = "";
  html2canvas: any = _html2canvas;
  statusOrden:number;

  private fieldArray: Array<any> = [];
  private newAttribute: any = {};

  constructor(private router: ActivatedRoute, private garantiaService: GarantiasControllerService,
    private vehiculoService: VehiculoControllerService, private clienteService: ClienteControllerService,
    private empleadoService: EmpeladoControllerService, private tallerService: TallerControllerService,
    private repuestoService: RepuestoControllerService, private routers: Router) {

    this.cliente.persona = {};
    this.vehiculo.ejemplar = {};
    this.vehiculo.ejemplar.modelo = {};
    this.empleado.persona = {};
    this.id = this.router.snapshot.paramMap.get("idGarantia");
  }

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      this.garantiaService.findGarantiaByIdUsingGET(parseInt(params.get("idGarantia"))).subscribe(data => {
        this.garantia = data;
        this.idGarantia = parseInt(params.get("idGarantia"));
        this.buscarVehiculo(data.idVehiculo);
        this.buscarCliente(data.idCliente);
        this.statusOrden = data.reclamo.informeProformaReparacion.ordenReparacion.repEstado;
        data.reclamo.informeProformaReparacion.ordenReparacion.informeReparacionTaller.solicitudRepuestos.forEach((element) => {
          console.log("repuestos", element)
          element.repuestosList.forEach((e) => {
            this.listaRepuestosId.push(e)
            this.buscarRepuestoSql(e)
          })
        })
        if (data.reclamo.informeProformaReparacion.ordenReparacion.informeReparacionTaller.manoObraList == null) {
          console.log("mano de obra esta vacia")
        }
        data.reclamo.informeProformaReparacion.ordenReparacion.informeReparacionTaller.manoObraList
          .forEach((e) => {
            this.getAllManoDeObra(e)
          })
      })
    });

  }


  buscarVehiculo(idVehiculo: number) {
    this.vehiculoService.findVehiculoByIdUsingGET(idVehiculo)
      .subscribe((data) => {
        this.vehiculo = data;
        console.log(this.vehiculo)
      })
  }

  buscarCliente(idCliente: number) {
    this.clienteService.findClienteByIdUsingGET(idCliente)
      .subscribe((data) => {
        this.cliente = data;
        console.log(this.cliente);
      })
  }
  buscarEmpleado(idEmpleado: number) {
    this.empleadoService.findEmpleadoByIdUsingGET(idEmpleado)
      .subscribe((data) => {
        this.empleado = {};
        this.empleado = data;
      })
  }
  buscarEmpleadoByCedula(cedula: string) {
    if (cedula === undefined) {
      console.log("buscarEmpleadoByCedula", cedula)
      this.showMessageFaltaCedula();
    }
    else {
      this.empleadoService.findEmpleadoByCedulaUsingGET(cedula)
        .subscribe((data) => {
          this.empleado = {};
          this.empleado = data;
          if (this.empleado === null) {
            this.showMessageDontFindEmpleado();
          }
        })
    }

  }

  guardarManoDeObra(idEmpleado: string, cantidad: string, precio: string) {
    if (idEmpleado === "" || cantidad === "" || precio === "") {
      this.showMessageEmpty();
    }
    else if (confirm("¿Seguro que desea agregar esta Mano de Obra?")) {
      this.idEmpleado = parseInt(idEmpleado)
      this.cantidad = parseInt(cantidad)
      this.precio = parseFloat(precio)
      console.log(this.precio.toFixed(2))
      this.tallerService.updateManoObraUsingPOST(this.idEmpleado, this.garantia.idGarantia, this.cantidad, this.precio)
        .subscribe((element) => {
          console.log("guardaManoDeObra: ", element)
        });
      this.empleadoService.findEmpleadoByIdUsingGET(this.idEmpleado)
        .subscribe((data_empleado) => {
          let data_ = {
            cantidadHoras: this.cantidad,
            moPrecioHora: this.precio
          };
          let mano = {
            cedula: data_empleado.persona.perCedula,
            nombre: data_empleado.persona.perNombre,
            manoObra: data_
          };
          this.dataManoDeObra.push(mano);
        })
      this.inputNombre.nativeElement.value = '';
      this.inputCedula.nativeElement.value = '';
      this.inputCantidad.nativeElement.value = '';
      this.inputPrecio.nativeElement.value = '';
      this.inputIdEmpleado.nativeElement.value = '';
    }

  }
  buscarRepuestosSql(listIdRepuestos: Array<number>) {
    this.repuestoService.listAllByIdUsingGET(listIdRepuestos)
      .subscribe((data) => {
        this.repuestos = data;
        console.log(this.repuestos)
      })
  }
  getAllManoDeObra(manoDeObraNoSql: ManoObra) {
    console.log("MANODEOBRANOSQLRECIBEDEGETALL", manoDeObraNoSql)
    this.empleadoService.findEmpleadoByIdUsingGET(manoDeObraNoSql.empleadoManoObra.idEmpleadoAPIRestSQL)
      .subscribe((data) => {
        console.log("GETALLMANODEOBRA", data)
        let mano = {
          cedula: data.persona.perCedula,
          nombre: data.persona.perNombre,
          manoObra: manoDeObraNoSql
        }
        this.dataManoDeObra.push(mano);
        console.log("getAllManoDeObra: ", this.dataManoDeObra)
      })
  }
  buscarRepuestoSql(repuestoNoSQL: Repuestos) {

    this.repuestoService.findByIdUsingGET(repuestoNoSQL.idRepuestoAPIRestSQL)
      .subscribe((data) => {
        let rep = {
          repuesto: data,
          cantidad: repuestoNoSQL.cantidad
        }
        this.dataRepuesto.push(rep)
        console.log("buscarRepuestoSql", this.dataRepuesto)
      })
  }
  saveInformeReparacion() {
    Swal.fire({
      title: 'Desea guardar el Informe Reparación Taller?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `No Guardar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')
        this.alert = true;
        this.tallerService.updateEstadoInformeReparacionUsingPUT(1, this.garantia.idGarantia)
          .subscribe((resp => {
            console.log(resp)
          }))
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }
  downloadInforme() {
    const doc = new jsPDF();
    html2canvas(document.getElementById('main')).then((canvas) => {
      console.log(canvas)
      var imgData = canvas.toDataURL('image/url')
      var imgHeight = canvas.height * 208 / canvas.width
      doc.addImage(imgData, 0, 0, 208, imgHeight)
      var name = this.garantia.idGarantia
      doc.save('Garantia Nro. ' + name + '.pdf')
    })


  }
  showMessageEmpty() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Complete la información de la mano de obra!'
    })
  }
  showMessageFaltaCedula() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Complete el número de cédula!'
    })
  }
  showMessageDontFindEmpleado() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No existe el empleado!'
    })
  }

  volver() {
    this.routers.navigate(["detalleOrdenReparacion"]);
  }
}


