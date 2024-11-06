import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyerDetailComponent } from './lawyer-detail.component';

describe('LawyerDetailComponent', () => {
  let component: LawyerDetailComponent;
  let fixture: ComponentFixture<LawyerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LawyerDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LawyerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
