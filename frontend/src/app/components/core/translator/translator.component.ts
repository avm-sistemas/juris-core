import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-translator',
  standalone: true,
  imports: [ ReactiveFormsModule, FormsModule, MatInputModule, MatSelectModule, MatFormFieldModule ],
  templateUrl: './translator.component.html',
  styleUrl: './translator.component.scss'
})
export class TranslatorComponent {

  languages: string[];

  selected: string;

  constructor(private readonly translate: TranslateService) {
    this.selected = this.translate.currentLang;
    this.languages = this.translate.getLangs();
  }

  onChange(event: any) {        
    this.translate.use(this.selected);
  }

}
