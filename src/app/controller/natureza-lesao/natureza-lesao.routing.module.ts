import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NaturezaLesaoComponent } from './natureza-lesao.component';
import { NaturezaLesaoFormComponent } from './natureza-lesao-form/natureza-lesao-form.component';
import { NaturezaLesaoFormDetailComponent } from './natureza-lesao-form/natureza-lesao-form-detail.component';
import { CanDeactivateGuard } from '../../guards/can-deactivate.guard';
import { NaturezaLesaoGuard } from '../../guards/guards-child/natureza-lesao.guard';

const naturezaLesaoRoutes: Routes = [
    { path: '', component: NaturezaLesaoComponent},
    { path: 'cadastrar', component: NaturezaLesaoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: NaturezaLesaoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: NaturezaLesaoFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(naturezaLesaoRoutes)],
    exports: [RouterModule]
})
export class NaturezaLesaoRoutingModule {}