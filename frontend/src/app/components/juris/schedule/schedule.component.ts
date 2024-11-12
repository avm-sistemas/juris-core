import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [ 
    CommonModule, 
    NgFor, 
    MatToolbarModule,
    TranslateModule
  ],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent {

}
