import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ContatoComponent } from './contato/contato.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'contato', component: ContatoComponent },
  { path: '', pathMatch: 'full', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }