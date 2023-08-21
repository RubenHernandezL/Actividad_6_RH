import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ViewUserComponent } from './pages/view-user/view-user.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormComponent } from './components/form/form.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { C404Component } from './pages/c404/c404.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ViewUserComponent,
    HeaderComponent,
    FooterComponent,
    FormComponent,
    UserCardComponent,
    C404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
