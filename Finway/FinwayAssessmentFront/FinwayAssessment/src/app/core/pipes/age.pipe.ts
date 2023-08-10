import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]):number {
    let timeDiff = Math.abs(Date.now() - new Date(value).getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    return age;
  }

}
