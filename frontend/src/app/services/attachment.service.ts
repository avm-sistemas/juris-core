import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { AttachmentDto } from '../dtos/attachment.dto';
import { apiConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

  private client: any;
  private entityName: string = 'anexo';

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

  async create(dto: AttachmentDto) {
    const response = await this.client.collection(this.entityName).create(dto);
    return response;
  }

  async update(dto: AttachmentDto) {
    const response = await this.client.collection(this.entityName).update(dto.id, dto);
    return response;
  }

  async delete(dto: AttachmentDto) {
    const response = await this.client.collection(this.entityName).delete(dto);
    return response;
  }  


}
