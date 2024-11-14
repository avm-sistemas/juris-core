import { CommonModule, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CrudMode } from '../../../../enums/crud-mode.enum';
import { LawyerService } from '../../../../services/lawyer.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { LawyerDto } from '../../../../dtos/lawyer.dto';
import { BehaviorSubject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableModule } from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-select-lawyer',
  standalone: true,
  imports: [
    CommonModule, 
    NgFor, 
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule, 
    MatDialogModule,
    MatTableModule,
    MatCheckboxModule,
    TranslateModule,
    MatButtonModule,
    MatPaginatorModule
  ],
  templateUrl: './select-lawyer.component.html',
  styleUrl: './select-lawyer.component.scss'
})
export class SelectLawyerComponent {
  CRUDMODE = CrudMode;

  mode: CrudMode = CrudMode.NONE;
  id?: any;

  private data: BehaviorSubject<LawyerDto[]> = new BehaviorSubject<LawyerDto[]>([]);
  public data$ = this.data.asObservable();

  private _data: any;

  readonly dialogRef = inject(MatDialogRef<SelectLawyerComponent>); 
  readonly getParams = inject<any>(MAT_DIALOG_DATA);

  
  selection = new SelectionModel<any>(true, []);
  columns: string[] = ['select', 'id', 'name'];

  constructor(private readonly service: LawyerService,
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

  selectLawyer() {
    this.dialogRef.close({
      lawyers: this.selection.selected
    })    
  }
}
