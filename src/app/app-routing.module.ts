import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ContatoComponent } from './contato/contato.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { PermissaoComponent } from './controller/permissao/permissao.component';
import { PerfilComponent } from './controller/perfil/perfil.component';
import { LocalizacaoComponent } from './controller/localizacao/localizacao.component';
import { EquipeComponent } from './controller/equipe/equipe.component';
import { GerenciaComponent } from './controller/gerencia/gerencia.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'contato', component: ContatoComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'permissao', component: PermissaoComponent },
  { path: 'home', component: HomeComponent,
      canActivate: [AuthGuard] 
  },
  { path: 'localizacao', component: LocalizacaoComponent },
  { path: 'equipe', component: EquipeComponent },
  { path: 'gerencia', component: GerenciaComponent },
  { path: '', pathMatch: 'full', redirectTo: '/gerencia'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }