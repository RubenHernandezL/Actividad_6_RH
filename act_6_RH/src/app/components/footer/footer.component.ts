import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  //Pasamos de padre a hijo el valor del número de páginas para crear los números de páginas correspondientes.
  @Input() totalPages!: number | any;
  //Pasamos de padre a hijo el valor de la propiedad currentPage, de esta forma evitamos el error de iniciar en 1 cuando se modifique la ruta al componente homePage2.
  @Input() currentPage!: number | any;
  //importamos el router para poder cambiar de ruta desde el ts.
  router = inject(Router);
  //Método que genera un arreglo de números para representar las páginas.
  generatePageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  };
  //creamos la función para poder cambiar de página y que se pinten los usuarios correspondientes a cada una de ellas gestionando el cambio de ruta correspondiente.
  changePage(pageNumber: number | string): void {
    if (pageNumber === 'previous') {
      this.currentPage = Math.max(this.currentPage - 1, 1);
    } else if (pageNumber === 'next') {
      this.currentPage = Math.min(this.currentPage + 1, this.totalPages);
    } else {
      this.currentPage = Number(pageNumber)
    };
    if (this.currentPage === 1) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/homeP' + this.currentPage]);
    }
  };
}
