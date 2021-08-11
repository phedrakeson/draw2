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

export type states = 'eraser' | 'pencil';
