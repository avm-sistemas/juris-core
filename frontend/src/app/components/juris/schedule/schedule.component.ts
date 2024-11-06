import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [ CommonModule, NgFor, MatToolbarModule ],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent {

}
