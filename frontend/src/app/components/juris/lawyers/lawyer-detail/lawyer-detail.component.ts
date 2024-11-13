import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AngularMaterialModule } from '../../../../modules/angular-material.module';
import { LawyerService } from '../../../../services/lawyer.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { CrudMode } from '../../../../enums/crud-mode.enum';
import { LawyerDto } from '../../../../dtos/lawyer.dto';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-lawyer-detail',
  standalone: true,
  imports: [ 
    CommonModule, 
    AngularMaterialModule, 
    ReactiveFormsModule, 
    FormsModule,
    TranslateModule,
    MatToolbarModule
  ],
  templateUrl: './lawyer-detail.component.html',
  styleUrl: './lawyer-detail.component.scss'
})
export class LawyerDetailComponent implements OnInit {
  CRUDMODE = CrudMode;
  readonly dialogRef = inject(MatDialogRef<LawyerDetailComponent>); 
  readonly data = inject<any>(MAT_DIALOG_DATA);

  mode: CrudMode = CrudMode.NONE;

  lawyerDetailForm: FormGroup = this.createForm();

  constructor(private readonly service: LawyerService,
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
              this.lawyerDetailForm = this.updateForm(response.id, response.nome, response.oab, response.telefone, response.email, response.processos);              
              if (this.mode == CrudMode.READ) {
                this.lawyerDetailForm.disable();
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
        const dto = new LawyerDto();
        dto.email = this.lawyerDetailForm.controls['email'].value;
        dto.nome = this.lawyerDetailForm.controls['name'].value;
        dto.oab = this.lawyerDetailForm.controls['oab'].value;
        dto.telefone = this.lawyerDetailForm.controls['telephone'].value;

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
        const dto = new LawyerDto();
        dto.id = this.lawyerDetailForm.controls['id'].value;
        dto.email = this.lawyerDetailForm.controls['email'].value;
        dto.nome = this.lawyerDetailForm.controls['name'].value;
        dto.oab = this.lawyerDetailForm.controls['oab'].value;
        dto.telefone = this.lawyerDetailForm.controls['telephone'].value;

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
        const dto = new LawyerDto();
        dto.id = this.lawyerDetailForm.controls['id'].value;
        dto.email = this.lawyerDetailForm.controls['email'].value;
        dto.nome = this.lawyerDetailForm.controls['name'].value;
        dto.oab = this.lawyerDetailForm.controls['oab'].value;
        dto.telefone = this.lawyerDetailForm.controls['telephone'].value;
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
