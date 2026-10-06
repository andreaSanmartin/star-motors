import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroProformaDate'
})
export class FiltroProformaDatePipe implements PipeTransform {

  transform(value: any, args: string): any {
    if (!value) return null;
    if (!args) return value;

    return value.filter((singleItem) => {
      return (
        singleItem.reclamo.informeProformaReparacion.ordenReparacion.orFecha
          .toLowerCase()
          .includes(args.toLowerCase()) ||
        singleItem.reclamo.informeProformaReparacion.ordenReparacion.orFecha
          .toLowerCase()
          .includes(args.toLowerCase())
      );
    });
  }
}
