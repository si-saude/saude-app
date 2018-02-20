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
import { MenuComponent } from './includes/menu/menu.component';
import { SidenavComponent } from './includes/sidenav/sidenav.component';
import { SharedModule } from './controller/shared.module';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BaseGuard } from './guards/guards-child/base.guard';
import { CargoGuard } from './guards/guards-child/cargo.guard';
import { CidadeGuard } from './guards/guards-child/cidade.guard';
import { ConvocacaoGuard } from './guards/guards-child/convocacao.guard';
import { CriterioGuard } from './guards/guards-child/criterio.guard';
import { CursoGuard } from './guards/guards-child/curso.guard';
import { EmpregadoGuard } from './guards/guards-child/empregado.guard';
import { EquipeGuard } from './guards/guards-child/equipe.guard';
import { ExameGuard } from './guards/guards-child/exame.guard';
import { FornecedorGuard } from './guards/guards-child/fornecedor.guard';
import { FuncaoGuard } from './guards/guards-child/funcao.guard';
import { GerenciaGuard } from './guards/guards-child/gerencia.guard';
import { GheGuard } from './guards/guards-child/ghe.guard';
import { GheeGuard } from './guards/guards-child/ghee.guard';
import { GrupoMonitoramentoGuard } from './guards/guards-child/grupo-monitoramento.guard';
import { IndicadorRiscoAcidenteGuard } from './guards/guards-child/indicador-risco-acidente.guard';
import { IndicadorRiscoAmbientalGuard } from './guards/guards-child/indicador-risco-ambiental.guard';
import { IndicadorRiscoErgonomicoGuard } from './guards/guards-child/indicador-risco-ergonomico.guard';
import { IndicadorRiscoSanitarioGuard } from './guards/guards-child/indicador-risco-sanitario.guard';
import { IndicadorRiscoSaudeAmbientalGuard } from './guards/guards-child/indicador-risco-saude-ambiental.guard';
import { InstalacaoGuard } from './guards/guards-child/instalacao.guard';
import { LocalizacaoGuard } from './guards/guards-child/localizacao.guard';
import { PerfilGuard } from './guards/guards-child/perfil.guard';
import { PeriodicidadeGuard } from './guards/guards-child/periodicidade.guard';
import { ProfissiogramaGuard } from './guards/guards-child/profissiograma.guard';
import { ProfissionalSaudeGuard } from './guards/guards-child/profissional-saude.guard';
import { RelatorioMedicoGuard } from './guards/guards-child/relatorio-medico.guard';
import { RegimeGuard } from './guards/guards-child/regime.guard';
import { RequisitoAsoGuard } from './guards/guards-child/requisito-aso.guard';
import { TipoGrupoMonitoramentoGuard } from './guards/guards-child/tipo-grupo-monitoramento.guard';
import { UsuarioGuard } from './guards/guards-child/usuario.guard';
import { VacinaGuard } from './guards/guards-child/vacina.guard';
import { EmpregadoConvocacaoGuard } from './guards/guards-child/empregado-convocacao.guard';
import { FeriadoGuard } from './guards/guards-child/feriado.guard';
import { ServicoGuard } from './guards/guards-child/servico.guard';
import { RegraAtendimentoGuard } from './guards/guards-child/regra-atendimento.guard';
import { AuditoriaAsoGuard } from './guards/guards-child/auditoria-aso.guard';
import { SolicitacaoServicoService } from './solicitacao-servico/solicitacao-servico.service';
import { TransferDataService } from './solicitacao-servico/transfer-data.service';
import { AtendimentoGuard } from './guards/guards-child/atendimento.guard';
import { AuditoriaResultadoExameGuard } from './guards/guards-child/auditoria-resultado-exame.guard';
import { AgendaGuard } from './guards/guards-child/agenda.guard';
import { FilaEsperaOcupacionalRecepcaoGuard } from './guards/guards-child/fila-espera-ocupacional-recepcao.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    NavbarPrincipalComponent,
    HomeComponent,
    PermissaoComponent,
    MenuComponent,
    SidenavComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    HttpModule,
    LoginModule,
    ContatoModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [ 
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    AuthService,
    CanDeactivateGuard,
    AuthGuard,
    AtendimentoGuard,
    BaseGuard,
    CargoGuard,
    CidadeGuard,
    ConvocacaoGuard,
    CriterioGuard,
    CursoGuard,
    EmpregadoGuard,
    EquipeGuard,
    ExameGuard,
    FornecedorGuard,
    FuncaoGuard,
    GerenciaGuard,
    GheGuard,
    GheeGuard,
    GrupoMonitoramentoGuard,
    IndicadorRiscoAcidenteGuard,
    IndicadorRiscoAmbientalGuard,
    IndicadorRiscoErgonomicoGuard,
    IndicadorRiscoSanitarioGuard,
    IndicadorRiscoSaudeAmbientalGuard,
    InstalacaoGuard,
    LocalizacaoGuard,
    PerfilGuard,
    PeriodicidadeGuard,
    ProfissiogramaGuard,
    ProfissionalSaudeGuard,
    RegimeGuard,
    RequisitoAsoGuard,
    RelatorioMedicoGuard,
    TipoGrupoMonitoramentoGuard,
    UsuarioGuard,
    VacinaGuard,
    EmpregadoConvocacaoGuard,
    FeriadoGuard,
    AuditoriaResultadoExameGuard,
    RegraAtendimentoGuard,
    ServicoGuard,
    AtendimentoGuard,
    AuditoriaAsoGuard,
    AgendaGuard,
    FilaEsperaOcupacionalRecepcaoGuard
  ],
  bootstrap: [ 
    AppComponent
  ]
})
export class AppModule { }