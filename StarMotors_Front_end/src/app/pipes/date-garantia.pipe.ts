import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateGarantia'
})
export class DateGarantiaPipe implements PipeTransform {

  transform(value: any, args: string): any {
    if (!value) return null;
    if (!args) return value;

    return value.filter((singleItem) => {
      return (
        singleItem.garFecha
          .toLowerCase()
          .includes(args.toLowerCase()) ||
        singleItem.garFecha
          .toLowerCase()
          .includes(args.toLowerCase())

      );
    });
  }

}
