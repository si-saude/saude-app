import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../global';
import { EmpregadoConvocacao } from './../../model/empregado-convocacao';
import { EmpregadoConvocacaoService } from './empregado-convocacao.service';
import { EmpregadoConvocacaoFilter } from './empregado-convocacao.filter';
import { EmpregadoConvocacaoGuard } from './../../guards/guards-child/empregado-convocacao.guard';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component({
  selector: 'app-empregado-convocacao',
  templateUrl: './empregado-convocacao.component.html',
  styleUrls: ['./empregado-convocacao.component.css', '../../../assets/css/list-component.css']
})

export class EmpregadoConvocacaoComponent 
    extends GenericListComponent<EmpregadoConvocacao, EmpregadoConvocacaoFilter, EmpregadoConvocacaoGuard> {
    
    constructor(empregadoConvocacaoService: EmpregadoConvocacaoService,
                empregadoConvocacaoGuard: EmpregadoConvocacaoGuard,
                router: Router) {
        super(empregadoConvocacaoService, new EmpregadoConvocacaoFilter(), empregadoConvocacaoGuard, router);
    }   
}