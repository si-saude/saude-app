import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { MaterializeModule } from 'angular2-materialize';

import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './includes/navbar/navbar.component';
import { FooterComponent } from './includes/footer/footer.component';
import { ContatoModule } from './contato/contato.module';
import { NavbarPrincipalComponent } from './includes/navbar-principal/navbar-principal.component';
import { AuthService } from './login/auth.service';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { PermissaoComponent } from './controller/permissao/permissao.component';
import { PerfilModule } from './controller/perfil/perfil.module';
import { LocalizacaoModule } from './controller/localizacao/localizacao.module';
import { EquipeModule } from './controller/equipe/equipe.module';
import { GerenciaModule } from './controller/gerencia/gerencia.module';
import { ProfissionalSaudeModule } from './controller/profissional-saude/profissional-saude.module';
import { CargoModule } from './controller/cargo/cargo.module';
import { CursoModule } from './controller/curso/curso.module';
import { CidadeModule } from './controller/cidade/cidade.module';
import { VacinaModule } from './controller/vacina/vacina.module';
import { MenuComponent } from './includes/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    NavbarPrincipalComponent,
    HomeComponent,
    PermissaoComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    HttpModule,
    LoginModule,
    ContatoModule,
    PerfilModule,
    LocalizacaoModule,
    EquipeModule,
    GerenciaModule,
    ProfissionalSaudeModule,
    CargoModule,
    CursoModule,
    CidadeModule,
    VacinaModule,
    AppRoutingModule
  ],
  providers: [ 
    AuthService,
    AuthGuard
  ],
  bootstrap: [ 
    AppComponent
  ]
})
export class AppModule { }