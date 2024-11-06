import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PartiesInvolvedDto } from '../../../dtos/parties-involved.dto';
import { PartiesInvolvedService } from '../../../services/parties-involved.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { BehaviorSubject } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-parties-involved',
  standalone: true,
  imports: [ CommonModule, NgFor, MatToolbarModule ],
  templateUrl: './parties-involved.component.html',
  styleUrl: './parties-involved.component.scss'
})
export class PartiesInvolvedComponent {

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

}
