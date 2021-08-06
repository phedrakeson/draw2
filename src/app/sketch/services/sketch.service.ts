import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SketchService {
  
  private _size: number = 2;
  private _currentState: states = 'pencil';

  private messageSource = new BehaviorSubject({
    size: this.size,
    state: this.currentState
  });
  private clearCanvasState = new BehaviorSubject(false);

  public currentMessage = this.messageSource.asObservable();
  public canClearCanvas = this.clearCanvasState.asObservable();

  constructor() { }

  get size(): number {
    return this._size;
  }

  get currentState(): states {
    return this._currentState;
  }

  private eventEmitter(): void {
    const data = {
      size: this._size,
      state: this.currentState
    };
    this.messageSource.next(data);
  }

  increaseSize(): void {
    this._size += 2;
    this.eventEmitter();
  }

  decreaseSize(): void {
    this._size -= 2;
    this.eventEmitter();
  }

  swapToPencil(): void {
    this._currentState = 'pencil';
    this.eventEmitter();
  }

  swapToEraser(): void {
    this._currentState = 'eraser';
    this.eventEmitter();
  }

  clearCanvas(): void {
    this.clearCanvasState.next(true);
  }



  

}

export type states = 'eraser' | 'pencil';
