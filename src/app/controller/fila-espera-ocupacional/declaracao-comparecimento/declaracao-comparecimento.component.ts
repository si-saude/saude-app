import { Component, OnInit, EventEmitter, Output, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import { MyDatePickerModule } from 'mydatepicker';
import { IMyDpOptions } from 'mydatepicker';
import * as $ from 'jquery';

import { GlobalVariable } from './../../../global';
import { Atendimento } from './../../../model/atendimento';
import { AtendimentoBuilder } from './../../atendimento/atendimento.builder';
import { Empregado } from './../../../model/empregado';
import { EmpregadoBuilder } from './../../empregado/empregado.builder';
import { Tarefa } from './../../../model/tarefa';
import { TarefaBuilder } from './../../tarefa/tarefa.builder';
import { Localizacao } from './../../../model/localizacao';
import { LocalizacaoBuilder } from './../../localizacao/localizacao.builder';
import { FilaEsperaOcupacional } from './../../../model/fila-espera-ocupacional';
import { FilaEsperaOcupacionalService } from './../fila-espera-ocupacional.service';
import { FilaEsperaOcupacionalBuilder } from './../fila-espera-ocupacional.builder';

@Component( {
    selector: 'app-declaracao-comparecimento',
    templateUrl: './declaracao-comparecimento.html',
    styleUrls: ['./declaracao-comparecimento.css']
} )
export class DeclaracaoComparecimentoComponent {
    atendimento: Atendimento;
    empregado: Empregado;
    empregados: Array<Empregado>;
    dataDeclaracao: any;
    validEmpregado: string;
    autocompleteEmpregado = [];

    globalActions;
    toastParams;
    myDatePickerOptions: IMyDpOptions;

    constructor( private route: ActivatedRoute,
        private filaEsperaOcupacionalService: FilaEsperaOcupacionalService) {
        this.globalActions = new EventEmitter<string | MaterializeAction>();
        this.toastParams = ['', 4000];
        this.validEmpregado = "";
        this.atendimento = new AtendimentoBuilder().initialize(new Atendimento())
        this.empregado = new EmpregadoBuilder().initialize( new Empregado() );
        this.empregados = new EmpregadoBuilder().initializeList(new Array<Empregado>());
        this.myDatePickerOptions = { dateFormat: 'dd/mm/yyyy' };
    }

    ngOnInit() {}
    
    downloadDeclaracaoComparecimento() {
        if ( this.dataDeclaracao == null || this.empregado.getId() == 0 ) {
            this.toastParams = ['Por favor, preencha todos os campos da busca', 4000];
            this.globalActions.emit( 'toast' );
            return;
        }
        
        this.atendimento.getFilaEsperaOcupacional().setEmpregado( this.empregado );
        this.atendimento.getTarefa().setInicio(this.parseDatePickerToDate(this.dataDeclaracao));
        
        this.filaEsperaOcupacionalService.downloadDeclaracaoComparecimento( this.atendimento )
            .then(res => {
                this.downloadFile( res, this.empregado.getMatricula().trim()+".pdf" );
            })
            .catch(error => {
                this.toastParams = [error.text(), 4000];
                this.globalActions.emit( 'toast' );
                console.log("Erro ao retornar os atendimentos."+error);
            })
    }
    
    parseDatePickerToDate( data ) {
        if ( data === undefined || data === null ) {
            return null;
        } else if ( data instanceof Date ) {
            return data;
        }
        let d: Date = new Date( data.date.year, data.date.month - 1, data.date.day );
        return d;
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
            if ( evento.length <= 4 ) {
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
    }
    
    buildAutocompleteEmpregado( empregados: Array<Empregado> ) {
        let data = {}, array = {};
        empregados.forEach( item => {
            data[item.getChave() + " - " + item.getPessoa().getNome()] = null;
        } );

        array["data"] = data;

        return array;
    }
    
    downloadFile( data, fileName ) {
        let byteCharacters = atob(data._body);
        let byteArrays = [];
        let sliceSize = 1024;

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            let slice = byteCharacters.slice(offset, offset + sliceSize);

            let byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            let byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        let blob = new Blob(byteArrays);
        let url = window.URL.createObjectURL(blob);
        var anchor = document.createElement("a");
        anchor.download = fileName;
        anchor.href = url;
        document.body.appendChild(anchor);
        anchor.click();
    }
    
}