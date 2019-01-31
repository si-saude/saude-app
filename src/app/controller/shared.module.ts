import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterializeModule } from 'angular2-materialize';

import { IntegerMaskDirectiveModule } from './../directives/integer-mask-directive/integer-mask-directive.module';
import { DatePickerModule } from './../includes/date-picker/date-picker.module';
import { TimePickerModule } from './../includes/time-picker/time-picker.module';
import { MensagemFormModule } from './../includes/mensagem-form/mensagem-form.module';
import { PreloadComponent } from './../includes/preload/preload.component';
import { ConfirmSaveModule } from './../includes/confirm-save/confirm-save.module';
import { ConfirmDeleteComponent } from './../includes/confirm-delete/confirm-delete.component';
import { PaginacaoComponent } from './../includes/paginacao/paginacao.component';
import { PerfilService } from './perfil/perfil.service';
import { BaseService } from './base/base.service';
import { CargoService } from './cargo/cargo.service';
import { ConvocacaoService } from './convocacao/convocacao.service';
import { CriterioService } from './criterio/criterio.service';
import { CidadeService } from './cidade/cidade.service';
import { ClinicaService } from './clinica/clinica.service';
import { CursoService } from './curso/curso.service';
import { EmpregadoService } from './empregado/empregado.service';
import { EquipeService } from './equipe/equipe.service';
import { ExameService } from './exame/exame.service';
import { FornecedorService } from './fornecedor/fornecedor.service';
import { FuncaoService } from './funcao/funcao.service';
import { GerenciaService } from './gerencia/gerencia.service';
import { GheService } from './ghe/ghe.service';
import { GheeService } from './ghee/ghee.service';
import { GrupoMonitoramentoService } from './grupo-monitoramento/grupo-monitoramento.service';
import { IndicadorRiscoAcidenteService } from './indicador-risco-acidente/indicador-risco-acidente.service';
import { IndicadorRiscoAmbientalService } from './indicador-risco-ambiental/indicador-risco-ambiental.service';
import { IndicadorRiscoErgonomicoService } from './indicador-risco-ergonomico/indicador-risco-ergonomico.service';
import { IndicadorRiscoSanitarioService } from './indicador-risco-sanitario/indicador-risco-sanitario.service';
import { IndicadorRiscoSaudeAmbientalService } from './indicador-risco-saude-ambiental/indicador-risco-saude-ambiental.service';
import { InstalacaoService } from './instalacao/instalacao.service';
import { LocalizacaoService } from './localizacao/localizacao.service';
import { PeriodicidadeService } from './periodicidade/periodicidade.service';
import { ProfissiogramaService } from './profissiograma/profissiograma.service';
import { ProfissionalSaudeService } from './profissional-saude/profissional-saude.service';
import { RegimeService } from './regime/regime.service';
import { TipoGrupoMonitoramentoService } from './tipo-grupo-monitoramento/tipo-grupo-monitoramento.service';
import { VacinaService } from './vacina/vacina.service';
import { UsuarioService } from './usuario/usuario.service';
import { ResultadoExameService } from './resultado-exame/resultado-exame.service';
import { FeriadoService } from './feriado/feriado.service';
import { PessoaService } from './pessoa/pessoa.service';
import { ServicoService } from './servico/servico.service';
import { RegraAtendimentoService } from './regra-atendimento/regra-atendimento.service';
import { FilaEsperaOcupacionalService } from './fila-espera-ocupacional/fila-espera-ocupacional.service';
import { FilaAtendimentoOcupacionalService } from './fila-atendimento-ocupacional/fila-atendimento-ocupacional.service';
import { AtendimentoService } from './atendimento/atendimento.service';
import { RequisitoAsoService } from './requisito-aso/requisito-aso.service';
import { AuditoriaAsoService } from './auditoria-aso/auditoria-aso.service';
import { RiscoGheService } from './risco-ghe/risco-ghe.service';
import { AgendaService } from './../agenda/agenda.service';
import { AgendaPeriodicoService } from './../agenda-periodico/agenda-periodico.service';
import { CanDeactivateGuard } from './../guards/can-deactivate.guard';
import { IndicadorSastService } from './indicador-sast/indicador-sast.service';
import { EixoService } from './eixo/eixo.service';
import { DiagnosticoService } from './diagnostico/diagnostico.service';
import { IntervencaoService } from './intervencao/intervencao.service';
import { PerguntaFichaColetaService } from './pergunta-ficha-coleta/pergunta-ficha-coleta.service';
import { RiscoPotencialService } from './risco-potencial/risco-potencial.service';
import { TriagemService } from './triagem/triagem.service';
import { TipoSolicitacaoService } from './tipo-solicitacao/tipo-solicitacao.service';
import { SolicitacaoCentralIntegraService } from './solicitacao-central-integra/solicitacao-central-integra.service';
import { TarefaComponent } from './tarefa/tarefa.component';
import { FonteGeradoraService } from './fonte-geradora/fonte-geradora.service';
import { CategoriaRiscoService } from './categoria-risco/categoria-risco.service';
import { PossivelDanoSaudeService } from './possivel-dano-saude/possivel-dano-saude.service';
import { AgenteRiscoService } from './agente-risco/agente-risco.service';
import { AprhoService } from './aprho/aprho.service';
import { CatService } from './cat/cat.service';
import { AtestadoService } from './atestado/atestado.service';
import { MudancaFuncaoService } from './mudanca-funcao/mudanca-funcao.service';
import { TarefaService } from './tarefa/tarefa.service';
import { ParteCorpoAtingidaService } from './parte-corpo-atingida/parte-corpo-atingida.service';
import { AgenteCausadorService } from './agente-causador/agente-causador.service';
import { NaturezaLesaoService } from './natureza-lesao/natureza-lesao.service';
import { AvaliacaoHigieneOcupacionalService } from './avaliacao-higiene-ocupacional/avaliacao-higiene-ocupacional.service';
import { FichaColetaService } from './ficha-coleta/ficha-coleta.service';
import { EnfaseService } from './enfase/enfase.service';
import { ImovelService } from './imovel/imovel.service';
import { MotivoRecusaAtestadoService } from './motivo-recusa-atestado/motivo-recusa-atestado.service';
import { AcaoIntervencaoService } from './acao-intervencao/acao-intervencao.service';
import { EmpresaService } from './empresa/empresa.service';
import { ClassificacaoAfastamentoService } from './classificacao-afastamento/classificacao-afastamento.service';
import { ItemAuditoriaAtestadoService } from './item-auditoria-atestado/item-auditoria-atestado.service';
import { ClassificacaoGravidadeService } from './classificacao-gravidade/classificacao-gravidade.service';
import { CnaeService } from './cnae/cnae.service';
import { AlimentoService } from './alimento/alimento.service';
import { MedidaAlimentarService } from './medida-alimentar/medida-alimentar.service';
import { IndicadorConhecimentoAlimentarService } from './indicador-conhecimento-alimentar/indicador-conhecimento-alimentar.service';
import { QuestionarioConhecimentoAlimentarService } from './questionario-conhecimento-alimentar/questionario-conhecimento-alimentar.service';
import { RecordatorioService } from './recordatorio/recordatorio.service';
import { PlanoAlimentarService } from './plano-alimentar/plano-alimentar.service';
import { AtividadeFisicaService } from './atividade-fisica/atividade-fisica.service';
import { UtilService } from './../generics/util.service';

@NgModule({
  declarations: [
    PreloadComponent,
    ConfirmDeleteComponent,
    PaginacaoComponent,
    TarefaComponent
    
  ],
  imports: [ 
    CommonModule,
    HttpModule,
    FormsModule,
    MaterializeModule,
    ReactiveFormsModule,
    DatePickerModule,
    TimePickerModule,
    MensagemFormModule,
    IntegerMaskDirectiveModule
  ],
  exports: [ 
    CommonModule,
    HttpModule,
    FormsModule,
    MaterializeModule,
    ReactiveFormsModule,
    MensagemFormModule,
    PreloadComponent,
    ConfirmSaveModule,
    ConfirmDeleteComponent,
    PaginacaoComponent,
    DatePickerModule,
    TimePickerModule,
    IntegerMaskDirectiveModule
  ],
  providers: [
    PerfilService,
    BaseService,
    CargoService,
    CidadeService,
    ConvocacaoService,
    CriterioService,
    CursoService,
    EmpregadoService,
    EquipeService,
    ExameService,
    FornecedorService,
    FuncaoService,
    GerenciaService,
    GheService,
    GheeService,
    GrupoMonitoramentoService,
    IndicadorRiscoAcidenteService,
    IndicadorRiscoAmbientalService,
    IndicadorRiscoErgonomicoService,
    IndicadorRiscoSanitarioService,
    IndicadorRiscoSaudeAmbientalService,
    InstalacaoService,
    LocalizacaoService,
    PeriodicidadeService,
    ProfissiogramaService,
    ProfissionalSaudeService,
    RegimeService,
    TipoGrupoMonitoramentoService,
    VacinaService,
    UsuarioService,
    ResultadoExameService,
    FeriadoService,
    PessoaService,
    ServicoService,
    RegraAtendimentoService,
    FilaEsperaOcupacionalService,
    FilaAtendimentoOcupacionalService,
    AtendimentoService,
    RequisitoAsoService,
    AuditoriaAsoService,
    RiscoGheService,
    AgendaService,
    AgendaPeriodicoService,
    IndicadorSastService,
    IntervencaoService,
    DiagnosticoService,
    EixoService,
    PerguntaFichaColetaService,
    RiscoPotencialService,
    TriagemService,
    TipoSolicitacaoService,
    CanDeactivateGuard,
    FonteGeradoraService,
    CategoriaRiscoService,
    PossivelDanoSaudeService,
    AgenteRiscoService,
    AprhoService,
    SolicitacaoCentralIntegraService,
    CatService,
    AtestadoService,
    MudancaFuncaoService,
    TarefaService,
    ParteCorpoAtingidaService,
    AgenteCausadorService,
    NaturezaLesaoService,
    AvaliacaoHigieneOcupacionalService,
    FichaColetaService,
    EnfaseService,
    ImovelService,
    MotivoRecusaAtestadoService,
    AcaoIntervencaoService,
    EmpresaService,
    ClassificacaoAfastamentoService,
    ItemAuditoriaAtestadoService,
    ClinicaService,
    ClassificacaoGravidadeService,
    CnaeService,
    AlimentoService,
    MedidaAlimentarService,
    IndicadorConhecimentoAlimentarService,
    QuestionarioConhecimentoAlimentarService,
    RecordatorioService,
    PlanoAlimentarService,
    AtividadeFisicaService,
    UtilService
  ]
})
export class SharedModule { }