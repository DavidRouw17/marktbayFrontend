import {Component} from '@angular/core';
import {GebruikerService} from '../../services/gebruiker.service';
import {AdvertentieDto} from '../../models/advertentieDto';
import {AdvertentieService} from '../../services/advertentie.service';

@Component({
  selector: 'app-eigen-advertenties',
  templateUrl: './eigen-advertenties.component.html',
  styleUrls: ['./eigen-advertenties.component.css']
})
export class EigenAdvertentiesComponent {

  advertentieLijst$ = this.gs.getAdvertentieGebruiker();
  actieveAdvertentie: AdvertentieDto;

  constructor(private gs: GebruikerService, private as: AdvertentieService) {

  }

  verwijderAdvertentie(a: AdvertentieDto): void {
    if (confirm('Weet je zeker dat je de advertentie wilt verwijderen?')) {
      this.gs.verwijderAdvertentie(a);
      alert('Advertentie verwijderd!');
      this.advertentieLijst$ = this.gs.getAdvertentieGebruiker();
      this.as.delete(a);
    } else {
      alert('Advertentie niet verwijderd.');
    }
  }

}
