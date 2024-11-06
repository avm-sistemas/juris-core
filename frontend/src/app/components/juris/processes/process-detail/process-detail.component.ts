import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../../../modules/angular-material.module';

@Component({
  selector: 'app-process-detail',
  standalone: true,
  imports: [ CommonModule, AngularMaterialModule, ReactiveFormsModule, FormsModule ],
  templateUrl: './process-detail.component.html',
  styleUrl: './process-detail.component.scss'
})
export class ProcessDetailComponent {

}
