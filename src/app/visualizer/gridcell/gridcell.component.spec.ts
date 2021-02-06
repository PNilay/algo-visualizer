import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridcellComponent } from './gridcell.component';

describe('GridcellComponent', () => {
  let component: GridcellComponent;
  let fixture: ComponentFixture<GridcellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridcellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridcellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
