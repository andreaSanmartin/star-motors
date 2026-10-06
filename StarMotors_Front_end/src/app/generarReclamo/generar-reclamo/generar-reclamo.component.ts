import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import {
  Garantia,
  GarantiasControllerService,
  ReclamoControllerService,
} from "app/Services/NOSQL/angular_api_client";
import Swal from 'sweetalert2';

@Component({
  selector: "app-generar-reclamo",
  templateUrl: "./generar-reclamo.component.html",
  styleUrls: ["./generar-reclamo.component.css"],
})
export class GenerarReclamoComponent implements OnInit {

  message = false;
  garantia: Garantia = {};
  idCliente = 444;
  reclamo: string;
  listreclamos = [];
  IDEMPLEADO: number = 0;

  formReclamo: FormGroup
  date = new Date("yyyy/MM/dd");

  constructor(
    private router: ActivatedRoute,
    private garantiaService: GarantiasControllerService,
    private reclamoService: ReclamoControllerService,
    private formBuider: FormBuilder

  ) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      this.garantiaService
        .findGarantiaByIdUsingGET(parseInt(params.get("idGarantia")))
        .subscribe((data) => {
          this.garantia = data;
        });
    });
    this.buidFormGeneral()
  }


  GuardarReclamo() {

    this.date = this.formReclamo.get('fecha').value
    console.log(this.date)
    this.IDEMPLEADO = parseInt(localStorage.getItem('idEmpleado'));   
    this.reclamoService
    .postReclamoGarantiaUsingPOST(
        this.garantia.fallosSistemasVehiculo.toString(),
        this.garantia.garDescripcion,
        this.date.toString(),
        this.IDEMPLEADO,
        this.garantia.idGarantia,
        this.listreclamos
      )
      .subscribe((data) => {
        this.message = true;
        this.UpdateGarantia(2);
      
      });

      this.message = false;
  }

  UpdateGarantia(estado: number){
    this.garantiaService.updateEstadoGarantiaUsingPUT(estado,parseInt(localStorage.getItem('idEmpleado')), this.garantia.idGarantia).subscribe(data => {
      this.ShowDialogSucces();
    })
  }

  agregarRazones(){
    this.reclamo = this.formReclamo.get('reclamo').value
    this.listreclamos.push(this.reclamo);
    this.reclamo = "";
  }

  // removeItem(array,item: string){
  //    var index = array.indexOf(item);
  //     console.log(index);
      
  //    if (index !== -1) {
  //      array.splice(index, 1);
  //      this.listreclamos.splice(index, 1);
  //    }
    
  // }

  reomeveItem(index: number){
   console.log(index);
   if (index > -1) {
       this.listreclamos.splice(index, 1);
     }
  }

  ShowDialogSucces() {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Garantia Atendida',
        showConfirmButton: false,
        timer: 1500
      })
}
  buidFormGeneral() {
    this.formReclamo = this.formBuider.group({
      fecha: ['', Validators.required],
      reclamo: ['', Validators.required],
    })
  }
}
