import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartiesInvolvedComponent } from './parties-involved.component';

describe('PartiesInvolvedComponent', () => {
  let component: PartiesInvolvedComponent;
  let fixture: ComponentFixture<PartiesInvolvedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartiesInvolvedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartiesInvolvedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
