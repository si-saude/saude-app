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
    selector: 'app-profissiograma-form',
    templateUrl: './profissiograma-form.html',
    styleUrls: ['./profissiograma-form.css', './../../../../assets/css/form-component.css']
} )
export class ProfissiogramaFormComponent extends GenericFormComponent {
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
        router: Router ) {
        super( profissiogramaService, router );
        this.goTo = "profissiograma";

        this.profissiograma = new ProfissiogramaBuilder().initialize( this.profissiograma );

        this.gruposMonitoramentoProfissiogramaExame = new Array<GrupoMonitoramentoProfissiogramaExame>();
        this.arrayCriterio = new Array<Criterio>();
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if ( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.profissiogramaService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.profissiograma = new ProfissiogramaBuilder().clone( res.json() );
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );

        this.getGruposMonitoramento();
        this.getExames();
        this.getCriterios();
    }

    getGruposMonitoramento() {
        this.profissiogramaService.getGruposMonitoramento()
            .then( res => {
                this.gruposMonitoramento = new GrupoMonitoramentoBuilder().cloneList(res.json());
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

    save() {
        super.save( new ProfissiogramaBuilder().clone( this.profissiograma ) );
    }

    addGrupoMonitoramento( valor: number ) {
        if ( valor == 0 ) {
            this.toastParams = ['Por favor, selecione um grupo monitoramento', 4000];
            this.globalActions.emit( 'toast' );
        } else {
            let grupoMonitoramentoProfissiograma =  this.profissiograma.getGrupoMonitoramentoProfissiogramas().find(g=>
                g.getGrupoMonitoramento().getId() == valor );
            
            if(grupoMonitoramentoProfissiograma){
                this.toastParams = ['Este grupo já foi adicionado', 4000];
                this.globalActions.emit( 'toast' );
            }else{
                let grupoMonitoramento = this.gruposMonitoramento.find(g => g.getId() == valor);
                grupoMonitoramentoProfissiograma = new GrupoMonitoramentoProfissiogramaBuilder().initialize(undefined);
                grupoMonitoramentoProfissiograma.setGrupoMonitoramento(grupoMonitoramento);
                this.profissiograma.getGrupoMonitoramentoProfissiogramas().push(grupoMonitoramentoProfissiograma);
            }            
        }
    }


    removeGrupoMonitoramento( i: number ) {
        this.profissiograma.getGrupoMonitoramentoProfissiogramas().splice( i, 1 );
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

    addExame( valor: number ) {
        if ( this.selectedGM === null ) {
            this.toastParams = ['Por favor, escolha um grupo monitoramento', 4000];
            this.globalActions.emit( 'toast' );
        } else {
            let exame = this.exames.find( o => o["id"] == valor );
            let grupoMonitoramentoProfissiogramaExame = new GrupoMonitoramentoProfissiogramaExameBuilder()
                .initialize( new GrupoMonitoramentoProfissiogramaExame() );
            grupoMonitoramentoProfissiogramaExame.setExame( new ExameBuilder().clone( exame ) );
            grupoMonitoramentoProfissiogramaExame.setCriterios( new CriterioBuilder().initializeList( new Array<Criterio>() ) );

            this.gruposMonitoramentoProfissiogramaExame.push(grupoMonitoramentoProfissiogramaExame);
        }
    }

    removeExame( i: number ) {
        this.gruposMonitoramentoProfissiogramaExame.splice( i, 1 );
    }

    selectExame( index: number ) {
        this.selectedExm = this.gruposMonitoramentoProfissiogramaExame[index].getExame();
        this.arrayCriterio = this.gruposMonitoramentoProfissiogramaExame[index].getCriterios();
    }

    addCriterio( valor: number ) {
        if ( this.selectedExm === null ) {
            this.toastParams = ['Por favor, escolha um exame', 4000];
            this.globalActions.emit( 'toast' );
        } else {
            let criterio = this.criterios.find( o => o["id"] == valor );
            this.arrayCriterio.push( criterio );
        }
    }

    removeCriterio( i: number ) {
        this.arrayCriterio.splice( i, 1 );
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
