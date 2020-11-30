import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userLogged = false;

  constructor(
    public translateService: TranslateService
  ) { }

  ngOnInit(): void {}

  changeLanguage(lang: string): void {
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
    localStorage.setItem('language', lang);
  }

}
