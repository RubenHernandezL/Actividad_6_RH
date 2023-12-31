import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FormComponent } from './components/form/form.component';
import { ViewUserComponent } from './pages/view-user/view-user.component';
import { C404Component } from './pages/c404/c404.component';
import { HomePage2Component } from './pages/home-page2/home-page2.component';

const routes: Routes = [
  { path: "", pathMatch: 'full', redirectTo: "home" },
  { path: "home", component: HomeComponent },
  { path: "newuser", component: FormComponent },
  { path: "updateuser/:iduser", component: FormComponent },
  { path: "user/:iduser", component: ViewUserComponent },
  { path: "homeP2", component: HomePage2Component },
  { path: "**", component: C404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
