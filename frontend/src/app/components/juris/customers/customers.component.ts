import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CustomerDto } from '../../../dtos/customer.dto';
import { CustomerService } from '../../../services/customer.service';
import { BehaviorSubject } from 'rxjs';
import { HotToastService } from '@ngxpert/hot-toast';
import { CommonModule, NgFor } from '@angular/common';
import { CrudMode } from '../../../enums/crud-mode.enum';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [ CommonModule, NgFor, MatToolbarModule, MatDialogModule ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent {
  CRUDMODE = CrudMode;
  private readonly dialog = inject(MatDialog);

  private data: BehaviorSubject<CustomerDto[]> = new BehaviorSubject<CustomerDto[]>([]);
  public data$ = this.data.asObservable()

  constructor(private readonly service: CustomerService,
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

  openDialog(id: any, mode: CrudMode): void {    
    const dialogRef = this.dialog.open(CustomerDetailComponent, {
      data: { 
        id: id,
        mode: mode
      },
      width: '80%',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {      
      if (result !== undefined) {        
        this.toast.info(result);
      }
      this.load();
    });
  }  

}
