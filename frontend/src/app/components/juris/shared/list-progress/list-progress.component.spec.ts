import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProgressComponent } from './list-progress.component';

describe('ListProgressComponent', () => {
  let component: ListProgressComponent;
  let fixture: ComponentFixture<ListProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProgressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
