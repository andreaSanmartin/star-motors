
import { Component, OnInit } from '@angular/core';
import { Garantia } from '../../Services/NOSQL/angular_api_client/model/garantia';
import { TblVehiculo } from '../../Services/SQL/angular_api_client/model/tblVehiculo';
import { TblCliente } from '../../Services/SQL/angular_api_client/model/tblCliente';
import { ActivatedRoute, Router } from '@angular/router';
import { GarantiasControllerService, ManoObra, TallerControllerService } from 'app/Services/NOSQL/angular_api_client';
import { ClienteControllerService, RepuestoControllerService, TblRespuestos, VehiculoControllerService } from 'app/Services/SQL/angular_api_client';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalleinformes-taller',
  templateUrl: './detalleinformes-taller.component.html',
  styleUrls: ['./detalleinformes-taller.component.css']
})
export class DetalleinformesTallerComponent implements OnInit {
   // creacion de las variables para mostrar datos
   Garantia: Garantia = {};
   Vehiculo: TblVehiculo = {};
   Cliente: TblCliente = {};

  repuestosA=[];
   manoObra: ManoObra;
//   manoObra1: ManoObra = {}
cantidadHora: number=0;
precioHora: number=0;
   fallosSistema = [];
   repuestos = [];
   repuestosb: TblRespuestos[]=[];

  constructor( private router: ActivatedRoute,
    private rout : Router,
    private garantiaService: GarantiasControllerService,
    private vehiculoServicio: VehiculoControllerService,
    private clienteService: ClienteControllerService,
    private repuestosService: RepuestoControllerService) {
      
      this.Cliente.persona = {};
      this.Vehiculo.ejemplar = {};
      this.Vehiculo.ejemplar.modelo = {};
      this.Vehiculo.ejemplar.modelo.marca = {};
      this.Garantia.reclamo= {};
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
         data.reclamo.informeProformaReparacion.ordenReparacion.informeReparacionTaller.solicitudRepuestos[0].repuestosList.forEach(e=>{
           const repues = e.idRepuestoAPIRestSQL;
           this.repuestosA.push(repues);
           

         }) 
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

        
           this.cantidadHora = this.Garantia.reclamo.informeProformaReparacion.ordenReparacion.informeReparacionTaller.manoObraList[0].cantidadHoras;
          console.log('horas',this.cantidadHora);
          this.precioHora = this.Garantia.reclamo.informeProformaReparacion.ordenReparacion.informeReparacionTaller.manoObraList[0].moPrecioHora;
          console.log('precio', this.precioHora);
        });
    });


    
     }

  

     buscarRepuestos(){
       this.repuestosService.listAllByIdUsingGET(this.repuestosA).subscribe((data) =>{

         this.repuestosb=data;
         console.log('nombres repuestos ',this.repuestosb)
       },(error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'no hay repuestos!',
          footer: '<a href="">Why do I have this issue?</a>'
        })
      });
       
     }
     realizarinforme(idGarantia:number){
      this.rout.navigate([idGarantia,'informeConcesionaria']);
    }
 

}
