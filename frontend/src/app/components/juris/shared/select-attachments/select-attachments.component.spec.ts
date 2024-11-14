import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAttachmentsComponent } from './select-attachments.component';

describe('SelectAttachmentsComponent', () => {
  let component: SelectAttachmentsComponent;
  let fixture: ComponentFixture<SelectAttachmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectAttachmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
