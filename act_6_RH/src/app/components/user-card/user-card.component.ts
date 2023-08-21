import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  //hacemos input dle array de users
  @Input() allUsers!: User | any
  //inyectamos el servicio para poder poser enviar el id a la función deleteUser
  usersService = inject(UsersService);
  //inyectamos el router para poder redireccionar a Home una vez borrado
  router = inject(Router)

  //se crea el metodo deleteUSer, par apoder ejecutar la fiunción delete que posteriormente tendremos que iniciar en el servicio y pasarle tanto el id del usuario como el nombre ya que lo necesitamos para el confirmation.
  async deleteUser(id: string, name:string): Promise<void> {
    //OJOO estio queda sin hacer hay que hacerlo que sea un aceptar o cancel ok y lo haremos por window.confirm.
    let confirmation = window.confirm(`¿Estas seguro que deseas borrar el usuario de ${name}?`)
    let response = await this.usersService.delete(id);
    //se coloca el condicional cuando todo sale bien ya que devuelve la api una respuesta en forma de promesa y cuando sale mal tenemos que mostrar el alert de que no existe
    if (confirmation) {
      /*if (response) {
        alert("Usuario borrado correctamente")
        this.router.navigate(["/home"])
      } else {
        alert("El usuario que intentas borrar no existe")
      }
    } else {
      alert("Operación cancelada")
      */
      try {
        const response = await this.usersService.delete(id);
        
        if ('error' in response) {
            alert("Error: " + response.error);
        } else {
            alert("Usuario borrado correctamente");
            this.router.navigate(["/home"]);
        }
    } catch (error) {
        console.error("Error al borrar el usuario:", error);
        alert("Ocurrió un error al borrar el usuario");
    }
    }
  }


}
