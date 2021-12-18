import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkthrouhTutorialComponent } from './walkthrouh-tutorial.component';

describe('WalkthrouhTutorialComponent', () => {
  let component: WalkthrouhTutorialComponent;
  let fixture: ComponentFixture<WalkthrouhTutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalkthrouhTutorialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkthrouhTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
