import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroReclamoDate'
})
export class FiltroReclamoDatePipe implements PipeTransform {

  
  transform(value: any, args: string): any {
    if (!value) return null;
    if (!args) return value;

    return value.filter((singleItem) => {
      return (
        singleItem.reclamo.recFecha
          .toLowerCase()
          .includes(args.toLowerCase()) ||
        singleItem.reclamo.recFecha
          .toLowerCase()
          .includes(args.toLowerCase())

      );
    });
  }

}
