import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectLawyerComponent } from './select-lawyer.component';

describe('SelectLawyerComponent', () => {
  let component: SelectLawyerComponent;
  let fixture: ComponentFixture<SelectLawyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectLawyerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectLawyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
