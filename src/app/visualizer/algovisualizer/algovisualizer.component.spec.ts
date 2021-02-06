import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgovisualizerComponent } from './algovisualizer.component';

describe('AlgovisualizerComponent', () => {
  let component: AlgovisualizerComponent;
  let fixture: ComponentFixture<AlgovisualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlgovisualizerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgovisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
