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
import { RelatorioMedicoGuard } from './guards/guards-child/relatorio-medico.guard';
import { RegimeGuard } from './guards/guards-child/regime.guard';
import { TipoGrupoMonitoramentoGuard } from './guards/guards-child/tipo-grupo-monitoramento.guard';
import { UsuarioGuard } from './guards/guards-child/usuario.guard';
import { VacinaGuard } from './guards/guards-child/vacina.guard';
import { EmpregadoConvocacaoGuard } from './guards/guards-child/empregado-convocacao.guard';
import { FeriadoGuard } from './guards/guards-child/feriado.guard';
import { AuditoriaResultadoExameGuard } from './guards/guards-child/auditoria-resultado-exame.guard';
import { RegraAtendimentoGuard } from './guards/guards-child/regra-atendimento.guard';
import { ResultadoExameGuard } from './guards/guards-child/resultado-exame.guard';
import { RequisitoAsoGuard } from './guards/guards-child/requisito-aso.guard';
import { AuditoriaAsoGuard } from './guards/guards-child/auditoria-aso.guard';
import { AtendimentoGuard } from './guards/guards-child/atendimento.guard';
import { ServicoGuard } from './guards/guards-child/servico.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'contato', component: ContatoComponent },
  { path: 'permissao', component: PermissaoComponent },
  { path: 'home', component: HomeComponent },
  { path: 'perfil', loadChildren: 'app/controller/perfil/perfil.module#PerfilModule',
      canActivateChild: [PerfilGuard]},
  { path: 'localizacao', loadChildren: 'app/controller/localizacao/localizacao.module#LocalizacaoModule',
          canActivateChild: [LocalizacaoGuard]},
  { path: 'equipe', loadChildren: 'app/controller/equipe/equipe.module#EquipeModule',
      canActivateChild: [EquipeGuard]},
  { path: 'gerencia', loadChildren: 'app/controller/gerencia/gerencia.module#GerenciaModule',
          canActivateChild: [GerenciaGuard]},
  { path: 'profissional-saude', loadChildren: 'app/controller/profissional-saude/profissional-saude.module#ProfissionalSaudeModule',
              canActivateChild: [ProfissionalSaudeGuard]},
  { path: 'cargo', loadChildren: 'app/controller/cargo/cargo.module#CargoModule',
      canActivateChild: [CargoGuard]},
  { path: 'curso', loadChildren: 'app/controller/curso/curso.module#CursoModule',
      canActivateChild: [CursoGuard]},
  { path: 'cidade', loadChildren: 'app/controller/cidade/cidade.module#CidadeModule',
      canActivateChild: [CidadeGuard]},
  { path: 'ghe', loadChildren: 'app/controller/ghe/ghe.module#GheModule',
      canActivateChild: [GheGuard]},
  { path: 'periodicidade', loadChildren: 'app/controller/periodicidade/periodicidade.module#PeriodicidadeModule',
      canActivateChild: [PeriodicidadeGuard]},
  { path: 'indicador-risco-acidente',
      loadChildren: 'app/controller/indicador-risco-acidente/indicador-risco-acidente.module#IndicadorRiscoAcidenteModule',
      canActivateChild: [IndicadorRiscoAcidenteGuard]},
  { path: 'indicador-risco-ambiental', 
      loadChildren: 'app/controller/indicador-risco-ambiental/indicador-risco-ambiental.module#IndicadorRiscoAmbientalModule',
      canActivateChild: [IndicadorRiscoAmbientalGuard]},
  { path: 'indicador-risco-ergonomico', 
      loadChildren: 'app/controller/indicador-risco-ergonomico/indicador-risco-ergonomico.module#IndicadorRiscoErgonomicoModule',
      canActivateChild: [IndicadorRiscoErgonomicoGuard]},
  { path: 'indicador-risco-sanitario', 
      loadChildren: 'app/controller/indicador-risco-sanitario/indicador-risco-sanitario.module#IndicadorRiscoSanitarioModule',
      canActivateChild: [IndicadorRiscoSanitarioGuard]},
  { path: 'indicador-risco-saude-ambiental', 
      loadChildren: 'app/controller/indicador-risco-saude-ambiental/indicador-risco-saude-ambiental.module#IndicadorRiscoSaudeAmbientalModule',
      canActivateChild: [IndicadorRiscoSaudeAmbientalGuard]},
  { path: 'instalacao', loadChildren: 'app/controller/instalacao/instalacao.module#InstalacaoModule',
          canActivateChild: [InstalacaoGuard]},
  { path: 'funcao', loadChildren: 'app/controller/funcao/funcao.module#FuncaoModule',
      canActivateChild: [FuncaoGuard]},
  { path: 'regime', loadChildren: 'app/controller/regime/regime.module#RegimeModule', 
      canActivateChild: [RegimeGuard]},
  { path: 'base', loadChildren: 'app/controller/base/base.module#BaseModule',
          canActivateChild: [BaseGuard]},
  { path: 'ghee', loadChildren: 'app/controller/ghee/ghee.module#GheeModule',
      canActivateChild: [GheeGuard]},
  { path: 'empregado', loadChildren: 'app/controller/empregado/empregado.module#EmpregadoModule',
      canActivateChild: [EmpregadoGuard]},
  { path: 'tipo-grupo-monitoramento', loadChildren: 'app/controller/tipo-grupo-monitoramento/tipo-grupo-monitoramento.module#TipoGrupoMonitoramentoModule',
      canActivateChild: [TipoGrupoMonitoramentoGuard]},
  { path: 'criterio', loadChildren: 'app/controller/criterio/criterio.module#CriterioModule',
      canActivateChild: [CriterioGuard]},
  { path: 'exame', loadChildren: 'app/controller/exame/exame.module#ExameModule',
      canActivateChild: [ExameGuard]},
  { path: 'grupo-monitoramento', loadChildren: 'app/controller/grupo-monitoramento/grupo-monitoramento.module#GrupoMonitoramentoModule',
      canActivateChild: [GrupoMonitoramentoGuard]},
  { path: 'profissiograma', loadChildren: 'app/controller/profissiograma/profissiograma.module#ProfissiogramaModule',
      canActivateChild: [ProfissiogramaGuard]},
  { path: 'vacina', loadChildren: 'app/controller/vacina/vacina.module#VacinaModule',
      canActivateChild: [VacinaGuard]},
  { path: 'fornecedor', loadChildren: 'app/controller/fornecedor/fornecedor.module#FornecedorModule',
      canActivateChild: [FornecedorGuard]},
  { path: 'convocacao', loadChildren: 'app/controller/convocacao/convocacao.module#ConvocacaoModule',
      canActivateChild: [ConvocacaoGuard]},
  { path: 'auditoria-exame', loadChildren: 'app/controller/empregado-convocacao/empregado-convocacao.module#EmpregadoConvocacaoModule',
      canActivateChild: [EmpregadoConvocacaoGuard]},
  { path: 'usuario', loadChildren: 'app/controller/usuario/usuario.module#UsuarioModule',
          canActivateChild: [UsuarioGuard]},
  { path: 'relatorio-medico', loadChildren: 'app/controller/relatorio-medico/relatorio-medico.module#RelatorioMedicoModule' ,
      canActivateChild: [RelatorioMedicoGuard]},
  { path: 'feriado', loadChildren: 'app/controller/feriado/feriado.module#FeriadoModule',
      canActivateChild: [FeriadoGuard]},
  { path: 'servico', loadChildren: 'app/controller/servico/servico.module#ServicoModule',
      canActivateChild: [ServicoGuard]},
  { path: 'auditoria-resultado-exame', 
      loadChildren: 'app/controller/auditoria-resultado-exame/auditoria-resultado-exame.module#AuditoriaResultadoExameModule',
      canActivateChild: [AuditoriaResultadoExameGuard]},
  { path: 'regra-atendimento',
      loadChildren: 'app/controller/regra-atendimento/regra-atendimento.module#RegraAtendimentoModule',
      canActivateChild: [RegraAtendimentoGuard]},
  { path: 'solicitacao-servico',
      loadChildren: 'app/solicitacao-servico/solicitacao-servico.module#SolicitacaoServicoModule'},
  { path: 'fila-espera-ocupacional',
      loadChildren: 'app/controller/fila-espera-ocupacional/fila-espera-ocupacional.module#FilaEsperaOcupacionalModule' },
  { path: 'requisito-aso',
      loadChildren: 'app/controller/requisito-aso/requisito-aso.module#RequisitoAsoModule',
      canActivateChild: [RequisitoAsoGuard]},
  { path: 'atendimento',
      loadChildren: 'app/controller/atendimento/atendimento.module#AtendimentoModule',
      canActivateChild: [AtendimentoGuard]},
  { path: 'auditoria-aso',
      loadChildren: 'app/controller/auditoria-aso/auditoria-aso.module#AuditoriaAsoModule',
      canActivateChild: [AuditoriaAsoGuard]},
  { path: '', pathMatch: 'full', redirectTo: '/servico'},
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }