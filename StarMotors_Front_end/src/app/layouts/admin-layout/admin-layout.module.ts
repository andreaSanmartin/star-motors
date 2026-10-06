import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LbdModule } from '../../lbd/lbd.module';
import { AdminLayoutRoutes } from './admin-layout.routing';

import { CotizacionComponent } from 'app/cotizacion/cotizacion/cotizacion.component';
import { GarantiasComponent } from 'app/garantias/garantias/garantias.component';
import { DespacharRepuestosComponent } from 'app/despacharRepuestos/despachar-repuestos/despachar-repuestos.component';
import { FacturaClienteComponent } from 'app/facturaVentas/factura-cliente/factura-cliente.component';
import { InformeTallerComponent } from 'app/Taller/informe-taller/informe-taller.component';
import { PilaDocumentosComponent } from 'app/comercializadora/pila-documentos/pila-documentos.component';
import { DetalleCotizacionComponent } from 'app/detailCotizacion/detalle-cotizacion/detalle-cotizacion.component';
import { DetalleGarantiaComponent } from 'app/detalleGarantia/detalle-garantia/detalle-garantia.component';
import { DetalleDespaschoRepuestosComponent } from 'app/detallesDespachoRepuestos/detalle-despascho-repuestos/detalle-despascho-repuestos.component';
import { DocumentosRevisionGComponent } from 'app/comercializadora_DocumentoRevision/documentos-revision-g/documentos-revision-g.component';
import { HomeComponent } from 'app/home/home/home.component';
import { LoginComponent } from 'app/login/login/login.component';
import { SolicitudRepuestosComponent } from 'app/solicitudRepuestos/solicitud-repuestos/solicitud-repuestos.component';
import { FacturaReparacionComponent } from 'app/facturaReparacion/factura-reparacion/factura-reparacion.component';
import { NgxPrintModule } from 'ngx-print';

import { GenerarReclamoComponent } from 'app/generarReclamo/generar-reclamo/generar-reclamo.component';
import { FiltroGarantiaPipe } from 'app/pipes/filtro-garantia.pipe';
import { DetalleReparacionComponent } from 'app/detalleInfoReparacion/detalle-reparacion/detalle-reparacion.component';
import { InformesTallerComponent } from 'app/TallerInformes/informes-taller/informes-taller.component';
import { DetalleinformesTallerComponent } from 'app/DetalletallerInformes/detalleinformes-taller/detalleinformes-taller.component';
import { OrdenReparacionComponent } from 'app/orden-reparacion/orden-reparacion.component';
import { DetalleOrdenReparacionComponent } from 'app/detailOrdenReparacaion/detalle-orden-reparacion/detalle-orden-reparacion.component';

import { InformeProformaReparacionComponent } from 'app/infoProformaReparacion/informe-proforma-reparacion/informe-proforma-reparacion.component';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { InfoRechazogComponent } from 'app/info-rechazog/info-rechazog.component';
import { DateCotizacionPipe } from 'app/pipes/date-cotizacion.pipe';
import { DateGarantiaPipe } from 'app/pipes/date-garantia.pipe';
import { InformeConcesionariaComponent } from 'app/InformeConcesionaria/informe-concesionaria/informe-concesionaria.component';
 //
 import { ReportesComponent } from 'app/reportes/reportes/reportes.component';
import { FiltroNombrePipe } from 'app/pipes/filtro-nombre.pipe';

import { FiltroSoliRepDatePipe } from 'app/pipes/filtro-soli-rep-date.pipe';

import { ReportesPipe } from 'app/pipes/reportes.pipe';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    LbdModule,
    NgxPrintModule,
    ReactiveFormsModule,
    NgxDatatableModule
  ],
  declarations: [
    CotizacionComponent,
    GarantiasComponent,
    DespacharRepuestosComponent,
    FacturaClienteComponent,
    InformeTallerComponent,
    PilaDocumentosComponent,
    DetalleCotizacionComponent,
    DetalleGarantiaComponent,
    DetalleDespaschoRepuestosComponent,
    DocumentosRevisionGComponent,
    HomeComponent,
    LoginComponent,
    SolicitudRepuestosComponent,
    FacturaReparacionComponent,
    GenerarReclamoComponent,
    FiltroGarantiaPipe,
    DateGarantiaPipe,
    DateCotizacionPipe,
    DetalleReparacionComponent,
    DetalleOrdenReparacionComponent,
    InformesTallerComponent,
    DetalleinformesTallerComponent,
    OrdenReparacionComponent,
    InfoRechazogComponent,
    InformeConcesionariaComponent,
    FiltroNombrePipe,
    InformeProformaReparacionComponent,
    InformeConcesionariaComponent,
    FiltroSoliRepDatePipe,
    ReportesComponent,
    ReportesPipe
  ]
})

export class AdminLayoutModule {}
