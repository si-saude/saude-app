import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {MaterializeDirective,MaterializeAction} from "angular2-materialize";
import 'rxjs/add/operator/toPromise';

import { TarefaFilter } from './../tarefa/tarefa.filter';
import { EquipeBuilder } from './../equipe/equipe.builder';
import { Equipe } from './../../model/equipe';
import { EquipeFilter } from './../equipe/equipe.filter';
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
    private listStatus: Array<string>;   
    private equipes: Array<Equipe>;   

    constructor(protected service: MudancaFuncaoService, mudancaFuncaoGuard: MudancaFuncaoGuard, router: Router ) {
        super( service, new MudancaFuncaoFilter(), mudancaFuncaoGuard, router );
        
        this.filter.setTarefa(new TarefaFilter());
        this.filter.getTarefa().setCliente(new EmpregadoFilter());
        this.filter.getTarefa().setEquipe(new EquipeFilter())
        this.listStatus = new Array<string>();
        this.getStatus();
        this.getEquipesMedErgHig();
    }
    
    getStatus() {
        this.service.getStatus()
            .then(res => {
                this.listStatus = Object.keys( res.json() ).sort();
            })
            .catch(error => {
                console.log("Erro ao retornar Status.");
            })
    }

    getEquipesMedErgHig() {
        this.service.getEquipeService().getMedErgHig()
            .then( res => {
                this.equipes = new EquipeBuilder().cloneList(res.json().list);
            } )
            .catch( error => {
                console.log( error );
            } )
    }
    
    setFilter() {
        this.initializerDateFilter(this.filter.getDataTransferencia());
        super.setFilter();        
    }
}