import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { IUser } from '../../../interfaces/iuser.interface';
import { User } from '../../../models/user.model';
import { AngularMaterialModule } from '../../../modules/angular-material.module';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ 
    CommonModule, 
    AngularMaterialModule, 
    ReactiveFormsModule, 
    FormsModule, 
    RouterModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup = this.createForm();

  constructor(private readonly auth: AuthService, 
              private readonly router: Router,
              private readonly toast: HotToastService) {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }

  createForm(): FormGroup {
    return new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(),
      username: new FormControl(),
      confirmPassword: new FormControl()
    })
  }

  register() {
    const name = this.registerForm.controls['name'].value;
    const email = this.registerForm.controls['email'].value;
    const pass = this.registerForm.controls['password'].value;
    const username = this.registerForm.controls['username'].value;
    const confirmPassword = this.registerForm.controls['confirmPassword'].value;
    const obj: IUser = new User();
    obj.name = name;
    obj.email = email;
    obj.password = pass;
    obj.passwordConfirm = confirmPassword;
    obj.username = username;
    obj.emailVisibility = true;
    
    this.auth.register(obj).then(
      (response: any) => {                
        this.toast.success('User registered');        
        this.router.navigate(['/login']);
      }
    ).catch(
      (error: any) => {
        if (error.message)
          this.toast.error(error.message);        
      }
    )
  }

}
