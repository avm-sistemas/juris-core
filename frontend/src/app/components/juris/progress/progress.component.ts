import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProgressDto } from '../../../dtos/progress.dto';
import { ProgressService } from '../../../services/progress.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { BehaviorSubject } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';
import { ProgressDetailComponent } from './progress-detail/progress-detail.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CrudMode } from '../../../enums/crud-mode.enum';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [ 
    CommonModule, 
    NgFor, 
    MatToolbarModule, 
    MatDialogModule,
    TranslateModule
  ],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss'
})
export class ProgressComponent {
  CRUDMODE = CrudMode;
  private readonly dialog = inject(MatDialog);

  private data: BehaviorSubject<ProgressDto[]> = new BehaviorSubject<ProgressDto[]>([]);
  public data$ = this.data.asObservable()

  constructor(private readonly service: ProgressService,
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
    const dialogRef = this.dialog.open(ProgressDetailComponent, {
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
