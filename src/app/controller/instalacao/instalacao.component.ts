import { Component, OnInit } from '@angular/core'; 

import { GenericListComponent } from './../../generics/generic.list.component'; 
import { Instalacao } from './../../model/instalacao';
import { InstalacaoFilter } from './instalacao.filter';
import { InstalacaoService } from './instalacao.service';

@Component({
  selector: 'app-instalacao',
  templateUrl: './instalacao.component.html',
  styleUrls: ['./instalacao.component.css']
})
export class InstalacaoComponent extends GenericListComponent<Instalacao, InstalacaoFilter> {

    constructor(instalacaoService: InstalacaoService) {
        let instalacaoFilter: InstalacaoFilter = new InstalacaoFilter();
        super(instalacaoService, instalacaoFilter);
    }

}
