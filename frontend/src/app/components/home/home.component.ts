import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ 
    CommonModule, 
    MatToolbarModule, 
    MatButtonModule, 
    RouterLink,
    TranslateModule
   ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private readonly auth: AuthService,
              private readonly router: Router) {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/user']);
    }
  }

}
