import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';

import { GenericListComponent } from './../../generics/generic.list.component'; 
import { Instalacao } from './../../model/instalacao';
import { InstalacaoFilter } from './instalacao.filter';
import { InstalacaoService } from './instalacao.service';
import { InstalacaoGuard } from './../../guards/guards-child/instalacao.guard';

@Component({
  selector: 'app-instalacao',
  templateUrl: './instalacao.component.html',
  styleUrls: ['./instalacao.component.css', '../../../assets/css/list-component.css']
})
export class InstalacaoComponent extends GenericListComponent<Instalacao, InstalacaoFilter, InstalacaoGuard> {

    constructor(instalacaoService: InstalacaoService, instalacaoGuard: InstalacaoGuard, router: Router) {
        super(instalacaoService, new InstalacaoFilter(), instalacaoGuard, router);
    }

}
