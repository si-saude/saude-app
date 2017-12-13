import { Component } from '@angular/core';

import { ResultadoExame } from './../../model/resultado-exame';
import { ResultadoExameService } from './resultado-exame.service';
import { ResultadoExameFilter } from './resultado-exame.filter';
import { GenericListComponent } from './../../generics/generic.list.component';
import { ResultadoExameGuard } from './../../guards/guards-child/resultado-exame.guard';

@Component({
  selector: 'app-resultado-exame',
  templateUrl: './resultado-exame.component.html',
  styleUrls: ['./resultado-exame.component.css', '../../../assets/css/list-component.css']
})
export class ResultadoExameComponent extends GenericListComponent<ResultadoExame, ResultadoExameFilter, ResultadoExameGuard> {
    
    constructor(service: ResultadoExameService, resultadoExameGuard: ResultadoExameGuard) {
        super(service, new ResultadoExameFilter(), resultadoExameGuard);
    }    
}
