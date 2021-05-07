import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FiltroColorService {
color;
  constructor() {}

get(){
  return this.color;
}

set(filtro){
  this.color = filtro;
}

}
