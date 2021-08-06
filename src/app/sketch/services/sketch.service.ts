import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SketchService {
  
  private _size: number = 2;
  private currentState: states = 'lapis';

  private messageSource = new BehaviorSubject({
    size: this.size,
    state: this.currentState
  });

  public currentMessage = this.messageSource.asObservable();

  constructor() { }

  get size(): number {
    return this._size;
  }

  eventSubscriber( func: any) {
    this.currentMessage.subscribe(func)
  }

  eventEmitter() {
    const data = {
      size: this._size,
      state: this.currentState
    };
    this.messageSource.next(data);
  }

  increaseSize() {
    this._size += 2;
    this.eventEmitter();
  }

  decreaseSize() {
    this._size -= 2;
    this.eventEmitter();
  }

  desenhar() {
    this.currentState = 'lapis';
    this.eventEmitter();
  }

  borracha() {
    this.currentState = 'borracha';
    this.eventEmitter();
  }

  limparCanvas() {
    this.eventEmitter();
  }



  

}

export type states = 'borracha' | 'lapis';
