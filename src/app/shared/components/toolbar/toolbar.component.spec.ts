import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SketchService } from 'src/app/sketch/services/sketch.service';

import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let sketchService: SketchService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      providers: [SketchService]
    });

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    sketchService = TestBed.inject(SketchService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increase pencil size', () => {
    spyOn(sketchService, 'increaseSize');
    
    component.increasePencilSize();
    expect(sketchService.increaseSize).toHaveBeenCalled();

  });

  it('should decrease pencil size', () => {
    spyOn(sketchService, 'decreaseSize');
    component.decreasePencilSize();
    expect(sketchService.decreaseSize).toHaveBeenCalled();
  });

  it('should swap to pencil tool', () => {
    spyOn(sketchService, 'swapToPencil');
    component.usePencil();
    expect(sketchService.swapToPencil).toHaveBeenCalled();
  });

  it('should swap to eraser tool', () => {
    spyOn(sketchService, 'swapToEraser');
    component.useEraser();
    expect(sketchService.swapToEraser).toHaveBeenCalled();
  });

  it('should change current tool color', () => {
    const color = "#000"
    spyOn(sketchService, 'changeColor');
    component.changeColor(color);
    expect(sketchService.changeColor).toHaveBeenCalled();
    expect(sketchService.color).toBe(color);
  });

});
