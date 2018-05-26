import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { MaterializeDirective,MaterializeAction } from "angular2-materialize";

import { GlobalVariable } from './../../../global';
import { SolicitacaoCentralIntegra } from './../../../model/solicitacao-central-integra';
import { TipoSolicitacao } from './../../../model/tipo-solicitacao';
import { TipoSolicitacaoBuilder } from './../../tipo-solicitacao/tipo-solicitacao.builder';
import { Empregado } from './../../../model/empregado';
import { EmpregadoBuilder } from './../../../controller/empregado/empregado.builder';
import { SolicitacaoCentralIntegraBuilder } from './../solicitacao-central-integra.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { SolicitacaoCentralIntegraService } from './../solicitacao-central-integra.service';

@Component( {
    selector: 'app-solicitacao-central-integra-form',
    templateUrl: './solicitacao-central-integra-form.html',
    styleUrls: ['./solicitacao-central-integra-form.css', './../../../../assets/css/form-component.css']
} )
export class SolicitacaoCentralIntegraFormComponent extends GenericFormComponent implements OnInit {
    private solicitacaoCentralIntegra: SolicitacaoCentralIntegra;
    private tipoSolicitacoes: Array<TipoSolicitacao>;
    private inicio: any;
    private prazo: any;

    private validEmpregado: string;
    private empregados: Array<Empregado>;
    private autocompleteEmpregado;
    
    constructor( private route: ActivatedRoute,
            private solicitacaoCentralIntegraService: SolicitacaoCentralIntegraService,
            router: Router) { 
            super(solicitacaoCentralIntegraService, router);
            this.goTo = "solicitacao-central-integra";
            this.solicitacaoCentralIntegra = new SolicitacaoCentralIntegraBuilder().initialize(new SolicitacaoCentralIntegra());
            this.tipoSolicitacoes = new TipoSolicitacaoBuilder().initializeList(new Array<TipoSolicitacao>());
            
            this.empregados = new Array<Empregado>();
            this.validEmpregado = "";
            this.autocompleteEmpregado = [];
    }
    
    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.solicitacaoCentralIntegraService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.solicitacaoCentralIntegra = new SolicitacaoCentralIntegraBuilder().clone(res.json());
                            this.parseDatas();
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
        this.getTipoSolicitacao();
    }
    
    getTipoSolicitacao() {
        this.solicitacaoCentralIntegraService.getTipoSolicitacoes()
            .then(res => {
                this.tipoSolicitacoes = new TipoSolicitacaoBuilder().cloneList(res.json());
            })
            .catch(error => {
                console.log(error);
            })
    }
    
    save() {
        this.validDatas();
        super.save(new SolicitacaoCentralIntegraBuilder().clone(this.solicitacaoCentralIntegra));
    }
    
    validDatas() {
        if ( this.dateUtil.verifyData( this.prazo ) )
            this.solicitacaoCentralIntegra.setPrazo(
                    this.dateUtil.parseDatePickerToDate( this.prazo ) );
        
        if ( this.dateUtil.verifyData( this.inicio ) )
            this.solicitacaoCentralIntegra.getTarefa().setInicio(
                    this.dateUtil.parseDatePickerToDate( this.inicio ) );
    }
    
    parseDatas() {
        if ( this.dateUtil.verifyData( this.solicitacaoCentralIntegra.getPrazo() ) )
            this.dateUtil.parseDataToObjectDatePicker( this.solicitacaoCentralIntegra.getPrazo() )
        
        if ( this.dateUtil.verifyData( this.solicitacaoCentralIntegra.getTarefa().getInicio() ) )
            this.dateUtil.parseDataToObjectDatePicker( this.solicitacaoCentralIntegra.getTarefa().getInicio() )
    }
    
    getEmpregado() {
        if ( this.validEmpregado == this.solicitacaoCentralIntegra.getTarefa().getCliente().getPessoa().getNome() ) return;
        if ( this.solicitacaoCentralIntegra.getTarefa().getCliente().getPessoa().getNome() !== undefined ) {
            let empregado = this.empregados.find( e => {
                if ( ( e.getChave() + " - " + e.getPessoa().getNome() ).trim() ==
                    this.solicitacaoCentralIntegra.getTarefa().getCliente().getPessoa().getNome().trim() || 
                    e.getPessoa().getNome().trim() == this.solicitacaoCentralIntegra.getTarefa().getCliente().getPessoa().getNome().trim() )
                    return true;
                else return false;
            } );
            
            if ( empregado !== undefined ) {
                this.solicitacaoCentralIntegra.getTarefa().setCliente( empregado );
                this.validEmpregado = this.solicitacaoCentralIntegra.getTarefa().getCliente().getPessoa().getNome();
            } else this.solicitacaoCentralIntegra.getTarefa().setCliente( new EmpregadoBuilder().initialize( new Empregado() ) );
        } else this.solicitacaoCentralIntegra.getTarefa().setCliente( new EmpregadoBuilder().initialize( new Empregado() ) );
    }

    private oldNome: string;
    selectEmpregado( evento ) {
        if ( this.oldNome != evento ) {
            this.oldNome = evento;
            if ( evento.length > 4 ) {
                this.solicitacaoCentralIntegraService.getEmpregadoByName( evento )
                    .then( res => {
                        this.empregados = new EmpregadoBuilder().cloneList(res.json());
                        this.autocompleteEmpregado = [this.buildAutocompleteEmpregado( this.empregados )];
                    } )
                    .catch( error => {
                        console.log( error );
                    } )
            }
        }
    }

    private oldNomeByChave: string;
    selectEmpregadoByChave( evento ) {
        if ( this.oldNomeByChave != evento ) {
            this.oldNomeByChave = evento;
            if ( evento.length <= 4 ) {
                this.solicitacaoCentralIntegraService.getEmpregadoByChave(evento)
                    .then( res => {
                        this.empregados = new EmpregadoBuilder().cloneList(res.json());
                        this.autocompleteEmpregado = [this.buildAutocompleteEmpregado( this.empregados )];
                    } )
                    .catch( error => {
                        console.log( error );
                    } )
            }
        }
    }

    buildAutocompleteEmpregado( empregados ) {
        let data = {};
        empregados.forEach( item => {
            data[item.getChave() + " - " + item.getPessoa().getNome()] = null;
        } );

        let array = {};
        array["data"] = data;

        return array;
    }
    
}