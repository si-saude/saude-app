import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VacinaComponent } from './vacina.component';
import { VacinaFormComponent } from './vacina-form/vacina-form.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const vacinaRoutes: Routes = [
    { path: '', component: VacinaComponent },
    { path: 'cadastrar', component: VacinaFormComponent },
    { path: 'editar/:id', component: VacinaFormComponent,
        canDeactivate: [CanDeactivateGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(vacinaRoutes)],
    exports: [RouterModule]
})
export class VacinaRoutingModule {}