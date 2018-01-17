import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterializeModule } from 'angular2-materialize';

import { MensagemFormComponent } from './../includes/mensagem-form/mensagem-form.component';
import { PreloadComponent } from './../includes/preload/preload.component';
import { ConfirmSaveComponent } from './../includes/confirm-save/confirm-save.component';
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
import { CanDeactivateGuard } from './../guards/can-deactivate.guard';
import { RequisitoAsoComponent } from './requisito-aso/requisito-aso.component';
import { RequisitoAsoFormComponent } from './requisito-aso/requisito-aso-form/requisito-aso-form.component';

@NgModule({
  declarations: [
    MensagemFormComponent,
    PreloadComponent,
    ConfirmSaveComponent,
    RequisitoAsoComponent,
    RequisitoAsoFormComponent
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
    ConfirmSaveComponent
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
    CanDeactivateGuard
  ]
})
export class SharedModule { }