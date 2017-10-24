import { Component, EventEmitter, OnInit } from '@angular/core';

import { GlobalVariable } from './../../global';
import { Profissiograma } from './../../model/profissiograma';
import { ProfissiogramaService } from './profissiograma.service';
import { ProfissiogramaFilter } from './profissiograma.filter';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component({
  selector: 'app-profissiograma',
  templateUrl: './profissiograma.component.html',
  styleUrls: ['./profissiograma.component.css']
})
export class ProfissiogramaComponent extends GenericListComponent<Profissiograma, ProfissiogramaFilter> {
    
    constructor(profissiogramaService: ProfissiogramaService) {
        let profissiogramaFilter: ProfissiogramaFilter = new ProfissiogramaFilter();
        super(profissiogramaService, profissiogramaFilter);   
    }
    
}