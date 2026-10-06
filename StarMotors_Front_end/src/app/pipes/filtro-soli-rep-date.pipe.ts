import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroSoliRepDate'
})
export class FiltroSoliRepDatePipe implements PipeTransform {

  transform(value: any, args: string): any {
    if (!value) return null;
    if (!args) return value;

    return value.filter((singleItem) => {
      return (
        singleItem.srFechaSolicitud
          .toLowerCase()
          .includes(args.toLowerCase()) ||
        singleItem.srFechaSolicitud
          .toLowerCase()
          .includes(args.toLowerCase())
      );
    });
  }

}
