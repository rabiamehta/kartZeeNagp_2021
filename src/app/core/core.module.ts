import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CoreModule {
  // Prevents import of Core Module
  constructor(@Optional() @SkipSelf() core: CoreModule){
    if (core){
     throw new Error('Core Module can not be imported !');
    }
}
}
