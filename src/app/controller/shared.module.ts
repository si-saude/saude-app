import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterializeModule } from 'angular2-materialize';

import { MensagemFormComponent } from './../includes/mensagem-form/mensagem-form.component';
import { PreloadComponent } from './../includes/preload/preload.component';
import { ConfirmSaveComponent } from './../includes/confirm-save/confirm-save.component';
import { ConfirmDeleteComponent } from './../includes/confirm-delete/confirm-delete.component';
import { PaginacaoComponent } from './../includes/paginacao/paginacao.component';
import { PerfilService } from './perfil/perfil.service';
import { BaseService } from './base/base.service';
import { CargoService } from './cargo/cargo.service';
import { ConvocacaoService } from './convocacao/convocacao.service';
import { CriterioService } from './criterio/criterio.service';
import { CidadeService } from './cidade/cidade.service';
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
import { RelatorioMedicoService } from './relatorio-medico/relatorio-medico.service';
import { ResultadoExameService } from './resultado-exame/resultado-exame.service';
import { FeriadoService } from './feriado/feriado.service';
import { PessoaService } from './pessoa/pessoa.service';
import { ServicoService } from './servico/servico.service';
import { RegraAtendimentoService } from './regra-atendimento/regra-atendimento.service';
import { FilaEsperaOcupacionalService } from './fila-espera-ocupacional/fila-espera-ocupacional.service';
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

@NgModule({
  declarations: [
    MensagemFormComponent,
    PreloadComponent,
    ConfirmSaveComponent,
    ConfirmDeleteComponent,
    PaginacaoComponent,
    TarefaComponent
    
  ],
  imports: [ 
    CommonModule,
    HttpModule,
    FormsModule,
    MaterializeModule,
    ReactiveFormsModule
  ],
  exports: [ 
    CommonModule,
    HttpModule,
    FormsModule,
    MaterializeModule,
    ReactiveFormsModule,
    MensagemFormComponent,
    PreloadComponent,
    ConfirmSaveComponent,
    ConfirmDeleteComponent,
    PaginacaoComponent
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
    RelatorioMedicoService,
    ResultadoExameService,
    FeriadoService,
    PessoaService,
    ServicoService,
    RegraAtendimentoService,
    FilaEsperaOcupacionalService,
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
    CatService
  ]
})
export class SharedModule { }