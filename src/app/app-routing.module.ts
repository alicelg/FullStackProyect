import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './components/blog/blog.component';
import { ConceptsComponent } from './components/concepts/concepts.component';
import { CountryComponent } from './components/country/country.component';
import { CreatorComponent } from './components/creator/creator.component';
import { ErrorComponent } from './components/error/error.component';
import { FormComponent } from './components/form/form.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MapComponent } from './components/map/map.component';
import { PostComponent } from './components/post/post.component';
import { ResultComponent } from './components/result/result.component';
import { TestComponent } from './components/test/test.component';
import { TestsComponent } from './components/tests/tests.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'mapa', component: MapComponent },
  { path: 'mapa/pais/:code', component: CountryComponent },
  { path: 'conceptos', component: ConceptsComponent },
  { path: 'blog/general', component: BlogComponent },
  { path: 'blog/general/:id', component: PostComponent },
  { path: 'blog/hablando-de-politica', component: BlogComponent },
  { path: 'blog/hablando-de-politica/:id', component: PostComponent },
  { path: 'blog/new', component: FormComponent },
  { path: 'tests', component: TestsComponent },
  { path: 'test/:id', component: TestComponent },
  { path: 'test/:id/resultado', component: ResultComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: LoginComponent },
  { path: 'usuario/:id', component: UserComponent },
  { path: 'nosotros', component: CreatorComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
