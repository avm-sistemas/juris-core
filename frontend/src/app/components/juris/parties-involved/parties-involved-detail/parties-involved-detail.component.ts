import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../../../modules/angular-material.module';

@Component({
  selector: 'app-parties-involved-detail',
  standalone: true,
  imports: [ CommonModule, AngularMaterialModule, ReactiveFormsModule, FormsModule ],
  templateUrl: './parties-involved-detail.component.html',
  styleUrl: './parties-involved-detail.component.scss'
})
export class PartiesInvolvedDetailComponent {

}
