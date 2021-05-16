import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-best-seller',
  templateUrl: './best-seller.component.html'
})
export class BestSellerComponent implements OnInit {
  slides: any;
  constructor(private titleService: Title) {
   }

  ngOnInit(): void {
    this.slides = [
      {image: '../../../../assets/crousel/sports.jpg'},
      {image: '../../../../assets/crousel/fitnesss.jpg'},
      {image: '../../../../assets/crousel/strength.jpg'}
    ];
    this.titleService.setTitle('kartZee - Online shopping for various execise and fitness equipments');
  }

}
