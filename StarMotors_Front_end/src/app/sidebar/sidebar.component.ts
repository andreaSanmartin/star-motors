import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpeladoControllerService } from '../Services/SQL/angular_api_client/api/empeladoController.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    rol : string[] ;
    admin: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'cotizacion', title: 'Cotizaciones',  icon: 'pe-7s-car', class: '' , rol :['Concesionaria'] ,admin: 'Admin'},
    { path: 'garantias', title: 'Solicitudes de Garantia',  icon:'pe-7s-piggy', class: '' , rol :['Concesionaria'], admin: 'Admin'},
    { path: 'generarRepuestos', title: 'Solicitudes de Repuestos',  icon:'pe-7s-news-paper', class: '', rol :['Comercializadora'],admin: 'Admin' },
    { path: 'facturaVenta', title: 'Factura de Ventas',  icon:'pe-7s-note2', class: '' , rol :['Concesionaria'],admin: 'Admin'},
    //{ path: 'informeTaller', title: 'Taller',  icon:'pe-7s-tools', class: '' , rol :['Taller'],admin: 'Admin'},
    { path: 'pilaInforme', title: 'Informes de reparación',  icon:'pe-7s-note2', class: '' , rol :['Concesionaria'],admin: 'Admin'},
   // { path: 'facturareparacion', title: 'Factura Reparacion',  icon:'pe-7s-note2', class: '' , rol :['Concesionaria'],admin: 'Admin'},
    { path: 'detalleRGarantia', title: 'Reclamos de garantia',  icon:'pe-7s-note2', class: '' , rol :['Comercializadora'] ,admin: 'Admin'},
    //{ path: 'solicitudeR', title: 'Solicitar Repuestos',  icon:'pe-7s-tools', class: '' , rol :['Taller'],admin: 'Admin'},
    { path: 'detalleOrdenReparacion', title: 'Ordenes de Reparación',  icon:'pe-7s-tools', class: '' , rol :['Taller'],admin: 'Admin'},
    { path: 'InformesTaller', title: 'Informes de Taller',  icon:'pe-7s-tools', class: '' , rol :['Comercializadora'],admin: 'Admin'},
    //{ path: 'InformeProformaReparacion', title: 'Informe Proforma', icon: 'pe-7s-news-paper', class: '', rol: ['Comercializadora'], admin: 'Admin'},
    { path: 'ListProformaReparacion', title: 'Lista Proformas', icon: 'pe-7s-news-paper', class: '', rol: ['Comercializadora'], admin: 'Admin'},
    {path: 'reportes', title: 'Reportes', icon: 'pe-7s-news-paper', class: '', rol: ['Comercializadora'], admin: 'Admin'}
    
    

  ];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
 
  // array para cargar la path,icon,title en el html
  menuItems: any[];
 
  // variable para setear el rol del usuario del localStorage
  rol = '';
  btn = '';

  constructor( private router: Router,
               private empleado: EmpeladoControllerService) { }


  ngOnInit() {
    this.menuItems = ROUTES.filter(data=> data);
    this.rol = localStorage.getItem('rol') 
    this.btn = localStorage.getItem('btn')
}


  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  
}
