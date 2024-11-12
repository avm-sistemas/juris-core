import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AngularMaterialModule } from '../../../modules/angular-material.module';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-recover',
  standalone: true,
  imports: [ 
    CommonModule, 
    AngularMaterialModule,
    ReactiveFormsModule, 
    FormsModule, 
    RouterModule,
    TranslateModule
   ],
  templateUrl: './recover.component.html',
  styleUrl: './recover.component.scss'
})
export class RecoverComponent {

  recoverForm: FormGroup = this.createForm();

  constructor(private readonly auth: AuthService, private readonly router: Router) {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }

  createForm(): FormGroup {
    return new FormGroup({
      email: new FormControl('')      
    })
  }

  recover() {
    const email = this.recoverForm.controls['email'].value;
    console.log(email);
  }

}
