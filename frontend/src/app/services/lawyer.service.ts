import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { LawyerDto } from '../dtos/lawyer.dto';
import { apiConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class LawyerService {
  
  private client: any;
  private entityName: string = 'advogado';

  constructor() { 
      this.client = new PocketBase(apiConfig.pbhost);
  }

  async getAll() {    
    const lawyers = await this.client.collection(this.entityName).getFullList({ sort: '-created' });
    return lawyers;
  }

  async getById(id: string) {
    const lawyer = await this.client.collection(this.entityName).getOne(id);
    return lawyer;
  }

  async create(dto: LawyerDto) {
    const lawyer = await this.client.collection(this.entityName).create(dto);
    return lawyer;
  }

  async update(dto: LawyerDto) {
    const lawyer = await this.client.collection(this.entityName).update(dto.id, dto);
    return lawyer;
  }

  async delete(dto: LawyerDto) {
    const lawyer = await this.client.collection(this.entityName).delete(dto.id);
    return lawyer;
  }  


}
