import { Component, EventEmitter, OnInit } from '@angular/core';

import { GlobalVariable } from './../../global';
import { Periodicidade } from './../../model/periodicidade';
import { PeriodicidadeService } from './periodicidade.service';
import { PeriodicidadeFilter } from './periodicidade.filter';
import { PeriodicidadeGuard } from './../../guards/guards-child/periodicidade.guard';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component({
  selector: 'app-periodicidade',
  templateUrl: './periodicidade.component.html',
  styleUrls: ['./periodicidade.component.css', '../../../assets/css/list-component.css']
})
export class PeriodicidadeComponent extends GenericListComponent<Periodicidade, PeriodicidadeFilter, PeriodicidadeGuard> {
    
    constructor(periodicidadeService: PeriodicidadeService, periodicidadeGuard: PeriodicidadeGuard) {
        super(periodicidadeService, new PeriodicidadeFilter(), periodicidadeGuard);
    }
      
}