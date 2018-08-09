import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {MaterializeDirective,MaterializeAction} from "angular2-materialize";
import 'rxjs/add/operator/toPromise';

import { TarefaFilter } from './../tarefa/tarefa.filter';
import { EmpregadoFilter } from './../empregado/empregado.filter';
import { MudancaFuncao } from './../../model/mudanca-funcao';
import { MudancaFuncaoService } from './mudanca-funcao.service';
import { MudancaFuncaoFilter } from './mudanca-funcao.filter';
import { MudancaFuncaoGuard } from './../../guards/guards-child/mudanca-funcao.guard';
import { GenericListComponent } from './../../generics/generic.list.component';
 
@Component( {
    selector: 'app-mudanca-funcao',
    templateUrl: './mudanca-funcao.component.html',
    styleUrls: ['./mudanca-funcao.component.css', '../../../assets/css/list-component.css']
} )
export class MudancaFuncaoComponent extends GenericListComponent<MudancaFuncao, MudancaFuncaoFilter, MudancaFuncaoGuard> {

    constructor( service: MudancaFuncaoService, mudancaFuncaoGuard: MudancaFuncaoGuard, router: Router ) {
        super( service, new MudancaFuncaoFilter(), mudancaFuncaoGuard, router );
        
        this.filter.setTarefa(new TarefaFilter());
        this.filter.getTarefa().setCliente(new EmpregadoFilter());
    }
    
}