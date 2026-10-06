import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {AppRoutingModule} from './app.routing';
import {NavbarModule} from './shared/navbar/navbar.module';
import {FooterModule} from './shared/footer/footer.module';
import {SidebarModule} from './sidebar/sidebar.module';

import {AppComponent} from './app.component';

import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {
    CotizacionesControllerService,
    EmailControllerService,
    GarantiasControllerService,
    NominaEmpleadosControllerService,
    OrdenReparacionControllerService,
    TallerControllerService
} from './Services/NOSQL/angular_api_client';
import {
    ClienteControllerService,
    ComercializadoraControllerService,
    FacturaReparacionControllerService,
    VehiculoControllerService
} from './Services/SQL/angular_api_client';
import {FacturaVentaControllerService} from './Services/SQL/angular_api_client/api/facturaVentaController.service';
import {ReclamoControllerService} from './Services/NOSQL/angular_api_client/api/reclamoController.service';
import {EmpeladoControllerService} from './Services/SQL/angular_api_client/api/empeladoController.service';
import {CommonModule} from '@angular/common';

import {RepuestoControllerService} from './Services/SQL/angular_api_client/api/repuestoController.service';
import {ConcesionariaControllerService} from './Services/SQL/angular_api_client/api/concesionariaController.service';
import {ProformaListComponent} from './proforma-list/proforma-list.component';
import {GenerarOrdenReparacionComponent} from './generar-orden-reparacion/generar-orden-reparacion.component';
import {FiltroProformaDatePipe} from './pipes/filtro-proforma-date.pipe';


import {AngularFireModule} from '@angular/fire';
import {AngularFirestore} from '@angular/fire/firestore';
import {environment} from 'environments/environment';


import {FiltroDetallePipe} from './pipes/filtro-detalle.pipe';
import {FiltroGeneralPipe} from './pipes/filtro-general.pipe';
import { FiltroReclamoDatePipe } from './pipes/filtro-reclamo-date.pipe';




@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        RouterModule,
        HttpClientModule,
        NavbarModule,
        FooterModule,
        SidebarModule,
        AppRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        ProformaListComponent,
        GenerarOrdenReparacionComponent,
        FiltroProformaDatePipe,
        FiltroDetallePipe,
        FiltroGeneralPipe,
        FiltroReclamoDatePipe,
 
    ],
    providers: [CotizacionesControllerService,
        GarantiasControllerService,
        NominaEmpleadosControllerService,
        ClienteControllerService,
        FacturaVentaControllerService,
        FacturaReparacionControllerService,
        VehiculoControllerService,
        TallerControllerService,
        ReclamoControllerService,
        EmpeladoControllerService,
        OrdenReparacionControllerService,
        EmailControllerService,
        RepuestoControllerService,
        RepuestoControllerService,
        ConcesionariaControllerService,
        AngularFirestore,
        ComercializadoraControllerService


    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
