import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LawyerService } from '../../../services/lawyer.service';
import { BehaviorSubject } from 'rxjs';
import { LawyerDto } from '../../../dtos/lawyer.dto';
import { HotToastService } from '@ngxpert/hot-toast';
import { CommonModule, NgFor } from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { LawyerDetailComponent } from './lawyer-detail/lawyer-detail.component';
import { CrudMode } from '../../../enums/crud-mode.enum';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-lawyers',
  standalone: true,
  imports: [ 
    CommonModule, 
    NgFor, 
    MatToolbarModule, 
    MatDialogModule,
    TranslateModule
  ],
  templateUrl: './lawyers.component.html',
  styleUrl: './lawyers.component.scss'
})
export class LawyersComponent {
  CRUDMODE = CrudMode;
  private readonly dialog = inject(MatDialog);

  private data: BehaviorSubject<LawyerDto[]> = new BehaviorSubject<LawyerDto[]>([]);
  public data$ = this.data.asObservable()
  
  constructor(private readonly service: LawyerService,
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
    const dialogRef = this.dialog.open(LawyerDetailComponent, {
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
