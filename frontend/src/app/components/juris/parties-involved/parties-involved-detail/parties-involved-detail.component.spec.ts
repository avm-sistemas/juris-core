import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartiesInvolvedDetailComponent } from './parties-involved-detail.component';

describe('PartiesInvolvedDetailComponent', () => {
  let component: PartiesInvolvedDetailComponent;
  let fixture: ComponentFixture<PartiesInvolvedDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartiesInvolvedDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartiesInvolvedDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
