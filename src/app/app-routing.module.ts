import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ContatoComponent } from './contato/contato.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { PermissaoComponent } from './controller/permissao/permissao.component';
import { PerfilComponent } from './controller/perfil/perfil.component';
import { LocalizacaoComponent } from './controller/localizacao/localizacao.component';
import { EquipeComponent } from './controller/equipe/equipe.component';
import { GerenciaComponent } from './controller/gerencia/gerencia.component';
import { ProfissionalSaudeComponent } from './controller/profissional-saude/profissional-saude.component';
import { CargoComponent } from './controller/cargo/cargo.component';
import { CursoComponent } from './controller/curso/curso.component';
import { CidadeComponent } from './controller/cidade/cidade.component';
import { GheComponent } from './controller/ghe/ghe.component';
import { PeriodicidadeComponent } from './controller/periodicidade/periodicidade.component';
import { IndicadorRiscoAcidenteComponent } from './controller/indicador-risco-acidente/indicador-risco-acidente.component';
import { IndicadorRiscoAmbientalComponent } from './controller/indicador-risco-ambiental/indicador-risco-ambiental.component';
import { IndicadorRiscoErgonomicoComponent } from './controller/indicador-risco-ergonomico/indicador-risco-ergonomico.component';
import { IndicadorRiscoSanitarioComponent } from './controller/indicador-risco-sanitario/indicador-risco-sanitario.component';
import { IndicadorRiscoSaudeAmbientalComponent } from './controller/indicador-risco-saude-ambiental/indicador-risco-saude-ambiental.component';
import { InstalacaoComponent } from './controller/instalacao/instalacao.component';
import { FuncaoComponent } from './controller/funcao/funcao.component';
import { BaseComponent } from './controller/base/base.component';
import { RegimeComponent } from './controller/regime/regime.component';
import { GheeComponent } from './controller/ghee/ghee.component';
import { EmpregadoComponent } from './controller/empregado/empregado.component';
import { TipoGrupoMonitoramentoComponent } from './controller/tipo-grupo-monitoramento/tipo-grupo-monitoramento.component';
import { CriterioComponent } from './controller/criterio/criterio.component';
import { ExameComponent } from './controller/exame/exame.component';
import { GrupoMonitoramentoComponent } from './controller/grupo-monitoramento/grupo-monitoramento.component';
import { ProfissiogramaComponent } from './controller/profissiograma/profissiograma.component';
import { VacinaComponent } from './controller/vacina/vacina.component';
import { FornecedorComponent } from './controller/fornecedor/fornecedor.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'contato', component: ContatoComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'permissao', component: PermissaoComponent },
  { path: 'home', component: HomeComponent},
  { path: 'localizacao', component: LocalizacaoComponent },
  { path: 'equipe', component: EquipeComponent },
  { path: 'gerencia', component: GerenciaComponent },
  { path: 'profissional-saude', component: ProfissionalSaudeComponent },
  { path: 'cargo', component: CargoComponent },
  { path: 'curso', component: CursoComponent },
  { path: 'cidade', component: CidadeComponent },
  { path: 'ghe', component: GheComponent },
  { path: 'periodicidade', component: PeriodicidadeComponent },
  { path: 'indicador-risco-acidente', component: IndicadorRiscoAcidenteComponent },
  { path: 'indicador-risco-ambiental', component: IndicadorRiscoAmbientalComponent },
  { path: 'indicador-risco-ergonomico', component: IndicadorRiscoErgonomicoComponent },
  { path: 'indicador-risco-sanitario', component: IndicadorRiscoSanitarioComponent },
  { path: 'indicador-risco-saude-ambiental', component: IndicadorRiscoSaudeAmbientalComponent },
  { path: 'instalacao', component: InstalacaoComponent },
  { path: 'funcao', component: FuncaoComponent },
  { path: 'regime', component: RegimeComponent },
  { path: 'base', component: BaseComponent },
  { path: 'ghee', component: GheeComponent },
  { path: 'empregado', component: EmpregadoComponent },
  { path: 'tipo-grupo-monitoramento', component: TipoGrupoMonitoramentoComponent },
  { path: 'criterio', component: CriterioComponent },
  { path: 'exame', component: ExameComponent },
  { path: 'grupo-monitoramento', component: GrupoMonitoramentoComponent },
  { path: 'profissiograma', component: ProfissiogramaComponent },
  { path: 'vacina', component: VacinaComponent },
  { path: 'fornecedor', component: FornecedorComponent },
  { path: '', pathMatch: 'full', redirectTo: '/fornecedor'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }