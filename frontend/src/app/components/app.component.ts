import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { AngularMaterialModule } from '../modules/angular-material.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../interceptors/token.interceptor';
import {LayoutModule} from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, CommonModule, AngularMaterialModule, FlexLayoutModule, RouterLink, LayoutModule ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  menu: any[] = [];

  constructor(private readonly auth: AuthService) {

  }

  ngOnInit(): void {
    this.createMenu();  

    if (this.auth.isAuthenticated()) {      
        this.menu.push({
          title: 'Account', //this.auth.user.name,
          url: '/user',
          icon: 'account_circle'
        })        
    } else {
      this.menu.push({
        title: 'Account',
        url: '/user',
        icon: 'account_circle'
      });
    };
  }

  async createMenu() {
    this.menu = [
      {
        title: 'Home',
        url: '/home',
        icon: 'home'
      }

    ];
    
  }

}
