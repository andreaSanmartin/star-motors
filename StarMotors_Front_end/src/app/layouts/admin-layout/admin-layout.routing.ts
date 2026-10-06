import { Routes, RouterModule } from "@angular/router";


import { CotizacionComponent } from "app/cotizacion/cotizacion/cotizacion.component";
import { GarantiasComponent } from "app/garantias/garantias/garantias.component";
import { DespacharRepuestosComponent } from "app/despacharRepuestos/despachar-repuestos/despachar-repuestos.component";
import { FacturaClienteComponent } from "app/facturaVentas/factura-cliente/factura-cliente.component";
import { InformeTallerComponent } from "app/Taller/informe-taller/informe-taller.component";
import { PilaDocumentosComponent } from "../../comercializadora/pila-documentos/pila-documentos.component";
import { DetalleCotizacionComponent } from "app/detailCotizacion/detalle-cotizacion/detalle-cotizacion.component";
import { DetalleGarantiaComponent } from "app/detalleGarantia/detalle-garantia/detalle-garantia.component";
import { DocumentosRevisionGComponent } from "app/comercializadora_DocumentoRevision/documentos-revision-g/documentos-revision-g.component";
import { HomeComponent } from "../../home/home/home.component";
import { DetalleDespaschoRepuestosComponent } from "app/detallesDespachoRepuestos/detalle-despascho-repuestos/detalle-despascho-repuestos.component";
import { SolicitudRepuestosComponent } from "app/solicitudRepuestos/solicitud-repuestos/solicitud-repuestos.component";
import { FacturaReparacionComponent } from "app/facturaReparacion/factura-reparacion/factura-reparacion.component";
import { GenerarReclamoComponent } from "app/generarReclamo/generar-reclamo/generar-reclamo.component";
import { LoginComponent } from '../../login/login/login.component';
import { AdminLayoutComponent } from "./admin-layout.component";
import { DetalleReparacionComponent } from "app/detalleInfoReparacion/detalle-reparacion/detalle-reparacion.component";
import { DetalleOrdenReparacionComponent } from "app/detailOrdenReparacaion/detalle-orden-reparacion/detalle-orden-reparacion.component";
import { InformesTallerComponent } from "app/TallerInformes/informes-taller/informes-taller.component";
import { DetalleinformesTallerComponent } from "app/DetalletallerInformes/detalleinformes-taller/detalleinformes-taller.component";
import { InformeProformaReparacionComponent } from "app/infoProformaReparacion/informe-proforma-reparacion/informe-proforma-reparacion.component";
import { ProformaListComponent } from "app/proforma-list/proforma-list.component";
import { GenerarOrdenReparacionComponent } from "app/generar-orden-reparacion/generar-orden-reparacion.component";
import { InformeConcesionariaComponent } from "app/InformeConcesionaria/informe-concesionaria/informe-concesionaria.component";
import { DetalleGSoliComponent } from "app/detalle-g-soli/detalle-g-soli.component";
import { InfoRechazogComponent } from "app/info-rechazog/info-rechazog.component";
import { ReportesComponent } from "app/reportes/reportes/reportes.component";


export const AdminLayoutRoutes: Routes = [
    
      { path: "dashboard", component: HomeComponent },
      { path: "cotizacion", component: CotizacionComponent },
      { path: "garantias", component: GarantiasComponent },
      { path: "generarRepuestos", component: DespacharRepuestosComponent },
      { path: "detalleRepuestos", component: DetalleDespaschoRepuestosComponent },
      { path: "facturaVenta", component: FacturaClienteComponent },
      { path: "informeTaller", component: InformeTallerComponent },
      { path: "pilaInforme", component: PilaDocumentosComponent },
      { path: "detalleRGarantia", component: DocumentosRevisionGComponent },
      { path: "facturareparacion", component: FacturaReparacionComponent },
      { path: "detalleOrdenReparacion", component: DetalleOrdenReparacionComponent },
      { path: "InformesTaller", component: InformesTallerComponent },
      { path: "InformeProformaReparacion", component: InformeProformaReparacionComponent},
      { path: "ListProformaReparacion", component: ProformaListComponent},
      {path: "reportes", component: ReportesComponent},


    // path para ver mas utilizando el params
    {path: ':idGarantia/detalleG', component: DetalleGarantiaComponent},
    {path: ':idGarantia/generarReclamo', component: GenerarReclamoComponent},
    {path: ':idCotizacion/detalleCotizacion', component: DetalleCotizacionComponent},
    {path: ':idCotizacion/facturaVenta', component: FacturaClienteComponent},
    {path: ':idGarantia/:index/detalleSolRep', component: DetalleDespaschoRepuestosComponent},
    {path: ':idGarantia/detalleIfrmReparacion', component: DetalleReparacionComponent},
    {path: ':idGarantia/facturarR', component: FacturaReparacionComponent},
    {path: ':idGarantia/detalleInfomeTaller', component: DetalleinformesTallerComponent},
    {path: ':idGarantia/informeTaller', component: InformeTallerComponent},
    {path: ':idGarantia/solicitudeR', component: SolicitudRepuestosComponent},
    {path: ':idGarantia/generarOrdenReparacion', component: GenerarOrdenReparacionComponent},

    {path: ':idGarantia/informeConcesionaria', component: InformeConcesionariaComponent},
    {path: ':idGarantia/detalleReclamo', component: DetalleGSoliComponent},
    {path: ':idGarantia/informeRechazo', component: InfoRechazogComponent},
    {path: ':idGarantia/InformeProformaReparacion', component: InformeProformaReparacionComponent}

];

