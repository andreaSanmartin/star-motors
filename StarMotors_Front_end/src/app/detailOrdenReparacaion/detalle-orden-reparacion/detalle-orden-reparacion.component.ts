import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Garantia, GarantiasControllerService, OrdenReparacionControllerService } from 'app/Services/NOSQL/angular_api_client';
import { ClienteControllerService, VehiculoControllerService } from 'app/Services/SQL/angular_api_client';
import { TblCliente } from '../../Services/SQL/angular_api_client/model/tblCliente';
import { TblVehiculo } from '../../Services/SQL/angular_api_client/model/tblVehiculo';

@Component({
  selector: 'app-detalle-orden-reparacion',
  templateUrl: './detalle-orden-reparacion.component.html',
  styleUrls: ['./detalle-orden-reparacion.component.css']
})
export class DetalleOrdenReparacionComponent implements OnInit {

  // Array para listar las garantias
  listOrdenes = [];
  listaClientesid = [];
  listaVehiculosId = [];
  idClienteUnique = [];
  idVehiculoUnique = [];
  client: TblCliente;
  cliente_: TblCliente = {};
  vehiculo_: TblVehiculo = {};
  vehicle: TblVehiculo;
  clientes: TblCliente[] = [];
  vehiculos: TblVehiculo[] = [];
  dataGarantias = [];

  constructor(private garantias: GarantiasControllerService,
    private router: Router,
    private cliente: ClienteControllerService,
    private ordenes: OrdenReparacionControllerService,
    private vehiculo: VehiculoControllerService) { }

  ngOnInit(): void {
    this.filtrarOrdenesByStatus(1, 1);
  }
  verOrden(idOrden: number) {
    this.router.navigate([idOrden, "informeTaller"]);
  }
  solicitudRepuesto(idOrden: number) {
    this.router.navigate([idOrden, "solicitudeR"]);
  }


  filtrarOrdenesByStatus(estado: number, idConcesionaria: number) {
    this.listOrdenes = [];
    this.dataGarantias = [];
    this.ordenes.listOrdenReparacionByStatusUsingGET(estado, idConcesionaria)
      .subscribe((data) => {
        this.listOrdenes = data;

        data.forEach((element) => {

          this.buscarClienteVehiculo(element, element.idCliente, element.idVehiculo);

          //extraer los id clientes
          this.listaClientesid.push(element.idCliente);
          //extraer los id vehiculo
          this.listaVehiculosId.push(element.idVehiculo);
          //Eliminar clientes duplicados
          this.idClienteUnique = this.listaClientesid.filter((item, index) => {
            return this.listaClientesid.indexOf(item) === index;
          })
          //eliminar vehiculos duplicados
          this.idVehiculoUnique = this.listaVehiculosId.filter((item, index) => {
            return this.listaVehiculosId.indexOf(item) === index;
          })
        });
        //buscar los clientes
        this.idClienteUnique.forEach((element) => {
          this.buscarCliente(element);
        })
        console.log(this.clientes);

        ///buscar los vehiculos
        this.idVehiculoUnique.forEach((element) => {
          this.buscarVehiculo(element);
        })
        console.log(this.vehiculos)
      });
  }
  buscarCliente(idCliente: number) {
    this.cliente.findClienteByIdUsingGET(idCliente)
      .subscribe((data) => {
        this.client = data;
        this.clientes.push(this.client);
      })
  }
  buscarClienteVehiculo(garantia: Garantia, idCliente: number, idVehiculo: number) {
    this.cliente.findClienteByIdUsingGET(idCliente)
      .subscribe((respCliente) => {
        this.vehiculo.findVehiculoByIdUsingGET(idVehiculo)
          .subscribe((respVehiculo) => {
            let dataGarantia = {
              garantia_: garantia,
              cliente_: respCliente,
              vehiculo_: respVehiculo
            }
            this.dataGarantias.push(dataGarantia)
            console.log(this.dataGarantias)
          })
      })
  }

  buscarVehiculo(idVehiculo: number) {
    this.vehiculo.findVehiculoByIdUsingGET(idVehiculo)
      .subscribe((data) => {
        this.vehicle = data;
        this.vehiculos.push(this.vehicle);
      })
  }

}


