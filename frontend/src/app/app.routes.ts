import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { RecoverComponent } from './components/authentication/recover/recover.component';
import { AccountComponent } from './components/authentication/account/account.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {  path: 'home',  component: HomeComponent  },
    {  path: 'login',  component: LoginComponent  },
    {  path: 'register',  component: RegisterComponent  },
    {  path: 'recover',  component: RecoverComponent  },
    {  path: 'user',  component: AccountComponent  },
];
