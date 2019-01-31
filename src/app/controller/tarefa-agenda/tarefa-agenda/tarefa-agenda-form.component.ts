import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MaterializeAction } from "angular2-materialize";

import { GlobalVariable } from './../../../global';
import { Tarefa } from './../../../model/tarefa';
import { TarefaService } from './../../tarefa/tarefa.service';
import { TarefaFilter } from './../../tarefa/tarefa.filter';
import { TarefaBuilder } from './../../tarefa/tarefa.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { DateUtil } from '../../../generics/utils/date.util';

@Component( {
    selector: 'app-tarefa-agenda-form',
    templateUrl: './tarefa-agenda-form.html',
    styleUrls: ['./tarefa-agenda-form.css', './../../../../assets/css/form-component.css']
} )
export class TarefaAgendaFormComponent extends GenericFormComponent implements OnInit {
    tarefa: Tarefa;
    
    constructor( private route: ActivatedRoute,
        private tarefaService: TarefaService,
        router: Router) { 
        super(tarefaService, router);
        this.goTo = "tarefa-agenda";
        
        this.tarefa = new TarefaBuilder().initialize(this.tarefa);
    }

    ngOnInit() {
        
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.tarefaService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.tarefa = new TarefaBuilder().clone(res.json());
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
            
    }
    
    save() {
        super.save(new TarefaBuilder().clone(this.tarefa));
    }   

    onDestroy() {
        this.inscricao.unsubscribe();
    }
    
}
