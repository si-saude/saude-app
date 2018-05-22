import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PossivelDanoSaudeComponent } from './possivel-dano-saude.component';
import { PossivelDanoSaudeFormComponent } from './possivel-dano-saude-form/possivel-dano-saude-form.component';
import { PossivelDanoSaudeFormDetailComponent } from './possivel-dano-saude-form/possivel-dano-saude-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';
import { PossivelDanoSaudeGuard } from './../../guards/guards-child/possivel-dano-saude.guard';

const possivelDanoSaudeRoutes: Routes = [
    { path: '', component: PossivelDanoSaudeComponent},
    { path: 'cadastrar', component: PossivelDanoSaudeFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: PossivelDanoSaudeFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: PossivelDanoSaudeFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(possivelDanoSaudeRoutes)],
    exports: [RouterModule]
})
export class PossivelDanoSaudeRoutingModule {}