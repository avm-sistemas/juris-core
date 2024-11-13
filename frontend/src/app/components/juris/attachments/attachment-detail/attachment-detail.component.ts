import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup } from '@angular/forms';
import { AngularMaterialModule } from '../../../../modules/angular-material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngxpert/hot-toast';
import { CrudMode } from '../../../../enums/crud-mode.enum';
import { AttachmentService } from '../../../../services/attachment.service';
import { AttachmentDto } from '../../../../dtos/attachment.dto';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-attachment-detail',
  standalone: true,
  imports: [ 
    CommonModule, 
    AngularMaterialModule, 
    ReactiveFormsModule, 
    FormsModule,
    TranslateModule,
    MatToolbarModule
  ],
  templateUrl: './attachment-detail.component.html',
  styleUrl: './attachment-detail.component.scss'
})
export class AttachmentDetailComponent {
  CRUDMODE = CrudMode;
  readonly dialogRef = inject(MatDialogRef<AttachmentDetailComponent>); 
  readonly data = inject<any>(MAT_DIALOG_DATA);

  mode: CrudMode = CrudMode.NONE;

  detailForm: FormGroup = this.createForm();

  constructor(private readonly service: AttachmentService,
              private readonly toast: HotToastService,
              private readonly translate: TranslateService) {
  }

  ngOnInit(): void {
    if (this.data) {
      const id = this.data?.id;
      this.mode = this.data?.mode;            
      if (this.data.id) {
        this.service.getById(id).then(
          (response: any) => {
            if (response) {
              this.detailForm = this.updateForm(response.id, response.nome, response.oab, response.telefone, response.email, response.processos);              
              if (this.mode == CrudMode.READ) {
                this.detailForm.disable();
              }
            }
          }).catch(
            (error: any) => {
              if (error.message) {
                const translatedErrorMessage = this.translate.instant(error.message);
                if (translatedErrorMessage) {
                  this.toast.error(translatedErrorMessage);
                } else {
                  this.toast.error(error.message);
                }    
              }
            }
        )        
      }  
    }
  }

  createForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      oab: new FormControl(''),
      telephone: new FormControl(),
      email: new FormControl(),
      processos: new FormControl()      
    })
  }

  updateForm(id: string, name: string, oab: string, telephone: string, email: string, processes: any): FormGroup {    
    return new FormGroup({
      id: new FormControl(id),
      name: new FormControl(name),
      oab: new FormControl(oab),
      telephone: new FormControl(telephone),
      email: new FormControl(email),
      processos: new FormControl(processes)
    });
  }


  close() {
    this.dialogRef.close();
  }

  submit() {
    switch (this.mode) {
      case CrudMode.CREATE: { 
        const dto = new AttachmentDto();        
        dto.nome = this.detailForm.controls['nome'].value;
        dto.descricao = this.detailForm.controls['descricao'].value;
        dto.conteudo = this.detailForm.controls['conteudo'].value;
        dto.mime = this.detailForm.controls['mime'].value;
        dto.tamanho = this.detailForm.controls['tamanho'].value;        

        this.service.create(dto).then(
          (response: any) => {
            const translatedMessage = this.translate.instant('detail:ATTACHMENTS:MSG:CREATE');
            this.toast.success(translatedMessage);
            this.dialogRef.close();
          }
        ).catch(
          (error: any) => {
            if (error.message) {
              const translatedErrorMessage = this.translate.instant(error.message);
              if (translatedErrorMessage) {
                this.toast.error(translatedErrorMessage);
              } else {
                this.toast.error(error.message);
              }  
            }
          }
        );
        break;
      }
      case CrudMode.UPDATE: { 
        const dto = new AttachmentDto();        
        dto.nome = this.detailForm.controls['nome'].value;
        dto.descricao = this.detailForm.controls['descricao'].value;
        dto.conteudo = this.detailForm.controls['conteudo'].value;
        dto.mime = this.detailForm.controls['mime'].value;
        dto.tamanho = this.detailForm.controls['tamanho'].value;        

        this.service.update(dto).then(
          (response: any) => {
            const translatedMessage = this.translate.instant('detail:ATTACHMENTS:MSG:UPDATE');
            this.toast.success(translatedMessage);
            this.dialogRef.close();
          }
        ).catch(
          (error: any) => {
            if (error.message) {
              this.toast.error(error.message);
            }
          }
        );
        break;
      }
      case CrudMode.DELETE: { 
        const dto = new AttachmentDto();        
        dto.nome = this.detailForm.controls['name'].value;
        dto.descricao = this.detailForm.controls['descricao'].value;
        dto.conteudo = this.detailForm.controls['conteudo'].value;
        dto.mime = this.detailForm.controls['mime'].value;
        dto.tamanho = this.detailForm.controls['tamanho'].value;        
        this.service.delete(dto).then(
          (response: any) => {            
            const translatedMessage = this.translate.instant('detail:ATTACHMENTS:MSG:DELETE');
            this.toast.success(translatedMessage);
            this.dialogRef.close();
          }
        ).catch(
          (error: any) => {
            if (error.message) {
              const translatedErrorMessage = this.translate.instant(error.message);
              if (translatedErrorMessage) {
                this.toast.error(translatedErrorMessage);
              } else {
                this.toast.error(error.message);
              }  
            }
          }
        );        

        break;
      }      
    }
  }

}
