import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {Route, RouterModule} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistreerFormulierComponent } from './components/registreer-formulier/registreer-formulier.component';
import { RegistreerAdresComponent } from './components/registreer-adres/registreer-adres.component';
import { InlogHomepageComponent } from './components/inlog-homepage/inlog-homepage.component';

let routes: Route[] = [
  {path: '', component: InlogHomepageComponent},
  {path: 'registreren', component: RegistreerFormulierComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    RegistreerFormulierComponent,
    RegistreerAdresComponent,
    InlogHomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
