import { Component, EventEmitter, OnInit } from '@angular/core';

import { GlobalVariable } from './../../global';
import { EmpregadoConvocacao } from './../../model/empregado-convocacao';
import { EmpregadoConvocacaoService } from './empregado-convocacao.service';
import { EmpregadoConvocacaoFilter } from './empregado-convocacao.filter';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component({
  selector: 'app-empregado-convocacao',
  templateUrl: './empregado-convocacao.component.html',
  styleUrls: ['./empregado-convocacao.component.css', '../../../assets/css/list-component.css']
})

export class EmpregadoConvocacaoComponent 
    extends GenericListComponent<EmpregadoConvocacao, EmpregadoConvocacaoFilter> {
    
    constructor(empregadoConvocacaoService: EmpregadoConvocacaoService) {
        super(empregadoConvocacaoService, new EmpregadoConvocacaoFilter());
    }   
}