import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import {MaterializeDirective,MaterializeAction} from "angular2-materialize";

import { GlobalVariable } from './../../../global'; 
import { Profissiograma } from './../../../model/profissiograma';
import { ProfissiogramaService } from './../profissiograma.service';
import { ProfissiogramaFilter } from './../profissiograma.filter';
import { GrupoMonitoramento } from './../../../model/grupo-monitoramento';
import { GrupoMonitoramentoExame } from './../../../model/grupo-monitoramento-exame';
import { GrupoMonitoramentoExameBuilder } from './../../grupo-monitoramento-exame/grupo-monitoramento-exame.builder';
import { Exame } from './../../../model/exame';
import { ExameBuilder } from './../../exame/exame.builder';
import { Criterio } from './../../../model/criterio';
import { CriterioBuilder } from './../../criterio/criterio.builder';
import { Periodicidade } from './../../../model/periodicidade';
import { PeriodicidadeBuilder } from './../../periodicidade/periodicidade.builder';
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
    gruposMonitoramentoExame: Array<GrupoMonitoramentoExame>;
    exames: Array<Exame>;
    criterios: Array<Criterio>;
    arrayCriterio: Array<Criterio>;
    periodicidades: Array<Periodicidade>;

    selectedGM = null;
    selectedExm = null;

    profissiogramaFilter: ProfissiogramaFilter = new ProfissiogramaFilter();
    
    constructor( private route: ActivatedRoute,
        private profissiogramaService: ProfissiogramaService,
        router: Router) {
        super(profissiogramaService, router);
        this.goTo = "profissiograma";
        
        this.profissiograma = new ProfissiogramaBuilder().initialize(this.profissiograma);
        
        this.gruposMonitoramentoExame = new Array<GrupoMonitoramentoExame>();
        this.arrayCriterio = new Array<Criterio>();
        this.periodicidades = new PeriodicidadeBuilder().initializeList(this.periodicidades);
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
            
          this.profissiogramaService.getGruposMonitoramento()
              .then(res => {
                  this.gruposMonitoramento = res.json();
              })
              .catch(error => {
                  console.log(error);
              })
          
          this.profissiogramaService.getExames()
              .then(res => {
                  this.exames = res.json();
              })
              .catch(error => {
                  console.log(error);
              })
          
          this.profissiogramaService.getCriterios()
              .then(res => {
                  this.criterios = res.json();
              })
              .catch(error => {
                  console.log(error);
              })
          
          this.profissiogramaService.getPeriodicidade()
              .then(res => {
                  this.periodicidades = res.json();
              })
              .catch(error => {
                  console.log(error);
              })
      }
            
    selectGrupoMonitoramento(index: number) {
        this.selectedGM = this.gruposMonitoramento[index];
        this.gruposMonitoramentoExame = this.profissiograma.getGrupoMonitoramentos()[index].getGrupoMonitoramentoExames();
        this.arrayCriterio = new Array<Criterio>();
        this.selectedExm = null;
    }
  
    selectExame(index: number) {
        this.selectedExm = this.gruposMonitoramentoExame[index].getExame();
        this.arrayCriterio = this.gruposMonitoramentoExame[index].getCriterios();
    }
        
    selectedGrupoMonitoramento(gM: number) {
        if ( this.gruposMonitoramento != undefined ) {
            if ( this.gruposMonitoramento[gM] === this.selectedGM ) {
                return "active";
            } else return "";
        } else {
            setTimeout(() => {
                if ( this.gruposMonitoramento[gM] === this.selectedGM ) {
                    return "active";
                } else return "";
            }, 500);
        }
    }
    
    selectedExame(e: number) {
        if ( this.gruposMonitoramentoExame[e].getExame() === this.selectedExm ) {
            return "active";
        } else return "";
    }
    
    onDestroy() {
        this.inscricao.unsubscribe();
    }
    
}
