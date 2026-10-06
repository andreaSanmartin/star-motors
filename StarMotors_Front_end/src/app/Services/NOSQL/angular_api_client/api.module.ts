import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { BasicErrorControllerService } from './api/basicErrorController.service';
import { CotizacionesControllerService } from './api/cotizacionesController.service';
import { EmailControllerService } from './api/emailController.service';
import { GarantiasControllerService } from './api/garantiasController.service';
import { NominaEmpleadosControllerService } from './api/nominaEmpleadosController.service';
import { OrdenReparacionControllerService } from './api/ordenReparacionController.service';
import { ReclamoControllerService } from './api/reclamoController.service';
import { ReportesControllerService } from './api/reportesController.service';
import { TallerControllerService } from './api/tallerController.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    BasicErrorControllerService,
    CotizacionesControllerService,
    EmailControllerService,
    GarantiasControllerService,
    NominaEmpleadosControllerService,
    OrdenReparacionControllerService,
    ReclamoControllerService,
    ReportesControllerService,
    TallerControllerService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders <any> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
