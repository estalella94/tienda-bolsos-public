import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mostrarColorSeleccionado'
})
export class MostrarColorSeleccionadoPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    
    const producto = value;
    const colorSeleccionado = args[0]

if(colorSeleccionado === 'todos'){
return producto.img[0]
}else{
return `${producto.url}_${colorSeleccionado}.jpeg`
}
  }

}
