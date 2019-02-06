import { Component, OnInit, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MaterializeAction } from "angular2-materialize";
import 'rxjs/Rx';

import * as $ from 'jquery';

import { Profissiograma } from './../../../model/profissiograma';
import { ProfissiogramaBuilder } from './../../profissiograma/profissiograma.builder';
import { Convocacao } from './../../../model/convocacao';
import { Empregado } from './../../../model/empregado';
import { Exame } from './../../../model/exame';
import { ExameBuilder } from './../../exame/exame.builder';
import { EmpregadoBuilder } from './../../empregado/empregado.builder';
import { ConvocacaoBuilder } from './../convocacao.builder';
import { ConvocacaoService } from './../convocacao.service';
import { GerenciaConvocacao } from './../../../model/gerencia-convocacao';
import { EmpregadoConvocacao } from './../../../model/empregado-convocacao';
import { EmpregadoConvocacaoBuilder } from './../../empregado-convocacao/empregado-convocacao.builder';
import { EmpregadoConvocacaoExame } from './../../../model/empregado-convocacao-exame';
import { EmpregadoConvocacaoExameBuilder } from './../../empregado-convocacao-exame/empregado-convocacao-exame.builder';
import { GerenciaConvocacaoBuilder } from './../../gerencia-convocacao/gerencia-convocacao.builder';
import { GlobalVariable } from './../../../global';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { EmpregadoNomeAutocomplete } from './../../empregado/empregado-nome.autocomplete';

@Component( {
    selector: 'app-convocacao-form',
    templateUrl: './convocacao-form.html',
    styleUrls: ['./convocacao-form.css', './../../../../assets/css/form-component.css']
} )
export class ConvocacaoFormComponent extends GenericFormComponent implements OnInit {
    tipos: Array<string>;
    convocacao: Convocacao;
    profissiogramas: Array<Profissiograma>;
    exames: Array<Exame>;
    gerenciaConvocacoes: Array<GerenciaConvocacao>;
    empregadoConvocacoes: Array<EmpregadoConvocacao>;
    
    selectedGerenciaConvocacaoCC: Array<string>;
    
    checkBoxSelecteds: Array<boolean>;
    filterGerenciaByCodigoCompleto: any;
    filterChaveEmpregado: any;
    filterNomeEmpregado: any;
    filterGerenciaEmpregado: any;
    empregadoDetail: EmpregadoConvocacao;
    checkEmpregados: boolean;
    pendenteRelatorio: boolean;
    conformList: Array<boolean>;
    selectedGC;
    existProfissiograma;

    modalEditEmpregado;
    modalConfirmProfissiograma;

    empregadoConvocacao: EmpregadoConvocacao;
    autoCompleteEmp:EmpregadoNomeAutocomplete;
    
    constructor( private route: ActivatedRoute,
        private convocacaoService: ConvocacaoService,
        router: Router) {
        super( convocacaoService, router );

        this.tipos = new Array<string>();
        this.goTo = "convocacao";
        this.convocacao = new ConvocacaoBuilder().initialize( this.convocacao );
        this.empregadoDetail = new EmpregadoConvocacaoBuilder().initialize( this.empregadoDetail );
        this.profissiogramas = new ProfissiogramaBuilder().initializeList( Array<Profissiograma>() );
        this.gerenciaConvocacoes = new GerenciaConvocacaoBuilder().initializeList( Array<GerenciaConvocacao>() );
        this.empregadoConvocacoes = new EmpregadoConvocacaoBuilder().initializeList( Array<EmpregadoConvocacao>() );
        
        this.selectedGerenciaConvocacaoCC = new Array<string>();
        
        this.checkBoxSelecteds = new Array<boolean>();
        this.selectedGC = null;
        this.existProfissiograma = false;
        this.modalEditEmpregado = new EventEmitter<string | MaterializeAction>();
        this.modalConfirmProfissiograma = new EventEmitter<string | MaterializeAction>();
        this.checkEmpregados = false;
        this.conformList = new Array<boolean>();
        
        this.empregadoConvocacao = new EmpregadoConvocacaoBuilder().initialize( this.empregadoConvocacao );
        this.autoCompleteEmp = new EmpregadoNomeAutocomplete(this.convocacaoService.getEmpregadoService());
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if ( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.convocacaoService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.existProfissiograma = true;
                            this.convocacao = new ConvocacaoBuilder().clone( res.json() );
                            this.gerenciaConvocacoes = new GerenciaConvocacaoBuilder().cloneList(this.convocacao.getGerenciaConvocacoes());
                            this.empregadoConvocacoes = new EmpregadoConvocacaoBuilder().cloneList(this.convocacao.getEmpregadoConvocacoes());
                            this.selectedsGerenciaConvocacoes();
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                } else {
                    this.convocacaoService.get( 0 )
                    .then( res => {
                        this.convocacao = new ConvocacaoBuilder().clone( res.json() );
                        this.convocacao.setProfissiograma( new ProfissiogramaBuilder().initialize( new Profissiograma() ) );
                        this.gerenciaConvocacoes = new GerenciaConvocacaoBuilder().cloneList(this.convocacao.getGerenciaConvocacoes());
                        this.empregadoConvocacoes = new EmpregadoConvocacaoBuilder().cloneList(this.convocacao.getEmpregadoConvocacoes());
                    } )
                    .catch( error => {
                        this.catchConfiguration( error );
                    } )
                }
            } );

        this.getTipos();
        this.getProfissiogramas();
        
    }
    
    getTipos() {
        this.convocacaoService.getTipos()
            .then( res => {
                this.tipos = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
                console.log( error );
            } )
    }
    
    getProfissiogramas() {
        this.convocacaoService.getProfissiogramas()
            .then( res => {
                this.profissiogramas = new ProfissiogramaBuilder().cloneList( res.json() );
            } )
            .catch( error => {
                console.log( error );
            } )
    }
    
    save() {
        this.setSelectedsGerencias();
        super.save( new ConvocacaoBuilder().clone( this.convocacao ) );
        
    }

    filterGerenciaConvocacoes( evento: string ) {
        if ( this.convocacao.getGerenciaConvocacoes().length > 0 ) {
            this.gerenciaConvocacoes = new GerenciaConvocacaoBuilder().cloneList(this.convocacao.getGerenciaConvocacoes().filter( gC => {
                evento = evento.toLowerCase();
                let lowerCaseCC = gC.getGerencia().getCodigoCompleto().toLowerCase();
                return lowerCaseCC.includes( evento );
            } ));
        }       
    }

    selectGerenciaConvocacao( index: number, gerenciaConvocacao: GerenciaConvocacao ) {
        this.selectedGC = this.gerenciaConvocacoes[index];
        let empsConvs: Array<EmpregadoConvocacao> = new EmpregadoConvocacaoBuilder().initializeList(new Array<EmpregadoConvocacao>());
        
        if ( $("#gerenciaConvocacao"+index).is(":checked") == true ) {
            let sG = this.selectedGerenciaConvocacaoCC.find(s => s == gerenciaConvocacao.getGerencia().getCodigoCompleto())
            
            if ( sG == undefined )
                this.selectedGerenciaConvocacaoCC.push(gerenciaConvocacao.getGerencia().getCodigoCompleto());
            
            let sendConvocacao = new ConvocacaoBuilder().initialize( null );
            sendConvocacao.setProfissiograma( this.convocacao.getProfissiograma() );
            sendConvocacao.getGerenciaConvocacoes().push(
                new GerenciaConvocacaoBuilder().clone( this.gerenciaConvocacoes[index] ) );
            sendConvocacao.setId( this.convocacao.getId() );
            sendConvocacao.setFim(this.convocacao.getFim());
            sendConvocacao.setInicio(this.convocacao.getInicio());

            this.convocacaoService.getEmpregadosByGerencia( sendConvocacao )
                .then( res => {
                    let c: Convocacao = new ConvocacaoBuilder().clone( res.json() );
                    let eCs = c.getEmpregadoConvocacoes();
                    eCs.forEach( e => {
                        let e1 = this.convocacao.getEmpregadoConvocacoes().find( e2 => e.getEmpregado().getId() == e2.getEmpregado().getId());
                        if ( e1 == undefined ) {
                            this.empregadoConvocacoes.push(e);
                            this.convocacao.getEmpregadoConvocacoes().push(e);
                        }
                    })
                    
                } )
                .catch( error => {
                    console.log( error );
                } )
        } else {
            let i: number = this.selectedGerenciaConvocacaoCC.findIndex(sG => sG == gerenciaConvocacao.getGerencia().getCodigoCompleto());
            if (i >= 0)
                this.selectedGerenciaConvocacaoCC.splice(i, 1);
            
            let empregadoConvocacoes: Array<EmpregadoConvocacao> = this.convocacao.getEmpregadoConvocacoes().filter( eC => {
                return eC.getEmpregado().getGerencia().getId() == this.gerenciaConvocacoes[index].getGerencia().getId();
            } );

            empregadoConvocacoes.forEach( eC1 => {
                this.empregadoConvocacoes.splice( this.empregadoConvocacoes.indexOf( eC1 ), 1 );
                this.convocacao.getEmpregadoConvocacoes().splice( this.empregadoConvocacoes.indexOf( eC1 ), 1 );
            } )                
        }
        
    }

    choisedGerenciaConvocacao( gC: number,  gerenciaConvocacao: GerenciaConvocacao) {
        if ( this.gerenciaConvocacoes[gC] === this.selectedGC ) {
            return "active";
        } else return "";
    }
    
    choiseGerenciaConvocacao( gC: number,  gerenciaConvocacao: GerenciaConvocacao ) {
        this.selectedGC = this.gerenciaConvocacoes[gC];   
    }

    addEmpregado() {
        if ( this.empregadoConvocacao != undefined ) {
            let empregado = this.convocacao.getEmpregadoConvocacoes().find( eC => 
                                    eC.getEmpregado().getId() === this.empregadoConvocacao.getEmpregado().getId() );
    
            if ( empregado == undefined ) {
                let eC = new EmpregadoConvocacaoBuilder().initialize( new EmpregadoConvocacao() );
                let convocacao = new ConvocacaoBuilder().initialize( null );
                eC.setEmpregado( new EmpregadoBuilder().clone(this.empregadoConvocacao.getEmpregado()) );
                convocacao.setProfissiograma( this.convocacao.getProfissiograma() );
                convocacao.getEmpregadoConvocacoes().push( eC );
                convocacao.setFim(this.convocacao.getFim());
                convocacao.setInicio(this.convocacao.getInicio());
    
                this.convocacaoService.getEmpregadoConvocacao( convocacao )
                    .then( res => {
                        convocacao = new ConvocacaoBuilder().clone( res.json() );
                        let eC = new EmpregadoConvocacaoBuilder().clone(convocacao.getEmpregadoConvocacoes()[0]);
                        this.empregadoConvocacoes.push( eC );
                        this.convocacao.getEmpregadoConvocacoes().push( eC );
                    } )
                    .catch( error => {
                        console.log( error );
                    } )
            } else {
                this.toastParams = ['Empregado adicionado anteriormente', 4000];
                this.globalActions.emit( 'toast' );
            }
        }
    }

    removeEmpregadoToList( index: number ) {
        this.empregadoConvocacoes.splice( index, 1 );
        this.convocacao.getEmpregadoConvocacoes().splice( index, 1 );
    }

    filterEmpregadoByChave( evento ) {
        if ( this.convocacao.getEmpregadoConvocacoes().length > 0 ) {
            evento = evento.toLowerCase();
            let eCs = this.convocacao.getEmpregadoConvocacoes().filter( eC => {
                let lowerCaseC = eC.getEmpregado().getChave().toLowerCase();
                return lowerCaseC.includes( evento );
            } )
            this.empregadoConvocacoes = new EmpregadoConvocacaoBuilder().cloneList(eCs);
        }
    }

    filterEmpregadoByNome( evento ) {
        if ( this.convocacao.getEmpregadoConvocacoes().length > 0 ) {
            evento = evento.toLowerCase();
            let eCs = this.convocacao.getEmpregadoConvocacoes().filter( eC => {
                let lowerCaseN = eC.getEmpregado().getPessoa().getNome().toLowerCase();
                return lowerCaseN.includes( evento );
            } )
            this.empregadoConvocacoes = new EmpregadoConvocacaoBuilder().cloneList(eCs);
        }
    }

    filterEmpregadoByGerencia( evento ) {
        if ( this.convocacao.getEmpregadoConvocacoes().length > 0 ) {
            evento = evento.toLowerCase();
            let eCs = this.convocacao.getEmpregadoConvocacoes().filter( eC => {
                let lowerCaseCC = eC.getEmpregado().getGerencia().getCodigoCompleto().toLowerCase();
                return lowerCaseCC.includes( evento );
            } )
            this.empregadoConvocacoes = new EmpregadoConvocacaoBuilder().cloneList(eCs);
        }
    }
    
    showDetailEmpregado( index: number ) {
        this.empregadoDetail = this.empregadoConvocacoes[index];

        this.openModalEditEmpregado();
    }

    addExame( value ) {
        let exame = this.exames.find( e => {
            return e.getId() == value;
        } )
        
        let empregadoConvocacaoExame = new EmpregadoConvocacaoExameBuilder().clone(new EmpregadoConvocacaoExame());
        empregadoConvocacaoExame.setExame(new ExameBuilder().clone( exame ));
        
        let eC = this.convocacao.getEmpregadoConvocacoes().find(eC => {
            return this.empregadoDetail.getId() == eC.getId();
        })
        eC.getEmpregadoConvocacaoExames().push(empregadoConvocacaoExame);
        
        eC.setAuditado(false);
        eC.setSelecionado(false);
        this.conformList[this.empregadoDetail.getEmpregadoConvocacaoExames().length-1] = false;
    }

    removeExame( value ) {
        let eC = this.convocacao.getEmpregadoConvocacoes().find(eC => {
            return this.empregadoDetail.getId() == eC.getId();
        })
        
        eC.getEmpregadoConvocacaoExames().splice(value, 1);
        this.conformList.splice(value, 1);
    }
    
    verifyAuditado() {
        let ret: boolean = this.conformList.find( cL => cL == false );
        if ( ret == undefined ) return true;
        else return false;
    }

    openModalEditEmpregado() {
        this.modalEditEmpregado.emit( { action: "modal", params: ['open'] } );
    }

    closeModalEditEmpregado() {
        this.modalEditEmpregado.emit( { action: "modal", params: ['close'] } );
    }

    openModalConfirmProfissiograma() {
        this.modalConfirmProfissiograma.emit( { action: "modal", params: ['open'] } );
    }

    closeModalConfirmProfissiograma() {
        this.modalConfirmProfissiograma.emit( { action: "modal", params: ['close'] } );
    }

    returnExistProfissiograma() {
        if ( this.existProfissiograma ) return true;
        return false;
    }

    confirmarProfissiograma() {
        this.existProfissiograma = true;
        this.closeModalConfirmProfissiograma();
    }

    cancelarProfissiograma() {
        this.existProfissiograma = false;
        this.convocacao.getProfissiograma().setId( 0 );
        this.closeModalConfirmProfissiograma();
    }

    selectProfissiograma() {
        if ( this.convocacao.getProfissiograma().getId() > 0 )
            this.existProfissiograma = true;
        if ( this.existProfissiograma ) return { 'display': 'none' };
        else return { 'display': 'inline' };
    }

    selectProfissiogramaTab() {
        if ( this.convocacao.getProfissiograma().getId() > 0 )
            return '';
        if ( !this.existProfissiograma ) return 'disabled';
        else return '';
    }

    checkAllEmpregados() {
        if ( this.empregadoConvocacoes.length > 0 ) {
            setTimeout(() => {
                
                if ( this.checkEmpregados == true ) {
                    
                    this.empregadoConvocacoes.forEach( eC => {
                        if ( eC.getAuditado() == true )
                            eC.setSelecionado( true );
                    } )
                } else {
                    this.empregadoConvocacoes.forEach( eC => {
                        if ( eC.getAuditado() == true )
                            eC.setSelecionado( false );
                    } )
                }
            }, 50 );
        }
    }

    setSelectedsGerencias() {        
        this.convocacao.setGerenciaConvocacoes( this.convocacao.getGerenciaConvocacoes().filter( gC => {
            return gC.getSelecionado() === true;
        } )
        );
    }

    convocar() {        
        if ( this.convocacao.getGerenciaConvocacoes().length != 0 ) {
            if ( this.convocacao.getEmpregadoConvocacoes().length != 0 ) {
                if ( this.convocacao.getTitulo() !== undefined ||
                    this.convocacao.getTitulo() !== null ||
                    this.convocacao.getTitulo() !== '' ) {

                    this.setSelectedsGerencias();
//                    this.showPreload = true;
                    
                    
                    this.empregadoConvocacoes.forEach(emp =>{
                        
                        let empAux : EmpregadoConvocacao = this.convocacao.getEmpregadoConvocacoes().find( e=> e.getId() == emp.getId());
                        
                        if(empAux){
                            if(emp.getSelecionado()){
                                empAux.setSelecionado(true);
                                empAux.setDataConvocacao(new Date());                                
                            }
                            
                        }
                        else
                            this.convocacao.getEmpregadoConvocacoes().push(new EmpregadoConvocacaoBuilder().clone(emp)) 
                    });
                    let convocacaoAux:Convocacao = new ConvocacaoBuilder().clone(this.convocacao);
                                    
                    this.convocacaoService.getConvocacao(convocacaoAux)
                        .then( res => {
                            location.reload();
                            this.downloadFile( res, convocacaoAux.getTitulo()+".zip" )
                            this.showPreload = false;
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )

                } else {
                    this.toastParams = ['Adicione um titulo.', 4000];
                    this.globalActions.emit( 'toast' );
                }
            } else {
                this.toastParams = ['Sem empregados para convocar.', 4000];
                this.globalActions.emit( 'toast' );
            }
        } else {
            this.toastParams = ['Processo inconcluido.', 4000];
            this.globalActions.emit( 'toast' );
        }
    }
    
    ableToConvocate() {
        if ( this.convocacao.getEmpregadoConvocacoes().length > 0 ) {
            let eC = this.empregadoConvocacoes.find(eC => eC.getSelecionado() == true);
            if ( eC != undefined )
                return true;
        }
        return false;
    }
    
    selectedsGerenciaConvocacoes() {
        this.gerenciaConvocacoes.forEach(gC => {
            if ( gC.getSelecionado() == true ) {
                this.selectedGerenciaConvocacaoCC.push(gC.getGerencia().getCodigoCompleto());
            }
        })
    }
    
    setDataConvocacao(empregadoConvocacao: EmpregadoConvocacao) {
        empregadoConvocacao.setDataConvocacao(new Date());
    }
    
}