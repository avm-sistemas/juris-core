import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyersComponent } from './lawyers.component';

describe('LawyersComponent', () => {
  let component: LawyersComponent;
  let fixture: ComponentFixture<LawyersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LawyersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LawyersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
