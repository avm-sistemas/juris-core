import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-customer-service',
  standalone: true,
  imports: [ 
    MatToolbarModule,
    TranslateModule
  ],
  templateUrl: './customer-service.component.html',
  styleUrl: './customer-service.component.scss'
})
export class CustomerServiceComponent {

}
