import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BordeColorService {



  color = localStorage.getItem('colorDetalle') ? localStorage.getItem('colorDetalle') : null

  getColor(){
  return this.color
  }

  setColor(color: string){
   this.color = color;
  localStorage.setItem('colorDetalle', color);
  }



  constructor() { }
}
