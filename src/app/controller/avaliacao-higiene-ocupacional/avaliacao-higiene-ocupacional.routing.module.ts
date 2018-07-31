import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvaliacaoHigieneOcupacionalComponent } from './avaliacao-higiene-ocupacional.component';
import { AvaliacaoHigieneOcupacionalFormComponent } from './avaliacao-higiene-ocupacional-form/avaliacao-higiene-ocupacional-form.component';
import { AvaliacaoHigieneOcupacionalFormDetailComponent } from './avaliacao-higiene-ocupacional-form/avaliacao-higiene-ocupacional-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';
import { AvaliacaoHigieneOcupacionalGuard } from './../../guards/guards-child/avaliacao-higiene-ocupacional.guard';

const avaliacaoHigieneOcupacionalRoutes: Routes = [
    { path: '', component: AvaliacaoHigieneOcupacionalComponent},
    { path: 'cadastrar', component: AvaliacaoHigieneOcupacionalFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: AvaliacaoHigieneOcupacionalFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: AvaliacaoHigieneOcupacionalFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(avaliacaoHigieneOcupacionalRoutes)],
    exports: [RouterModule]
})
export class AvaliacaoHigieneOcupacionalRoutingModule {}