import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup } from '@angular/forms';
import { AngularMaterialModule } from '../../../../modules/angular-material.module';
import { CustomerDto } from '../../../../dtos/customer.dto';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngxpert/hot-toast';
import { CrudMode } from '../../../../enums/crud-mode.enum';
import { CustomerService } from '../../../../services/customer.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [ 
    CommonModule, 
    AngularMaterialModule, 
    ReactiveFormsModule, 
    FormsModule,
    TranslateModule,
    MatToolbarModule
  ],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.scss'
})
export class CustomerDetailComponent {
  CRUDMODE = CrudMode;
  readonly dialogRef = inject(MatDialogRef<CustomerDetailComponent>); 
  readonly data = inject<any>(MAT_DIALOG_DATA);

  mode: CrudMode = CrudMode.NONE;

  detailForm: FormGroup = this.createForm();

  constructor(private readonly service: CustomerService,
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
              this.detailForm = this.updateForm(response.id, response.nome, response.cpfCnpj, response.endereco, response.telefone, response.email);              
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
      nome: new FormControl(''),
      cpfCnpj: new FormControl(''),
      endereco: new FormControl(''),
      telefone: new FormControl(''),
      email: new FormControl(''),
    })
  }

  updateForm(id: string, name: string, cpfCnpj: string, endereco: string, telefone: string, email: string): FormGroup {    
    return new FormGroup({
      id: new FormControl(id),
      nome: new FormControl(name),
      cpfCnpj: new FormControl(cpfCnpj),
      endereco: new FormControl(endereco),
      telefone: new FormControl(telefone),
      email: new FormControl(email),
    });
  }


  close() {
    this.dialogRef.close();
  }

  submit() {
    switch (this.mode) {
      case CrudMode.CREATE: { 
        const dto = new CustomerDto();        
        dto.nome = this.detailForm.controls['nome'].value;
        dto.cpfCnpj = this.detailForm.controls['cpfCnpj'].value;
        dto.endereco = this.detailForm.controls['endereco'].value;
        dto.telefone = this.detailForm.controls['telefone'].value;
        dto.email = this.detailForm.controls['email'].value;

        this.service.create(dto).then(
          (response: any) => {
            const translatedMessage = this.translate.instant('detail:CUSTOMER:MSG:CREATE');
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
        const dto = new CustomerDto();        
        dto.id = this.detailForm.controls['id'].value;
        dto.nome = this.detailForm.controls['nome'].value;
        dto.cpfCnpj = this.detailForm.controls['cpfCnpj'].value;
        dto.endereco = this.detailForm.controls['endereco'].value;
        dto.telefone = this.detailForm.controls['telefone'].value;
        dto.email = this.detailForm.controls['email'].value;

        this.service.update(dto).then(
          (response: any) => {
            const translatedMessage = this.translate.instant('detail:CUSTOMER:MSG:UPDATE');
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
      case CrudMode.DELETE: { 
        const dto = new CustomerDto();        
        dto.nome = this.detailForm.controls['nome'].value;
        dto.cpfCnpj = this.detailForm.controls['cpfCnpj'].value;
        dto.endereco = this.detailForm.controls['endereco'].value;
        dto.telefone = this.detailForm.controls['telefone'].value;
        dto.email = this.detailForm.controls['email'].value;
        this.service.delete(dto).then(
          (response: any) => {            
            const translatedMessage = this.translate.instant('detail:CUSTOMER:MSG:DELETE');
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
