import { Component, inject } from '@angular/core';
import { AttachmentDto } from '../../../../dtos/attachment.dto';
import { imagesConfig } from '../../../../app.config';
import { AttachmentService } from '../../../../services/attachment.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HotToastService } from '@ngxpert/hot-toast';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { CrudMode } from '../../../../enums/crud-mode.enum';
import { SelectionModel } from '@angular/cdk/collections';
import { AttachmentDetailComponent } from '../../attachments/attachment-detail/attachment-detail.component';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-select-attachments',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatTableModule,
    TranslateModule,
    MatButtonModule
  ],
  templateUrl: './select-attachments.component.html',
  styleUrl: './select-attachments.component.scss'
})
export class SelectAttachmentsComponent {

  CRUDMODE = CrudMode;

  mode: CrudMode = CrudMode.NONE;
  id?: any;

  private data: BehaviorSubject<AttachmentDto[]> = new BehaviorSubject<AttachmentDto[]>([]);
  public data$ = this.data.asObservable();

  private _data: any;

  private readonly dialog = inject(MatDialog);
  readonly dialogRef = inject(MatDialogRef<SelectAttachmentsComponent>); 
  readonly getParams = inject<any>(MAT_DIALOG_DATA);

  
  selection = new SelectionModel<any>(true, []);
  columns: string[] = ['select', 'id', 'name'];

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
          this._data = data;   
      },
      (error: any) => {        
        if (error.message) {     
          const translatedErrorMessage = this.translate.instant(error.message);
          if (translatedErrorMessage) {
            this.toast.error(translatedErrorMessage);
          } else {
            this.toast.error(error.message);
          }  
        }        
      }
    );    
  }

  close() {
    this.dialogRef.close();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this._data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this._data.forEach((row: any) => this.selection.select(row));
  }  

  select() {
    this.dialogRef.close({
      attachments: this.selection.selected
    })    
  }

  create(id: any, mode: CrudMode): void {    
    const dialogRef = this.dialog.open(AttachmentDetailComponent, {
      data: { 
        id: id,
        mode: mode
      },
      width: '90%',
      //height: '90%',
      minWidth: '460px',
      disableClose: true      
    });

    dialogRef.afterClosed().subscribe(result => {      
        this.load();
    });
  }  

}
