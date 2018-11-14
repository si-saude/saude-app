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
import { AuditoriaResultadoExameGuard } from './guards/guards-child/auditoria-resultado-exame.guard';
import { AgendaGuard } from './guards/guards-child/agenda.guard';
import { AgendaPeriodicoGuard } from './guards/agenda-periodico.guard';
import { AtendimentoGuard } from './guards/guards-child/atendimento.guard';
import { FilaEsperaOcupacionalRecepcaoGuard } from './guards/guards-child/fila-espera-ocupacional-recepcao.guard';
import { IndicadorSastGuard } from './guards/guards-child/indicador-sast.guard';
import { EixoGuard } from './guards/guards-child/eixo.guard';
import { DiagnosticoGuard } from './guards/guards-child/diagnostico.guard';
import { IntervencaoGuard } from './guards/guards-child/intervencao.guard';
import { PerguntaFichaColetaGuard } from './guards/guards-child/pergunta-ficha-coleta.guard';
import { RiscoGheGuard } from './guards/guards-child/risco-ghe.guard';
import { RiscoPotencialGuard } from './guards/guards-child/risco-potencial.guard';
import { FilaEsperaOcupacionalGuard } from './guards/guards-child/fila-espera-ocupacional.guard';
import { EmpregadosPorGrupoGuard } from './guards/guards-child/empregados-por-grupo.guard';
import { PanoramaGuard } from './guards/panorama.guard';
import { DeclaracaoComparecimentoGuard } from './guards/guards-child/declaracao-comparecimento.guard';
import { QuadroAtendimentoGuard } from './guards/guards-child/quadro-atendimento.guard';
import { FonteGeradoraGuard } from './guards/guards-child/fonte-geradora.guard';
import { CategoriaRiscoGuard } from './guards/guards-child/categoria-risco.guard';
import { PossivelDanoSaudeGuard } from './guards/guards-child/possivel-dano-saude.guard';
import { AgenteRiscoGuard } from './guards/guards-child/agente-risco.guard';
import { AprhoGuard } from './guards/guards-child/aprho.guard';
import { TipoSolicitacaoGuard } from './guards/guards-child/tipo-solicitacao.guard';
import { CatGuard } from './guards/guards-child/cat.guard';
import { ClinicaGuard } from './guards/guards-child/clinica.guard';
import { AtestadoGuard } from './guards/guards-child/atestado.guard';
import { ReportSolicitacaoCentralIntegraGuard } from './guards/report-solicitacao-central-integra.guard';
import { KanbanGuard } from './guards/kanban.guard';
import { MudancaFuncaoGuard } from './guards/guards-child/mudanca-funcao.guard';
import { AtendimentoAvulsoGuard } from './guards/guards-child/atendimento-avulso.guard';
import { ParteCorpoAtingidaGuard } from './guards/guards-child/parte-corpo-atingida.guard';
import { AgenteCausadorGuard } from './guards/guards-child/agente-causador.guard';
import { NaturezaLesaoGuard } from './guards/guards-child/natureza-lesao.guard';
import { ReportCatGuard } from './guards/report-cat.guard';
import { ReportControleAtestadoGuard } from './guards/report-controle-atestado.guard';
import { ReportAvaliacaoHigieneOcupacionalGuard } from './guards/report-avaliacao-higiene-ocupacional.guard';
import { ReportPreRequisitosAgendamentoGuard } from './guards/report-pre-requisitos-agendamento.guard';
import { AvaliacaoHigieneOcupacionalGuard } from './guards/guards-child/avaliacao-higiene-ocupacional.guard';
import { EnfaseGuard } from './guards/guards-child/enfase.guard';
import { ImovelGuard } from './guards/guards-child/imovel.guard';
import { AcaoIntervencaoGuard } from './guards/guards-child/acao-intervencao.guard'; 
import { MotivoRecusaAtestadoGuard } from './guards/guards-child/motivo-recusa-atestado.guard';
import { EmpresaGuard } from './guards/guards-child/empresa.guard';
import { ClassificacaoAfastamentoGuard } from './guards/guards-child/classificacao-afastamento.guard';
import { ItemAuditoriaAtestadoGuard } from './guards/guards-child/item-auditoria-atestado.guard';
import { ClassificacaoGravidadeGuard } from './guards/guards-child/classificacao-gravidade.guard';
import { ReportMudancaFuncaoGuard } from './guards/report-mudanca-funcao.guard';
import { ReportAcompanhamentoSastGuard } from './guards/report-acompanhamento-sast.guard';
import { NutricaoAlimentoGuard } from './guards/guards-child/nutricao-alimento.guard';
import { MedidaAlimentarGuard } from './guards/guards-child/medida-alimentar.guard';
import { IndicadorConhecimentoAlimentarGuard } from './guards/guards-child/indicador-conhecimento-alimentar.guard';
import { QuestionarioConhecimentoAlimentarGuard } from './guards/guards-child/questionario-conhecimento-alimentar.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    NavbarPrincipalComponent,
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
    TipoGrupoMonitoramentoGuard,
    UsuarioGuard,
    VacinaGuard,
    EmpregadoConvocacaoGuard,
    FeriadoGuard,
    AuditoriaResultadoExameGuard,
    RegraAtendimentoGuard,
    ServicoGuard,
    AuditoriaAsoGuard,
    AgendaGuard,
    FilaEsperaOcupacionalRecepcaoGuard,
    FilaEsperaOcupacionalGuard,
    IndicadorSastGuard,
    EixoGuard,
    DiagnosticoGuard,
    PerguntaFichaColetaGuard,
    IntervencaoGuard,
    RiscoGheGuard,
    RiscoPotencialGuard,
    EmpregadosPorGrupoGuard,
    DeclaracaoComparecimentoGuard,
    QuadroAtendimentoGuard,
    PanoramaGuard,
    FonteGeradoraGuard,
    CategoriaRiscoGuard,
    PossivelDanoSaudeGuard,
    AgenteRiscoGuard,
    AprhoGuard,
    TipoSolicitacaoGuard,
    ReportSolicitacaoCentralIntegraGuard,
    KanbanGuard,
    AgendaPeriodicoGuard,
    CatGuard,
    ClinicaGuard,
    AtestadoGuard,
    MudancaFuncaoGuard,
    AtendimentoAvulsoGuard,
    ParteCorpoAtingidaGuard,
    AgenteCausadorGuard,
    NaturezaLesaoGuard,
    ReportCatGuard,
    ReportControleAtestadoGuard,
    AvaliacaoHigieneOcupacionalGuard,
    EnfaseGuard,
    ReportAvaliacaoHigieneOcupacionalGuard,
    ReportPreRequisitosAgendamentoGuard,
    ImovelGuard,
    MotivoRecusaAtestadoGuard,
    AcaoIntervencaoGuard,
    EmpresaGuard,
    ClassificacaoAfastamentoGuard,
    ItemAuditoriaAtestadoGuard,
    ClassificacaoGravidadeGuard,
    ReportMudancaFuncaoGuard,
    ReportAcompanhamentoSastGuard,
    NutricaoAlimentoGuard,
    MedidaAlimentarGuard,
    IndicadorConhecimentoAlimentarGuard,
    QuestionarioConhecimentoAlimentarGuard
  ],
  bootstrap: [ 
    AppComponent
  ]
})
export class AppModule { }