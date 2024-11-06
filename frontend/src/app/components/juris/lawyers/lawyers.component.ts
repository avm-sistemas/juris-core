import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LawyerService } from '../../../services/lawyer.service';
import { BehaviorSubject } from 'rxjs';
import { LawyerDto } from '../../../dtos/lawyer.dto';
import { HotToastService } from '@ngxpert/hot-toast';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-lawyers',
  standalone: true,
  imports: [ CommonModule, NgFor, MatToolbarModule ],
  templateUrl: './lawyers.component.html',
  styleUrl: './lawyers.component.scss'
})
export class LawyersComponent {

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

}
