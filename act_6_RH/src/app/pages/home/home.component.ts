import { Component, inject } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  //Necesitamos pintar en home el array de las lista de usuarios
  arrUsers: User[] = [];
  usersService = inject(UsersService)

  async ngOnInit():Promise<void>{
    //hay que llamar al servicio para poder obtener todos los usuarios y para ello necesitamos inyectarlo.
    //le ponemos una excepción para que se gestione tanto lo OK como lo KO.
    try{
    const response = await this.usersService.getAll()
    console.log(response)
    this.arrUsers = response.results
  }catch{
    alert("No se han podido obtener los usuarios de la API.")
  }
  }


}
