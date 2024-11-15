import { Component, Input, OnInit } from '@angular/core';
import { PartiesInvolvedDto } from '../../../../dtos/parties-involved.dto';
import { CommonModule, NgFor } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-list-parties',
  standalone: true,
  imports: [
    CommonModule,    
    NgFor,
    TranslateModule    
  ],
  templateUrl: './list-parties.component.html',
  styleUrl: './list-parties.component.scss'
})
export class ListPartiesComponent implements OnInit {
  @Input() parties$?: Observable<PartiesInvolvedDto[]>;

  ngOnInit(): void {
    this.parties$?.subscribe( (value: any) => {      
    })
  }  
}
