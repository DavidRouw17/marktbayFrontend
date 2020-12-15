import { Component } from '@angular/core';
import {GebruikerService} from './services/gebruiker.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'marktbay';
  activeUser = false;

  constructor(private gs: GebruikerService, private router: Router) {
  }

  ingelogdCheck(): void{
    if (this.gs.actieveGebruiker == null){
      this.activeUser = false;
    }
    else {
      this.activeUser = true;
    }
  }

  logUit(): void{
    this.router.navigateByUrl('/login');
    this.gs.actieveGebruiker = null;
    this.activeUser = false;
    alert('Succesvol uitgelogd. Tot ziens!');
  }
}
