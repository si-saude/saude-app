import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { IMyDpOptions } from 'mydatepicker';
import * as $ from 'jquery';

import { Atestado } from './../../model/atestado';
import { AtestadoBuilder } from './../../controller/atestado/atestado.builder';
import { ProfissionalNomeAutocomplete } from './../../controller/profissional-saude/profissional-nome.autocomplete';
import { Regime } from './../../model/regime';
import { RegimeService } from './../../controller/regime/regime.service';
import { RegimeBuilder } from './../../controller/regime/regime.builder';

@Component( {
    selector: 'app-modal-homologacao-atestado',
    templateUrl: './modal-homologacao-atestado.html',
    styleUrls: ['./modal-homologacao-atestado.css']
} )
export class ModalHomologacaoAtestadoComponent {
    @ViewChild( 'anexo' ) inputElAnexo: ElementRef;
    @ViewChild( 'anexoRelatorioMedico' ) inputElAnexoRelatorioMedico: ElementRef;
    private myDatePickerOptions: IMyDpOptions;
    private atestado: Atestado;
    private msnError: string;
    private regimes: Array<Regime>;

    constructor(private regimeService: RegimeService) {
        this.atestado = new AtestadoBuilder().initialize( this.atestado );
        this.regimes = new RegimeBuilder().initializeList(this.regimes);
        this.myDatePickerOptions = {
            dateFormat: 'dd/mm/yyyy'
        };
        this.getRegimes();
    }
    
    ngOnInit() {
        
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

    showMsn() {
        $( ".msn" ).show();
    }
    
    hideMsn() {
        $( ".msn" ).hide();
    }
    

    setMsn( msn ) {
        this.msnError = msn;
    }

    showCardNotice( evento ) {
        $( ".card-notice" ).toggle();
    }
    
    verifyEscalaTrabalho() {
        if ( this.atestado.getRegime().getId() == 0 || 
                this.regimes.find(r => r.getId() == this.atestado.getRegime().getId()).getNome() == "ADMINISTRATIVO" )
            return true;
        else return false;
    }
    
    getCiente() {
        return this.atestado.getCiente();
    }
    
    
    canSave() {
        let ret: Array<any> = new Array<any>();
    
        console.log(this.regimes.find( r => r.getId() == this.atestado.getRegime().getId()));
    
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
                    this.setMsn("O atestado se encontra em atraso (mais de 3 dias).");
                    this.showMsn();
                    return;
                } else this.hideMsn();
            })
            .catch(error => {
                console.log("Erro ao verificar o prazo do atestado."+error.text());
                return;
            })
    }
    
}