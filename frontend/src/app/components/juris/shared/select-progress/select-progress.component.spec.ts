import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProgressComponent } from './select-progress.component';

describe('SelectProgressComponent', () => {
  let component: SelectProgressComponent;
  let fixture: ComponentFixture<SelectProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectProgressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
