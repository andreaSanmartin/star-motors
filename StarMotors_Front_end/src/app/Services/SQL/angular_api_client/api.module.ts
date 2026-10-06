import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { BasicErrorControllerService } from './api/basicErrorController.service';
import { ClienteControllerService } from './api/clienteController.service';
import { ComercializadoraControllerService } from './api/comercializadoraController.service';
import { ConcesionariaControllerService } from './api/concesionariaController.service';
import { EmpeladoControllerService } from './api/empeladoController.service';
import { FacturaReparacionControllerService } from './api/facturaReparacionController.service';
import { FacturaVentaControllerService } from './api/facturaVentaController.service';
import { RepuestoControllerService } from './api/repuestoController.service';
import { VehiculoControllerService } from './api/vehiculoController.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    BasicErrorControllerService,
    ClienteControllerService,
    ComercializadoraControllerService,
    ConcesionariaControllerService,
    EmpeladoControllerService,
    FacturaReparacionControllerService,
    FacturaVentaControllerService,
    RepuestoControllerService,
    VehiculoControllerService ]
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
