import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProcessDto } from '../../../dtos/process.dto';
import { ProcessService } from '../../../services/process.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { BehaviorSubject } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-processes',
  standalone: true,
  imports: [ CommonModule, NgFor, MatToolbarModule ],
  templateUrl: './processes.component.html',
  styleUrl: './processes.component.scss'
})
export class ProcessesComponent {

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

}
