import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* HEADER & FOOTER */
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

/* HOME */
import { HomeComponent } from './components/home/home.component';

/* ERROR */
import { ErrorComponent } from './components/error/error.component';

/* NOSOTROS */
import { CreatorComponent } from './components/creator/creator.component';

/* USUARIO */
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';

/* BLOG */
import { FormComponent } from './components/form/form.component';
import { BlogComponent } from './components/blog/blog.component';
import { PostComponent } from './components/post/post.component';

/* MAPA */
import { MapComponent } from './components/map/map.component';
import { CountryComponent } from './components/country/country.component';

/* CONCEPTO */
import { ConceptsComponent } from './components/concepts/concepts.component';

/* TEST */
import { TestsComponent } from './components/tests/tests.component';
import { TestComponent } from './components/test/test.component';
import { ResultComponent } from './components/result/result.component';
import { RankingComponent } from './components/ranking/ranking.component';

/* NGBOOTSTRAP */
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/* TRADUCTOR   */
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClickOutside } from './helpers/clickOutside.directive';

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

/* LEGAL */
import { LegalComponent } from './components/legal/legal.component';

import { QuillModule } from '@ngx-quill';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ErrorComponent,
    CreatorComponent,
    UserComponent,
    LoginComponent,
    FormComponent,
    BlogComponent,
    PostComponent,
    MapComponent,
    CountryComponent,
    ConceptsComponent,
    TestsComponent,
    TestComponent,
    ResultComponent,
    RankingComponent,
    ClickOutside,
    LegalComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule,
    QuillModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}
