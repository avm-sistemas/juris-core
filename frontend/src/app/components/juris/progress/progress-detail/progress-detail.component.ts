import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup } from '@angular/forms';
import { AngularMaterialModule } from '../../../../modules/angular-material.module';
import { ProgressService } from '../../../../services/progress.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngxpert/hot-toast';
import { ProgressDto } from '../../../../dtos/progress.dto';
import { CrudMode } from '../../../../enums/crud-mode.enum';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-progress-detail',
  standalone: true,
  imports: [ 
    CommonModule, 
    AngularMaterialModule, 
    ReactiveFormsModule, 
    FormsModule,
    TranslateModule
  ],
  templateUrl: './progress-detail.component.html',
  styleUrl: './progress-detail.component.scss'
})
export class ProgressDetailComponent {
  CRUDMODE = CrudMode;
  readonly dialogRef = inject(MatDialogRef<ProgressDetailComponent>); 
  readonly data = inject<any>(MAT_DIALOG_DATA);

  mode: CrudMode = CrudMode.NONE;

  detailForm: FormGroup = this.createForm();

  constructor(private readonly service: ProgressService,
              private readonly toast: HotToastService,
              private readonly translate: TranslateService) {
  }

  ngOnInit(): void {
    if (this.data) {
      const id = this.data?.id;
      this.mode = this.data?.mode;      
      console.log('id => ', id, ' mode => ', this.mode);
      if (this.data.id) {
        this.service.getById(id).then(
          (response: any) => {
            if (response) {
              this.detailForm = this.updateForm(response.id, response.descricao, response.dataAndamento, response.statusAtual);              
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
      dataAndamento: new FormControl(),
      statusAtual: new FormControl(''),
    })
  }

  updateForm(id: string, descricao: string, dataAndamento: Date, statusAtual: string): FormGroup {    
    return new FormGroup({
      id: new FormControl(id),
      descricao: new FormControl(descricao),
      dataAndamento: new FormControl(dataAndamento),
      statusAtual: new FormControl(statusAtual)
    });
  }


  close() {
    this.dialogRef.close();
  }

  submit() {
    switch (this.mode) {
      case CrudMode.CREATE: { 
        const dto = new ProgressDto();        
        dto.descricao = this.detailForm.controls['descricao'].value;
        dto.dataAndamento = this.detailForm.controls['dataAndamento'].value;
        dto.statusAtual = this.detailForm.controls['statusAtual'].value;

        this.service.create(dto).then(
          (response: any) => {
            this.toast.success('Lawyer registered');
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
        const dto = new ProgressDto();        
        dto.id = this.detailForm.controls['id'].value;
        dto.descricao = this.detailForm.controls['descricao'].value;
        dto.dataAndamento = this.detailForm.controls['dataAndamento'].value;
        dto.statusAtual = this.detailForm.controls['statusAtual'].value;

        this.service.update(dto).then(
          (response: any) => {
            this.toast.success('Lawyer updated');    
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
      case CrudMode.DELETE: { 
        const dto = new ProgressDto();        
        dto.id = this.detailForm.controls['descricao'].value;
        dto.descricao = this.detailForm.controls['descricao'].value;
        dto.dataAndamento = this.detailForm.controls['dataAndamento'].value;
        dto.statusAtual = this.detailForm.controls['statusAtual'].value;
        this.service.delete(dto).then(
          (response: any) => {            
            this.toast.success('Lawyer deleted');
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
