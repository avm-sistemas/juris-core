import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup } from '@angular/forms';
import { AngularMaterialModule } from '../../../../modules/angular-material.module';
import { ProcessService } from '../../../../services/process.service';
import { ProcessDto } from '../../../../dtos/process.dto';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngxpert/hot-toast';
import { CrudMode } from '../../../../enums/crud-mode.enum';
import { LawyerDto } from '../../../../dtos/lawyer.dto';
import { ProgressDto } from '../../../../dtos/progress.dto';
import { AttachmentDto } from '../../../../dtos/attachment.dto';
import { PartiesInvolvedDto } from '../../../../dtos/parties-involved.dto';
import { BehaviorSubject } from 'rxjs';
import { CustomerDto } from '../../../../dtos/customer.dto';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Route, Router, RouterModule, Routes } from '@angular/router';
import { ELoadType } from '../../../../enums/load-type.enum';
import { MatToolbarModule } from '@angular/material/toolbar';
import { imagesConfig } from '../../../../app.config';
import { LawyerDetailComponent } from '../../lawyers/lawyer-detail/lawyer-detail.component';
import { SelectLawyerComponent } from '../../shared/select-lawyer/select-lawyer.component';

@Component({
  selector: 'app-process-detail',
  standalone: true,
  imports: [ 
    CommonModule, 
    AngularMaterialModule, 
    ReactiveFormsModule, 
    FormsModule,
    TranslateModule,
    RouterModule,
    MatToolbarModule
  ],
  templateUrl: './process-detail.component.html',
  styleUrl: './process-detail.component.scss'
})
export class ProcessDetailComponent {
  CRUDMODE = CrudMode;
  ELOADTYPE = ELoadType;
  private readonly dialog = inject(MatDialog);

  readonly dialogRef: any; // = inject(MatDialogRef<ProcessDetailComponent>); 
  readonly data: any; // = inject<any>(MAT_DIALOG_DATA);

  mode: CrudMode = CrudMode.NONE;

  detailForm: FormGroup = this.createForm();

  numero: string = '';

  private advogados: BehaviorSubject<LawyerDto[]> = new BehaviorSubject<LawyerDto[]>([]);
  public advogados$ = this.advogados.asObservable();

  private andamentos: BehaviorSubject<ProgressDto[]> = new BehaviorSubject<ProgressDto[]>([]);
  public andamentos$ = this.andamentos.asObservable();
  
  private anexos: BehaviorSubject<AttachmentDto[]> = new BehaviorSubject<AttachmentDto[]>([]);
  public anexos$ = this.anexos.asObservable();
  
  private partes_envolvidas: BehaviorSubject<PartiesInvolvedDto[]> = new BehaviorSubject<PartiesInvolvedDto[]>([]);
  public partes_envolvidas$ = this.partes_envolvidas.asObservable();

  private customers: BehaviorSubject<CustomerDto[]> = new BehaviorSubject<CustomerDto[]>([]);
  public customers$ = this.customers.asObservable();

  private id?: number;

  loadType: ELoadType = ELoadType.NONE;

  images = imagesConfig;

  constructor(private readonly service: ProcessService,
              private readonly toast: HotToastService,
              private readonly translate: TranslateService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router) {
    this.id  = this.activatedRoute.snapshot.params['id'];
    this.mode  = this.activatedRoute.snapshot.params['mode'];
    
    try {
      this.dialogRef = inject(MatDialogRef<ProcessDetailComponent>); 
      this.data = inject<any>(MAT_DIALOG_DATA);          
    } catch (error: any) {
      //this error is a calculated error
      //console.log(error?.message);
    }
  }

  ngOnInit(): void {

    if (this.data) {
      this.loadType = ELoadType.DIALOG;
      this.id = this.data?.id;
      this.mode = this.data?.mode;      
    } else {
      this.loadType = ELoadType.ROUTE;
    }

    //console.log('ngOnInit   | id => ', this.id, ' mode => ', this.mode);

    if (this.id) {
      const internalId = this.id.toString();
      this.service.getById(internalId).then(
        (response: any) => {
          if (response) {            
            this.detailForm = this.updateForm(response);

            this.fillDataSets(response.expand);

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

  fillDataSets(response: any) {
    this.advogados.next([]);
    this.advogados.next(response?.advogados);

    this.andamentos.next([]);
    this.andamentos.next(response?.andamentos);

    this.anexos.next([]);
    this.anexos.next(response?.anexos);

    this.partes_envolvidas.next([]);
    this.partes_envolvidas.next(response?.partes_envolvidas);

    this.customers.next([]);
    this.customers.next(response?.customers);
  }

  createForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(''),
      descricao: new FormControl(''),
      numero: new FormControl(''),
      status: new FormControl(''),
      tipo: new FormControl(''),
      //advogados: new FormControl([]),
      //andamentos: new FormControl([]),
      //anexos: new FormControl([]),
      //partes_envolvidas: new FormControl([]),
      expand: new FormControl()
    })
  }

  updateForm(response: any): FormGroup {    
    this.numero = response?.numero;
    return new FormGroup({
      id: new FormControl(response.id),
      descricao: new FormControl(response.descricao),
      numero: new FormControl(response.numero),
      status: new FormControl(response.status),
      tipo: new FormControl(response.tipo),
      advogados: new FormControl(response?.advogados || []),
      andamentos: new FormControl(response?.andamentos || []),
      anexos: new FormControl(response?.anexos || []),
      partes_envolvidas: new FormControl(response?.partes || []),
      expand: new FormControl(response?.expand || [])
    });
  }


  close() {
    this.dialogRef.close();
  }

  submit() {
    switch (this.mode) {
      case CrudMode.CREATE: { 
        const dto = new ProcessDto();        
        dto.descricao = this.detailForm.controls['descricao'].value;
        dto.numero = this.detailForm.controls['numero'].value;
        dto.status = this.detailForm.controls['status'].value;
        dto.tipo = this.detailForm.controls['tipo'].value;

        this.service.create(dto).then(
          (response: any) => {
            const translatedMessage = this.translate.instant('detail:PROCESS:MSG:CREATE');
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
        const dto = new ProcessDto();        
        dto.id = this.detailForm.controls['id'].value;
        dto.descricao = this.detailForm.controls['descricao'].value;
        dto.numero = this.detailForm.controls['numero'].value;
        dto.status = this.detailForm.controls['status'].value;
        dto.tipo = this.detailForm.controls['tipo'].value;

        this.service.update(dto).then(
          (response: any) => {
            const translatedMessage = this.translate.instant('detail:PROCESS:MSG:UPDATE');
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
        const dto = new ProcessDto();        
        dto.id = this.detailForm.controls['descricao'].value;
        dto.descricao = this.detailForm.controls['descricao'].value;
        dto.numero = this.detailForm.controls['numero'].value;
        dto.status = this.detailForm.controls['status'].value;
        dto.tipo = this.detailForm.controls['tipo'].value;

        this.service.delete(dto).then(
          (response: any) => {            
            const translatedMessage = this.translate.instant('detail:PROCESS:MSG:DELETE');
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

  navigateToLista() {
    this.router.navigate(['/processes']);
  }

  openDialogLawyer(id: any, mode: CrudMode): void {    
    const dialogRef = this.dialog.open(SelectLawyerComponent, {
      data: { 
        id: id,
        mode: mode
      },
      width: '90%',
      //height: '90%',
      minWidth: '460px',
      disableClose: true      
    });

    dialogRef.afterClosed().subscribe(result => {      
      if (result !== undefined) {        
        this.insertLawyers(result.lawyers);
      }
    });
  }  

  insertLawyers(data: []) {
    debugger;
    console.log('insert data', data);
    data.forEach(
      (lawyer: any) => {
        this.toast.info(lawyer.nome);
      }
    )
  }

  openDialogCustomer(id: any, mode: CrudMode) {

  }

  openDialogParties(id: any, mode:CrudMode) {

  }

  openDialogProgress(id: any, mode: CrudMode) {

  }

  openDialogAttachment(id: any, mode: CrudMode) {

  }

}
