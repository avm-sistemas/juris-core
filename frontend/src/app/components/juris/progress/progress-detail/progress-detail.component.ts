import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../../../modules/angular-material.module';

@Component({
  selector: 'app-progress-detail',
  standalone: true,
  imports: [ CommonModule, AngularMaterialModule, ReactiveFormsModule, FormsModule ],
  templateUrl: './progress-detail.component.html',
  styleUrl: './progress-detail.component.scss'
})
export class ProgressDetailComponent {

}
