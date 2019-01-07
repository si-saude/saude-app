import { EventEmitter, SimpleChanges, Component, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import * as $ from 'jquery';

import { Atendimento } from './../../model/atendimento';
import { RespostaFichaColeta } from './../../model/resposta-ficha-coleta';
import { AtendimentoBuilder } from './../../controller/atendimento/atendimento.builder';
import { AtividadeFisicaDescricaoAutocomplete } from './../../controller/atividade-fisica/atividade-fisica-descricao.autocomplete';
import { AvaliacaoFisicaAtividadeFisica } from './../../model/avaliacao-fisica-atividade-fisica';
import { AvaliacaoFisicaAtividadeFisicaBuilder } from './../../controller/avaliacao-fisica-atividade-fisica/avaliacao-fisica-atividade-fisica.builder';
import { Util } from './../../generics/utils/util';

@Component( {
    selector: 'app-atendimento-proaf',
    templateUrl: './atendimento-proaf.html',
    styleUrls: ['./atendimento-proaf.css']
} )
export class AtendimentoProafComponent {
    @Input() atendimento: Atendimento;
    @Input() service;
    private autocompleteAF;
    private classificacoes;
    private afafsRealizadas: Array<AvaliacaoFisicaAtividadeFisica>;
    private afafsOrientadas: Array<AvaliacaoFisicaAtividadeFisica>;
    private afafDias: AvaliacaoFisicaAtividadeFisica;
    private modalActions;
    private percentualGorduraNegociada;
    private aptidaoCardiorrespiratorias: Array<string>;
    private forcaAbdominais: Array<string>;
    private flexibilidades: Array<string>;
    
    constructor() {
        this.afafsRealizadas = new Array<AvaliacaoFisicaAtividadeFisica>();
        this.afafsOrientadas = new Array<AvaliacaoFisicaAtividadeFisica>();
        this.afafDias = new AvaliacaoFisicaAtividadeFisicaBuilder().initialize(null);
        this.modalActions = new EventEmitter<string | MaterializeAction>();
        this.aptidaoCardiorrespiratorias = new Array<string>();
        this.forcaAbdominais = new Array<string>();
        this.flexibilidades = new Array<string>();
    }
    
    ngOnInit() {
        this.autocompleteAF = new AtividadeFisicaDescricaoAutocomplete(this.service.getAtividadeFisicaService());
        this.getClassificacoes();
    }
    
    ngOnChanges( changes: SimpleChanges ) {
        if ( changes["atendimento"] != undefined ) { 
            this.atendimento = changes["atendimento"].currentValue;
            this.constructAfafs();    
        }
    }
    
    constructAfafs() {
        this.afafsRealizadas = this.atendimento.getAvaliacaoFisica().getAvaliacaoFisicaAtividadeFisicas().filter(afaf => {
            afaf.getTipo() == "REALIZADAS";
        });
        this.afafsOrientadas = this.atendimento.getAvaliacaoFisica().getAvaliacaoFisicaAtividadeFisicas().filter(afaf => {
            afaf.getTipo() == "ORIENTADAS";
        });
    }
    
    getClassificacoes() {
        this.service.getClassificacaoAtividade()
            .then(res => {
                this.classificacoes = Object.keys(res.json()).sort();
            })
            .catch(error => {
                console.log(error);
            })
    }
    
    getAptidaoCardiorrespiratoria() {
        this.service.getEnums( "aptidao-cardiorrespiratoria" )
            .then( res => {
                this.aptidaoCardiorrespiratorias = Object.keys(res.json()).sort();
            })
            .catch(error => {
                console.log(error);
            })
    }
    
    getForcaAbdomianl() {
        this.service.getEnums( "forca-abdominal" )
            .then( res => {
                this.aptidaoCardiorrespiratorias = Object.keys(res.json()).sort();
            })
            .catch(error => {
                console.log(error);
            })
    }
    
    getFlexibilidade() {
        this.service.getEnums( "flexibilidade" )
            .then( res => {
                this.flexibilidades = Object.keys(res.json()).sort();
            })
            .catch(error => {
                console.log(error);
            })
    }
    
    getForcaPreensaoManual() {
        this.service.getEnums( "forca-prenssao" )
            .then( res => {
                this.flexibilidades = Object.keys(res.json()).sort();
            })
            .catch(error => {
                console.log(error);
            })
    }
    
    addAtividade(tipo) {
        let afaf = new AvaliacaoFisicaAtividadeFisicaBuilder().initialize(null);
        afaf.setTipo(tipo);
        if ( tipo == "REALIZADA" )
            this.afafsRealizadas.push(afaf);
        else this.afafsOrientadas.push(afaf);
        this.atendimento.getAvaliacaoFisica().getAvaliacaoFisicaAtividadeFisicas().push(afaf);
    }
    
    removeAtividade(tipo, index: number) {
        if ( tipo == "REALIZADA" ) {
            let afaf = this.afafsRealizadas.splice(index, 1);
            let idxAfaf = this.afafsOrientadas.findIndex(a => { 
                if ( afaf[0].getAtividadeFisica().getDescricao() == a.getAtividadeFisica().getDescricao() &&
                        afaf[0].getMinuto() == a.getMinuto() ) return true;
                else return false;
            });
            if ( idxAfaf > -1 ) 
                this.afafsOrientadas.splice(idxAfaf, 1);
        } else this.afafsOrientadas.splice(index, 1);
        this.atendimento.getAvaliacaoFisica().setAvaliacaoFisicaAtividadeFisicas(new Array<AvaliacaoFisicaAtividadeFisica>());
        this.afafsRealizadas.forEach(aR => this.atendimento.getAvaliacaoFisica().getAvaliacaoFisicaAtividadeFisicas().push(aR));
        this.afafsOrientadas.forEach(aO => this.atendimento.getAvaliacaoFisica().getAvaliacaoFisicaAtividadeFisicas().push(aO));
    }
    
    replicateAtividade(afaf: AvaliacaoFisicaAtividadeFisica) {
        if ( this.afafsOrientadas.find(a => 
            a.getAtividadeFisica().getDescricao() == afaf.getAtividadeFisica().getDescricao() &&
            a.getMinuto() == afaf.getMinuto()) != undefined ) return;
        this.afafsOrientadas.push(afaf);
    }
    
    openModelDias(afaf: AvaliacaoFisicaAtividadeFisica) {
        this.afafDias = afaf;
        this.modalActions.emit( { action: "modal", params: ['open'] } );
    }
    
    closeModal() {
        this.modalActions.emit( { action: "modal", params: ['close'] } );
    }
    
    changeTotal(afaf: AvaliacaoFisicaAtividadeFisica) {
        let sumDias = 0;
        if ( afaf.getMinuto() != undefined ) {
            if ( afaf.getDomingo() )
                sumDias++;
            if ( afaf.getSegunda() )
                sumDias++;
            if ( afaf.getTerca() )
                sumDias++;
            if ( afaf.getQuarta() )
                sumDias++;
            if ( afaf.getQuinta() )
                sumDias++;
            if ( afaf.getSexta() )
                sumDias++;
            if ( afaf.getSabado() )
                sumDias++;
            afaf.setTotalMinuto( sumDias * afaf.getMinuto() );
        }
    }
    
    verifyEstagioContemplacao(campo) {
        if ( this.atendimento.getAvaliacaoFisica()[campo] )
            return true;
        else return false;
    }
    
    changePraticaExercicioFisico( evento ) {
        if ( evento )
            this.atendimento.getAvaliacaoFisica().setPraticaExercicioFisico(true);
        else this.atendimento.getAvaliacaoFisica().setPraticaExercicioFisico(false);
    }
    
    changeInteresseProgramaFisico( evento ) { 
        if ( evento )
            this.atendimento.getAvaliacaoFisica().setInteresseProgramaFisico(true);
        else this.atendimento.getAvaliacaoFisica().setInteresseProgramaFisico(false);
    }
    
    changeAcaoIniciarExercicioFisico( evento ) { 
        if ( evento )
            this.atendimento.getAvaliacaoFisica().setAcaoIniciarExercicioFisico(true);
        else this.atendimento.getAvaliacaoFisica().setAcaoIniciarExercicioFisico(false);
    }
    
    getFichaColetaValue( campo ) {
        if ( this.atendimento != undefined &&
                this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas().length > 0 ) {
            switch( campo ) {
                case "peso" :
                    return this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas().find(r =>
                        r.getPergunta().getGrupo().includes("EXAME F") && r.getPergunta().getCodigo() == '0001').getConteudo();
                case "estatura" :
                    return this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas().find(r =>
                        r.getPergunta().getGrupo().includes("EXAME F") && r.getPergunta().getCodigo() == '0002').getConteudo();
                case "circunferenciaAbdominal" :
                    return this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas().find(r =>
                        r.getPergunta().getGrupo().includes("EXAME F") && r.getPergunta().getCodigo() == '0011').getConteudo();
                case "circunferenciaCintura" :
                    return this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas().find(r =>
                        r.getPergunta().getGrupo().includes("EXAME F") && r.getPergunta().getCodigo() == '0010').getConteudo();
                case "circunferenciaQuadril" :
                    return this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas().find(r =>
                        r.getPergunta().getGrupo().includes("EXAME F") && r.getPergunta().getCodigo() == '0012').getConteudo();
                case "dobraTricipital" :
                    return this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas().find(r =>
                        r.getPergunta().getGrupo().includes("EXAME F") && r.getPergunta().getCodigo() == '0020').getConteudo();
                case "dobraSubscapular" :
                    return this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas().find(r =>
                        r.getPergunta().getGrupo().includes("EXAME F") && r.getPergunta().getCodigo() == '0021').getConteudo();
                case "dobraToracica" :
                    return this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas().find(r =>
                        r.getPergunta().getGrupo().includes("EXAME F") && r.getPergunta().getCodigo() == '0022').getConteudo();
                case "dobraAuxMedia" :
                    return this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas().find(r =>
                        r.getPergunta().getGrupo().includes("EXAME F") && r.getPergunta().getCodigo() == '0023').getConteudo();
                case "dobraSupraIliaca" :
                    return this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas().find(r =>
                        r.getPergunta().getGrupo().includes("EXAME F") && r.getPergunta().getCodigo() == '0024').getConteudo();
                case "dobraAbdominal" :
                    return this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas().find(r =>
                        r.getPergunta().getGrupo().includes("EXAME F") && r.getPergunta().getCodigo() == '0025').getConteudo();
                case "dobraCoxaMedial" :
                    return this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas().find(r =>
                        r.getPergunta().getGrupo().includes("EXAME F") && r.getPergunta().getCodigo() == '0026').getConteudo();
           }
       }
    }
    
    calcularComposicaoCorporal() {
        if ( this.percentualGorduraNegociada != undefined ) {
            this.atendimento.getAvaliacaoFisica().setPercentualGorduraNegociada(
                    Util.treatDouble(this.percentualGorduraNegociada));
            this.service.calcularComposicaoCorporal( this.atendimento )
                .then(res => {
                    this.setDadosSecundarioComposicaoCorporal(new AtendimentoBuilder().clone(res.json())); 
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
    
    setDadosSecundarioComposicaoCorporal( atendimento: Atendimento ) {
        this.atendimento.getAvaliacaoFisica().setImc(atendimento.getAvaliacaoFisica().getImc());
        this.atendimento.getAvaliacaoFisica().setRazaoCinturaEstatura(atendimento.getAvaliacaoFisica().getRazaoCinturaEstatura());
        this.atendimento.getAvaliacaoFisica().setPercentualGordura(atendimento.getAvaliacaoFisica().getPercentualGordura());
        this.atendimento.getAvaliacaoFisica().setPercentualMassaMagra(atendimento.getAvaliacaoFisica().getPercentualMassaMagra());
        this.atendimento.getAvaliacaoFisica().setMassaMagra(atendimento.getAvaliacaoFisica().getMassaMagra());
        this.atendimento.getAvaliacaoFisica().setGorduraAbsoluta(atendimento.getAvaliacaoFisica().getGorduraAbsoluta());
        this.atendimento.getAvaliacaoFisica().setCarenciaMuscular(atendimento.getAvaliacaoFisica().getCarenciaMuscular());
        this.atendimento.getAvaliacaoFisica().setPercentualGorduraIdeal(atendimento.getAvaliacaoFisica().getPercentualGorduraIdeal());
        this.atendimento.getAvaliacaoFisica().setPercentualMassaMagraIdeal(atendimento.getAvaliacaoFisica().getPercentualMassaMagraIdeal());
        this.atendimento.getAvaliacaoFisica().setPesoIdeal(atendimento.getAvaliacaoFisica().getPesoIdeal());
        this.atendimento.getAvaliacaoFisica().setPesoExcesso(atendimento.getAvaliacaoFisica().getPesoExcesso());
        this.atendimento.getAvaliacaoFisica().setPercentualGorduraNegociada(atendimento.getAvaliacaoFisica().getPercentualGorduraNegociada());
        this.atendimento.getAvaliacaoFisica().setPercentualMassaMagraNegociada(atendimento.getAvaliacaoFisica().getPercentualMassaMagraNegociada());
        this.atendimento.getAvaliacaoFisica().setPesoNegociado(atendimento.getAvaliacaoFisica().getPesoNegociado());
        this.atendimento.getAvaliacaoFisica().setPesoExcessoNegociado(atendimento.getAvaliacaoFisica().getPesoExcessoNegociado());
    }
    
    changeAptidaoCardiorespiratoriaValor() {
        
    }
    
    changeForcaAbdominalValor() {
        
    }
    
    changeFlexibilidadeValor() {
        
    }
    
    changeForcaPreensaoManualValor() {
        
    }
    
    
}