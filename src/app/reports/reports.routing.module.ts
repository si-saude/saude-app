import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanoramaComponent } from './panorama/panorama.component';
import { PanoramaGuard } from '../guards/panorama.guard';

const routes: Routes = [
  { path: '', redirectTo: 'panorama', pathMatch: 'full' },
  { path: 'panorama', component: PanoramaComponent, 
      canActivate: [PanoramaGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }