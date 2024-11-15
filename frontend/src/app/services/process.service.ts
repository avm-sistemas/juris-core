import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { ProcessDto } from '../dtos/process.dto';
import { apiConfig } from '../app.config';
import { LawyerDto } from '../dtos/lawyer.dto';
import { CustomerDto } from '../dtos/customer.dto';
import { ProgressDto } from '../dtos/progress.dto';
import { PartiesInvolvedDto } from '../dtos/parties-involved.dto';
import { AttachmentDto } from '../dtos/attachment.dto';

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
    const dto = await this.client.collection(this.entityName).getOne(id, { expand: "advogados, andamentos, partes_envolvidas, clientes, anexos" });
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

  async insertLawyer(id: string, dto: LawyerDto) {    
    return await this.client.collection(this.entityName).update(id, {
      'advogados+': dto.id
    });
  }

  async insertCustomer(id: string, dto: CustomerDto) {    
    return await this.client.collection(this.entityName).update(id, {
      'clientes+': dto.id
    });
  }

  async insertProgress(id: string, dto: ProgressDto) {    
    return await this.client.collection(this.entityName).update(id, {
      'andamentos+': dto.id
    });
  }

  async insertParties(id: string, dto: PartiesInvolvedDto) {    
    return await this.client.collection(this.entityName).update(id, {
      'partes_envolvidas+': dto.id
    });
  }

  async insertAttachment(id: string, dto: AttachmentDto) {    
    return await this.client.collection(this.entityName).update(id, {
      'anexos+': dto.id
    });
  }  

}
