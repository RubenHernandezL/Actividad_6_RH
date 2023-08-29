import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent {
  //para poder capturar el ID de la ruta, que es lo que necesitamos para saber cual es el usuario que vamos a pintar en la vista, necesitamos capturar la ruta variable (id).
  activatedRoute = inject(ActivatedRoute);
  //tenemos que capturar el usuario que recibamos para poder pintarlo. Para ello se crea la propuedad user.
  user!: User | any;
  //para peticiones al servicio hay que inyectarlo. Se inyecta el servicio.
  usersService = inject(UsersService);
  //inyectamos el router para modificar rutas en ts.
  router = inject(Router);
  //cuando cargue el componente podremos obtener el id del usuario de la ruta variable. Por lo que se debe de utilizar la función ngOnInit.
  ngOnInit(): void {
    //ahora capturamos la parte variable de la ruta y con esto vamos a obtener el usuario correspondiente que deseamos pintar en la vista detalle. Para hacerlo de una manera mas completa, tratamos la respuesta de la promesa con un try catch y como esta petición a la Api puede tener 2 respuestas, lo manejamos internamente con un condicional.
    this.activatedRoute.params.subscribe(async (params: any) => {
      let id = params.iduser;
      try {
        this.user = await this.usersService.getById(id);
        if ("error" in this.user) {
          alert(this.user.error);
          this.router.navigate(["/home"]);
        }
      } catch {
        alert("Ocurrió un error al intentar recuperar el usuario, intentarlo de nuevo.");
        this.router.navigate(["/home"]);
      }
    })
  };
  async deleteUser(id: string, name: string): Promise<void> {
    //El alert de confirmación se gestionará por window.confirm.
    let confirmation = window.confirm(`¿Estas seguro que deseas borrar el usuario de ${name}?.`);
    //Se coloca un condicional para cuando se acepta la cofirmación de eliminar el usuario al igual que antes se trata la promesa con un try catch por si sucede algún error inesperado.
    if (confirmation) {
      try {
        const response = await this.usersService.delete(id);
        //Se coloca el condicional cuando todo sale bien, ya que devuelve la api una respuesta en forma de promesa y cuando sale mal tenemos que mostrar el alert de que no existe.
        if ('error' in response) {
          alert("Error: " + response.error + ".");
          this.router.navigate(["/home"]);
        } else {
          alert("Usuario borrado correctamente");
          this.router.navigate(["/home"]);
        }
      } catch (error) {
        console.error("Error al borrar el usuario:", error);
        alert("Ocurrió un error al borrar el usuario.");
      }
    } else {
      //al cancelarse la operación no se debería volver a home para que se pueda intentar nuevamente en el modo detalle o home, dependiendo desde donde se haya untentado borrar el usuario.
      alert("Operación cancelada.");
    };
  };
}
