import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private _token: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public token$ = this._token.asObservable();

  user: any;

  constructor() {     
    this.getPocketBaseAuthToken();
  }

  getPocketBaseAuthToken(): any {        
    const pba_text = localStorage.getItem('pocketbase_auth') || '';
    if (pba_text) {
      const pba = JSON.parse(pba_text);
      this._token.next(pba.token);
      this.user = pba.model;      
    }
    return this.user;
  }

  isSet(): boolean {    
    const pba = this.getPocketBaseAuthToken();    
    return (pba !== null && pba !== '' && pba !== undefined);
  }

  clearToken() {
    this.user = null;
    this._token.next('');
    localStorage.removeItem('pocketbase_auth');
  }

}
