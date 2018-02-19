import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import { MyDatePickerModule } from 'mydatepicker';
import { IMyDpOptions } from 'mydatepicker';

import { GlobalVariable } from './../../../global';
import { Empregado } from './../../../model/empregado';
import { EmpregadoBuilder } from './../../empregado/empregado.builder';
import { Localizacao } from './../../../model/localizacao';
import { LocalizacaoBuilder } from './../../localizacao/localizacao.builder';
import { FilaEsperaOcupacional } from './../../../model/fila-espera-ocupacional';
import { FilaEsperaOcupacionalService } from './../fila-espera-ocupacional.service';
import { FilaEsperaOcupacionalBuilder } from './../fila-espera-ocupacional.builder';

@Component( {
    selector: 'app-check-in',
    templateUrl: './check-in.html',
    styleUrls: ['./check-in.css']
} )
export class CheckInComponent {
    filaEsperaOcupacional: FilaEsperaOcupacional;
    localizacao: Localizacao;
    localizacoes: Array<Localizacao>;
    cpf: string;
    matricula: string;
    chave: string;
    dataNascimento: any;
    globalActions;
    toastParams;
    empregado: Empregado;
    goTo: string;
    showConfirmSave: boolean;
    msgConfirmSave: string;
    reload: boolean;
    myDatePickerOptions: IMyDpOptions;

    constructor( private route: ActivatedRoute,
        private filaEsperaOcupacionalService: FilaEsperaOcupacionalService) {
        this.globalActions = new EventEmitter<string | MaterializeAction>();
        this.toastParams = ['', 4000];
        this.filaEsperaOcupacional = new FilaEsperaOcupacionalBuilder().initialize(this.filaEsperaOcupacional);
        this.localizacao = new LocalizacaoBuilder().initialize(this.localizacao);
        this.localizacoes = new LocalizacaoBuilder().initializeList(this.localizacoes);
        this.myDatePickerOptions = {
                dateFormat: 'dd/mm/yyyy'
            };
    }

    ngOnInit() {
        this.showConfirmSave = false;
        this.empregado = new EmpregadoBuilder().initialize(new Empregado());
        this.getLocalizacoes();
    }
    
    checkIn( localizacaoId ) {
        if ( ( this.cpf && this.matricula && this.chave && this.dataNascimento ) == undefined ||
            ( this.cpf && this.matricula && this.chave && this.dataNascimento ) == "" ||
            localizacaoId == 0 ) {
            this.toastParams = ['Por favor, preencha todos os campos', 4000];
            this.globalActions.emit( 'toast' );
            return;
        }

        let data: Date = this.parseDatePickerToDate( this.dataNascimento );

        this.localizacao.setId(localizacaoId);
        this.empregado.getPessoa().setDataNascimento(data);
        this.empregado.getPessoa().setCpf(this.treatCpf(this.cpf));
        this.empregado.setChave(this.chave);
        this.empregado.setMatricula(this.matricula);
                
        this.filaEsperaOcupacional.setLocalizacao(this.localizacao);
        this.filaEsperaOcupacional.setEmpregado(this.empregado);
        
        this.filaEsperaOcupacionalService.checkIn( new FilaEsperaOcupacionalBuilder().clone(this.filaEsperaOcupacional) )
            .then(res => {
                this.showConfirmSave = true;
                this.msgConfirmSave = res.text();
                this.cpf = "";
                this.matricula = "";
                this.chave = "";
                this.dataNascimento = null;
                this.empregado = new EmpregadoBuilder().initialize(new Empregado());
                this.reload = true;
            })
            .catch(error => {
                this.showConfirmSave = true;
                this.msgConfirmSave = error.text();
                this.empregado = new EmpregadoBuilder().initialize(new Empregado());
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
    
    parseDatePickerToDate( data ) {
        if ( data === undefined || data === null ) {
            return null;
        } else if ( data instanceof Date ) {
            return data;
        }
        let d: Date = new Date( data.date.year, data.date.month - 1, data.date.day );
        return d;
    }
    
    treatCpf( cpf: string ) {
        let s: string;
    
        if ( cpf != undefined ) {
            if ( cpf.length > 11 ) { 
                s = cpf.substring(0, 3);
                s += cpf.substring(4, 7);
                s += cpf.substring(8, 11);
                s += cpf.substring(12, 14);
                return s;
            } else if ( cpf.length > 0 && cpf.length < 14 ) {
                return cpf;
            }
        } return undefined;
        
    }

}