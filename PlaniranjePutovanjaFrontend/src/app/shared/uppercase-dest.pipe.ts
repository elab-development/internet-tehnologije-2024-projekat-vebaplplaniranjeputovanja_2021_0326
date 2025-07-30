import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uppercaseDest',
  standalone: true // jer koristimo standalone
})
export class UppercaseDestPipe implements PipeTransform {
  transform(value: string): string {
    return value.toUpperCase();
  }
}
