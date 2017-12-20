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
import { ResultadoExameGuard } from './guards/guards-child/resultado-exame.guard';
import { RegimeGuard } from './guards/guards-child/regime.guard';
import { TipoGrupoMonitoramentoGuard } from './guards/guards-child/tipo-grupo-monitoramento.guard';
import { UsuarioGuard } from './guards/guards-child/usuario.guard';
import { VacinaGuard } from './guards/guards-child/vacina.guard';
import { EmpregadoConvocacaoGuard } from './guards/guards-child/empregado-convocacao.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'contato', component: ContatoComponent },
  { path: 'permissao', component: PermissaoComponent },
  { path: 'home', component: HomeComponent },
  { path: 'perfil', loadChildren: 'app/controller/perfil/perfil.module#PerfilModule'},
  { path: 'localizacao', loadChildren: 'app/controller/localizacao/localizacao.module#LocalizacaoModule'},
  { path: 'equipe', loadChildren: 'app/controller/equipe/equipe.module#EquipeModule'},
  { path: 'gerencia', loadChildren: 'app/controller/gerencia/gerencia.module#GerenciaModule'},
  { path: 'profissional-saude', loadChildren: 'app/controller/profissional-saude/profissional-saude.module#ProfissionalSaudeModule'},
  { path: 'cargo', loadChildren: 'app/controller/cargo/cargo.module#CargoModule'},
  { path: 'curso', loadChildren: 'app/controller/curso/curso.module#CursoModule'},
  { path: 'cidade', loadChildren: 'app/controller/cidade/cidade.module#CidadeModule'},
  { path: 'ghe', loadChildren: 'app/controller/ghe/ghe.module#GheModule'},
  { path: 'periodicidade', loadChildren: 'app/controller/periodicidade/periodicidade.module#PeriodicidadeModule'},
  { path: 'indicador-risco-acidente',
      loadChildren: 'app/controller/indicador-risco-acidente/indicador-risco-acidente.module#IndicadorRiscoAcidenteModule'},
  { path: 'indicador-risco-ambiental', 
      loadChildren: 'app/controller/indicador-risco-ambiental/indicador-risco-ambiental.module#IndicadorRiscoAmbientalModule'},
  { path: 'indicador-risco-ergonomico', 
      loadChildren: 'app/controller/indicador-risco-ergonomico/indicador-risco-ergonomico.module#IndicadorRiscoErgonomicoModule'},
  { path: 'indicador-risco-sanitario', 
      loadChildren: 'app/controller/indicador-risco-sanitario/indicador-risco-sanitario.module#IndicadorRiscoSanitarioModule'},
  { path: 'indicador-risco-saude-ambiental', 
      loadChildren: 'app/controller/indicador-risco-saude-ambiental/indicador-risco-saude-ambiental.module#IndicadorRiscoSaudeAmbientalModule'},
  { path: 'instalacao', loadChildren: 'app/controller/instalacao/instalacao.module#InstalacaoModule'},
  { path: 'funcao', loadChildren: 'app/controller/funcao/funcao.module#FuncaoModule'},
  { path: 'regime', loadChildren: 'app/controller/regime/regime.module#RegimeModule'},
  { path: 'base', loadChildren: 'app/controller/base/base.module#BaseModule'},
  { path: 'ghee', loadChildren: 'app/controller/ghee/ghee.module#GheeModule'},
  { path: 'empregado', loadChildren: 'app/controller/empregado/empregado.module#EmpregadoModule'},
  { path: 'tipo-grupo-monitoramento', loadChildren: 'app/controller/tipo-grupo-monitoramento/tipo-grupo-monitoramento.module#TipoGrupoMonitoramentoModule'},
  { path: 'criterio', loadChildren: 'app/controller/criterio/criterio.module#CriterioModule'},
  { path: 'exame', loadChildren: 'app/controller/exame/exame.module#ExameModule'},
  { path: 'grupo-monitoramento', loadChildren: 'app/controller/grupo-monitoramento/grupo-monitoramento.module#GrupoMonitoramentoModule'},
  { path: 'profissiograma', loadChildren: 'app/controller/profissiograma/profissiograma.module#ProfissiogramaModule'},
  { path: 'vacina', loadChildren: 'app/controller/vacina/vacina.module#VacinaModule'},
  { path: 'fornecedor', loadChildren: 'app/controller/fornecedor/fornecedor.module#FornecedorModule'},
  { path: 'convocacao', loadChildren: 'app/controller/convocacao/convocacao.module#ConvocacaoModule'},
  { path: 'auditoria-exame', loadChildren: 'app/controller/empregado-convocacao/empregado-convocacao.module#EmpregadoConvocacaoModule'},
  { path: 'usuario', loadChildren: 'app/controller/usuario/usuario.module#UsuarioModule'},
  { path: 'relatorio-medico', loadChildren: 'app/controller/relatorio-medico/relatorio-medico.module#RelatorioMedicoModule' },
  { path: 'resultado-exame', loadChildren: 'app/controller/resultado-exame/resultado-exame.module#ResultadoExameModule' },
  { path: '', pathMatch: 'full', redirectTo: '/usuario'},
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }