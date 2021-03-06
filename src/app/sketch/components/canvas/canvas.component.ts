import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { sketchConfigurations, states } from '../../models/types.model';
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
  private size: number;
  private color: string;
  private currentTool: states;
  private ongoingTouches = [];

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

    private handleConfigurationStates(states: sketchConfigurations): void {
      this.size = states.size;
      this.color = states.color;
      this.currentTool = states.state
    }

    private listenToObservables(): void {
      const windowResizeNotification = this.resizeObservable$.subscribe( evt => this.updateCanvasSize() );
      const clearCanvasNotification = this.sketch.canClearCanvas.subscribe(value => value && this.clearCanvas());
      const sketchConfigurationsNotification = this.sketch.currentMessage.subscribe(states => this.handleConfigurationStates(states));
      this.subscriptions$.push(windowResizeNotification, clearCanvasNotification, sketchConfigurationsNotification);
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

        if(this.currentTool === 'pencil') {
          this.drawCircle(x2, y2, this.size, this.color);
          this.drawLine(this.x, this.y, x2, y2, this.size, this.color);
        
          this.x = x2;
          this.y = y2;
        } else if(this.currentTool === 'eraser') {
          this.useEraser(x2, y2);
        }
        
      }
    }

    public handleTouchStart($event: TouchEvent): void {
      $event.preventDefault();
      const touches = $event.changedTouches;

      for(let i = 0; i < touches.length; i++) this.ongoingTouches.push(this.copyTouch(touches[i]));
    }

    public handleTouchEnd($event: TouchEvent): void {
      $event.preventDefault();
      const touches = $event.changedTouches;

      for(let i = 0; i < touches.length; i++) {
        const index = this.ongoingTouchIndexById(touches[i].identifier);
        if(index >= 0) {
          this.context.beginPath();
          this.ongoingTouches.splice(index, 1);
        } else console.error("Can't figure out which touch to end.");
      };
    }

    public handleTouchMove($event: TouchEvent): void {
      $event.preventDefault();
      const touches = $event.changedTouches;

      for(let i = 0; i < touches.length; i++) {
        const index = this.ongoingTouchIndexById(touches[i].identifier);

        this.y = this.ongoingTouches[index].clientY;
        this.x = this.ongoingTouches[index].clientX;

        const x2 = touches[i].clientX;
        const y2 = touches[i].clientY;

        if(index >= 0) {
          this.drawLine(this.x, this.y, x2, y2, this.size, this.color);
          this.drawCircle(this.x, this.y, this.size, this.color);

          this.ongoingTouches.splice(index, 1, this.copyTouch(touches[i]));
        } else console.error("Can't figure out which touch to continue");
      };
    }

    public handleTouchCancel($event: TouchEvent): void {
      $event.preventDefault();

      const touches = $event.changedTouches;

      for(let i = 0; i < touches.length; i++) {
        this.ongoingTouches.splice(i, 1);
      }
    }
    
  //#endregion

  //#region Screen recognitions utilities
    private copyTouch(touch: Touch) {
      return { identifier: touch.identifier, clientX: touch.clientX, clientY: touch.clientY };
    }

    private ongoingTouchIndexById(idToFind): number {
      for (var i=0; i < this.ongoingTouches.length; i++) {
        var id = this.ongoingTouches[i].identifier;
    
        if (id == idToFind) return i;
      }
      return -1;
    }
  //#endregion

  //#region Drawing methods
    private drawLine(initialX: number, initialY: number, x: number, y: number, size: number, color: string): void {
      this.context.lineWidth = size * 2;
      this.context.beginPath();
      this.context.moveTo(initialX, initialY);
      this.context.lineTo(x, y);
      this.context.strokeStyle = color;
      this.context.stroke();
    }

    private drawCircle(x: number, y: number, size: number, color: string): void {
      this.context.beginPath();
      this.context.arc(x, y, size, 0, Math.PI * 2);
      this.context.fillStyle = color;
      this.context.fill();
    }

    private drawText(text: string, x: number, y: number, color: string, size: number, font: string = 'sans-serif'): void {
      this.context.beginPath();
      this.context.font = `${size * 2}px ${font}`;
      this.context.fillStyle = color;
      this.context.fillText(text, x, y);
    }

    private useEraser(x2: number, y2: number): void {
      const sizeFactor = 4;
      const eraserSize = this.size * sizeFactor;
      const centralize = pos => pos - eraserSize / 2;
      
      this.context.clearRect(centralize(x2), centralize(y2), eraserSize, eraserSize);
    }

    private clearCanvas(): void {
      this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    }
  //#endregion

  ngOnDestroy() {
    this.subscriptions$.forEach(subscription => subscription.unsubscribe());
  }

}
