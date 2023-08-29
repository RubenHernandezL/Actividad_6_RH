import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  //empezamos creando los tipo de formulario, que van a ser variables y dependerán de si es para actualizar o para un nuevo usuario. Se inicializan vacíos.
  typeUser: string = "";
  typeForm: string = "";
  //creamos el formgroup.
  userForm: FormGroup;
  //inyectamos el servicio para poder enviarle lo que recojamos del form.
  usersService = inject(UsersService);
  //inyectamos el router para volver a la home una vez insertado el usuario.
  router = inject(Router);
  //inyectamos el activateroute para capturar la ruta.
  activatedRoute = inject(ActivatedRoute);
  //creamos la variable clave para definir el tipo de input y que se muestre o no la clave que se encuentre en el formulario.
  clave: string = "password"
  //inicializamos el formulario.
  constructor() {
    this.userForm = new FormGroup({
      first_name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      last_name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      email: new FormControl("", [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]),
      image: new FormControl("", []),
      username: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(25), Validators.pattern(/^\S*$/)]),
      password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)\S*$/)]),
    }, []);
  };
  //gestionamos en el ngOnInit la función de actualizar el formulario, ya que tenemos que recibir los datos y los obtendremos una vez carguen los componentes.
  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      let id = params.iduser;
      //se debe generar un condicional para el caso en que exista o no exista ruta variable.
      if (id) {
        //se elabora la otra parte del condicional para que se rellenen los elementos cambiantes del título y el boton de submit del form.
        this.typeUser = "ACTUALIZAR";
        this.typeForm = "Actualizar";
        //hacemos la petición al get by ID para rellenar el formulario. Pero como la petición puede fallar, tratamosla promesa con un try catch.
        try {
          let response = await this.usersService.getById(id);
          //la respuesta del getById puede devolver un error , por lo que tenemos que tratarla con un condicional.
          if ("error" in response) {
            alert("Error: " + response.error + ".");
            this.router.navigate(["/home"]);
          } else {
            //Rellenamos el form, trasteando me he dado cuenta que todos los campos se pueden modificar, por lo cual agregamos el campo "image". Este lo hacemos oculto cuando es un nuevo usuario, ya que aunque le aportes ese dato al método post, la API crea una URL genérica que es la que almacena por lo que es tiempo perdido enviarselo en un nuevo usuario.
            this.userForm = new FormGroup({
              id: new FormControl(response.id, []),
              _id: new FormControl(response._id, []),
              first_name: new FormControl(response.first_name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
              last_name: new FormControl(response.last_name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
              email: new FormControl(response.email, [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]),
              image: new FormControl(response.image, [Validators.required, Validators.pattern(/^(http|https):\/\/.*/)]),
              username: new FormControl(response.username, [Validators.required, Validators.minLength(3), Validators.maxLength(25), Validators.pattern(/^\S*$/)]),
              password: new FormControl(response.password, [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)\S*$/)]),
            }, []);
            //se elabora la otra parte del condicional para que se rellenen los elementos cambiantes del título y el boton de submit del form.
          }
        } catch (error) {
          alert("Ocurrió un error al obtener los datos del usuario, intentalo nuevamente");
          this.router.navigate(["/home"]);
        }
      } else {
        this.typeUser = "NUEVO";
        this.typeForm = "Guardar";
      }
    });
  };
  //como recibimos toda la respuesta del form (OK) ahora tenemos que recibir la respuesta del servicio tras inyectar un post, entonces recibimos una promesa.
  async getDataForm(): Promise<void> {
    //la diferencia entre el actualizar y el crear un nuevo usuario la gestionamos con un condicional, le agregamos el id al form sin necesidad de ser necesario actualizarse, para que se diferencia el otro método y mantenga el _id correspondiente.
    if (this.userForm.value._id) {
      //Gestionamos por el método PUT al ser una promesa con try y catch.
      try {
        let response = await this.usersService.put(this.userForm.value);
        if ("error" in response) {
          alert("Error: " + response.error + ", intentarlo nuevamente.");
          this.router.navigate(["/home"]);
        } else {
          alert("Usuario actualizado correctamente.");
          this.router.navigate(["/home"]);
        }
      } catch {
        alert("Ocurrió un error al actualizar el usuario, intentarlo nuevamente.")
      }
    } else {
      //En caso de que no se cunpla la condición, se gestiona como si fuese un proceso de creación de un nuevo usuario. Gestionamos de igualforma con un try catch, la única diferencia es que esta petición no recibe un error de respuesta por parte de la API.
      try {
        let response = await this.usersService.post(this.userForm.value);
        if (response) {
          alert("Usuario guardado correctamente.");
          this.router.navigate(["/home"]);
        }
      } catch {
        alert("Ocurrió un error al guardar el nuevo usuario, inténtarlo nuevamente.");
      }
    }
  };
  //hacemos el método (función) que nos gestionará todas las condiciones de nuestors mensajes de campos requeridos en el formulario.
  checkControl(formcontrolName: string, validator: string): boolean | undefined {
    return this.userForm.get(formcontrolName)?.hasError(validator) && this.userForm.get(formcontrolName)?.touched
  };
  //creamos el método para que se pueda mostrar la contraseña del campo input de la contraseña en el form.
  password(event: any): void {
    if (event.target.checked) {
      this.clave = "text";
    } else {
      this.clave = "password";
    };
  };
}

