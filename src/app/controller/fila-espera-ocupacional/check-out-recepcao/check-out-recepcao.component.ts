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
import { EmpregadoNomeAutocomplete } from './../../empregado/empregado-nome.autocomplete';

@Component( {
    selector: 'app-check-out-recepcao',
    templateUrl: './check-out-recepcao.html',
    styleUrls: ['./check-out-recepcao.css']
} )
export class CheckOutRecepcaoComponent {
    filaEsperaOcupacional: FilaEsperaOcupacional;
    localizacao: Localizacao;
    localizacoes: Array<Localizacao>;
    globalActions;
    toastParams;
    empregado: Empregado;
    goTo: string;
    showConfirmSave: boolean;
    msgConfirmSave: string;
    reload: boolean;
    private autoCompleteEmp:EmpregadoNomeAutocomplete;

    constructor( private route: ActivatedRoute,
        private filaEsperaOcupacionalService: FilaEsperaOcupacionalService) {
        this.globalActions = new EventEmitter<string | MaterializeAction>();
        this.toastParams = ['', 4000];
        this.filaEsperaOcupacional = new FilaEsperaOcupacionalBuilder().initialize(this.filaEsperaOcupacional);
        this.localizacao = new LocalizacaoBuilder().initialize(this.localizacao);
        this.localizacoes = new LocalizacaoBuilder().initializeList(this.localizacoes);
        this.showConfirmSave = false;
        this.autoCompleteEmp = new EmpregadoNomeAutocomplete(this.filaEsperaOcupacionalService.getEmpregadoService());
    }

    ngOnInit() {
        this.getLocalizacoes();
    }
    
    checkOut( localizacaoId ) {
        if ( localizacaoId == 0 ) {
            this.toastParams = ['Por favor, preencha todos os campos', 4000];
            this.globalActions.emit( 'toast' );
            return;
        }

        this.localizacao.setId(localizacaoId);
        this.filaEsperaOcupacional.setLocalizacao(this.localizacao);
        
        this.filaEsperaOcupacionalService.checkOut( new FilaEsperaOcupacionalBuilder().clone( this.filaEsperaOcupacional ) )
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
    
}