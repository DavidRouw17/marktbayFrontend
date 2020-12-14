import {Component, OnInit} from '@angular/core';
import {GebruikerService} from '../../services/gebruiker.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GebruikerDto} from '../../models/gebruikerDto';

@Component({
  selector: 'app-aanmaken-advertentie',
  templateUrl: './aanmaken-advertentie.component.html',
  styleUrls: ['./aanmaken-advertentie.component.css']
})
export class AanmakenAdvertentieComponent{
  actieveGebruiker: GebruikerDto;
  aanmaakAdvertentieForm: FormGroup;
  productgekozen = false;


  constructor(public gs: GebruikerService) {
    this.aanmaakAdvertentieForm = new FormGroup({
      titel: new FormControl('', [Validators.required]),
      prijs: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      soort: new FormControl('', [Validators.required]),
      omschrijving: new FormControl('', [Validators.required]),
      bezorgwijzen: new FormControl('', [Validators.required])
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
    this.gs.addAdvertentie(this.aanmaakAdvertentieForm.value);
    alert('Advertentie succesvol toegevoegd!');
    this.productgekozen = false;
    this.aanmaakAdvertentieForm.reset();
  }




}
