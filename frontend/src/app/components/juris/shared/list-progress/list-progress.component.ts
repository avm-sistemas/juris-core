import { CommonModule, NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProgressDto } from '../../../../dtos/progress.dto';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-progress',
  standalone: true,
  imports: [
    CommonModule,    
    NgFor,
    TranslateModule
  ],
  templateUrl: './list-progress.component.html',
  styleUrl: './list-progress.component.scss'
})
export class ListProgressComponent implements OnInit {
  @Input() progresses$?: Observable<ProgressDto[]>;

  ngOnInit(): void {
    this.progresses$?.subscribe( (value: any) => {      
    })
  }  
}
