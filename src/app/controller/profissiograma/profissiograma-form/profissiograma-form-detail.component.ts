import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { MaterializeDirective, MaterializeAction } from "angular2-materialize";

import { GlobalVariable } from './../../../global';
import { Profissiograma } from './../../../model/profissiograma';
import { ProfissiogramaService } from './../profissiograma.service';
import { ProfissiogramaFilter } from './../profissiograma.filter';
import { GrupoMonitoramento } from './../../../model/grupo-monitoramento';
import { GrupoMonitoramentoProfissiograma } from './../../../model/grupo-monitoramento-profissiograma';
import { GrupoMonitoramentoProfissiogramaBuilder } from './../../grupo-monitoramento-profissiograma/grupo-monitoramento-profissiograma.builder';
import { GrupoMonitoramentoProfissiogramaExame } from './../../../model/grupo-monitoramento-profissiograma-exame';
import { GrupoMonitoramentoProfissiogramaExameBuilder } from './../../grupo-monitoramento-profissiograma-exame/grupo-monitoramento-profissiograma-exame.builder';
import { Exame } from './../../../model/exame';
import { ExameBuilder } from './../../exame/exame.builder';
import { Criterio } from './../../../model/criterio';
import { CriterioBuilder } from './../../criterio/criterio.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { ProfissiogramaBuilder } from './../profissiograma.builder';
import { GrupoMonitoramentoBuilder } from './../../grupo-monitoramento/grupo-monitoramento.builder';

@Component( {
    selector: 'app-profissiograma-form-detail',
    templateUrl: './profissiograma-form-detail.html',
    styleUrls: ['./profissiograma-form.css', './../../../../assets/css/form-component.css']
} )
export class ProfissiogramaFormDetailComponent extends GenericFormComponent {
    profissiograma: Profissiograma;
    gruposMonitoramento: Array<GrupoMonitoramento>;
    gruposMonitoramentoProfissiogramaExame: Array<GrupoMonitoramentoProfissiogramaExame>;
    exames: Array<Exame>;
    criterios: Array<Criterio>;
    arrayCriterio: Array<Criterio>;
    
    selectedGM = null;
    selectedExm = null;
    
    profissiogramaFilter: ProfissiogramaFilter = new ProfissiogramaFilter();
    
    constructor( private route: ActivatedRoute,
        private profissiogramaService: ProfissiogramaService,
        router: Router) {
        super(profissiogramaService, router);
        this.goTo = "profissiograma";
        
        this.profissiograma = new ProfissiogramaBuilder().initialize(this.profissiograma);
        
        this.gruposMonitoramentoProfissiogramaExame = new Array<GrupoMonitoramentoProfissiogramaExame>();
        this.arrayCriterio = new Array<Criterio>();
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                let id = params['id'];
                this.showPreload = true;
                
                this.profissiogramaService.get( id )
                    .then( res => {
                        this.showPreload = false;
                        this.profissiograma = new ProfissiogramaBuilder().clone(res.json());
                    } )
                    .catch( error => {
                        this.catchConfiguration( error );
                    } )
            } );
            
        this.getGruposMonitoramento();
        this.getExames();
        this.getCriterios();
      }
    
    getGruposMonitoramento() {
        this.profissiogramaService.getGruposMonitoramento()
            .then( res => {
                this.gruposMonitoramento = res.json();
                this.gruposMonitoramento.sort(function(a, b){
                    if ( a['nome'] > b['nome'] )
                        return 1;
                    else if ( a['nome'] < b['nome'] )
                        return -1;
                    else return 0;
                });
            } )
            .catch( error => {
                console.log( error );
            } )
    }

    getExames() {
        this.profissiogramaService.getExames()
            .then( res => {
                this.exames = res.json();
            } )
            .catch( error => {
                console.log( error );
            } )
    }

    getCriterios() {
        this.profissiogramaService.getCriterios()
            .then( res => {
                this.criterios = res.json();
            } )
            .catch( error => {
                console.log( error );
            } )
    }
    
    selectGrupoMonitoramento( index: number ) {
        this.selectedGM = this.gruposMonitoramento[index];
        this.gruposMonitoramentoProfissiogramaExame = this.profissiograma
            .getGrupoMonitoramentoProfissiogramas()
            .find(g=>g.getGrupoMonitoramento().getId() == this.selectedGM.getId())
            .getGrupoMonitoramentoProfissiogramaExames();
        this.arrayCriterio = new Array<Criterio>();
        this.selectedExm = null;
    }
    
    selectExame( index: number ) {
        this.selectedExm = this.gruposMonitoramentoProfissiogramaExame[index].getExame();
        this.arrayCriterio = this.gruposMonitoramentoProfissiogramaExame[index].getCriterios();
    }
    
    selectedGrupoMonitoramento( gM: number ) {
        if ( this.gruposMonitoramento != undefined && this.selectedGM) {
            if ( this.gruposMonitoramento[gM].getId() === this.selectedGM.getId() ) {
                return "active";
            } else return "";
        } else {
            setTimeout(() => {
                if (this.selectedGM && this.gruposMonitoramento[gM].getId() === this.selectedGM.getId() ) {
                    return "active";
                } else return "";
            }, 500 );
        }
    }

    selectedExame( e: number ) {
        if (this.selectedExm && this.gruposMonitoramentoProfissiogramaExame[e].getExame().getId() === this.selectedExm.getId() ) {
            return "active";
        } else return "";
    }
    
    onDestroy() {
        this.inscricao.unsubscribe();
    }
    
}
