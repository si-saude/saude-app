import { Component, ViewChild, ElementRef, EventEmitter, Input, SimpleChanges  } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVariable } from './../../global';
import { MaterializeAction } from "angular2-materialize";
import * as $ from 'jquery';

import { Atestado } from './../../model/atestado';
import { AtestadoBuilder } from './../../controller/atestado/atestado.builder';
import { ProfissionalNomeAutocomplete } from './../../controller/profissional-saude/profissional-nome.autocomplete';
import { Regime } from './../../model/regime';
import { RegimeService } from './../../controller/regime/regime.service';
import { RegimeBuilder } from './../../controller/regime/regime.builder';

@Component( {
    selector: 'app-homologacao-atestado',
    templateUrl: './homologacao-atestado.html',
    styleUrls: ['./homologacao-atestado.css']
} )
export class HomologacaoAtestadoComponent {
    @ViewChild( 'anexo' ) inputElAnexo: ElementRef;
    @ViewChild( 'anexoRelatorioMedico' ) inputElAnexoRelatorioMedico: ElementRef;
    private msnError: string;
    private regimes: Array<Regime>;
    @Input() atestado: Atestado;
    dateActions;
    params;
    
    constructor(private regimeService: RegimeService) {
        this.atestado = new AtestadoBuilder().initialize( this.atestado );
        this.regimes = new RegimeBuilder().initializeList(this.regimes);
        this.getRegimes();
        this.dateActions = new EventEmitter<string|MaterializeAction>();
        this.params = GlobalVariable.PARAMS_DATE;
    }
    
    ngOnChanges( changes: SimpleChanges ) {
        if ( changes["atestado"] != undefined ){
            this.atestado = changes["atestado"].currentValue;
            if(!this.atestado.getRegime())
                this.atestado.setRegime(new RegimeBuilder().initialize(this.atestado.getRegime()));
        }
    }
    
    getRegimes() {
        this.regimeService.getRegimes()
            .then(res => {
                this.regimes = new RegimeBuilder().cloneList(res.json());
            })
            .catch(error => {
                console.log("Erro ao buscar os regimes.");
            })
    }

    configure( atestado: Atestado) {
        this.atestado = atestado;
    }

    showMsnData(flag: boolean) {
        flag ? $( ".msnData" ).show() : $( ".msnData" ).hide(); 
    }
    
    verifyEscalaTrabalho() {
        if ( this.atestado.getRegime().getId() == 0 || 
                this.regimes.find(r => r.getId() == this.atestado.getRegime().getId()).getNome() == "ADMINISTRATIVO" ) {            
                this.atestado.getDataInicioEscalaTrabalhoCustomDate().setAppDate(undefined);
                this.atestado.getDataFimEscalaTrabalhoCustomDate().setAppDate(undefined);
            return true;
        }
        else return false;
    }
    
    verifyFerias() {
        if ( !this.atestado.getPossuiFeriasAgendadas() ) {
            this.atestado.getDataInicioFeriasCustomDate().setAppDate(undefined);
            this.atestado.getDataFimFeriasCustomDate().setAppDate(undefined);
            return true;
        }
    }
    
    getCiente() {
        return this.atestado.getCiente();
    }
    
    
    canSave() {
        let ret: Array<any> = new Array<any>();
    
        if ( this.atestado.getRegime().getId() != 0 && 
                this.regimes.find( r => r.getId() == this.atestado.getRegime().getId()).getNome() != "ADMINISTRATIVO" &&
                ( this.atestado.getDataInicioEscalaTrabalho() == undefined || this.atestado.getDataFimEscalaTrabalho() == undefined ) )
            ret = [false, "Por favor, preencha as datas da escala de trabalho."];
        else if ( this.atestado.getPossuiFeriasAgendadas() && 
                ( this.atestado.getDataInicioFerias() == undefined || this.atestado.getDataFimFerias() == undefined ) )
            ret = [false, "Por favor, preencha as datas das ferias."];
        else ret = [true];
        return ret;
    }
    
    verifyPrazoAtestado() {
        this.regimeService.verificarPrazoAtestado(new AtestadoBuilder().clone(this.atestado))
            .then(res => {
                if ( !res.json() ) { 
                    this.showMsnData(true);
                    return;
                } else this.showMsnData(false);
            })
            .catch(error => {
                console.log("Erro ao verificar o prazo do atestado."+error.text());
                return;
            })
    }
    
}