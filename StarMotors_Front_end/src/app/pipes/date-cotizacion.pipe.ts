import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateCotizacion'
})
export class DateCotizacionPipe implements PipeTransform {

  transform(value: any, args: string): any {
    if (!value) return null;
    if (!args) return value;

    return value.filter((singleItem) => {
      return (
        singleItem.cotFecha
          .toLowerCase()
          .includes(args.toLowerCase()) ||
        singleItem.cotFecha
          .toLowerCase()
          .includes(args.toLowerCase())

      );
    });
  }
}
