import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { CustomerDto } from '../dtos/customer.dto';
import { apiConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  
  private client: any;
  private entityName: string = 'cliente';

  constructor() { 
      this.client = new PocketBase(apiConfig.pbhost);
  }

  async getAll() {    
    const dtos = await this.client.collection(this.entityName).getFullList({ sort: '-created' });
    return dtos;
  }

  async getById(id: string) {
    const dto = await this.client.collection(this.entityName).getOne(id);
    return dto;
  }

  async create(dto: CustomerDto) {
    const response = await this.client.collection(this.entityName).create(dto);
    return response;
  }

  async update(dto: CustomerDto) {
    const response = await this.client.collection(this.entityName).update(dto);
    return response;
  }

  async delete(dto: CustomerDto) {
    const response = await this.client.collection(this.entityName).delete(dto);
    return response;
  }  


}
