import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GebruikerService} from '../../services/gebruiker.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-inlog',
  templateUrl: './inlog.component.html',
  styleUrls: ['./inlog.component.css']
})
export class InlogComponent {
  inlogFormulier: FormGroup;

  constructor(private gs: GebruikerService, private router: Router) {
    this.inlogFormulier = new FormGroup({
      email: new FormControl('', [Validators.required]),
      wachtwoord: new FormControl('', [Validators.required])
    });
  }

  logIn(): void {
    this.gs.logIn(this.inlogFormulier.value);
    this.inlogFormulier.reset();

  }


}
