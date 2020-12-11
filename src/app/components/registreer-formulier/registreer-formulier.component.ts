import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Gebruiker} from '../../models/gebruikers';
import {GebruikerService} from '../../services/gebruiker.service';

@Component({
  selector: 'app-registreer-formulier',
  templateUrl: './registreer-formulier.component.html',
  styleUrls: ['./registreer-formulier.component.css']
})
export class RegistreerFormulierComponent {
  gebruikerRegistreerForm: FormGroup;
  adresRegistreerForm: FormGroup;
  nieuweGebruiker: Gebruiker;
  afhalenGekozen = false;
  inschrijvingIncompleet = true;
  bezorgwijzenLijst: string[] = ['AFHALEN', 'REMBOURS', 'VERZENDEN', 'MAGAZIJN'];

  constructor(private gs: GebruikerService) {
    this.gebruikerRegistreerForm = new FormGroup({
      voornaam: new FormControl('', [Validators.required]),
      achternaam: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      wachtwoord: new FormControl('', [Validators.required, Validators.minLength(6)]),
      bezorgwijzen: new FormControl('', [Validators.required])
    });

    this.adresRegistreerForm = new FormGroup({
      straat: new FormControl('', [Validators.required]),
      woonplaats: new FormControl('', [Validators.required]),
      postcode: new FormControl('', [Validators.required, Validators.pattern(/^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i)])
    });
  }

  checkVoorAfhalen(): void {
    this.nieuweGebruiker = this.gebruikerRegistreerForm.value;
    if (this.nieuweGebruiker.bezorgwijzen.includes('AFHALEN')) {
      this.afhalenGekozen = true;
    } else {
      this.afhalenGekozen = false;
    }
  }

  checkInschrijvingCompleet(): void {
    if (this.gebruikerRegistreerForm.invalid) {
      this.inschrijvingIncompleet = true;
    } else {
      if (!this.afhalenGekozen) {
        this.inschrijvingIncompleet = false;
      } else {
        if (this.adresRegistreerForm.invalid) {
          this.inschrijvingIncompleet = true;
        } else {
          this.inschrijvingIncompleet = false;
        }
      }
    }
  }

  addGebruiker(): void {
    this.nieuweGebruiker = this.gebruikerRegistreerForm.value;
    if (this.afhalenGekozen) {
      this.nieuweGebruiker.adres = this.adresRegistreerForm.value;
    }
    this.gs.addGebruiker(this.nieuweGebruiker);

    this.afhalenGekozen = false;
    this.inschrijvingIncompleet = true;
    this.gebruikerRegistreerForm.reset();
    this.adresRegistreerForm.reset();
  }


}
