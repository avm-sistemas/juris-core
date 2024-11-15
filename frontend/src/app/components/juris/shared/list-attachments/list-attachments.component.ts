import { Component, Input, OnInit } from '@angular/core';
import { AttachmentDto } from '../../../../dtos/attachment.dto';
import { Observable } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-list-attachments',
  standalone: true,
  imports: [
    CommonModule,    
    NgFor,
    TranslateModule
  ],
  templateUrl: './list-attachments.component.html',
  styleUrl: './list-attachments.component.scss'
})
export class ListAttachmentsComponent implements OnInit {
  @Input() attachments$?: Observable<AttachmentDto[]>;

  ngOnInit(): void {
    this.attachments$?.subscribe( (value: any) => {      
    })
  }  
}
