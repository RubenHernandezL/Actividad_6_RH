import { Component, inject } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home-page2',
  templateUrl: './home-page2.component.html',
  styleUrls: ['./home-page2.component.css']
})
export class HomePage2Component {
  //Necesitamos pintar en home el array de las lista de usuarios. Para ello se inicializa la propiedad arrUsers.
  arrUsersP2: User[] = [];
  //Se inyecta el servicio.
  usersService = inject(UsersService);
  //Se crean las propiedades del número de página y current page para poder enviarle los valores al componente hijo "footer".
  totalPages: number = 0;
  currentPage: number = 2;
  //después de que se carguen los componentes estarán disponibles todos los users.
  async ngOnInit(): Promise<void> {
    //hay que llamar al servicio para poder obtener todos los usuarios y para ello necesitamos inyectarlo.
    //le ponemos una excepción para que se gestione tanto lo OK como lo KO.
    try {
      const response = await this.usersService.getAllP2()
      this.arrUsersP2 = response.results;
      this.totalPages = response.total_pages;
    } catch {
      alert("No se han podido obtener los usuarios de la API.");
    };
  };
}
