import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ContatoComponent } from './contato/contato.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { PermissaoComponent } from './controller/permissao/permissao.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
//import { PerfilComponent } from './controller/perfil/perfil.component';
//import { LocalizacaoComponent } from './controller/localizacao/localizacao.component';
//import { EquipeComponent } from './controller/equipe/equipe.component';
//import { GerenciaComponent } from './controller/gerencia/gerencia.component';
//import { ProfissionalSaudeComponent } from './controller/profissional-saude/profissional-saude.component';
//import { CargoComponent } from './controller/cargo/cargo.component';
//import { CursoComponent } from './controller/curso/curso.component';
//import { CidadeComponent } from './controller/cidade/cidade.component';
//import { GheComponent } from './controller/ghe/ghe.component';
//import { PeriodicidadeComponent } from './controller/periodicidade/periodicidade.component';
//import { IndicadorRiscoAcidenteComponent } from './controller/indicador-risco-acidente/indicador-risco-acidente.component';
//import { IndicadorRiscoAmbientalComponent } from './controller/indicador-risco-ambiental/indicador-risco-ambiental.component';
//import { IndicadorRiscoErgonomicoComponent } from './controller/indicador-risco-ergonomico/indicador-risco-ergonomico.component';
//import { IndicadorRiscoSanitarioComponent } from './controller/indicador-risco-sanitario/indicador-risco-sanitario.component';
//import { IndicadorRiscoSaudeAmbientalComponent } from './controller/indicador-risco-saude-ambiental/indicador-risco-saude-ambiental.component';
//import { InstalacaoComponent } from './controller/instalacao/instalacao.component';
//import { FuncaoComponent } from './controller/funcao/funcao.component';
//import { BaseComponent } from './controller/base/base.component';
//import { RegimeComponent } from './controller/regime/regime.component';
//import { GheeComponent } from './controller/ghee/ghee.component';
//import { EmpregadoComponent } from './controller/empregado/empregado.component';
//import { TipoGrupoMonitoramentoComponent } from './controller/tipo-grupo-monitoramento/tipo-grupo-monitoramento.component';
//import { CriterioComponent } from './controller/criterio/criterio.component';
//import { ExameComponent } from './controller/exame/exame.component';
//import { GrupoMonitoramentoComponent } from './controller/grupo-monitoramento/grupo-monitoramento.component';
//import { ProfissiogramaComponent } from './controller/profissiograma/profissiograma.component';
//import { VacinaComponent } from './controller/vacina/vacina.component';
//import { FornecedorComponent } from './controller/fornecedor/fornecedor.component';
//import { ConvocacaoComponent } from './controller/convocacao/convocacao.component';

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
  { path: 'empregado-convocacao', loadChildren: 'app/controller/empregado-convocacao/empregado-convocacao.module#EmpregadoConvocacaoModule'},
  { path: 'usuario', loadChildren: 'app/controller/usuario/usuario.module#UsuarioModule'},
  { path: 'relatorio-medico', loadChildren: 'app/controller/relatorio-medico/relatorio-medico.module#RelatorioMedicoModule' },
  { path: '', pathMatch: 'full', redirectTo: '/usuario'},
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }