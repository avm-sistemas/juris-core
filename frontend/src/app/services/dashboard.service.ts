import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { apiConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  private client: any;
  private entityName: string = 'dashboard';

  constructor() { 
      this.client = new PocketBase(apiConfig.pbhost);
  }

  async getData() {    
    const dtos = await this.client.collection(this.entityName).getFullList({ sort: '-id' });
    return dtos;
  }

}
