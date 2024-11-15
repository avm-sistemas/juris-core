import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAttachmentsComponent } from './list-attachments.component';

describe('ListAttachmentsComponent', () => {
  let component: ListAttachmentsComponent;
  let fixture: ComponentFixture<ListAttachmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAttachmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
