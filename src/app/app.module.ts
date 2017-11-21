import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
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
import { GheModule } from './controller/ghe/ghe.module';
import { PeriodicidadeModule } from './controller/periodicidade/periodicidade.module';
import { IndicadorRiscoAcidenteModule } from './controller/indicador-risco-acidente/indicador-risco-acidente.module';
import { IndicadorRiscoAmbientalModule } from './controller/indicador-risco-ambiental/indicador-risco-ambiental.module';
import { IndicadorRiscoErgonomicoModule } from './controller/indicador-risco-ergonomico/indicador-risco-ergonomico.module';
import { IndicadorRiscoSanitarioModule } from './controller/indicador-risco-sanitario/indicador-risco-sanitario.module';
import { IndicadorRiscoSaudeAmbientalModule } from './controller/indicador-risco-saude-ambiental/indicador-risco-saude-ambiental.module';
import { InstalacaoModule } from './controller/instalacao/instalacao.module';
import { FuncaoModule } from './controller/funcao/funcao.module';
import { RegimeModule } from './controller/regime/regime.module';
import { BaseModule } from './controller/base/base.module';
import { GheeModule } from './controller/ghee/ghee.module';
import { EmpregadoModule } from './controller/empregado/empregado.module';
import { TipoGrupoMonitoramentoModule } from './controller/tipo-grupo-monitoramento/tipo-grupo-monitoramento.module';
import { CriterioModule } from './controller/criterio/criterio.module';
import { ExameModule } from './controller/exame/exame.module';
import { GrupoMonitoramentoModule } from './controller/grupo-monitoramento/grupo-monitoramento.module';
import { ProfissiogramaModule } from './controller/profissiograma/profissiograma.module';
import { FornecedorModule } from './controller/fornecedor/fornecedor.module';
import { ConvocacaoModule } from './controller/convocacao/convocacao.module';
import { MenuComponent } from './includes/menu/menu.component';
import { SidenavComponent } from './includes/sidenav/sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    NavbarPrincipalComponent,
    HomeComponent,
    PermissaoComponent,
    MenuComponent,
    SidenavComponent
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
    GheModule,
    PeriodicidadeModule,
    IndicadorRiscoAcidenteModule,
    IndicadorRiscoAmbientalModule,
    IndicadorRiscoErgonomicoModule,
    IndicadorRiscoSanitarioModule,
    IndicadorRiscoSaudeAmbientalModule,
    InstalacaoModule,
    FuncaoModule,
    RegimeModule,
    BaseModule,
    GheeModule,
    EmpregadoModule,
    TipoGrupoMonitoramentoModule,
    CriterioModule,
    ExameModule,
    GrupoMonitoramentoModule,
    ProfissiogramaModule,
    FornecedorModule,
    ConvocacaoModule,
    AppRoutingModule
  ],
  providers: [ 
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    AuthService,
    AuthGuard
  ],
  bootstrap: [ 
    AppComponent
  ]
})
export class AppModule { }