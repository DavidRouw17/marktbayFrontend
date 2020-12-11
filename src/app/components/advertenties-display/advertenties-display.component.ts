import { Component, OnInit } from '@angular/core';
import {AdvertentieService} from '../../services/advertentie.service';

@Component({
  selector: 'app-advertenties-display',
  templateUrl: './advertenties-display.component.html',
  styleUrls: ['./advertenties-display.component.css']
})
export class AdvertentiesDisplayComponent{

  advertentieLijst$ = this.as.getAll();
  searchword: string;

  constructor(private as: AdvertentieService) { }


  find(): void{
    if (this.searchword == null){
      this.advertentieLijst$ = this.as.getAll();
      console.log(this.advertentieLijst$);
    }
    else {
      this.advertentieLijst$ = this.as.getByQuery(this.searchword);
      console.log(this.advertentieLijst$);
    }
  }


}
