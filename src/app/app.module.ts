import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {Route, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegistreerFormulierComponent} from './components/registreer-formulier/registreer-formulier.component';
import {RegistreerAdresComponent} from './components/registreer-adres/registreer-adres.component';
import {InlogComponent} from './components/inlog/inlog.component';
import { AanmakenAdvertentieComponent } from './components/aanmaken-advertentie/aanmaken-advertentie.component';
import { AdvertentiesDisplayComponent } from './components/advertenties-display/advertenties-display.component';
import { EigenAdvertentiesComponent } from './components/eigen-advertenties/eigen-advertenties.component';

let routes: Route[] = [
  {path: '', component: InlogComponent},
  {path: 'registreren', component: RegistreerFormulierComponent},
  {path: 'login', component: InlogComponent},
  {path: 'aanmakenadvertentie', component: AanmakenAdvertentieComponent},
  {path: 'advertenties', component: AdvertentiesDisplayComponent},
  {path: 'mijnadvertenties', component: EigenAdvertentiesComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    RegistreerFormulierComponent,
    RegistreerAdresComponent,
    InlogComponent,
    AanmakenAdvertentieComponent,
    AdvertentiesDisplayComponent,
    EigenAdvertentiesComponent,

  ],
  imports: [
    BrowserModule, CommonModule,
    AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
