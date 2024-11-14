import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { StoreService } from '../../../services/store.service';
import { AngularMaterialModule } from '../../../modules/angular-material.module';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [ 
    CommonModule, 
    AngularMaterialModule,
    ReactiveFormsModule, 
    FormsModule, 
    MatToolbarModule, 
    MatCardModule, 
    MatIconModule, 
    MatButtonModule, 
    MatGridListModule,
    RouterLink,
    TranslateModule
],
templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {

  logged = true;

  user: any;

  data: any;

  constructor(private readonly store: StoreService, 
              private readonly auth: AuthService,
              private readonly router: Router,
              private readonly dashboard: DashboardService) {  
    this.user = this.store.getPocketBaseAuthToken();                    
    this.logged = this.user !== null && this.user !== undefined;
    this.loadDashboard();
  }

  logout() {    
    this.auth.logout();
  }

  loadDashboard() {
    this.dashboard.getData().then(
      (response: any) => {
        if (response) {
          //console.log('response => ', response[0]);
          this.data = response[0];
        }
      }).catch(
        (error: any) => {
          if (error.message) {
            console.log(error.message);
          }
        }
    )        
  }
}
