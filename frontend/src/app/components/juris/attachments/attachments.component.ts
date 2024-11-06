import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AttachmentDto } from '../../../dtos/attachment.dto';
import { BehaviorSubject } from 'rxjs';
import { AttachmentService } from '../../../services/attachment.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-attachments',
  standalone: true,
  imports: [ CommonModule, NgFor, MatToolbarModule ],
  templateUrl: './attachments.component.html',
  styleUrl: './attachments.component.scss'
})
export class AttachmentsComponent {

  private data: BehaviorSubject<AttachmentDto[]> = new BehaviorSubject<AttachmentDto[]>([]);
  public data$ = this.data.asObservable()

  constructor(private readonly service: AttachmentService,
              private readonly toast: HotToastService) {
    this.load();
  }

  async load() {
    this.service.getAll().then(
      (data: any) => {
        console.log("data => ",data);
        if (data)
          this.data.next(data);        
      },
      (error: any) => {
        debugger;
        if (error.message) {     
          this.toast.error(error.message);
        }
        console.log("error => ", error);
      }
    );    
  }

}
