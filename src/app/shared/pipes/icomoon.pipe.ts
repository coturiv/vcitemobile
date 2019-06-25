import { Pipe, PipeTransform } from '@angular/core';
import { Icomoon, Icomoons, Colors } from '../../utility/icomoon';

@Pipe({
  name: 'icomoon'
})
export class IcomoonPipe implements PipeTransform {

  transform(name: Icomoons, color?: Colors): any {
    return Icomoon.icon(name, color);
  }

}
