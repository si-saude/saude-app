import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
import { GenericFormComponent } from './../../../generics/generic.form.component'; 
import { ProfissiogramaBuilder } from './../profissiograma.builder';
import { GrupoMonitoramentoBuilder } from './../../grupo-monitoramento/grupo-monitoramento.builder';

@Component( {
    selector: 'app-profissiograma-form',
    templateUrl: './profissiograma-form.html',
    styleUrls: ['./profissiograma-form.css']
} )
export class ProfissiogramaFormComponent extends GenericFormComponent {
    profissiograma: Profissiograma;
    gruposMonitoramento: Array<GrupoMonitoramento>;
    gruposMonitoramentoExame: Array<GrupoMonitoramentoExame>;
    exames: Array<Exame>;
    criterios: Array<Criterio>;
    arrayCriterio: Array<Criterio>;

    selectedGM = null;
    selectedExm = null;

    profissiogramaFilter: ProfissiogramaFilter = new ProfissiogramaFilter();
    
    constructor( private route: ActivatedRoute,
        private profissiogramaService: ProfissiogramaService) {
        super(profissiogramaService);
        this.goTo = "profissiograma";
        
        this.profissiograma = new ProfissiogramaBuilder().initialize(this.profissiograma);
        
        this.gruposMonitoramentoExame = new Array<GrupoMonitoramentoExame>();
        this.arrayCriterio = new Array<Criterio>();
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;
                    
                    this.profissiogramaService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.profissiograma = new ProfissiogramaBuilder().clone(res.json());
                        } )
                        .catch( error => {
                            this.showPreload = false;
                            console.log( error );
                        } )
                }
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
      }
        
    save() {
        super.save(new ProfissiogramaBuilder().clone(this.profissiograma));
    }
    
    addGrupoMonitoramento(valor: number) {
        if ( valor == 0 ) {
            this.toastParams = ['Por favor, selecione um grupo monitoramento', 4000];
            this.globalActions.emit('toast');
        } else {
            this.profissiogramaService.getGrupoMonitoramentoById(valor)
                .then(res => {
                    let grupoMonitoramento = res.json();
                    this.profissiograma.getGrupoMonitoramentos().push(new GrupoMonitoramentoBuilder().clone(grupoMonitoramento));
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
    

    removeGrupoMonitoramento(i: number) {
        this.profissiograma.getGrupoMonitoramentos().splice(i, 1);
    }
    
    selectGrupoMonitoramento(index: number) {
        this.selectedGM = this.gruposMonitoramento[index];
        this.gruposMonitoramentoExame = this.profissiograma.getGrupoMonitoramentos()[index].getGrupoMonitoramentoExames();
        this.arrayCriterio = new Array<Criterio>();
        this.selectedExm = null;
    }
  
    addExame(valor: number) {
        if ( this.selectedGM === null ) { 
            this.toastParams = ['Por favor, escolha um grupo monitoramento', 4000];
            this.globalActions.emit('toast');
        } else {
            let exame = this.exames.find(o => o["id"] == valor);
            let grupoMonitoramentoExame = new GrupoMonitoramentoExameBuilder().initialize(new GrupoMonitoramentoExame());
            grupoMonitoramentoExame.setExame(new ExameBuilder().clone(exame));
            grupoMonitoramentoExame.setCriterios(new CriterioBuilder().initializeList(new Array<Criterio>()));
            
            this.gruposMonitoramentoExame.push(grupoMonitoramentoExame);
        }
    }

    removeExame(i: number) {
        this.gruposMonitoramentoExame.splice(i, 1);
    }

    selectExame(index: number) {
        this.selectedExm = this.gruposMonitoramentoExame[index].getExame();
        this.arrayCriterio = this.gruposMonitoramentoExame[index].getCriterios();
    }
    
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
