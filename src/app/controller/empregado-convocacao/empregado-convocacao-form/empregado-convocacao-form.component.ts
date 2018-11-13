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
import { HttpUtil } from './../../../generics/utils/http.util';
import { Util } from './../../../generics/utils/util';

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
    httpUtil: HttpUtil;
    indexEmpregadoConvocacaoExame: number;
    private modalConteudo;
    private conteudo: string;
    private desabilitarResultadoAuditar: boolean = false;
    private desabilitarAuditar: boolean = false;
    
    constructor( private route: ActivatedRoute,
        private empregadoConvocacaoService: EmpregadoConvocacaoService,
        router: Router) {
        super( empregadoConvocacaoService, router );
        this.goTo = "auditoria-exame";
        
        this.empregadoConvocacao = new EmpregadoConvocacaoBuilder().initialize( this.empregadoConvocacao );
        this.exames = new ExameBuilder().initializeList(this.exames);
        this.modalConteudo = new EventEmitter<string | MaterializeAction>();
        this.canAuditar = false;
        this.httpUtil = new HttpUtil();
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
                                    if( this.empregadoConvocacao.getEmpregadoConvocacaoExames()[i].getConforme() == false )
                                        this.desabilitarAuditar = true   

                                    if( this.empregadoConvocacao.getEmpregadoConvocacaoExames()[i].getResultadoConforme() == false)
                                        this.desabilitarResultadoAuditar = true;   
                                
                                
                                }
                                
                            } )
                            .catch( error => {
                                this.catchConfiguration( error );
                            } )
                    }
                } );

        this.getExames();    
    }
                
    verifyAuditoria(empregadoConvocacaoExame: EmpregadoConvocacaoExame){        
        if(!Util.isNotNull(empregadoConvocacaoExame.getAuditoriaCustomDate().getAppDate()))
            empregadoConvocacaoExame.getAuditoriaCustomDate().setApiDate(new Date(Date.now()))        
    }
    
    verifyResultadoAuditado(){        
        
        if(this.empregadoConvocacao.getEmpregadoConvocacaoExames().filter(x=>x.getResultadoConforme() == false).length > 0){
           this.desabilitarResultadoAuditar = true;
           this.empregadoConvocacao.setResultadoAuditado(false);
        }else{
            this.desabilitarResultadoAuditar = false;
        }
    }
    
    verifyAuditado(){        
        if(this.empregadoConvocacao.getEmpregadoConvocacaoExames().filter(x=>x.getConforme() == false).length > 0){
           this.desabilitarAuditar = true;
           this.empregadoConvocacao.setAuditado(false);
        }else{
            this.desabilitarAuditar = false;
        }
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
    }

    removeExame( value ) {
        this.empregadoConvocacao.getEmpregadoConvocacaoExames().splice(value, 1);
    }

    selectAll(evento) {
        if ($("#selectAll").is(':checked') == false)
            this.empregadoConvocacao.getEmpregadoConvocacaoExames().forEach(eCE => {
                eCE.setConforme(false);
            });
        else
            this.empregadoConvocacao.getEmpregadoConvocacaoExames().forEach(eCE => {
                eCE.setConforme(true);
            });    
    }                
                
    openModalConteudoItem(empregadoConvocacaoExame: EmpregadoConvocacaoExame, index: number) {
        this.indexEmpregadoConvocacaoExame = index;
        this.modalConteudo.emit( { action: "modal", params: ['open'] } );
        this.conteudo = empregadoConvocacaoExame.getResultado();
    }
            
    confirmarModalConteudo() {
                this.empregadoConvocacao.getEmpregadoConvocacaoExames()[this.indexEmpregadoConvocacaoExame].setResultado(this.conteudo)
                this.verifyAuditoria(this.empregadoConvocacao.getEmpregadoConvocacaoExames()[this.indexEmpregadoConvocacaoExame])
                this.modalConteudo.emit( { action: "modal", params: ['close'] } );
    }
            
    cancelarModalConteudo() {
                this.modalConteudo.emit( { action: "modal", params: ['close'] } );
    }
}