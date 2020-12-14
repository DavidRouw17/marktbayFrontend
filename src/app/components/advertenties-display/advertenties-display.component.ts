import { Component, OnInit } from '@angular/core';
import {AdvertentieService} from '../../services/advertentie.service';

@Component({
  selector: 'app-advertenties-display',
  templateUrl: './advertenties-display.component.html',
  styleUrls: ['./advertenties-display.component.css']
})
export class AdvertentiesDisplayComponent{

  advertentieLijst$ = this.as.getAll();
  searchword = '';
  zoekoptype = '';

  constructor(private as: AdvertentieService) { }


  find(): void{
    if (this.searchword === '' && this.zoekoptype === ''){
      this.advertentieLijst$ = this.as.getAll();
    }
    else {
      this.advertentieLijst$ = this.as.getByQuery(this.searchword + ' ' + this.zoekoptype);
    }
  }

  onClick(){
    console.log('Click!');
  }



}
