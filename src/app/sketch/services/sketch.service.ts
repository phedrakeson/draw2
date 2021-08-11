import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { sketchConfigurations, states } from '../models/types.model';

@Injectable({
  providedIn: 'root'
})
export class SketchService {
  
  private _size: number = 2;
  private _currentState: states = 'pencil';
  private _color: string = '#000';

  private messageSource = new BehaviorSubject<sketchConfigurations>({
    size: this.size,
    state: this.currentState,
    color: this.color
  });
  private clearCanvasState = new BehaviorSubject<boolean>(false);

  public currentMessage = this.messageSource.asObservable();
  public canClearCanvas = this.clearCanvasState.asObservable();

  constructor() { }

  get size(): number {
    return this._size;
  }

  get color(): string {
    return this._color;
  }

  get currentState(): states {
    return this._currentState;
  }

  private eventEmitter(): void {
    const data = {
      size: this.size,
      state: this.currentState,
      color: this.color
    };
    this.messageSource.next(data);
  }

  public increaseSize(): void {
    const MAX_SIZE = 28;
    if(this._size < MAX_SIZE) {
      this._size += 2;
      this.eventEmitter();
    } 
  }

  public decreaseSize(): void {
    const MIN_SIZE = 2;
    if(this._size > MIN_SIZE) {
      this._size -= 2;
      this.eventEmitter();
    }
  }

  public changeColor(color: string): void {
    this._color = color;
    this.eventEmitter();
  }

  public swapToPencil(): void {
    this._currentState = 'pencil';
    this.eventEmitter();
  }

  public swapToEraser(): void {
    this._currentState = 'eraser';
    this.eventEmitter();
  }

  public clearCanvas(): void {
    this.clearCanvasState.next(true);
  }



  

}