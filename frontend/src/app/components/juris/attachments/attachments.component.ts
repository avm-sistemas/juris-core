import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AttachmentDto } from '../../../dtos/attachment.dto';
import { BehaviorSubject } from 'rxjs';
import { AttachmentService } from '../../../services/attachment.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { CommonModule, NgFor } from '@angular/common';
import { CrudMode } from '../../../enums/crud-mode.enum';
import { AttachmentDetailComponent } from './attachment-detail/attachment-detail.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { imagesConfig } from '../../../app.config';

@Component({
  selector: 'app-attachments',
  standalone: true,
  imports: [ 
    CommonModule, 
    NgFor, 
    MatToolbarModule, 
    MatDialogModule,
    TranslateModule
  ],
  templateUrl: './attachments.component.html',
  styleUrl: './attachments.component.scss'
})
export class AttachmentsComponent {
  CRUDMODE = CrudMode;
  private readonly dialog = inject(MatDialog);

  private data: BehaviorSubject<AttachmentDto[]> = new BehaviorSubject<AttachmentDto[]>([]);
  public data$ = this.data.asObservable()

  images = imagesConfig;

  constructor(private readonly service: AttachmentService,
              private readonly toast: HotToastService,
              private readonly translate: TranslateService) {
    this.load();
  }

  async load() {
    this.service.getAll().then(
      (data: any) => {        
        if (data)
          this.data.next(data);        
      },
      (error: any) => {
        debugger;
        if (error.message) {     
          this.toast.error(error.message);
        }        
      }
    );    
  }

  openDialog(id: any, mode: CrudMode): void {    
    const dialogRef = this.dialog.open(AttachmentDetailComponent, {
      data: { 
        id: id,
        mode: mode
      },
      width: '80%',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {      
      if (result !== undefined) {
        this.load();
        this.toast.info(result);
      }
    });
  }  


}
