import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { Router } from '@angular/router';
import PocketBase from 'pocketbase';
import { IUser } from '../interfaces/iuser.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private pbhost = 'http://127.0.0.1:8090';
  private client: any;

  constructor(private readonly http: HttpClient,
              private readonly store: StoreService,
              private readonly router: Router) { 
      this.client = new PocketBase(this.pbhost);
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
    console.log('registo', registo);
    return registo;
  }

}
