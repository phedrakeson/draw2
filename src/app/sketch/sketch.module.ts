import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SketchRoutingModule } from './sketch-routing.module';
import { CanvasComponent } from './components/canvas/canvas.component';


@NgModule({
  declarations: [
    CanvasComponent
  ],
  imports: [
    CommonModule,
    SketchRoutingModule
  ]
})
export class SketchModule { }
