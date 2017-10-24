import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { GrupoMonitoramento } from './../../../model/grupo-monitoramento';
import { TipoGrupoMonitoramento } from './../../../model/tipo-grupo-monitoramento';
import { GrupoMonitoramentoExame } from './../../../model/grupo-monitoramento-exame';
import { Exame } from './../../../model/exame';
import { ExameBuilder } from './../../exame/exame.builder';
import { Criterio } from './../../../model/criterio';
import { CriterioBuilder } from './../../criterio/criterio.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { GrupoMonitoramentoBuilder } from './../grupo-monitoramento.builder';
import { GrupoMonitoramentoService } from './../grupo-monitoramento.service';

@Component( {
    selector: 'app-grupo-monitoramento-form',
    templateUrl: './grupo-monitoramento-form.html',
    styleUrls: ['./grupo-monitoramento-form.css']
} )
export class GrupoMonitoramentoFormComponent extends GenericFormComponent<GrupoMonitoramento> implements OnInit {
    tiposGrupoMonitoramento: Array<TipoGrupoMonitoramento>;
    grupoMonitoramento: GrupoMonitoramento;
    exames: Array<Exame>;
    criterios: Array<Criterio>;
    criteriosSelecteds: Array<Criterio>;
    
    constructor( private route: ActivatedRoute,
            private grupoMonitoramentoService: GrupoMonitoramentoService) { 
            super(grupoMonitoramentoService);
            this.goTo = "grupo-monitoramento";
            
            this.grupoMonitoramento = new GrupoMonitoramentoBuilder().initialize(this.grupoMonitoramento);
        }
    
    ngOnInit() {
        this.criteriosSelecteds = new Array<Criterio>();
        
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
                            this.showPreload = false;
                            console.log( error );
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
    }
    
    save() {
        super.save(new GrupoMonitoramentoBuilder().clone(this.grupoMonitoramento));
    }   
    
    addGrupoMonitoramentoExame() {
        let grupoMonitoramentoExame: GrupoMonitoramentoExame = new GrupoMonitoramentoExame();
    
        grupoMonitoramentoExame.setExame(new ExameBuilder().initialize(new Exame()));
        grupoMonitoramentoExame.setCriterios(new CriterioBuilder().initializeList(new Array<Criterio>()));
        grupoMonitoramentoExame.setGrupoMonitoramento(new GrupoMonitoramento());
        
        this.grupoMonitoramento.getGrupoMonitoramentoExames().push(grupoMonitoramentoExame);
    }

    removeGrupoMonitoramentoExame(i: number) {
        this.grupoMonitoramento.getGrupoMonitoramentoExames().splice(i, 1);
    }
    
    addCriterio(grupoMonitoramentoExameId, valor: number) {
        this.grupoMonitoramentoService.getCriterioById(valor)
            .then(res => {
                this.grupoMonitoramento.getGrupoMonitoramentoExames()[grupoMonitoramentoExameId].
                    getCriterios().push(res.json());
            })
            .catch(error => {
                console.log(error);
            })
    }

    removeCriterio(grupoMonitoramentoExameId, i: number) {
        this.grupoMonitoramento.getGrupoMonitoramentoExames()[grupoMonitoramentoExameId].
        getCriterios().splice(i, 1);
    }
    
}