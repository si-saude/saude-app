import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";

import { GlobalVariable } from './../../../global';
import { Empregado } from './../../../model/empregado';
import { EmpregadoBuilder } from './../../empregado/empregado.builder';
import { Localizacao } from './../../../model/localizacao';
import { LocalizacaoBuilder } from './../../localizacao/localizacao.builder';
import { FilaEsperaOcupacional } from './../../../model/fila-espera-ocupacional';
import { FilaEsperaOcupacionalService } from './../fila-espera-ocupacional.service';
import { FilaEsperaOcupacionalBuilder } from './../fila-espera-ocupacional.builder';

@Component( {
    selector: 'app-check-in-recepcao',
    templateUrl: './check-in-recepcao.html',
    styleUrls: ['./check-in-recepcao.css']
} )
export class CheckInRecepcaoComponent {
    filaEsperaOcupacional: FilaEsperaOcupacional;
    localizacao: Localizacao;
    localizacoes: Array<Localizacao>;
    globalActions;
    toastParams;
    empregado: Empregado;
    empregados: Array<Empregado>;
    goTo: string;
    showConfirmSave: boolean;
    msgConfirmSave: string;
    reload: boolean;
    autocompleteEmpregado;
    validEmpregado: string;
    
    constructor( private route: ActivatedRoute,
        private filaEsperaOcupacionalService: FilaEsperaOcupacionalService) {
        this.globalActions = new EventEmitter<string | MaterializeAction>();
        this.toastParams = ['', 4000];
        this.empregado = new EmpregadoBuilder().initialize(new Empregado());
        this.empregados = new EmpregadoBuilder().cloneList(this.empregados);
        this.filaEsperaOcupacional = new FilaEsperaOcupacionalBuilder().initialize(this.filaEsperaOcupacional);
        this.localizacao = new LocalizacaoBuilder().initialize(this.localizacao);
        this.localizacoes = new LocalizacaoBuilder().initializeList(this.localizacoes);
        this.autocompleteEmpregado = [];
        this.showConfirmSave = false;
        this.validEmpregado = "";
    }

    ngOnInit() {
        this.getLocalizacoes();
    }
    
    checkIn( localizacaoId ) {
        if ( this.empregado == undefined || localizacaoId == 0 ) {
            this.toastParams = ['Por favor, preencha todos os campos', 4000];
            this.globalActions.emit( 'toast' );
            return;
        }

        this.localizacao.setId(localizacaoId);
        this.filaEsperaOcupacional.setLocalizacao(this.localizacao);
        this.filaEsperaOcupacional.setEmpregado(this.empregado);
        
        this.filaEsperaOcupacionalService.checkIn( new FilaEsperaOcupacionalBuilder().clone( this.filaEsperaOcupacional ) )
            .then(res => {
                this.showConfirmSave = true;
                this.msgConfirmSave = res.text();
                this.reload = true;
            })
            .catch(error => {
                this.showConfirmSave = true;
                this.msgConfirmSave = error.text();
                this.reload = true;
            })
    }
    
    getLocalizacoes() {
        this.filaEsperaOcupacionalService.getLocalizacoes()
            .then(res => {
                this.localizacoes = new LocalizacaoBuilder().cloneList(res.json());
            })
            .catch(error => {
                console.log(error.text());
            })
    }
        
    getEmpregado() {
        if ( this.validEmpregado == this.empregado.getPessoa().getNome() ) return;
        if ( this.empregado.getPessoa().getNome() !== undefined ) {
            let empregado = this.empregados.find( e => {
                if ( ( e.getChave() + " - " + e.getPessoa().getNome() ).trim() ==
                    this.empregado.getPessoa().getNome().trim() || 
                    e.getPessoa().getNome().trim() == this.empregado.getPessoa().getNome().trim() )
                    return true;
                else return false;
            } );
            
            if ( empregado !== undefined ) {
                this.empregado = new EmpregadoBuilder().clone(empregado);
                this.validEmpregado = this.empregado.getPessoa().getNome();
            } else this.empregado = new EmpregadoBuilder().initialize( new Empregado() );
        } else this.empregado = new EmpregadoBuilder().initialize( new Empregado() );
    }

    private oldNome: string;
    selectEmpregado( evento ) {
        if ( this.oldNome != evento ) {
            this.oldNome = evento;
            if ( evento.length > 4 ) {
                this.filaEsperaOcupacionalService.getEmpregadoByName( evento )
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
            
            this.filaEsperaOcupacionalService.getEmpregadoByChave( evento )
                .then( res => {
                    this.empregados = new EmpregadoBuilder().cloneList(res.json());
                    this.autocompleteEmpregado = [this.buildAutocompleteEmpregado( this.empregados )];
                } )
                .catch( error => {
                    console.log( error );
                } )
        }
    }
    
    buildAutocompleteEmpregado( empregados: Array<Empregado> ) {
        let data = {}, array = {};
        empregados.forEach( item => {
            data[item.getChave() + " - " + item.getPessoa().getNome()] = null;
        } );

        array["data"] = data;

        return array;
    }
    
}