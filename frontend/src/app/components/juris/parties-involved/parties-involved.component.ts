import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PartiesInvolvedDto } from '../../../dtos/parties-involved.dto';
import { PartiesInvolvedService } from '../../../services/parties-involved.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { BehaviorSubject } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';
import { PartiesInvolvedDetailComponent } from './parties-involved-detail/parties-involved-detail.component';
import { CrudMode } from '../../../enums/crud-mode.enum';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-parties-involved',
  standalone: true,
  imports: [ CommonModule, NgFor, MatToolbarModule, MatDialogModule ],
  templateUrl: './parties-involved.component.html',
  styleUrl: './parties-involved.component.scss'
})
export class PartiesInvolvedComponent {
  CRUDMODE = CrudMode;
  private readonly dialog = inject(MatDialog);
  
  private data: BehaviorSubject<PartiesInvolvedDto[]> = new BehaviorSubject<PartiesInvolvedDto[]>([]);
  public data$ = this.data.asObservable()

  constructor(private readonly service: PartiesInvolvedService,
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
    const dialogRef = this.dialog.open(PartiesInvolvedDetailComponent, {
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
