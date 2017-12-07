import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VacinaComponent } from './vacina.component';
import { VacinaFormComponent } from './vacina-form/vacina-form.component';
import { VacinaFormDetailComponent } from './vacina-form/vacina-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const vacinaRoutes: Routes = [
    { path: '', component: VacinaComponent },
    { path: 'cadastrar', component: VacinaFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: VacinaFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: VacinaFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(vacinaRoutes)],
    exports: [RouterModule]
})
export class VacinaRoutingModule {}