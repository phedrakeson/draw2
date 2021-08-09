import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SketchService } from 'src/app/sketch/services/sketch.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @ViewChild('pencil') pencil: ElementRef;

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

  toggleTools(id: string): void {
    
    this.pencil.nativeElement.classList.remove("selected");

    switch (id) {
      // case "text":
      //   text.classList.add("selected");
      //   break;

      case "pencil":
        this.pencil.nativeElement.classList.add("selected");
        break;
        
      // case "eraser":
      //   eraser.classList.add("selected");
      //   break;
    }
  }

}
