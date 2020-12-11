import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-registreer-adres',
  templateUrl: './registreer-adres.component.html',
  styleUrls: ['./registreer-adres.component.css']
})
export class RegistreerAdresComponent {
  adresRegistreerForm: FormGroup;
  @Output() gegevens = new EventEmitter<FormGroup>();

  constructor() {
    this.adresRegistreerForm = new FormGroup({
      straat: new FormControl('', [Validators.required]),
      woonplaats: new FormControl('', [Validators.required]),
      postcode: new FormControl('', [Validators.required, Validators.pattern(/^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i)])
    });
  }

  deelAdresInfo(): void {
    this.gegevens.emit(this.adresRegistreerForm);
  }


}
