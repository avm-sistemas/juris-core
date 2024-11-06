import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { ProcessDto } from '../dtos/process.dto';
import { apiConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {
  
  private client: any;
  private entityName: string = 'processo';

  constructor() { 
      this.client = new PocketBase(apiConfig.pbhost);
  }

  async getAll() {    
    const dtos = await this.client.collection(this.entityName).getFullList({ sort: '-created' });
    return dtos;
  }

  async getById(id: string) {
    const dto = await this.client.collection(this.entityName).getOne(id, { expand: "advogados, andamentos, partes_envolvidas, anexos" });
    return dto;
  }

  async create(dto: ProcessDto) {
    const response = await this.client.collection(this.entityName).create(dto);
    return response;
  }

  async update(dto: ProcessDto) {
    const response = await this.client.collection(this.entityName).update(dto.id, dto);
    return response;
  }

  async delete(dto: ProcessDto) {
    const response = await this.client.collection(this.entityName).delete(dto);
    return response;
  }  


}
