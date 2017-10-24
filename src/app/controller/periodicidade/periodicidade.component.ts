import { Component, EventEmitter, OnInit } from '@angular/core';

import { GlobalVariable } from './../../global';
import { Periodicidade } from './../../model/periodicidade';
import { PeriodicidadeService } from './periodicidade.service';
import { PeriodicidadeFilter } from './periodicidade.filter';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component({
  selector: 'app-periodicidade',
  templateUrl: './periodicidade.component.html',
  styleUrls: ['./periodicidade.component.css']
})
export class PeriodicidadeComponent extends GenericListComponent<Periodicidade, PeriodicidadeFilter> {
    
    constructor(periodicidadeService: PeriodicidadeService) {
        let periodicidadeFilter: PeriodicidadeFilter = new PeriodicidadeFilter();
        super(periodicidadeService, periodicidadeFilter);
    }
      
}