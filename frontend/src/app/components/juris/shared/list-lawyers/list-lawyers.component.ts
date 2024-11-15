import { Component, Input, OnInit } from '@angular/core';
import { LawyerDto } from '../../../../dtos/lawyer.dto';
import { CommonModule, NgFor } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-lawyers',
  standalone: true,
  imports: [
    CommonModule,    
    NgFor,
    TranslateModule
  ],
  templateUrl: './list-lawyers.component.html',
  styleUrl: './list-lawyers.component.scss'
})
export class ListLawyersComponent implements OnInit {
  @Input() lawyers$?: Observable<LawyerDto[]>;

  ngOnInit(): void {
    this.lawyers$?.subscribe( (value: any) => {      
    })
  }

}
