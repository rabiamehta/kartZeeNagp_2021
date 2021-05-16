import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent{
  constructor(public titleService: Title){
    this.titleService.setTitle('Online eKarting platform for various sports, fitness equipments');
  }
}
