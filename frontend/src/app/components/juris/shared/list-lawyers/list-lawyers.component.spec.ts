import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLawyersComponent } from './list-lawyers.component';

describe('ListLawyersComponent', () => {
  let component: ListLawyersComponent;
  let fixture: ComponentFixture<ListLawyersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListLawyersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListLawyersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
