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
import * as jwt_decode from 'jwt-decode';
import { AngularMaterialModule } from '../../../modules/angular-material.module';
import { TranslateModule } from '@ngx-translate/core';

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

  constructor(private readonly store: StoreService, 
              private readonly auth: AuthService,
              private readonly router: Router) {  
    this.user = this.store.getPocketBaseAuthToken();                    
    this.logged = this.user !== null && this.user !== undefined;
  }

  logout() {    
    this.auth.logout();
  }

}
