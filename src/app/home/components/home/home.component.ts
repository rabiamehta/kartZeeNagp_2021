import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  screenHeight: any;
  screenWidth: any;
  footerMaxHeight: number;

  constructor(){
    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?): void {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    // header and footer aprox
    this.footerMaxHeight = this.screenHeight - 130;
  }
}
