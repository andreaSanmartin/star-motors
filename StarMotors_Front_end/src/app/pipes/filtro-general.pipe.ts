import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroGeneral'
})
export class FiltroGeneralPipe implements PipeTransform {

  transform(value: any, args: string): any {
    if (!value) return null;
    if (!args) return value;

    return value.filter((singleItem) => {
      return (
        singleItem.reclamo?.informeProformaReparacion.prFecha
          .toLowerCase()
          .includes(args.toLowerCase()) ||
        singleItem.reclamo?.informeProformaReparacion.prDetalle
          .toLowerCase()
          .includes(args.toLowerCase())
      );
    });
  }
}
