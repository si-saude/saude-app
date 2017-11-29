import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {MaterializeDirective,MaterializeAction} from "angular2-materialize";

import { GlobalVariable } from './../../../global';
import { GrupoMonitoramento } from './../../../model/grupo-monitoramento';
import { TipoGrupoMonitoramento } from './../../../model/tipo-grupo-monitoramento';
import { GrupoMonitoramentoExame } from './../../../model/grupo-monitoramento-exame';
import { GrupoMonitoramentoExameBuilder } from './../../grupo-monitoramento-exame/grupo-monitoramento-exame.builder';
import { Exame } from './../../../model/exame';
import { ExameBuilder } from './../../exame/exame.builder';
import { Criterio } from './../../../model/criterio';
import { CriterioBuilder } from './../../criterio/criterio.builder';
import { Periodicidade } from './../../../model/periodicidade';
import { PeriodicidadeBuilder } from './../../periodicidade/periodicidade.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { GrupoMonitoramentoBuilder } from './../grupo-monitoramento.builder';
import { GrupoMonitoramentoService } from './../grupo-monitoramento.service';

@Component( {
    selector: 'app-grupo-monitoramento-form',
    templateUrl: './grupo-monitoramento-form.html',
    styleUrls: ['./grupo-monitoramento-form.css', './../../../../assets/css/form-component.css']
} )
export class GrupoMonitoramentoFormComponent extends GenericFormComponent implements OnInit {
    tiposGrupoMonitoramento: Array<TipoGrupoMonitoramento>;
    grupoMonitoramento: GrupoMonitoramento;
    exames: Array<Exame>;
    criterios: Array<Criterio>;
    arrayCriterio: Array<Criterio>;
    gruposMonitoramentoExame: Array<GrupoMonitoramentoExame>;
    periodicidades: Array<Periodicidade>;

    globalActions = new EventEmitter<string|MaterializeAction>();
    toastParams = ['', 4000];

    selectedExm = null;
    
    constructor( private route: ActivatedRoute,
            private grupoMonitoramentoService: GrupoMonitoramentoService) { 
            super(grupoMonitoramentoService);
            this.goTo = "grupo-monitoramento";
            
            this.arrayCriterio = new Array<Criterio>();
            this.gruposMonitoramentoExame = new Array<GrupoMonitoramentoExame>();
            this.grupoMonitoramento = new GrupoMonitoramentoBuilder().initialize(this.grupoMonitoramento);
            this.periodicidades = new PeriodicidadeBuilder().initializeList(this.periodicidades);
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
        
        this.grupoMonitoramentoService.getExames()
            .then(res => {
                this.exames = res.json();
            })
            .catch(error => {
                console.log(error);
            })
        
        this.grupoMonitoramentoService.getCriterios()
            .then(res => {
                this.criterios = res.json();
            })
            .catch(error => {
                console.log(error);
            })
        
        this.grupoMonitoramentoService.getTiposGrupoMonitoramento() 
            .then(res => {
                this.tiposGrupoMonitoramento = res.json();
            })
            .catch(error => {
                console.log(error);
            })
        
        this.grupoMonitoramentoService.getPeriodicidades()
            .then(res => {
                this.periodicidades = res.json();
            })
            .catch(error => {
                console.log(error);
            })
    }
    
    save() {
        super.save(new GrupoMonitoramentoBuilder().clone(this.grupoMonitoramento));
    }   
    
    addExame(valor: number) {
        if ( valor == 0 ) {
            this.toastParams = ['Por favor, selecione um exame', 4000];
            this.globalActions.emit('toast');
        } else {
            let exame = this.exames.find(o => o["id"] == valor);
            let grupoMonitoramentoExame = new GrupoMonitoramentoExameBuilder().initialize(new GrupoMonitoramentoExame());
            grupoMonitoramentoExame.setExame(new ExameBuilder().clone(exame));
            grupoMonitoramentoExame.setCriterios(new CriterioBuilder().initializeList(new Array<Criterio>()));
            
            this.grupoMonitoramento.getGrupoMonitoramentoExames().push(grupoMonitoramentoExame);
        }
    }

    removeExame(i: number) {
        this.grupoMonitoramento.getGrupoMonitoramentoExames().splice(i, 1);
    }
    
    selectExame(index: number) {
        this.selectedExm = this.grupoMonitoramento.getGrupoMonitoramentoExames()[index].getExame();
        this.arrayCriterio = this.grupoMonitoramento.getGrupoMonitoramentoExames()[index].getCriterios();
    }
    
    selectedExame(e: number) {
        if ( this.grupoMonitoramento.getGrupoMonitoramentoExames()[e].getExame() === this.selectedExm ) {
            return "active";
        } else return "";
    }
    
//    addExame() {
//        let grupoMonitoramentoExame: GrupoMonitoramentoExame = new GrupoMonitoramentoExame();
//    
//        grupoMonitoramentoExame.setExame(new ExameBuilder().initialize(new Exame()));
//        grupoMonitoramentoExame.setCriterios(new CriterioBuilder().initializeList(new Array<Criterio>()));
//        grupoMonitoramentoExame.setGrupoMonitoramento(new GrupoMonitoramento());
//        
//        this.grupoMonitoramento.getGrupoMonitoramentoExames().push(grupoMonitoramentoExame);
//    }
//
//    removeExame(i: number) {
//        this.grupoMonitoramento.getGrupoMonitoramentoExames().splice(i, 1);
//    }
    
    addCriterio(valor: number) {
        if ( this.selectedExm === null ) { 
            this.toastParams = ['Por favor, escolha um exame', 4000];
            this.globalActions.emit('toast');
        } else {
            let criterio = this.criterios.find(o => o["id"] == valor);
            this.arrayCriterio.push(criterio);
        }
    }

    removeCriterio(i: number) {
        this.arrayCriterio.splice(i, 1);
    }
    
}