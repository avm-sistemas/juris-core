import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProgressDto } from '../../../dtos/progress.dto';
import { ProgressService } from '../../../services/progress.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { BehaviorSubject } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [ CommonModule, NgFor, MatToolbarModule ],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss'
})
export class ProgressComponent {

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

}
