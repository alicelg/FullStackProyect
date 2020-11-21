import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Proyect';
  currentLanguage: string;

  constructor(
    private translateService: TranslateService
  ) {
    this.currentLanguage = localStorage.getItem('language') ? localStorage.getItem('language') : 'es-ES';
    this.translateService.setDefaultLang(this.currentLanguage);
    this.translateService.use(this.currentLanguage);
    localStorage.setItem('language', this.currentLanguage);
  }
}
