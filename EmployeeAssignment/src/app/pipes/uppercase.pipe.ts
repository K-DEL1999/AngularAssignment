import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uppercase'
})
export class UppercasePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    let name = "";

    if (value.length != 0){
      name += value[0].toUpperCase()
      if (value.length > 1){
        name += value.slice(1,value.length).toLowerCase();
      }
    }

    return name;
  }
}
