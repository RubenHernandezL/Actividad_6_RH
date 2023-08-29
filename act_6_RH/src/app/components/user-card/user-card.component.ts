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
  //hacemos input dle array de users.
  @Input() allUsers!: User | any
  //inyectamos el servicio para poder enviar el id a la función deleteUser.
  usersService = inject(UsersService);
  //inyectamos el router para poder redireccionar a Home una vez borrado.
  router = inject(Router)

  //se crea el metodo deleteUSer, par apoder ejecutar la fiunción delete que posteriormente tendremos que iniciar en el servicio y pasarle tanto el id del usuario como el nombre ya que lo necesitamos para el confirmation.
  async deleteUser(id: string, name: string): Promise<void> {
    //El alert de confirmación se gestionará por window.confirm.
    let confirmation = window.confirm(`¿Estas seguro que deseas borrar el usuario de ${name}?.`);
    //se coloca el condicional cuando todo sale bien ya que devuelve la api una respuesta en forma de promesa y cuando sale mal tenemos que mostrar el alert de que no existe.
    if (confirmation) {
      try {
        const response = await this.usersService.delete(id);
        if ('error' in response) {
          alert("Error: " + response.error);
        } else {
          alert("Usuario borrado correctamente.");
          this.router.navigate(["/home"]);
        }
      } catch (error) {
        console.error("Error al borrar el usuario:", error);
        alert("Ocurrió un error al borrar el usuario.");
      }
    } else {
      alert("Operación cancelada.");
    }
  }
}
