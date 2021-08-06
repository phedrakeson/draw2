import { Component, OnInit } from '@angular/core';
import { SketchService } from 'src/app/sketch/services/sketch.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private sketch: SketchService
  ) { }

  ngOnInit(): void {
  }

  increasePencilSize() {
    this.sketch.increaseSize();
  }

  decreasePencilSize() {
    this.sketch.decreaseSize();
  }

  usePencil() {
    this.sketch.swapToPencil();
  }

  useEraser() {
    this.sketch.swapToEraser();
  }

  clearCanvas() {
    this.sketch.clearCanvas();
  }

}
