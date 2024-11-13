import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AngularMaterialModule } from '../../../modules/angular-material.module';
import { BehaviorSubject } from 'rxjs';
import { HotToastService } from '@ngxpert/hot-toast';
import { StoreService } from '../../../services/store.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ 
    CommonModule, 
    AngularMaterialModule, 
    ReactiveFormsModule, 
    FormsModule, 
    RouterModule,
    TranslateModule
   ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup = this.createForm();

  constructor(private readonly auth: AuthService, 
              private readonly router: Router,
              private readonly store: StoreService,
              private readonly toast: HotToastService,
              private readonly translate: TranslateService) {
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
        const translatedMessage = this.translate.instant('login:TOAST:SUCCESS');
        this.toast.success(translatedMessage);        
        this.router.navigate(['/user']);
      },
      (error: any) => {
        debugger;
        if (error.message) {
          const translatedMessage = this.translate.instant('login:TOAST:'+error.message);
          if (translatedMessage) {

          } else {
            const translatedErrorMessage = this.translate.instant(error.message);
            if (translatedErrorMessage) {
              this.toast.error(translatedErrorMessage);
            } else {
              this.toast.error(error.message);
            }            
          }            
        }
        console.log(error);
      }
    )
  }
}
