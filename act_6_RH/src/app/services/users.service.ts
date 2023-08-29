import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { last, lastValueFrom } from 'rxjs';
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

  constructor() { }

  getAll(): Promise<InitialInfo> {
    //petición a la API para obtener todos los usuarios y se realiza por promesas.
    return lastValueFrom(this.httpClient.get<InitialInfo>(this.baseUrl));
  };

  //El método getById puede devolver como respuesta un objeto tipo User o un objeto del tipo any "ya que no tenemos la interfaz creada para la respuesta (error)". 
  getById(id: string): Promise<User | any> {
    //Petición a la API del iser por el id.
    return lastValueFrom(this.httpClient.get<User | any>(`${this.baseUrl}${id}`));
  };

  //El método delete puede devolver como respuesta un objeto tipo User o un objeto del tipo any "ya que no tenemos la interfaz creada para la respuesta (error)". 
  delete(id: string): Promise<User | any> {
    //Petición a la API para borrar el usuario por id.
    return lastValueFrom(this.httpClient.delete<User | any>(`${this.baseUrl}${id}`));
  };

  getAllP2(): Promise<InitialInfo> {
    //petición a la API para obtener todos los usuarios de la página 2 ya que trasteando no he hallado otra manera de poder obtener esa información debido a un error en la API. Se realiza por promesas.
    return lastValueFrom(this.httpClient.get<InitialInfo>(`${this.baseUrl}?page=2`));
  };

  post(formValue: any): Promise<User> {
    //al ser una petición post necesitamos enviar una ruta y lo que hay que actualizar o insertar.
    return lastValueFrom(this.httpClient.post<User>(this.baseUrl, formValue));
  };

  //El método put puede devolver como respuesta un objeto tipo User o un objeto del tipo any "ya que no tenemos la interfaz creada para la respuesta (error)". 
  put(formValue: any): Promise<User | any> {
    return lastValueFrom(this.httpClient.put<User | any>(`${this.baseUrl}${formValue._id}`, formValue))
  };
}
