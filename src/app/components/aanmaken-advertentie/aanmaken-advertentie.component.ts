import {Component} from '@angular/core';
import {GebruikerService} from '../../services/gebruiker.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GebruikerDto} from '../../models/gebruikerDto';
import {AdvertentieDto} from '../../models/advertentieDto';

@Component({
  selector: 'app-aanmaken-advertentie',
  templateUrl: './aanmaken-advertentie.component.html',
  styleUrls: ['./aanmaken-advertentie.component.css']
})
export class AanmakenAdvertentieComponent {
  actieveGebruiker: GebruikerDto;
  aanmaakAdvertentieForm: FormGroup;
  productgekozen = false;
  nieuweAdvertentie: AdvertentieDto;


  constructor(public gs: GebruikerService) {
    this.aanmaakAdvertentieForm = new FormGroup({
      titel: new FormControl('', [Validators.required]),
      prijs: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      soort: new FormControl('', [Validators.required]),
      omschrijving: new FormControl('', [Validators.required]),
      bezorgwijzen: new FormControl('', null)
    });

  }


  checkType(): void {
    if (this.aanmaakAdvertentieForm.value.soort === 'Product') {
      this.productgekozen = true;
    } else {
      this.productgekozen = false;
    }
  }


  addAdvertentie(): void {
    this.nieuweAdvertentie = this.aanmaakAdvertentieForm.value;
    this.gs.addAdvertentie(this.nieuweAdvertentie);
    alert('Advertentie succesvol toegevoegd!');
    this.productgekozen = false;
    this.aanmaakAdvertentieForm.reset();
  }


}
