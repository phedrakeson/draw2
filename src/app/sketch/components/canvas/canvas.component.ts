import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { SketchService } from '../../services/sketch.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  private context: CanvasRenderingContext2D;
  private resizeObservable$: Observable<Event>;
  private resizeSubscription$: Subscription;

  constructor(
    private sketch: SketchService
  ) { }

  ngOnInit(): void {
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe( evt => this.updateCanvasSize() );
  }

  ngAfterViewInit(): void {
    
    this.context = this.canvas.nativeElement.getContext('2d');
    this.updateCanvasSize();
  }

  private updateCanvasSize() {
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
  }

  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe()
  }

}
