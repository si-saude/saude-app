import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImovelComponent } from './imovel.component';
import { ImovelFormComponent } from './imovel-form/imovel-form.component';
import { ImovelFormDetailComponent } from './imovel-form/imovel-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';
import { ImovelGuard } from './../../guards/guards-child/imovel.guard';

const imovelRoutes: Routes = [
    { path: '', component: ImovelComponent},
    { path: 'cadastrar', component: ImovelFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: ImovelFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: ImovelFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(imovelRoutes)],
    exports: [RouterModule]
})
export class ImovelRoutingModule {}