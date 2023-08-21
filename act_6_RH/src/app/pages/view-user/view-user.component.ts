import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent {
  //para poder capturar el ID de la ruta, que es lo que necesitamos para saber cual es el usuario que necesita en la vista ya que permitae capturar la ruta variable
  activatedRoute = inject(ActivatedRoute);
  //tenemos que capturar el usuario que recibamos
  user!: User | any;
  //para peticiones al servicio hay que inyectarlo.
  usersService = inject(UsersService)
  //cuando cargue el componente podremos obtenerlo.
  ngOnInit(): void {
    //ahora capturamos la parte variable
    this.activatedRoute.params.subscribe(async (params: any) => {
      let id = params.iduser;
      this.user = await this.usersService.getById(id);
    })
  };

}
