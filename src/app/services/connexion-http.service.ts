import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ConnexionHttpService {

  constructor(private httpClient: HttpClient) { }

url = 'https://my-json-server.typicode.com/typicode/demo/posts'

get(){ //consultar datos
return this.httpClient.get(this.url)
}

post(data){ // enviar nuevos datos
return this.httpClient.post(this.url, data)
}

delete(data){ // eliminar datos/registros
return this.httpClient.delete(this.url, data)
}

put(data){ // actualizar o modificar campos
return this.httpClient.put(this.url, {data})
}
}
