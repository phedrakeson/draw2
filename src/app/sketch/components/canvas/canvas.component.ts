import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SketchService } from '../../services/sketch.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  private context: CanvasRenderingContext2D;

  constructor(
    private sketch: SketchService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    
    this.context = this.canvas.nativeElement.getContext('2d');
    this.updateCanvasSize();
  }

  private updateCanvasSize() {
    console.log(this.canvas)
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
  }

}
