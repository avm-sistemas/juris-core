import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentDetailComponent } from './attachment-detail.component';

describe('AttachmentDetailComponent', () => {
  let component: AttachmentDetailComponent;
  let fixture: ComponentFixture<AttachmentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttachmentDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttachmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
