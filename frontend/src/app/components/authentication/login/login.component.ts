import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AngularMaterialModule } from '../../../modules/angular-material.module';
import { BehaviorSubject } from 'rxjs';
import { HotToastService } from '@ngxpert/hot-toast';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ 
    CommonModule, 
    AngularMaterialModule, 
    ReactiveFormsModule, 
    FormsModule, 
    RouterModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup = this.createForm();

  constructor(private readonly auth: AuthService, 
              private readonly router: Router,
              private readonly store: StoreService,
              private readonly toast: HotToastService) {
    /*
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/home']);
    }*/
    
  }

  createForm(): FormGroup {
    return new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    })
  }

  login() {
    const user = this.loginForm.controls['username'].value;
    const pass = this.loginForm.controls['password'].value;
    this.auth.authenticate(user, pass).then(
      (data: any) => {
        this.toast.success('User logged in');        
        this.router.navigate(['/user']);
      },
      (error: any) => {
        debugger;
        if (error.message) {     
          this.toast.error(error.message);
        }
        console.log(error);
      }
    )
  }
}
