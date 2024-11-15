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
import { Observable, ReplaySubject } from 'rxjs';

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

  files: any[] = [];
  fileB64: any;

  id: any;

  constructor(private readonly service: AttachmentService,
              private readonly toast: HotToastService,
              private readonly translate: TranslateService) {
  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    if (this.data) {
      this.id = this.data?.id;
      this.mode = this.data?.mode;            
      if (this.id) {
        this.service.getById(this.id).then(
          (response: any) => {
            if (response) {
              this.detailForm = this.updateForm(response);
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
      descricao: new FormControl(''),
    })
  }

  updateForm(response: any): FormGroup {
    this.files = [];
    this.files.push(response.arquivo);
    return new FormGroup({
      id: new FormControl(response.id),
      descricao: new FormControl(response.description)
    });
  }


  close() {
    this.dialogRef.close();
  }

  submit() {
    switch (this.mode) {
      case CrudMode.CREATE: { 
        const dto = new AttachmentDto();
        debugger;
        dto.nome = this.files[0]?.name || '';
        dto.descricao = this.detailForm.controls['descricao'].value;
        dto.conteudo = this.fileB64;
        dto.mime = this.files[0]?.type || '';
        dto.tamanho = this.files[0]?.size || '';
        dto.arquivo = this.files[0];

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
        dto.id = this.id;
        dto.nome = dto.nome || this.files[0]?.name || '';
        dto.descricao = this.detailForm.controls['descricao'].value || dto.descricao;
        dto.conteudo = this.fileB64;
        dto.mime = dto.arquivo[0]?.type || '';
        dto.tamanho = dto.arquivo[0]?.size || '';
        dto.arquivo = this.files[0];

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
        dto.id = this.id;
        dto.nome = this.files[0]?.name || '';
        dto.descricao = this.detailForm.controls['descricao'].value;
        dto.conteudo = this.files[0];
        dto.mime = this.files[0]?.type || '';
        dto.tamanho = this.files[0]?.size || '';
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

  upload(event:any) {
    this.files = event?.target?.files;
    console.log("files", this.files);
    this.convertFile(event.target.files[0]).subscribe(base64 => {
      this.fileB64 = base64;
      console.log(base64);
    });
  }

  convertFile(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(file.toString()));
    return result;
  }
}
