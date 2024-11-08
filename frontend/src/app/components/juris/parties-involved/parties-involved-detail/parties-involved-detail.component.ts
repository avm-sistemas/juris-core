import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup } from '@angular/forms';
import { AngularMaterialModule } from '../../../../modules/angular-material.module';
import { PartiesInvolvedService } from '../../../../services/parties-involved.service';
import { PartiesInvolvedDto } from '../../../../dtos/parties-involved.dto';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngxpert/hot-toast';
import { CrudMode } from '../../../../enums/crud-mode.enum';

@Component({
  selector: 'app-parties-involved-detail',
  standalone: true,
  imports: [ CommonModule, AngularMaterialModule, ReactiveFormsModule, FormsModule ],
  templateUrl: './parties-involved-detail.component.html',
  styleUrl: './parties-involved-detail.component.scss'
})
export class PartiesInvolvedDetailComponent {
  CRUDMODE = CrudMode;
  readonly dialogRef = inject(MatDialogRef<PartiesInvolvedDetailComponent>); 
  readonly data = inject<any>(MAT_DIALOG_DATA);

  mode: CrudMode = CrudMode.NONE;

  detailForm: FormGroup = this.createForm();

  constructor(private readonly service: PartiesInvolvedService,
              private readonly toast: HotToastService) {
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
              this.detailForm = this.updateForm(response.id, response.name, response.cpfCnpj, response.endereco, response.telefone, response.email);              
              if (this.mode == CrudMode.READ) {
                this.detailForm.disable();
              }
            }
          }).catch(
            (error: any) => {
              if (error.message)
                this.toast.error(error.message)
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
        const dto = new PartiesInvolvedDto();        
        dto.nome = this.detailForm.controls['nome'].value;

        this.service.create(dto).then(
          (response: any) => {
            this.toast.success('Lawyer registered');
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
      case CrudMode.UPDATE: { 
        const dto = new PartiesInvolvedDto();        
        dto.id = this.detailForm.controls['id'].value;
        dto.nome = this.detailForm.controls['nome'].value;

        this.service.update(dto).then(
          (response: any) => {
            this.toast.success('Lawyer updated');    
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
        const dto = new PartiesInvolvedDto();        
        dto.nome = this.detailForm.controls['nome'].value;
        this.service.delete(dto).then(
          (response: any) => {            
            this.toast.success('Lawyer deleted');
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
    }
  }

}
