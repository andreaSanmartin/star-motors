import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroNombre'
})
export class FiltroNombrePipe implements PipeTransform {

  transform(value: any, args: string): any {
    if (!value) return null;
    if (!args) return value;

    return value.filter((singleItem) => {
      return (
        singleItem.persona.perNombre
          .toLowerCase()
          .includes(args.toLowerCase()) ||
        singleItem.persona.perCedula
          .toLowerCase()
          .includes(args.toLowerCase())
      );
    });
  }

}
