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

  test() {
    this.sketch.desenhar();
  }

  a() {
    this.sketch.borracha();
  }

}
