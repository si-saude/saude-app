import { Component, OnInit, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import { MyDatePickerModule } from 'mydatepicker';

import * as $ from 'jquery';

import { GlobalVariable } from './../../../global';
import { Exame } from './../../../model/exame';
import { ExameBuilder } from './../../exame/exame.builder';
import { EmpregadoConvocacao } from './../../../model/empregado-convocacao';
import { EmpregadoConvocacaoExame } from './../../../model/empregado-convocacao-exame';
import { EmpregadoConvocacaoExameBuilder } from './../../empregado-convocacao-exame/empregado-convocacao-exame.builder';
import { EmpregadoConvocacaoService } from './../empregado-convocacao.service';
import { EmpregadoConvocacaoFilter } from './../empregado-convocacao.filter';
import { EmpregadoConvocacaoBuilder } from './../empregado-convocacao.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';

@Component( {
    selector: 'app-empregado-convocacao-form',
    templateUrl: './empregado-convocacao-form.html',
    styleUrls: ['./../../../../assets/css/form-component.css', './empregado-convocacao-form.css']
} )

export class EmpregadoConvocacaoFormComponent extends GenericFormComponent implements OnInit {
    empregadoConvocacao: EmpregadoConvocacao;
    exames: Array<Exame>;
    conformList: Array<boolean>;
    selecionarTodos: boolean;
    canAuditar: boolean;
    
    constructor( private route: ActivatedRoute,
        private empregadoConvocacaoService: EmpregadoConvocacaoService,
        router: Router) {
        super( empregadoConvocacaoService, router );
        this.goTo = "auditoria-exame";
        
        this.empregadoConvocacao = new EmpregadoConvocacaoBuilder().initialize( this.empregadoConvocacao );
        this.exames = new ExameBuilder().initializeList(this.exames);
        this.conformList = new Array<boolean>();
        this.canAuditar = false;
    }
    
    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
                ( params: any ) => {
                    if ( params['id'] !== undefined ) {
                        let id = params['id'];
                        this.showPreload = true;

                        this.empregadoConvocacaoService.get( id )
                            .then( res => {
                                this.showPreload = false;
                                this.empregadoConvocacao = new EmpregadoConvocacaoBuilder().clone( res.json() );
                                for (let i=0; i<this.empregadoConvocacao.getEmpregadoConvocacaoExames().length; i++) {
                                    if ( this.empregadoConvocacao.getEmpregadoConvocacaoExames()[i].getConforme() == true )
                                        this.conformList[i] = true;
                                    else this.conformList[i] = false; 
                                }
                            } )
                            .catch( error => {
                                this.catchConfiguration( error );
                            } )
                    }
                } );

        this.getExames();
    
    }
                
    getExames() {
        this.empregadoConvocacaoService.getExames()
            .then(res => {
                this.exames = new ExameBuilder().cloneList(res.json());
            })
            .catch(error => {
                this.catchConfiguration(error);
            })
    }
    
    save() {
        super.save(new EmpregadoConvocacaoBuilder().clone(this.empregadoConvocacao));
    }
    
    addExame( value ) {
        let exame = this.exames.find( e => {
            return e.getId() == value;
        } )
        
        let empregadoConvocacaoExame = new EmpregadoConvocacaoExameBuilder().clone(new EmpregadoConvocacaoExame());
        empregadoConvocacaoExame.setExame(new ExameBuilder().clone( exame ));
        
        this.empregadoConvocacao.getEmpregadoConvocacaoExames().push(empregadoConvocacaoExame);
        
        this.empregadoConvocacao.setAuditado(false);
        this.conformList[this.empregadoConvocacao.getEmpregadoConvocacaoExames().length-1] = false;
    }

    removeExame( value ) {
        this.empregadoConvocacao.getEmpregadoConvocacaoExames().splice(value, 1);
        this.conformList.splice(value, 1);
    }

    verifyAuditado() {
        let ret: boolean = this.conformList.find( cL => cL == false );
        if ( ret == undefined ) return true;
        else {
            this.empregadoConvocacao.setAuditado( false );
            return false;
        }
    }

    selectAll(evento) {
        if ($("#selectAll").is(':checked') == false)
            this.empregadoConvocacao.getEmpregadoConvocacaoExames().forEach(eCE => {
                eCE.setConforme(false);
                for (let i=0; i<this.conformList.length; i++)
                    this.conformList[i] = false;
            });
        else
            this.empregadoConvocacao.getEmpregadoConvocacaoExames().forEach(eCE => {
                eCE.setConforme(true);
                for (let i=0; i<this.conformList.length; i++)
                    this.conformList[i] = true;
            });
    
    }
    
}