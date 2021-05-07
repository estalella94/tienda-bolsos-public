import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { producto } from 'src/app/interfaces/producto';
import { Filtro } from '../../interfaces/filtro';
import { CestaService } from '../../services/cesta.service';
import { FiltroColorService } from '../../services/filtro-color.service';
import { BordeColorService } from '../../services/borde-color.service';

@Component({
selector: 'app-productos',
templateUrl: './productos.component.html',
styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

productos: producto[] = []
productosMostrar: producto[] = []
mostrarFavoritos: boolean = true;
elementosFavoritos = (localStorage.getItem('elementosFavoritos')) ? localStorage.getItem('elementosFavoritos').split(',') : [] ;
colorSeleccionado;

constructor(
private db: AngularFirestore,
private router: Router,
private cestaServ: CestaService,
private filtro_color:FiltroColorService,
private borde_color:BordeColorService
) {
}

selectFavorite(producto: producto){

  this.mostrarFavoritos =this.mostrarFavoritos  ? false : true;

  (this.elementosFavoritos.indexOf(producto.url) >=0) ? null :this.elementosFavoritos.push(producto.url);

  localStorage.setItem('elementosFavoritos', this.elementosFavoritos.toString());



}
/*
  const comprovarSiEseElementoEstaDentro = this.elementosFavoritos.indexOf(producto.url);

if( comprovarSiEseElementoEstaDentro>=0){

}else{
  this.elementosFavoritos.push(producto.url);
}
*/



deselectFavorite(producto){
  this.mostrarFavoritos =this.mostrarFavoritos  ? false : true;



const index= this.elementosFavoritos.indexOf(producto.url);

if(index>=0){
  this.elementosFavoritos.splice( index, 1);
}else{};

localStorage.setItem('elementosFavoritos', this.elementosFavoritos.toString())


/*
console.log('desselect produ', producto);
console.log('ID A DESSELECCIONAR', producto.url)

const index = this.elementosFavoritos.findIndex(producto);
console.log('INDEX', index)
this.elementosFavoritos.splice(index, 1)
*/

}

comprobarSiEstaSeleccionado(producto:producto){

return (this.elementosFavoritos.indexOf(producto.url) >=0)



}



filtrarProductos(filtro: Filtro){
console.log('filtro que viene del hijo', filtro);

this.borde_color.setColor(filtro.color);

/// filtrar primero el texto
const arrayFiltrandoTexto = this.filtrarTexto( this.productos, filtro);

/// filtro el precio
const arrayFiltrandoPrecio = this.filtrarPrecio( arrayFiltrandoTexto, filtro);

/// filtro el color
const arrayFiltrandoColor = this.filtrarColor( arrayFiltrandoPrecio, filtro);
this.colorSeleccionado = filtro.color;

/// filtro el tipo
const arrayFiltrandoTipo = this.filtrarTipo( arrayFiltrandoColor, filtro);


this.productosMostrar = [... arrayFiltrandoTipo];


}




filtrarTexto(array: producto[], filtro: Filtro) : producto[]{


const texto = filtro.texto;

// no es verdad , o que no existe , o que es null, o que es false; -1, '', null, undefined,

if(! texto){
return array
} else {
return array.filter((producto: producto)=>{
const nombre = producto.nombre.toLowerCase().trim()
return nombre.includes(texto.toLowerCase().trim());
})
}
}

filtrarPrecio(array: producto[], filtro: Filtro): producto[]{
console.log('FILTRO PRECIO', filtro)
const precioMaximo = filtro.precio.precioMaximo;
const precioMinimo = filtro.precio.precioMinimo;

return array.filter((producto: producto)=>{
const precioDeEsteProducto = this.cestaServ.precioFinal(producto);
return ( precioDeEsteProducto > precioMinimo ) && ( precioDeEsteProducto < precioMaximo)
})
}

filtrarColor(array: producto[], filtro: Filtro): producto[]{
const color = filtro.color

this.filtro_color.set(color);

if( !color || ( color === 'todos' ) ){ // si el color es igual a 'todos'
return array // no apliques ningun filtro
}else{
return array.filter((producto: producto)=>{
const arrayDeColoresDisponibles = producto.colores;

return arrayDeColoresDisponibles.includes(color)
})
}
}

mostrarColor(producto:producto){
  if(this.colorSeleccionado === 'todos'){
  return producto.img[0]
  }else{

  return `${producto.url}_${this.colorSeleccionado}.jpeg`

  }
  }

filtrarTipo(array: producto[], filtro: Filtro): producto[]{
const tipo = filtro.tipo; // si el tipo es 'todos'
if( !tipo || (tipo === 'todos') ){ // no apliques ningun filtro
return array
}else{
return array.filter((producto:producto)=>{
return producto.tipo === tipo
})
}
}

ngOnInit(): void {
this.db.collection('productos').valueChanges().subscribe(( res )=>{
this.productos = res as producto[];
this.filtrarProductos({
precio:{
precioMaximo: localStorage.getItem('precioMaximo') ? parseInt(localStorage.getItem('precioMaximo')) : 0,
precioMinimo: localStorage.getItem('precioMinimo') ? parseInt(localStorage.getItem('precioMinimo')) : 100
},
tipo: localStorage.getItem('tipo') ? localStorage.getItem('tipo') : 'todos',
color: localStorage.getItem('color') ? localStorage.getItem('color') : 'todos',
texto: localStorage.getItem('texto') ? localStorage.getItem('texto') : null,
});

})
}

navegar(i){
console.log('navegar', i);
this.router.navigate([ 'detalle-producto', i ])
}

}
