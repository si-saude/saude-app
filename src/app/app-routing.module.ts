import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ContatoComponent } from './contato/contato.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { PermissaoComponent } from './controller/permissao/permissao.component';
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
import { TipoGrupoMonitoramentoGuard } from './guards/guards-child/tipo-grupo-monitoramento.guard';
import { UsuarioGuard } from './guards/guards-child/usuario.guard';
import { VacinaGuard } from './guards/guards-child/vacina.guard';
import { EmpregadoConvocacaoGuard } from './guards/guards-child/empregado-convocacao.guard';
import { FeriadoGuard } from './guards/guards-child/feriado.guard';
import { RegraAtendimentoGuard } from './guards/guards-child/regra-atendimento.guard';
import { ResultadoExameGuard } from './guards/guards-child/resultado-exame.guard';
import { RequisitoAsoGuard } from './guards/guards-child/requisito-aso.guard';
import { AuditoriaAsoGuard } from './guards/guards-child/auditoria-aso.guard';
import { AtendimentoGuard } from './guards/guards-child/atendimento.guard';
import { ServicoGuard } from './guards/guards-child/servico.guard';
import { AgendaGuard } from './guards/guards-child/agenda.guard';
import { AgendaPeriodicoGuard } from './guards/agenda-periodico.guard';
import { RiscoGheGuard } from './guards/guards-child/risco-ghe.guard';
import { FilaEsperaOcupacionalRecepcaoGuard } from './guards/guards-child/fila-espera-ocupacional-recepcao.guard';
import { IndicadorSastGuard } from './guards/guards-child/indicador-sast.guard';
import { EixoGuard } from './guards/guards-child/eixo.guard';
import { DiagnosticoGuard } from './guards/guards-child/diagnostico.guard';
import { IntervencaoGuard } from './guards/guards-child/intervencao.guard';
import { PerguntaFichaColetaGuard } from './guards/guards-child/pergunta-ficha-coleta.guard';
import { RiscoPotencialGuard } from './guards/guards-child/risco-potencial.guard';
import { AgendaComponent } from './agenda/agenda.component';
import { FilaEsperaOcupacionalGuard } from './guards/guards-child/fila-espera-ocupacional.guard';
import { FonteGeradoraGuard } from './guards/guards-child/fonte-geradora.guard';
import { CategoriaRiscoGuard } from './guards/guards-child/categoria-risco.guard';
import { PossivelDanoSaudeGuard } from './guards/guards-child/possivel-dano-saude.guard';
import { AgenteRiscoGuard } from './guards/guards-child/agente-risco.guard';
import { AprhoGuard } from './guards/guards-child/aprho.guard';
import { TipoSolicitacaoGuard } from './guards/guards-child/tipo-solicitacao.guard';
import { CatGuard } from './guards/guards-child/cat.guard';
import { KanbanGuard } from './guards/kanban.guard';
import { AtestadoGuard } from './guards/guards-child/atestado.guard';
import { MudancaFuncaoGuard } from './guards/guards-child/mudanca-funcao.guard';
import { AtendimentoAvulsoGuard } from './guards/guards-child/atendimento-avulso.guard';
import { ParteCorpoAtingidaGuard } from './guards/guards-child/parte-corpo-atingida.guard';
import { AgenteCausadorGuard } from './guards/guards-child/agente-causador.guard';
import { NaturezaLesaoGuard } from './guards/guards-child/natureza-lesao.guard';
import { AvaliacaoHigieneOcupacionalGuard } from './guards/guards-child/avaliacao-higiene-ocupacional.guard';
import { EnfaseGuard } from './guards/guards-child/enfase.guard';
import { ImovelGuard } from './guards/guards-child/imovel.guard';
import { MotivoRecusaAtestadoGuard } from './guards/guards-child/motivo-recusa-atestado.guard';
import { AcaoIntervencaoGuard } from './guards/guards-child/acao-intervencao.guard';
import { EmpresaGuard } from './guards/guards-child/empresa.guard';
import { ClinicaGuard } from './guards/guards-child/clinica.guard';
import { ClassificacaoAfastamentoGuard } from './guards/guards-child/classificacao-afastamento.guard';
import { ItemAuditoriaAtestadoGuard } from './guards/guards-child/item-auditoria-atestado.guard';
import { ClassificacaoGravidadeGuard } from './guards/guards-child/classificacao-gravidade.guard';
import { AlimentoGuard } from './guards/guards-child/alimento.guard';
import { MedidaAlimentarGuard } from './guards/guards-child/medida-alimentar.guard';
import { IndicadorConhecimentoAlimentarGuard } from './guards/guards-child/indicador-conhecimento-alimentar.guard';
import { QuestionarioConhecimentoAlimentarGuard } from './guards/guards-child/questionario-conhecimento-alimentar.guard';
import { RecordatorioGuard } from './guards/guards-child/recordatorio.guard';
import { AtividadeFisicaGuard } from './guards/guards-child/atividade-fisica.guard';
import { TarefaAgendaGuard } from './guards/guards-child/tarefa-agenda.guard';
import { PlanoAlimentarGuard } from './guards/guards-child/plano-alimentar.guard';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'home', loadChildren: 'app/home/home.module#HomeModule',
        canActivate: [AuthGuard]
    },
    { path: 'contato', component: ContatoComponent },
    { path: 'permissao', component: PermissaoComponent },
    {
        path: 'agenda', loadChildren: 'app/agenda/agenda.module#AgendaModule',
        canActivateChild: [AgendaGuard]
    },
    {
        path: 'agenda-periodico', loadChildren: 'app/agenda-periodico/agenda-periodico.module#AgendaPeriodicoModule',
        canActivate: [AgendaPeriodicoGuard]
    },
    {
        path: 'perfil', loadChildren: 'app/controller/perfil/perfil.module#PerfilModule',
        canActivateChild: [PerfilGuard]
    },
    {
        path: 'localizacao', loadChildren: 'app/controller/localizacao/localizacao.module#LocalizacaoModule',
        canActivateChild: [LocalizacaoGuard]
    },
    {
        path: 'equipe', loadChildren: 'app/controller/equipe/equipe.module#EquipeModule',
        canActivateChild: [EquipeGuard]
    },
    {
        path: 'gerencia', loadChildren: 'app/controller/gerencia/gerencia.module#GerenciaModule',
        canActivateChild: [GerenciaGuard]
    },
    {
        path: 'profissional-saude', loadChildren: 'app/controller/profissional-saude/profissional-saude.module#ProfissionalSaudeModule',
        canActivateChild: [ProfissionalSaudeGuard]
    },
    {
        path: 'cargo', loadChildren: 'app/controller/cargo/cargo.module#CargoModule',
        canActivateChild: [CargoGuard]
    },
    {
        path: 'curso', loadChildren: 'app/controller/curso/curso.module#CursoModule',
        canActivateChild: [CursoGuard]
    },
    {
        path: 'cidade', loadChildren: 'app/controller/cidade/cidade.module#CidadeModule',
        canActivateChild: [CidadeGuard]
    },
    {
        path: 'clinica', loadChildren: 'app/controller/clinica/clinica.module#ClinicaModule',
        canActivateChild: [ClinicaGuard]
    },
    {
        path: 'ghe', loadChildren: 'app/controller/ghe/ghe.module#GheModule',
        canActivateChild: [GheGuard]
    },
    {
        path: 'periodicidade', loadChildren: 'app/controller/periodicidade/periodicidade.module#PeriodicidadeModule',
        canActivateChild: [PeriodicidadeGuard]
    },
    {
        path: 'indicador-risco-acidente',
        loadChildren: 'app/controller/indicador-risco-acidente/indicador-risco-acidente.module#IndicadorRiscoAcidenteModule',
        canActivateChild: [IndicadorRiscoAcidenteGuard]
    },
    {
        path: 'indicador-risco-ambiental',
        loadChildren: 'app/controller/indicador-risco-ambiental/indicador-risco-ambiental.module#IndicadorRiscoAmbientalModule',
        canActivateChild: [IndicadorRiscoAmbientalGuard]
    },
    {
        path: 'indicador-risco-ergonomico',
        loadChildren: 'app/controller/indicador-risco-ergonomico/indicador-risco-ergonomico.module#IndicadorRiscoErgonomicoModule',
        canActivateChild: [IndicadorRiscoErgonomicoGuard]
    },
    {
        path: 'indicador-risco-sanitario',
        loadChildren: 'app/controller/indicador-risco-sanitario/indicador-risco-sanitario.module#IndicadorRiscoSanitarioModule',
        canActivateChild: [IndicadorRiscoSanitarioGuard]
    },
    {
        path: 'indicador-risco-saude-ambiental',
        loadChildren: 'app/controller/indicador-risco-saude-ambiental/indicador-risco-saude-ambiental.module#IndicadorRiscoSaudeAmbientalModule',
        canActivateChild: [IndicadorRiscoSaudeAmbientalGuard]
    },
    {
        path: 'instalacao', loadChildren: 'app/controller/instalacao/instalacao.module#InstalacaoModule',
        canActivateChild: [InstalacaoGuard]
    },
    {
        path: 'funcao', loadChildren: 'app/controller/funcao/funcao.module#FuncaoModule',
        canActivateChild: [FuncaoGuard]
    },
    {
        path: 'regime', loadChildren: 'app/controller/regime/regime.module#RegimeModule',
        canActivateChild: [RegimeGuard]
    },
    {
        path: 'base', loadChildren: 'app/controller/base/base.module#BaseModule',
        canActivateChild: [BaseGuard]
    },
    {
        path: 'ghee', loadChildren: 'app/controller/ghee/ghee.module#GheeModule',
        canActivateChild: [GheeGuard]
    },
    {
        path: 'empregado', loadChildren: 'app/controller/empregado/empregado.module#EmpregadoModule',
        canActivateChild: [EmpregadoGuard]
    },
    {
        path: 'tipo-grupo-monitoramento', loadChildren: 'app/controller/tipo-grupo-monitoramento/tipo-grupo-monitoramento.module#TipoGrupoMonitoramentoModule',
        canActivateChild: [TipoGrupoMonitoramentoGuard]
    },
    {
        path: 'criterio', loadChildren: 'app/controller/criterio/criterio.module#CriterioModule',
        canActivateChild: [CriterioGuard]
    },
    {
        path: 'tarefa-agenda', loadChildren: 'app/controller/tarefa-agenda/tarefa-agenda.module#TarefaAgendaModule',
        canActivateChild: [TarefaAgendaGuard]
    },
    {
        path: 'exame', loadChildren: 'app/controller/exame/exame.module#ExameModule',
        canActivateChild: [ExameGuard]
    },
    {
        path: 'grupo-monitoramento', loadChildren: 'app/controller/grupo-monitoramento/grupo-monitoramento.module#GrupoMonitoramentoModule',
        canActivateChild: [GrupoMonitoramentoGuard]
    },
    {
        path: 'profissiograma', loadChildren: 'app/controller/profissiograma/profissiograma.module#ProfissiogramaModule',
        canActivateChild: [ProfissiogramaGuard]
    },
    {
        path: 'vacina', loadChildren: 'app/controller/vacina/vacina.module#VacinaModule',
        canActivateChild: [VacinaGuard]
    },
    {
        path: 'fornecedor', loadChildren: 'app/controller/fornecedor/fornecedor.module#FornecedorModule',
        canActivateChild: [FornecedorGuard]
    },
    {
        path: 'convocacao', loadChildren: 'app/controller/convocacao/convocacao.module#ConvocacaoModule',
        canActivateChild: [ConvocacaoGuard]
    },
    {
        path: 'auditoria-exame', loadChildren: 'app/controller/empregado-convocacao/empregado-convocacao.module#EmpregadoConvocacaoModule',
        canActivateChild: [EmpregadoConvocacaoGuard]
    },
    {
        path: 'usuario', loadChildren: 'app/controller/usuario/usuario.module#UsuarioModule',
        canActivateChild: [UsuarioGuard]
    },
    {
        path: 'feriado', loadChildren: 'app/controller/feriado/feriado.module#FeriadoModule',
        canActivateChild: [FeriadoGuard]
    },
    {
        path: 'servico', loadChildren: 'app/controller/servico/servico.module#ServicoModule',
        canActivateChild: [ServicoGuard]
    },
    {
        path: 'regra-atendimento',
        loadChildren: 'app/controller/regra-atendimento/regra-atendimento.module#RegraAtendimentoModule',
        canActivateChild: [RegraAtendimentoGuard]
    },
    {
        path: 'solicitacao-servico',
        loadChildren: 'app/solicitacao-servico/solicitacao-servico.module#SolicitacaoServicoModule'
    },
    {
        path: 'fila-espera-ocupacional',
        loadChildren: 'app/controller/fila-espera-ocupacional/fila-espera-ocupacional.module#FilaEsperaOcupacionalModule',
        canActivateChild: [FilaEsperaOcupacionalGuard]
    },
    {
        path: 'fila-espera-ocupacional-recepcao',
        loadChildren: 'app/controller/fila-espera-ocupacional/fila-espera-ocupacional-recepcao.module#FilaEsperaOcupacionalRecepcaoModule',
        canActivateChild: [FilaEsperaOcupacionalRecepcaoGuard]
    },
    {
        path: 'requisito-aso',
        loadChildren: 'app/controller/requisito-aso/requisito-aso.module#RequisitoAsoModule',
        canActivateChild: [RequisitoAsoGuard]
    },
    {
        path: 'atendimento',
        loadChildren: 'app/controller/atendimento/atendimento.module#AtendimentoModule',
        canActivateChild: [AtendimentoGuard]
    },
    {
        path: 'auditoria-aso',
        loadChildren: 'app/controller/auditoria-aso/auditoria-aso.module#AuditoriaAsoModule',
        canActivateChild: [AuditoriaAsoGuard]
    },
    {
        path: 'indicador-sast',
        loadChildren: 'app/controller/indicador-sast/indicador-sast.module#IndicadorSastModule',
        canActivateChild: [IndicadorSastGuard]
    },
    {
        path: 'eixo',
        loadChildren: 'app/controller/eixo/eixo.module#EixoModule',
        canActivateChild: [EixoGuard]
    },
    {
        path: 'diagnostico',
        loadChildren: 'app/controller/diagnostico/diagnostico.module#DiagnosticoModule',
        canActivateChild: [DiagnosticoGuard]
    },
    {
        path: 'intervencao',
        loadChildren: 'app/controller/intervencao/intervencao.module#IntervencaoModule',
        canActivateChild: [IntervencaoGuard]
    },
    {
        path: 'pergunta-ficha-coleta',
        loadChildren: 'app/controller/pergunta-ficha-coleta/pergunta-ficha-coleta.module#PerguntaFichaColetaModule',
        canActivateChild: [PerguntaFichaColetaGuard]
    },
    {
        path: 'risco-ghe',
        loadChildren: 'app/controller/risco-ghe/risco-ghe.module#RiscoGheModule',
        canActivateChild: [RiscoGheGuard]
    },
    {
        path: 'risco-potencial',
        loadChildren: 'app/controller/risco-potencial/risco-potencial.module#RiscoPotencialModule',
        canActivateChild: [RiscoPotencialGuard]
    },
    {
        path: 'tipo-solicitacao',
        loadChildren: 'app/controller/tipo-solicitacao/tipo-solicitacao.module#TipoSolicitacaoModule',
        canActivateChild: [TipoSolicitacaoGuard]
    },
    {
        path: 'kanban',
        loadChildren: 'app/kanban/kanban.module#KanbanModule',
        canActivate: [KanbanGuard]
    },
    {
        path: 'tarefa',
        loadChildren: 'app/controller/tarefa/tarefa.module#TarefaModule'
    },
    {
        path: 'reports',
        loadChildren: 'app/reports/reports.module#ReportsModule'
    },
    {
        path: 'fonte-geradora',
        loadChildren: 'app/controller/fonte-geradora/fonte-geradora.module#FonteGeradoraModule',
        canActivateChild: [FonteGeradoraGuard]
    },
    {
        path: 'categoria-risco',
        loadChildren: 'app/controller/categoria-risco/categoria-risco.module#CategoriaRiscoModule',
        canActivateChild: [CategoriaRiscoGuard]
    },
    {
        path: 'possivel-dano-saude',
        loadChildren: 'app/controller/possivel-dano-saude/possivel-dano-saude.module#PossivelDanoSaudeModule',
        canActivateChild: [PossivelDanoSaudeGuard]
    },
    {
        path: 'agente-risco',
        loadChildren: 'app/controller/agente-risco/agente-risco.module#AgenteRiscoModule',
        canActivateChild: [AgenteRiscoGuard]
    },
    {
        path: 'aprho',
        loadChildren: 'app/controller/aprho/aprho.module#AprhoModule',
        canActivateChild: [AprhoGuard]
    },
    {
        path: 'cat',
        loadChildren: 'app/controller/cat/cat.module#CatModule',
        canActivateChild: [CatGuard]
    },
    {
        path: 'atestado',
        loadChildren: 'app/controller/atestado/atestado.module#AtestadoModule',
        canActivateChild: [AtestadoGuard]
    },
    {
        path: 'mudanca-funcao',
        loadChildren: 'app/controller/mudanca-funcao/mudanca-funcao.module#MudancaFuncaoModule',
        canActivateChild: [MudancaFuncaoGuard]
    },
    {
        path: 'atendimento-avulso',
        loadChildren: 'app/controller/atendimento-avulso/atendimento-avulso.module#AtendimentoAvulsoModule',
        canActivateChild: [AtendimentoAvulsoGuard]
    },
    {
        path: 'parte-corpo-atingida',
        loadChildren: 'app/controller/parte-corpo-atingida/parte-corpo-atingida.module#ParteCorpoAtingidaModule',
        canActivateChild: [ParteCorpoAtingidaGuard]
    },
    {
        path: 'agente-causador',
        loadChildren: 'app/controller/agente-causador/agente-causador.module#AgenteCausadorModule',
        canActivateChild: [AgenteCausadorGuard]
    },
    {
        path: 'natureza-lesao',
        loadChildren: 'app/controller/natureza-lesao/natureza-lesao.module#NaturezaLesaoModule',
        canActivateChild: [NaturezaLesaoGuard]
    },
    {
        path: 'avaliacao-higiene-ocupacional',
        loadChildren: 'app/controller/avaliacao-higiene-ocupacional/avaliacao-higiene-ocupacional.module#AvaliacaoHigieneOcupacionalModule',
        canActivateChild: [AvaliacaoHigieneOcupacionalGuard]
    },
    {
        path: 'enfase',
        loadChildren: 'app/controller/enfase/enfase.module#EnfaseModule',
        canActivateChild: [EnfaseGuard]
    },
    {
        path: 'solicitacao-central-integra',
        loadChildren: 'app/controller/solicitacao-central-integra/solicitacao-central-integra.module#SolicitacaoCentralIntegraModule'
    },
    {
        path: 'imovel',
        loadChildren: 'app/controller/imovel/imovel.module#ImovelModule',
        canActivateChild: [ImovelGuard]
    },
    {
        path: 'motivo-recusa-atestado',
        loadChildren: 'app/controller/motivo-recusa-atestado/motivo-recusa-atestado.module#MotivoRecusaAtestadoModule',
        canActivateChild: [MotivoRecusaAtestadoGuard]
    },
    {
        path: 'acao-intervencao',
        loadChildren: 'app/controller/acao-intervencao/acao-intervencao.module#AcaoIntervencaoModule',
        canActivateChild: [AcaoIntervencaoGuard]
    },
    {
        path: 'empresa',
        loadChildren: 'app/controller/empresa/empresa.module#EmpresaModule',
        canActivateChild: [EmpresaGuard]
    },
    {
        path: 'classificacao-afastamento',
        loadChildren: 'app/controller/classificacao-afastamento/classificacao-afastamento.module#ClassificacaoAfastamentoModule',
        canActivateChild: [ClassificacaoAfastamentoGuard]
    },
    {
        path: 'item-auditoria-atestado',
        loadChildren: 'app/controller/item-auditoria-atestado/item-auditoria-atestado.module#ItemAuditoriaAtestadoModule',
        canActivateChild: [ItemAuditoriaAtestadoGuard]
    },
    {
        path: 'classificacao-gravidade',
        loadChildren: 'app/controller/classificacao-gravidade/classificacao-gravidade.module#ClassificacaoGravidadeModule',
        canActivateChild: [ClassificacaoGravidadeGuard]
    },
    {
        path: 'alimento',
        loadChildren: 'app/controller/alimento/alimento.module#AlimentoModule',
        canActivateChild: [AlimentoGuard]
    },
    {
        path: 'medida-alimentar',
        loadChildren: 'app/controller/medida-alimentar/medida-alimentar.module#MedidaAlimentarModule',
        canActivateChild: [MedidaAlimentarGuard]
    },
    {
        path: 'indicador-conhecimento-alimentar',
        loadChildren: 'app/controller/indicador-conhecimento-alimentar/indicador-conhecimento-alimentar.module#IndicadorConhecimentoAlimentarModule',
        canActivateChild: [IndicadorConhecimentoAlimentarGuard]
    },
    {
        path: 'questionario-conhecimento-alimentar',
        loadChildren: 'app/controller/questionario-conhecimento-alimentar/questionario-conhecimento-alimentar.module#QuestionarioConhecimentoAlimentarModule',
        canActivateChild: [QuestionarioConhecimentoAlimentarGuard]
    },
    {
        path: 'recordatorio',
        loadChildren: 'app/controller/recordatorio/recordatorio.module#RecordatorioModule',
        canActivateChild: [RecordatorioGuard]
    },
    {
        path: 'atividade-fisica',
        loadChildren: 'app/controller/atividade-fisica/atividade-fisica.module#AtividadeFisicaModule',
        canActivateChild: [AtividadeFisicaGuard]
    }, 
    {
        path: 'plano-alimentar',
        loadChildren: 'app/controller/plano-alimentar/plano-alimentar.module#PlanoAlimentarModule',
        canActivateChild: [PlanoAlimentarGuard]
    },
    
    { path: '', pathMatch: 'full', redirectTo: '/home' },
    { path: '404', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/404' }
];

@NgModule( {
    imports: [RouterModule.forRoot( routes )],
    exports: [RouterModule]
} )
export class AppRoutingModule { }