import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { Router } from '@angular/router';
import PocketBase from 'pocketbase';
import { IUser } from '../interfaces/iuser.interface';
import { apiConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private client: any;

  constructor(private readonly store: StoreService,
              private readonly router: Router) { 
      this.client = new PocketBase(apiConfig.pbhost);
  }

  isAuthenticated(): boolean {
    return this.store.isSet();
  }

  logout() {    
    this.store.clearToken();
    this.router.navigate(['/home']);
  }

  async authenticate(username: string, password: string) {
    const auths = await this.client.collection('users').authWithPassword(username, password);
    return auths;
  }

  async register(obj: IUser) {
    const registo = await this.client.collection('users').create(obj);    
    return registo;
  }

}
