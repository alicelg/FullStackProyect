import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userLogged: User;

  constructor(
    public translateService: TranslateService,
    public userService: UsersService,
  ) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(res => {
      console.log(res);

      this.userLogged = res;
    });
  }

  changeLanguage(lang: string): void {
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
    localStorage.setItem('language', lang);
  }
}
