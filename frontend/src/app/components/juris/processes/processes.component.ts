import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProcessDto } from '../../../dtos/process.dto';
import { ProcessService } from '../../../services/process.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { BehaviorSubject } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';
import { CrudMode } from '../../../enums/crud-mode.enum';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProcessDetailComponent } from './process-detail/process-detail.component';

@Component({
  selector: 'app-processes',
  standalone: true,
  imports: [ CommonModule, NgFor, MatToolbarModule, MatDialogModule ],
  templateUrl: './processes.component.html',
  styleUrl: './processes.component.scss'
})
export class ProcessesComponent {
  CRUDMODE = CrudMode;
  private readonly dialog = inject(MatDialog);
  
  private data: BehaviorSubject<ProcessDto[]> = new BehaviorSubject<ProcessDto[]>([]);
  public data$ = this.data.asObservable()

  constructor(private readonly service: ProcessService,
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
    const dialogRef = this.dialog.open(ProcessDetailComponent, {
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
      if (result !== undefined) {        
        this.toast.info(result);
      }
      this.load();
    });
  }  


}
