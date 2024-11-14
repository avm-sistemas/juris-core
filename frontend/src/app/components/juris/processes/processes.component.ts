import { Component, inject, OnInit, Sanitizer } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProcessDto } from '../../../dtos/process.dto';
import { ProcessService } from '../../../services/process.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { BehaviorSubject } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';
import { CrudMode } from '../../../enums/crud-mode.enum';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProcessDetailComponent } from './process-detail/process-detail.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { imagesConfig } from '../../../app.config';


@Component({
  selector: 'app-processes',
  standalone: true,
  imports: [ 
    CommonModule, 
    NgFor,     
    MatToolbarModule, 
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule
    ,RouterLink
  ],
  templateUrl: './processes.component.html',
  styleUrl: './processes.component.scss'
})
export class ProcessesComponent implements OnInit {
  CRUDMODE = CrudMode;
  private readonly dialog = inject(MatDialog);
  
  private data: BehaviorSubject<ProcessDto[]> = new BehaviorSubject<ProcessDto[]>([]);
  public data$ = this.data.asObservable()

  images = imagesConfig;

  constructor(private readonly service: ProcessService,
              private readonly toast: HotToastService,
              private readonly translate: TranslateService,
              private readonly router: Router) {
    this.load();
  }

  ngOnInit() {
  }

  async load() {
    this.service.getAll().then(
      (data: any) => {        
        if (data)
          this.data.next(data);        
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

  navigateToDetail(id: any, mode: CrudMode): void {
    const url = '/processes/' + id + '/' + mode;
    this.router.navigate([url]);
  }

}
