import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPartiesComponent } from './list-parties.component';

describe('ListPartiesComponent', () => {
  let component: ListPartiesComponent;
  let fixture: ComponentFixture<ListPartiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPartiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPartiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
