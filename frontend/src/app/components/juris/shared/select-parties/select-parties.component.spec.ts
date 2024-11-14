import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPartiesComponent } from './select-parties.component';

describe('SelectPartiesComponent', () => {
  let component: SelectPartiesComponent;
  let fixture: ComponentFixture<SelectPartiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectPartiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectPartiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
