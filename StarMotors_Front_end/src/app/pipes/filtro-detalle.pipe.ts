import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroDetalle'
})
export class FiltroDetallePipe implements PipeTransform {

    transform(value: any, args: string): any {
      if (!value) return null;
      if (!args) return value;
  
      return value.filter((singleItem) => {
        return (
          singleItem.persona.informeProformaReparacion.ordenReparacion.orDescripcion
            .toLowerCase()
            .includes(args.toLowerCase()) ||
          singleItem.reclamo.informeProformaReparacion.ordenReparacion.orDescripcion
            .toLowerCase()
            .includes(args.toLowerCase())
        );
      });
    }

}
