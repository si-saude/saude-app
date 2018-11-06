import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { MaterializeDirective,MaterializeAction } from "angular2-materialize";

import { GlobalVariable } from './../../../global';
import { GrupoMonitoramento } from './../../../model/grupo-monitoramento';
import { Avaliacao } from './../../../model/avaliacao';
import { TipoGrupoMonitoramento } from './../../../model/tipo-grupo-monitoramento';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { GrupoMonitoramentoBuilder } from './../grupo-monitoramento.builder';
import { AvaliacaoBuilder } from './../../avaliacao/avaliacao.builder';
import { GrupoMonitoramentoService } from './../grupo-monitoramento.service';
import { Util } from './../../../generics/utils/util';

@Component( {
    selector: 'app-grupo-monitoramento-form',
    templateUrl: './grupo-monitoramento-form.html',
    styleUrls: ['./grupo-monitoramento-form.css', './../../../../assets/css/form-component.css']
} )
export class GrupoMonitoramentoFormComponent extends GenericFormComponent implements OnInit {
    tiposGrupoMonitoramento: Array<TipoGrupoMonitoramento>;
    grupoMonitoramento: GrupoMonitoramento;
    avaliacao: Avaliacao;

    globalActions = new EventEmitter<string|MaterializeAction>();
    toastParams = ['', 4000];
    
    constructor( private route: ActivatedRoute,
            private grupoMonitoramentoService: GrupoMonitoramentoService,
            router: Router) { 
            super(grupoMonitoramentoService, router);
            this.goTo = "grupo-monitoramento";
            
            this.grupoMonitoramento = new GrupoMonitoramentoBuilder().initialize(this.grupoMonitoramento);
            this.avaliacao = new AvaliacaoBuilder().initialize(this.avaliacao);
        }
    
    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
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
                }
            } );
        
        this.getTiposGrupoMonitoramento();
    }
    
    getTiposGrupoMonitoramento() {
        this.grupoMonitoramentoService.getTiposGrupoMonitoramento() 
            .then(res => {
                this.tiposGrupoMonitoramento = res.json();
            })
            .catch(error => {
                console.log(error);
            })
    }
    
    addAvaliacao() {
        
        if(Util.isNotNull(this.avaliacao.getNome()) && this.grupoMonitoramento.getAvaliacoes().filter(
                a=>a.getNome() == this.avaliacao.getNome()).length == 0){
            
            this.grupoMonitoramento.getAvaliacoes().push(new AvaliacaoBuilder().clone(this.avaliacao));
            this.avaliacao = new AvaliacaoBuilder().initialize(null);
        }     
    }
    
    removeAvaliacao(i: number) {
        this.grupoMonitoramento.getAvaliacoes().splice(i, 1);
    }
    
    save() {
        super.save(new GrupoMonitoramentoBuilder().clone(this.grupoMonitoramento));
        console.log(this.grupoMonitoramento.getAvaliacoes());
    }
    
}