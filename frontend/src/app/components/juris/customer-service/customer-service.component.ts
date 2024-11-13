import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { imagesConfig } from '../../../app.config';

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

  images = imagesConfig;

  constructor(private readonly translate: TranslateService) {
    
  }
}
