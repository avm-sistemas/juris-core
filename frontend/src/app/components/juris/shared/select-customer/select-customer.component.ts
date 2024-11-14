import { Component, inject } from '@angular/core';
import { CrudMode } from '../../../../enums/crud-mode.enum';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HotToastService } from '@ngxpert/hot-toast';
import { BehaviorSubject } from 'rxjs';
import { imagesConfig } from '../../../../app.config';
import { SelectAttachmentsComponent } from '../select-attachments/select-attachments.component';
import { CustomerDto } from '../../../../dtos/customer.dto';
import { CustomerService } from '../../../../services/customer.service';
import { CustomerDetailComponent } from '../../customers/customer-detail/customer-detail.component';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-select-customer',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatTableModule,
    TranslateModule
  ],
  templateUrl: './select-customer.component.html',
  styleUrl: './select-customer.component.scss'
})
export class SelectCustomerComponent {

  CRUDMODE = CrudMode;

  mode: CrudMode = CrudMode.NONE;
  id?: any;

  private data: BehaviorSubject<CustomerDto[]> = new BehaviorSubject<CustomerDto[]>([]);
  public data$ = this.data.asObservable();

  private _data: any;

  private readonly dialog = inject(MatDialog);
  readonly dialogRef = inject(MatDialogRef<SelectAttachmentsComponent>); 
  readonly getParams = inject<any>(MAT_DIALOG_DATA);

  
  selection = new SelectionModel<any>(true, []);
  columns: string[] = ['select', 'id', 'name'];

  images = imagesConfig;

  constructor(private readonly service: CustomerService,
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
      customers: this.selection.selected
    })    
  }

  create(id: any, mode: CrudMode): void {    
    const dialogRef = this.dialog.open(CustomerDetailComponent, {
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
