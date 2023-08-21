import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { InitialInfo } from '../interfaces/initial-info.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  //inyectamos el HttpClien
  httpClient = inject(HttpClient);
  //Creamos la propuedad baseUrl, ya que en este caso de ahí deriban todas las demás rutas.
  private baseUrl: string = "https://peticiones.online/api/users/";

  constructor() {}

  getAll(): Promise <InitialInfo> {
    //petición a la API para obtener todos los usuarios y se realizará pro promesas
    return lastValueFrom(this.httpClient.get<InitialInfo>(this.baseUrl))
  };

  getById(id: string): Promise <User> {
    //petición a la API con get pero para que devuelva solo el post con el id indicado.
    return lastValueFrom(this.httpClient.get<User>(`${this.baseUrl}${id}`))
  }

  delete(id:string): Promise <User> {
    return lastValueFrom(this.httpClient.delete<User>(`${this.baseUrl}${id}`))
  }


}
