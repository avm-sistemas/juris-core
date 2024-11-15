import { CommonModule, NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { CustomerDto } from '../../../../dtos/customer.dto';

@Component({
  selector: 'app-list-customers',
  standalone: true,
  imports: [
    CommonModule,    
    NgFor,
    TranslateModule
  ],
  templateUrl: './list-customers.component.html',
  styleUrl: './list-customers.component.scss'
})
export class ListCustomersComponent implements OnInit {
  @Input() customers$?: Observable<CustomerDto[]>;

  constructor() {}

  ngOnInit(): void {
    this.customers$?.subscribe( (value: any) => {      
    })
  }


}
