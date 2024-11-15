import { Component, inject } from '@angular/core';
import { PartiesInvolvedDetailComponent } from '../../parties-involved/parties-involved-detail/parties-involved-detail.component';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HotToastService } from '@ngxpert/hot-toast';
import { BehaviorSubject } from 'rxjs';
import { imagesConfig } from '../../../../app.config';
import { CrudMode } from '../../../../enums/crud-mode.enum';
import { PartiesInvolvedDto } from '../../../../dtos/parties-involved.dto';
import { PartiesInvolvedService } from '../../../../services/parties-involved.service';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-select-parties',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatTableModule,
    TranslateModule,
    MatButtonModule
  ],
  templateUrl: './select-parties.component.html',
  styleUrl: './select-parties.component.scss'
})
export class SelectPartiesComponent {

  CRUDMODE = CrudMode;

  mode: CrudMode = CrudMode.NONE;
  id?: any;

  private data: BehaviorSubject<PartiesInvolvedDto[]> = new BehaviorSubject<PartiesInvolvedDto[]>([]);
  public data$ = this.data.asObservable();

  private _data: any;

  private readonly dialog = inject(MatDialog);
  readonly dialogRef = inject(MatDialogRef<SelectPartiesComponent>); 
  readonly getParams = inject<any>(MAT_DIALOG_DATA);

  
  selection = new SelectionModel<any>(true, []);
  columns: string[] = ['select', 'id', 'name'];

  images = imagesConfig;

  constructor(private readonly service: PartiesInvolvedService,
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
      parties: this.selection.selected
    })    
  }

  create(id: any, mode: CrudMode): void {    
    const dialogRef = this.dialog.open(PartiesInvolvedDetailComponent, {
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
