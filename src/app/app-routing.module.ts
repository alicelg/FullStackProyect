import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './components/blog/blog.component';
import { ConceptsComponent } from './components/concepts/concepts.component';
import { CountryComponent } from './components/country/country.component';
import { CreatorComponent } from './components/creator/creator.component';
import { ErrorComponent } from './components/error/error.component';
import { FormComponent } from './components/form/form.component';
import { HomeComponent } from './components/home/home.component';
import { LegalComponent } from './components/legal/legal.component';
import { LoginComponent } from './components/login/login.component';
import { MapComponent } from './components/map/map.component';
import { PostComponent } from './components/post/post.component';
import { ResultComponent } from './components/result/result.component';
import { TestComponent } from './components/test/test.component';
import { TestsComponent } from './components/tests/tests.component';
import { UserComponent } from './components/user/user.component';
import { InternalGuard } from './internal.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'mapa',
    component: MapComponent
  },
  {
    path: 'mapa/pais/:code',
    component: CountryComponent
  },
  {
    path: 'conceptos',
    component: ConceptsComponent
  },
  {
    path: 'blog/:type',
    component: BlogComponent
  },
  {
    path: 'blog/:type/:id',
    component: PostComponent
  },
  /* { path: 'blog/hablando-de-politica',
  component: BlogComponent }, */
  /* { path: 'blog/hablando-de-politica/:id',
  component: PostComponent }, */
  {
    path: 'nuevo/post',
    component: FormComponent,
    canActivate: [InternalGuard]
  },
  {
    path: 'tests',
    component: TestsComponent
  },
  {
    path: 'test/:testId',
    component: TestComponent,
    canActivate: [InternalGuard]
  },
  {
    path: 'test/:testId/resultado',
    component: ResultComponent,
    canActivate: [InternalGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [InternalGuard]

  },
  {
    path: 'signup',
    component: LoginComponent,
    canActivate: [InternalGuard]
  },
  {
    path: 'usuario/:id',
    component: UserComponent,
    canActivate: [InternalGuard]
  },
  {
    path: 'editar',
    component: UserComponent,
  },
  {
    path: 'nosotros',
    component: CreatorComponent
  },
  {
    path: 'privacidad',
    component: LegalComponent
  },
  {
    path: 'cookies',
    component: LegalComponent
  },
  {
    path: '**',
    component: ErrorComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
