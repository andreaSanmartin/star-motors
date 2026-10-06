import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reportes'
})
export class ReportesPipe implements PipeTransform {

  transform(value: any, args: string): any {
    if (!value) return null;
    if (!args) return value;
    return value.filter((singleItem) => {
      return (
        singleItem.modelo.marca.marNombre
          .toLowerCase()
          .includes(args.toLowerCase()) ||
        singleItem.modelo.modNombre
          .toLowerCase()
          .includes(args.toLowerCase()) ||
        singleItem.modelo.paisOrigen.nombre
          .toLowerCase()
          .includes(args.toLowerCase()) ||
        singleItem.ejmColor.toLowerCase().includes(args.toLowerCase())
      );
    });
  }

}
