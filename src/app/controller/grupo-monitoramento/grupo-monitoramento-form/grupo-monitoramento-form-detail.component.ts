import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import {MaterializeDirective,MaterializeAction} from "angular2-materialize";

import { GlobalVariable } from './../../../global';
import { GrupoMonitoramento } from './../../../model/grupo-monitoramento';
import { TipoGrupoMonitoramento } from './../../../model/tipo-grupo-monitoramento';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { GrupoMonitoramentoBuilder } from './../grupo-monitoramento.builder';
import { GrupoMonitoramentoService } from './../grupo-monitoramento.service';

@Component( {
    selector: 'app-grupo-monitoramento-form-detail',
    templateUrl: './grupo-monitoramento-form-detail.html',
    styleUrls: ['./grupo-monitoramento-form.css', './../../../../assets/css/form-component.css']
} )
export class GrupoMonitoramentoFormDetailComponent extends GenericFormComponent implements OnInit {
    tiposGrupoMonitoramento: Array<TipoGrupoMonitoramento>;
    grupoMonitoramento: GrupoMonitoramento;

    globalActions = new EventEmitter<string|MaterializeAction>();
    toastParams = ['', 4000];

    
    constructor( private route: ActivatedRoute,
            private grupoMonitoramentoService: GrupoMonitoramentoService,
            router: Router) { 
            super(grupoMonitoramentoService, router);
            this.goTo = "grupo-monitoramento";
            
            this.grupoMonitoramento = new GrupoMonitoramentoBuilder().initialize(this.grupoMonitoramento);
        }
    
    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                let id = params['id'];
                this.showPreload = true;

                this.grupoMonitoramentoService.get( id )
                    .then( res => {
                        this.showPreload = false;
                        this.grupoMonitoramento = new GrupoMonitoramentoBuilder().clone(res.json());
                    } )
                    .catch( error => {
                        this.catchConfiguration( error );
                    } )
            } );
        
        this.grupoMonitoramentoService.getTiposGrupoMonitoramento() 
            .then(res => {
                this.tiposGrupoMonitoramento = res.json();
            })
            .catch(error => {
                console.log(error);
            })
    }    
}