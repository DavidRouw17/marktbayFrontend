import { Component } from '@angular/core';
import {GebruikerService} from './services/gebruiker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'marktbay';
  activeUser = false;

  constructor(private gs: GebruikerService) {
  }

  ingelogdCheck(): void{
    if (this.gs.actieveGebruiker == null){
      this.activeUser = false;
    }
    else {
      this.activeUser = true;
    }
  }
}
