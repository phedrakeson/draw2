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
  private pressed: boolean = false;
  private x: number = undefined;
  private y: number = undefined;
  private size: number = 2;
  private color: string = '#000';

  private subscriptions$: Subscription[] = [];
  private resizeObservable$: Observable<Event>;


  constructor(
    private sketch: SketchService
  ) { }

  ngOnInit(): void {
    this.setupObservables();
  }

  ngAfterViewInit(): void {
    
    this.context = this.canvas.nativeElement.getContext('2d');
    this.updateCanvasSize();
  }


  //#region Configuration methods

    private updateCanvasSize(): void {
      this.canvas.nativeElement.width = window.innerWidth;
      this.canvas.nativeElement.height = window.innerHeight;
    }

    private setupObservables(): void {
      this.resizeObservable$ = fromEvent(window, 'resize');

      this.listenToObservables();
    }

    private listenToObservables(): void {
      this.subscriptions$.push( this.resizeObservable$.subscribe( evt => this.updateCanvasSize() ) );
    }

  //#endregion

  //#region Screen recognitions
    public onMousedown($event: MouseEvent): void {
      this.pressed = true;

      this.x = $event.offsetX;
      this.y = $event.offsetY;
    }

    public onMouseup(): void {
      this.pressed = false;

      this.x = undefined;
      this.y = undefined;
    }

    public onMousemove($event: MouseEvent): void {
      if(this.pressed) {
        const x2 = $event.offsetX;
        const y2 = $event.offsetY;

        this.drawCircle(x2, y2, this.size, this.color);
        this.drawLine(this.x, this.y, x2, y2, this.size, this.color);
        
        this.x = x2;
        this.y = y2;
      }
    }
  //#endregion

  //#region Drawing methods
    private drawLine(initialX: number, initialY: number, x: number, y: number, size: number, color: string): void {
      this.context.lineWidth = size * 2;
      this.context.beginPath();
      this.context.moveTo(initialX, initialY);
      this.context.lineTo(x, y);
      this.context.strokeStyle = color
      this.context.stroke()
    }

    private drawCircle(x: number, y: number, size: number, color: string): void {
      this.context.beginPath();
      this.context.arc(x, y, size, 0, Math.PI * 2);
      this.context.fillStyle = color;
      this.context.fill();
    }
  //#endregion

  ngOnDestroy() {
    this.subscriptions$.forEach(subscription => subscription.unsubscribe());
  }

}
