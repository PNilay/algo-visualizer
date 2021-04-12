import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorRepresentationComponent } from './color-representation.component';

describe('ColorRepresentationComponent', () => {
  let component: ColorRepresentationComponent;
  let fixture: ComponentFixture<ColorRepresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorRepresentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorRepresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
