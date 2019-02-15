import { EventEmitter, SimpleChanges, Component, Input, Output, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import * as $ from 'jquery';

import { Atendimento } from './../../model/atendimento';
import { RespostaFichaColeta } from './../../model/resposta-ficha-coleta';
import { ItemRespostaFichaColeta } from './../../model/item-resposta-ficha-coleta';
import { ItemRespostaFichaColetaBuilder } from './../../controller/item-resposta-ficha-coleta/item-resposta-ficha-coleta.builder';
import { AtendimentoBuilder } from './../../controller/atendimento/atendimento.builder';
import { AtendimentoService } from './../../controller/atendimento/atendimento.service';
import { AtividadeFisicaDescricaoAutocomplete } from './../../controller/atividade-fisica/atividade-fisica-descricao.autocomplete';
import { AvaliacaoFisicaAtividadeFisica } from './../../model/avaliacao-fisica-atividade-fisica';
import { AvaliacaoFisicaAtividadeFisicaBuilder } from './../../controller/avaliacao-fisica-atividade-fisica/avaliacao-fisica-atividade-fisica.builder';
import { Util } from './../../generics/utils/util';
import { UtilService } from './../../generics/util.service';
import { TriagemComponent } from './../../includes/triagem/triagem.component';

@Component( {
    selector: 'app-atendimento-proaf',
    templateUrl: './atendimento-proaf.html',
    styleUrls: ['./atendimento-proaf.css']
} )
export class AtendimentoProafComponent {
    @Input() atendimento: Atendimento;
    @Input() service: AtendimentoService;
    @Output() nivelAtividadeFisica: EventEmitter<string>;
    private autocompleteAF;
    private classificacoes;
    private afafsRealizadas: Array<AvaliacaoFisicaAtividadeFisica>;
    private afafsOrientadas: Array<AvaliacaoFisicaAtividadeFisica>;
    private afafDias: AvaliacaoFisicaAtividadeFisica;
    private modalActions;
    private aptidaoCardiorrespiratorias: Array<string>;
    private forcaAbdominais: Array<string>;
    private flexibilidades: Array<string>;
    private forcaPreensaoManuais: Array<string>;
    private aptidaoFisicaBrigadista: Array<string>;
    private nivelAtividadeFisicas: Array<string>;
    private testesFisicos: Array<number>;
    private simNao: Array<string>;
    private statusFilaAtendimentoOcupacional: Array<string>; 
    private tempIndex: number;
    private realizada: boolean;
    private verifyStatusAtendimento: boolean;
    private disabledAvaliacao: boolean;
    private respostaAtividadesFisicas: RespostaFichaColeta;
    private tipoAtendimentos: Array<string>;

    constructor(private utilService: UtilService) {
        this.afafsRealizadas = new Array<AvaliacaoFisicaAtividadeFisica>();
        this.afafsOrientadas = new Array<AvaliacaoFisicaAtividadeFisica>();
        this.afafDias = new AvaliacaoFisicaAtividadeFisicaBuilder().initialize( null );
        this.modalActions = new EventEmitter<string | MaterializeAction>();
        this.aptidaoCardiorrespiratorias = new Array<string>();
        this.forcaAbdominais = new Array<string>();
        this.flexibilidades = new Array<string>();
        this.forcaPreensaoManuais = new Array<string>();
        this.aptidaoFisicaBrigadista = new Array<string>();
        this.nivelAtividadeFisicas = new Array<string>();
        this.testesFisicos = new Array<number>();
        this.nivelAtividadeFisica = new EventEmitter<string | MaterializeAction>();
        this.simNao = new Array<string>();
        this.statusFilaAtendimentoOcupacional = new Array<string>();
        this.tipoAtendimentos = new Array<string>();
        this.disabledAvaliacao = false;
        this.verifyStatusAtendimento = false;
    }

    ngOnInit() {
        this.autocompleteAF = new AtividadeFisicaDescricaoAutocomplete( this.service.getAtividadeFisicaService() );
        this.getClassificacoes();
        this.getAptidaoCardiorrespiratoria();
        this.getForcaAbdominal();
        this.getFlexibilidade();
        this.getForcaPreensaoManual();
        this.getAptidaoFisicaBrigadista();
        this.getNivelAtividadeFisica();
        this.getSimNao();
        this.getStatusFilaAtendimentoOcupacional();
        this.respostaAtividadesFisicas = this.getRespostaAtividadesFisica();
        this.getTipoAtendimento();
        this.changeAptidaoCardiorrespiratoriaValor();
    }

    ngOnChanges( changes: SimpleChanges ) {
        if ( changes["atendimento"] != undefined ) {
            this.atendimento = changes["atendimento"].currentValue;
            if ( this.atendimento.getId() > 0 ) {
                if ( this.atendimento.getFilaEsperaOcupacional() != undefined && 
                        this.atendimento.getFilaAtendimentoOcupacional().getStatus() != this.statusFilaAtendimentoOcupacional[7] )
                this.setEstagioContemplacaoTriagem();
            }
        }
    }

    getClassificacoes() {
        this.service.getClassificacaoAtividade()
            .then( res => {
                this.classificacoes = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
                console.log( error );
            } )
    }

    getAptidaoCardiorrespiratoria() {
        this.service.getEnums( "aptidao-cardiorrespiratoria" )
            .then( res => {
                this.aptidaoCardiorrespiratorias = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
                console.log( error );
            } )
    }
    
    getTipoAtendimento() {
        this.utilService.getGenericPath("tipo-atendimento")
            .then(res => {
                this.tipoAtendimentos = Object.keys(res.json()).sort();
            })
            .catch(error => {
                console.log(error)
            })
    }

    getForcaAbdominal() {
        this.service.getEnums( "forca-abdominal" )
            .then( res => {
                this.forcaAbdominais = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
                console.log( error );
            } )
    }

    getFlexibilidade() {
        this.service.getEnums( "flexibilidade" )
            .then( res => {
                this.flexibilidades = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
                console.log( error );
            } )
    }

    getForcaPreensaoManual() {
        this.service.getEnums( "forca-prenssao-manual" )
            .then( res => {
                this.forcaPreensaoManuais = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
            } )
    }

    getAptidaoFisicaBrigadista() {
        this.service.getEnums( "aptidao-fisica-brigadista" )
            .then( res => {
                this.aptidaoFisicaBrigadista = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
            } )
    }

    getNivelAtividadeFisica() {
        this.service.getUtilService().getGenericPath( 'nivel-atividade-fisica' )
            .then( res => {
                this.nivelAtividadeFisicas = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
                console.log( error );
            } )
    }
    
    getSimNao() {
        this.service.getUtilService().getGenericPath( 'status-sim-nao' )
            .then( res => {
                this.simNao = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
                console.log( error );
            } )
    }
    
    getStatusFilaAtendimentoOcupacional() {
        this.utilService.getGenericPath("status-fila-atendimento-ocupacional")
            .then(res => {
                this.statusFilaAtendimentoOcupacional = Object.keys( res.json() ).sort();
            })
            .catch( error => {
                console.log( error );
            } )
    }

    addAtividade( tipo: string ) {
        let afaf = new AvaliacaoFisicaAtividadeFisicaBuilder().initialize( null );
        afaf.setTipo( tipo );
        this.atendimento.getAvaliacaoFisica().getAvaliacaoFisicaAtividadeFisicas().push( afaf );
        
        if ( afaf.getTipo() == "REALIZADA" ) {            
            afaf.setIndex((this.atendimento.getAvaliacaoFisica().getAvaliacaoFisicaAtividadeFisicas().length - 1));
            this.respostaAtividadesFisicas = this.getRespostaAtividadesFisica();
            if ( this.respostaAtividadesFisicas != undefined ) {
                this.respostaAtividadesFisicas.setConteudo("SIM");
                if ( this.respostaAtividadesFisicas.getItens() == undefined )
                    this.respostaAtividadesFisicas.setItens(new Array<ItemRespostaFichaColeta>());
                this.addItemResposta(this.respostaAtividadesFisicas, afaf);
            }        
        }
        
    }

    removeAtividade( afaf: AvaliacaoFisicaAtividadeFisica, index: number ) {
        
        if ( afaf.getTipo() == "REALIZADA" ) {
            this.respostaAtividadesFisicas = this.getRespostaAtividadesFisica();            
            let respostaAux = this.respostaAtividadesFisicas.getItens().findIndex(r => r.getIndex() == afaf.getIndex());
                if(respostaAux => 0){
                    this.respostaAtividadesFisicas.getItens().splice(respostaAux, 1);
                    if(this.respostaAtividadesFisicas.getItens().length == 0){
                       this.respostaAtividadesFisicas.setConteudo(this.simNao[0]);
                       this.respostaAtividadesFisicas.setItens(undefined);                        
                    }                    
                }
        }   
        this.atendimento.getAvaliacaoFisica().getAvaliacaoFisicaAtividadeFisicas().splice(index, 1);
    }
    
    addItemResposta(resposta: RespostaFichaColeta, afaf: AvaliacaoFisicaAtividadeFisica) {
        let item = new ItemRespostaFichaColetaBuilder().initialize(new ItemRespostaFichaColeta());
        item.setIndex(afaf.getIndex());
        let itemAux = item;
        for ( let i = 0; i < 2; i++ ) {
            item.setItem(new ItemRespostaFichaColetaBuilder().initialize(new ItemRespostaFichaColeta()));
            item = item.getItem();
        }        
        resposta.getItens().push(itemAux);
        
    }
    
    getItemByIndex(afaf: AvaliacaoFisicaAtividadeFisica){
        
        return this.respostaAtividadesFisicas.getItens().find(x=>x.getIndex() == afaf.getIndex());
    }
    
    changeAtividade(afaf: AvaliacaoFisicaAtividadeFisica, realizada: boolean) {
        if ( realizada ) {
            this.respostaAtividadesFisicas = this.getRespostaAtividadesFisica();
            if ( this.respostaAtividadesFisicas != undefined ){
                let respostaAux = this.getItemByIndex(afaf);
                if(respostaAux)
                   respostaAux.setConteudo(afaf.getAtividadeFisica().getDescricao());
            }
        }
    }
    
    changeDias(afaf: AvaliacaoFisicaAtividadeFisica) {
        let qtdDias: number = this.changeTotal(afaf);
        if ( this.realizada ) {
            this.respostaAtividadesFisicas = this.getRespostaAtividadesFisica();
            if (this.respostaAtividadesFisicas != undefined ){
                let respostaAux = this.getItemByIndex(afaf);
                if(respostaAux)
                    respostaAux.getItem().setConteudo(qtdDias.toString());            
            }
        }
    }
    
    changeMinuto(afaf: AvaliacaoFisicaAtividadeFisica, realizada: boolean) {
        this.changeTotal(afaf);
        if ( realizada ) {
            this.respostaAtividadesFisicas = this.getRespostaAtividadesFisica();
            if (this.respostaAtividadesFisicas != undefined ){
                let respostaAux = this.getItemByIndex(afaf);
                if(respostaAux)
                    respostaAux.getItem().getItem().setConteudo(afaf.getMinuto().toString());                
            }
        }
    }
    
    changeClassificacao(afaf: AvaliacaoFisicaAtividadeFisica) {  
        this.respostaAtividadesFisicas = this.getRespostaAtividadesFisica();
        if (this.respostaAtividadesFisicas != undefined ){
            let respostaAux = this.getItemByIndex(afaf);
            if(respostaAux)
                respostaAux.getItem().getItem().getItem().setConteudo(afaf.getClassificacao());                
        }
    }
    
    replicateAtividade( afaf: AvaliacaoFisicaAtividadeFisica ) {
        let afaf1 = new AvaliacaoFisicaAtividadeFisicaBuilder().clone(afaf);
        afaf1.setTipo("ORIENTADA");
        
        this.atendimento.getAvaliacaoFisica().getAvaliacaoFisicaAtividadeFisicas().push(afaf1);
    }

    openModelDias( afaf: AvaliacaoFisicaAtividadeFisica, i: number, realizada: boolean ) {
        this.realizada = realizada;
        this.tempIndex = i;
        this.afafDias = afaf;
        this.modalActions.emit( { action: "modal", params: ['open'] } );
    }

    closeModal() {
        this.modalActions.emit( { action: "modal", params: ['close'] } );
    }
    
    changeTotal( afaf: AvaliacaoFisicaAtividadeFisica ) {
        let sumDias = 0;
        if ( afaf.getDomingo() ) sumDias++;
        if ( afaf.getSegunda() ) sumDias++;
        if ( afaf.getTerca() ) sumDias++;
        if ( afaf.getQuarta() ) sumDias++;
        if ( afaf.getQuinta() ) sumDias++;
        if ( afaf.getSexta() ) sumDias++;
        if ( afaf.getSabado() ) sumDias++;
        if ( afaf.getMinuto() != undefined ) {
            afaf.setTotalMinuto( sumDias * afaf.getMinuto() );
        }
        return sumDias;
    }

    verifyEstagioContemplacao( campo ) {
        if ( this.atendimento.getAvaliacaoFisica()[campo] )
            return true;
        else return false;
    }

    changePraticaExercicioFisico( evento ) {
        if ( evento ) {
            this.atendimento.getAvaliacaoFisica().setPraticaExercicioFisico( true );
            this.atendimento.getAvaliacaoFisica().setInteresseProgramaFisico( false );
            this.atendimento.getAvaliacaoFisica().setAcaoIniciarExercicioFisico( false );
        } else this.atendimento.getAvaliacaoFisica().setPraticaExercicioFisico( false );
        this.setEstagioContemplacaoTriagem();
    }

    changeInteresseProgramaFisico( evento ) {
        if ( evento )
            this.atendimento.getAvaliacaoFisica().setInteresseProgramaFisico( true );
        else {
            this.atendimento.getAvaliacaoFisica().setInteresseProgramaFisico( false );
            this.atendimento.getAvaliacaoFisica().setAcaoIniciarExercicioFisico( false );
        }
        this.setEstagioContemplacaoTriagem();
    }

    changeAcaoIniciarExercicioFisico( evento ) {
        if ( evento )
            this.atendimento.getAvaliacaoFisica().setAcaoIniciarExercicioFisico( true );
        else this.atendimento.getAvaliacaoFisica().setAcaoIniciarExercicioFisico( false );
        this.setEstagioContemplacaoTriagem();
    }

    setEstagioContemplacaoTriagem() {
        if ( this.atendimento.getTriagens() == undefined || this.atendimento.getTriagens()[1] == undefined ) return;
        if ( !this.atendimento.getAvaliacaoFisica().getPraticaExercicioFisico() )
            if ( !this.atendimento.getAvaliacaoFisica().getInteresseProgramaFisico() ) {
                this.atendimento.getTriagens()[1].setIndice( 0 );
                this.selectTriagem( 1, 0 );
            } else
                if ( !this.atendimento.getAvaliacaoFisica().getAcaoIniciarExercicioFisico() ) {
                    this.atendimento.getTriagens()[1].setIndice( 1 );
                    this.selectTriagem( 1, 1 );
                } else {
                    this.atendimento.getTriagens()[1].setIndice( 2 );
                    this.selectTriagem( 1, 2 );
                }
        else {
            if ( this.testesFisicos.length > 0 ) {
                let menorQue4: boolean = false;
                if ( this.testesFisicos.forEach( tf => {
                    if ( tf < 4 ) {
                        this.atendimento.getTriagens()[1].setIndice( 3 );
                        this.selectTriagem( 1, 3 );
                        menorQue4 = true;
                    }
                } ) )
                    if ( !menorQue4 ) {
                        this.atendimento.getTriagens()[1].setIndice( 4 );
                        this.selectTriagem( 1, 4 );
                    }
            }
        }
    }
    gorduraNegociada
    calcularComposicaoCorporal() {
        if ( this.atendimento.getAvaliacaoFisica().getPercentualGorduraNegociada() != undefined ) {
            this.service.calcularComposicaoCorporal( new AtendimentoBuilder().clone( this.atendimento ) )
                .then( res => {
                    this.setDadosSecundarioComposicaoCorporal( new AtendimentoBuilder().clone( res.json() ) );
                } )
                .catch( error => {
                    console.log( error );
                } )
        }
    }

    setDadosSecundarioComposicaoCorporal( atendimento: Atendimento ) {
        
        this.atendimento.getAvaliacaoFisica().setImc( atendimento.getAvaliacaoFisica().getImc() );
        this.atendimento.getAvaliacaoFisica().setRazaoCinturaEstatura( atendimento.getAvaliacaoFisica().getRazaoCinturaEstatura() );
        this.atendimento.getAvaliacaoFisica().setPercentualGordura( atendimento.getAvaliacaoFisica().getPercentualGordura() );
        this.atendimento.getAvaliacaoFisica().setPercentualMassaMagra( atendimento.getAvaliacaoFisica().getPercentualMassaMagra() );
        this.atendimento.getAvaliacaoFisica().setMassaMagra( atendimento.getAvaliacaoFisica().getMassaMagra() );
        this.atendimento.getAvaliacaoFisica().setGorduraAbsoluta( atendimento.getAvaliacaoFisica().getGorduraAbsoluta() );
        this.atendimento.getAvaliacaoFisica().setCarenciaMuscular( atendimento.getAvaliacaoFisica().getCarenciaMuscular() );
        this.atendimento.getAvaliacaoFisica().setPercentualGorduraIdeal( atendimento.getAvaliacaoFisica().getPercentualGorduraIdeal() );
        this.atendimento.getAvaliacaoFisica().setPercentualMassaMagraIdeal( atendimento.getAvaliacaoFisica().getPercentualMassaMagraIdeal() );
        this.atendimento.getAvaliacaoFisica().setPesoIdeal( atendimento.getAvaliacaoFisica().getPesoIdeal() );
        this.atendimento.getAvaliacaoFisica().setPesoExcesso( atendimento.getAvaliacaoFisica().getPesoExcesso() );
        this.atendimento.getAvaliacaoFisica().setPercentualGorduraNegociada( atendimento.getAvaliacaoFisica().getPercentualGorduraNegociada() );
        this.atendimento.getAvaliacaoFisica().setPercentualMassaMagraNegociada( atendimento.getAvaliacaoFisica().getPercentualMassaMagraNegociada() );
        this.atendimento.getAvaliacaoFisica().setPesoNegociado( atendimento.getAvaliacaoFisica().getPesoNegociado() );
        this.atendimento.getAvaliacaoFisica().setPesoExcessoNegociado( atendimento.getAvaliacaoFisica().getPesoExcessoNegociado() );
        let respostas: Array<RespostaFichaColeta> = this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas().filter(r => 
            r.getPergunta().getGrupo().includes("EXAME F"));
        respostas.find(r => r.getPergunta().getCodigo() == "0003").setConteudo(this.atendimento.getAvaliacaoFisica().getImc().toString());
        respostas.find(r => r.getPergunta().getCodigo() == "0004").setConteudo(this.atendimento.getAvaliacaoFisica().getPercentualGordura().toString());
    }

    changePeso() {
        this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas().find( rfc =>
            rfc.getPergunta().getGrupo().includes( "EXAME F" ) && rfc.getPergunta().getCodigo() == "0001"
        ).setConteudo( this.passStringByValue( this.atendimento.getAvaliacaoFisica().getPeso().toString() ) );
    }

    changeEstatura() {
        this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas().find( rfc =>
            rfc.getPergunta().getGrupo().includes( "EXAME F" ) && rfc.getPergunta().getCodigo() == "0002"
        ).setConteudo( this.passStringByValue( this.atendimento.getAvaliacaoFisica().getEstatura().toString() ) );
    }

    changeCircunferenciaAbdominal() {
        this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas().find( rfc =>
            rfc.getPergunta().getGrupo().includes( "EXAME F" ) && rfc.getPergunta().getCodigo() == "0011"
        ).setConteudo( this.passStringByValue( this.atendimento.getAvaliacaoFisica().getCircurferenciaAbdominal().toString() ) );
    }

    changeCircunferenciaCintura() {
        this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas().find( rfc =>
            rfc.getPergunta().getGrupo().includes( "EXAME F" ) && rfc.getPergunta().getCodigo() == "0010"
        ).setConteudo( this.passStringByValue( this.atendimento.getAvaliacaoFisica().getCircunferenciaCintura().toString() ) );
    }

    changeCircunferenciaQuadril() {
        this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas().find( rfc =>
            rfc.getPergunta().getGrupo().includes( "EXAME F" ) && rfc.getPergunta().getCodigo() == "0012"
        ).setConteudo( this.passStringByValue( this.atendimento.getAvaliacaoFisica().getCircunferenciaQuadril().toString() ) );
    }

    changeAptidaoCardiorrespiratoriaValor() {
        let idade = this.atendimento.getFilaEsperaOcupacional().getEmpregado().getPessoa().getIdade();
        let aptCardio = Number( this.atendimento.getAvaliacaoFisica().getAptidaoCardiorrespiratoriaValor().toString().replace( ',', '.' ) );
        if ( this.atendimento.getFilaEsperaOcupacional().getEmpregado().getPessoa().getSexo() == "MASCULINO" ) {           
            
            if ( idade >= 18 && idade <= 24 ) {
                if ( aptCardio < 32 ) {
                    this.setAptidaoCardiorespiratoria( 4 );
                } else if ( aptCardio >= 32 && aptCardio <= 37 ) {
                    this.setAptidaoCardiorespiratoria( 0 );
                } else if ( aptCardio >= 38 && aptCardio <= 43 ) {
                    this.setAptidaoCardiorespiratoria( 6 );
                } else if ( aptCardio >= 44 && aptCardio <= 50 ) {
                    this.setAptidaoCardiorespiratoria( 3 );
                } else if ( aptCardio >= 51 && aptCardio <= 56 ) {
                    this.setAptidaoCardiorespiratoria( 1 );
                } else if ( aptCardio >= 57 && aptCardio <= 62 ) {
                    this.setAptidaoCardiorespiratoria( 5 );
                } else if ( aptCardio > 62 ) {
                    this.setAptidaoCardiorespiratoria( 2 );
                }
            } else if ( idade >= 25 && idade <= 29 ) {
                if ( aptCardio < 31 ) {
                    this.setAptidaoCardiorespiratoria( 4 );
                } else if ( aptCardio >= 31 && aptCardio <= 35 ) {
                    this.setAptidaoCardiorespiratoria( 0 );
                } else if ( aptCardio >= 36 && aptCardio <= 42 ) {
                    this.setAptidaoCardiorespiratoria( 6 );
                } else if ( aptCardio >= 43 && aptCardio <= 48 ) {
                    this.setAptidaoCardiorespiratoria( 3 );
                } else if ( aptCardio >= 49 && aptCardio <= 53 ) {
                    this.setAptidaoCardiorespiratoria( 1 );
                } else if ( aptCardio >= 54 && aptCardio <= 59 ) {
                    this.setAptidaoCardiorespiratoria( 5 );
                } else if ( aptCardio > 59 ) {
                    this.setAptidaoCardiorespiratoria( 2 );
                }
            } else if ( idade >= 30 && idade <= 34 ) {
                if ( aptCardio < 29 ) {
                    this.setAptidaoCardiorespiratoria( 4 );
                } else if ( aptCardio >= 29 && aptCardio <= 34 ) {
                    this.setAptidaoCardiorespiratoria( 0 );
                } else if ( aptCardio >= 35 && aptCardio <= 40 ) {
                    this.setAptidaoCardiorespiratoria( 6 );
                } else if ( aptCardio >= 41 && aptCardio <= 45 ) {
                    this.setAptidaoCardiorespiratoria( 3 );
                } else if ( aptCardio >= 46 && aptCardio <= 51 ) {
                    this.setAptidaoCardiorespiratoria( 1 );
                } else if ( aptCardio >= 52 && aptCardio <= 56 ) {
                    this.setAptidaoCardiorespiratoria( 5 );
                } else if ( aptCardio > 56 ) {
                    this.setAptidaoCardiorespiratoria( 2 );
                }
            } else if ( idade >= 35 && idade <= 39 ) {
                if ( aptCardio < 28 ) {
                    this.setAptidaoCardiorespiratoria( 4 );
                } else if ( aptCardio >= 28 && aptCardio <= 32 ) {
                    this.setAptidaoCardiorespiratoria( 0 );
                } else if ( aptCardio >= 33 && aptCardio <= 38 ) {
                    this.setAptidaoCardiorespiratoria( 6 );
                } else if ( aptCardio >= 39 && aptCardio <= 43 ) {
                    this.setAptidaoCardiorespiratoria( 3 );
                } else if ( aptCardio >= 44 && aptCardio <= 48 ) {
                    this.setAptidaoCardiorespiratoria( 1 );
                } else if ( aptCardio >= 49 && aptCardio <= 54 ) {
                    this.setAptidaoCardiorespiratoria( 5 );
                } else if ( aptCardio > 54 ) {
                    this.setAptidaoCardiorespiratoria( 2 );
                }
            } else if ( idade >= 40 && idade <= 44 ) {
                if ( aptCardio < 26 ) {
                    this.setAptidaoCardiorespiratoria( 4 );
                } else if ( aptCardio >= 26 && aptCardio <= 31 ) {
                    this.setAptidaoCardiorespiratoria( 0 );
                } else if ( aptCardio >= 32 && aptCardio <= 35 ) {
                    this.setAptidaoCardiorespiratoria( 6 );
                } else if ( aptCardio >= 36 && aptCardio <= 41 ) {
                    this.setAptidaoCardiorespiratoria( 3 );
                } else if ( aptCardio >= 42 && aptCardio <= 46 ) {
                    this.setAptidaoCardiorespiratoria( 1 );
                } else if ( aptCardio >= 47 && aptCardio <= 51 ) {
                    this.setAptidaoCardiorespiratoria( 5 );
                } else if ( aptCardio > 51 ) {
                    this.setAptidaoCardiorespiratoria( 2 );
                }
            } else if ( idade >= 45 && idade <= 49 ) {
                if ( aptCardio < 25 ) {
                    this.setAptidaoCardiorespiratoria( 4 );
                } else if ( aptCardio >= 25 && aptCardio <= 29 ) {
                    this.setAptidaoCardiorespiratoria( 0 );
                } else if ( aptCardio >= 30 && aptCardio <= 34 ) {
                    this.setAptidaoCardiorespiratoria( 6 );
                } else if ( aptCardio >= 35 && aptCardio <= 39 ) {
                    this.setAptidaoCardiorespiratoria( 3 );
                } else if ( aptCardio >= 40 && aptCardio <= 43 ) {
                    this.setAptidaoCardiorespiratoria( 1 );
                } else if ( aptCardio >= 44 && aptCardio <= 48 ) {
                    this.setAptidaoCardiorespiratoria( 5 );
                } else if ( aptCardio > 48 ) {
                    this.setAptidaoCardiorespiratoria( 2 );
                }
            } else if ( idade >= 50 && idade <= 54 ) {
                if ( aptCardio < 24 ) {
                    this.setAptidaoCardiorespiratoria( 4 );
                } else if ( aptCardio >= 24 && aptCardio <= 27 ) {
                    this.setAptidaoCardiorespiratoria( 0 );
                } else if ( aptCardio >= 28 && aptCardio <= 32 ) {
                    this.setAptidaoCardiorespiratoria( 6 );
                } else if ( aptCardio >= 33 && aptCardio <= 36 ) {
                    this.setAptidaoCardiorespiratoria( 3 );
                } else if ( aptCardio >= 37 && aptCardio <= 41 ) {
                    this.setAptidaoCardiorespiratoria( 1 );
                } else if ( aptCardio >= 42 && aptCardio <= 46 ) {
                    this.setAptidaoCardiorespiratoria( 5 );
                } else if ( aptCardio > 46 ) {
                    this.setAptidaoCardiorespiratoria( 2 );
                }
            } else if ( idade >= 55 && idade <= 59 ) {
                if ( aptCardio < 22 ) {
                    this.setAptidaoCardiorespiratoria( 4 );
                } else if ( aptCardio >= 22 && aptCardio <= 26 ) {
                    this.setAptidaoCardiorespiratoria( 0 );
                } else if ( aptCardio >= 27 && aptCardio <= 30 ) {
                    this.setAptidaoCardiorespiratoria( 6 );
                } else if ( aptCardio >= 31 && aptCardio <= 34 ) {
                    this.setAptidaoCardiorespiratoria( 3 );
                } else if ( aptCardio >= 35 && aptCardio <= 39 ) {
                    this.setAptidaoCardiorespiratoria( 1 );
                } else if ( aptCardio >= 40 && aptCardio <= 43 ) {
                    this.setAptidaoCardiorespiratoria( 5 );
                } else if ( aptCardio > 43 ) {
                    this.setAptidaoCardiorespiratoria( 2 );
                }
            } else if ( idade >= 60 ) {
                if ( aptCardio < 21 ) {
                    this.setAptidaoCardiorespiratoria( 4 );
                } else if ( aptCardio >= 21 && aptCardio <= 24 ) {
                    this.setAptidaoCardiorespiratoria( 0 );
                } else if ( aptCardio >= 25 && aptCardio <= 28 ) {
                    this.setAptidaoCardiorespiratoria( 6 );
                } else if ( aptCardio >= 29 && aptCardio <= 32 ) {
                    this.setAptidaoCardiorespiratoria( 3 );
                } else if ( aptCardio >= 33 && aptCardio <= 36 ) {
                    this.setAptidaoCardiorespiratoria( 1 );
                } else if ( aptCardio >= 37 && aptCardio <= 40 ) {
                    this.setAptidaoCardiorespiratoria( 5 );
                } else if ( aptCardio > 40 ) {
                    this.setAptidaoCardiorespiratoria( 2 );
                }
            }
        } else {
            if ( idade >= 18 && idade <= 24 ) {
                if ( aptCardio < 27 ) {
                    this.setAptidaoCardiorespiratoria( 4 );
                } else if ( aptCardio >= 27 && aptCardio <= 31 ) {
                    this.setAptidaoCardiorespiratoria( 0 );
                } else if ( aptCardio >= 32 && aptCardio <= 36 ) {
                    this.setAptidaoCardiorespiratoria( 6 );
                } else if ( aptCardio >= 37 && aptCardio <= 41 ) {
                    this.setAptidaoCardiorespiratoria( 3 );
                } else if ( aptCardio >= 42 && aptCardio <= 46 ) {
                    this.setAptidaoCardiorespiratoria( 1 );
                } else if ( aptCardio >= 47 && aptCardio <= 51 ) {
                    this.setAptidaoCardiorespiratoria( 5 );
                } else if ( aptCardio > 51 ) {
                    this.setAptidaoCardiorespiratoria( 2 );
                }
            } else if ( idade >= 25 && idade <= 29 ) {
                if ( aptCardio < 26 ) {
                    this.setAptidaoCardiorespiratoria( 4 );
                } else if ( aptCardio >= 26 && aptCardio <= 30 ) {
                    this.setAptidaoCardiorespiratoria( 0 );
                } else if ( aptCardio >= 31 && aptCardio <= 35 ) {
                    this.setAptidaoCardiorespiratoria( 6 );
                } else if ( aptCardio >= 36 && aptCardio <= 40 ) {
                    this.setAptidaoCardiorespiratoria( 3 );
                } else if ( aptCardio >= 41 && aptCardio <= 44 ) {
                    this.setAptidaoCardiorespiratoria( 1 );
                } else if ( aptCardio >= 45 && aptCardio <= 49 ) {
                    this.setAptidaoCardiorespiratoria( 5 );
                } else if ( aptCardio > 49 ) {
                    this.setAptidaoCardiorespiratoria( 2 );
                }
            } else if ( idade >= 30 && idade <= 34 ) {
                if ( aptCardio < 25 ) {
                    this.setAptidaoCardiorespiratoria( 4 );
                } else if ( aptCardio >= 25 && aptCardio <= 29 ) {
                    this.setAptidaoCardiorespiratoria( 0 );
                } else if ( aptCardio >= 30 && aptCardio <= 33 ) {
                    this.setAptidaoCardiorespiratoria( 6 );
                } else if ( aptCardio >= 34 && aptCardio <= 37 ) {
                    this.setAptidaoCardiorespiratoria( 3 );
                } else if ( aptCardio >= 38 && aptCardio <= 42 ) {
                    this.setAptidaoCardiorespiratoria( 1 );
                } else if ( aptCardio >= 43 && aptCardio <= 46 ) {
                    this.setAptidaoCardiorespiratoria( 5 );
                } else if ( aptCardio > 46 ) {
                    this.setAptidaoCardiorespiratoria( 2 );
                }
            } else if ( idade >= 35 && idade <= 39 ) {
                if ( aptCardio < 24 ) {
                    this.setAptidaoCardiorespiratoria( 4 );
                } else if ( aptCardio >= 24 && aptCardio <= 27 ) {
                    this.setAptidaoCardiorespiratoria( 0 );
                } else if ( aptCardio >= 28 && aptCardio <= 31 ) {
                    this.setAptidaoCardiorespiratoria( 6 );
                } else if ( aptCardio >= 32 && aptCardio <= 35 ) {
                    this.setAptidaoCardiorespiratoria( 3 );
                } else if ( aptCardio >= 36 && aptCardio <= 40 ) {
                    this.setAptidaoCardiorespiratoria( 1 );
                } else if ( aptCardio >= 41 && aptCardio <= 44 ) {
                    this.setAptidaoCardiorespiratoria( 5 );
                } else if ( aptCardio > 44 ) {
                    this.setAptidaoCardiorespiratoria( 2 );
                }
            } else if ( idade >= 40 && idade <= 44 ) {
                if ( aptCardio < 22 ) {
                    this.setAptidaoCardiorespiratoria( 4 );
                } else if ( aptCardio >= 22 && aptCardio <= 25 ) {
                    this.setAptidaoCardiorespiratoria( 0 );
                } else if ( aptCardio >= 26 && aptCardio <= 29 ) {
                    this.setAptidaoCardiorespiratoria( 6 );
                } else if ( aptCardio >= 30 && aptCardio <= 33 ) {
                    this.setAptidaoCardiorespiratoria( 3 );
                } else if ( aptCardio >= 34 && aptCardio <= 37 ) {
                    this.setAptidaoCardiorespiratoria( 1 );
                } else if ( aptCardio >= 38 && aptCardio <= 41 ) {
                    this.setAptidaoCardiorespiratoria( 5 );
                } else if ( aptCardio > 41 ) {
                    this.setAptidaoCardiorespiratoria( 2 );
                }
            } else if ( idade >= 45 && idade <= 49 ) {
                if ( aptCardio < 21 ) {
                    this.setAptidaoCardiorespiratoria( 4 );
                } else if ( aptCardio >= 21 && aptCardio <= 23 ) {
                    this.setAptidaoCardiorespiratoria( 0 );
                } else if ( aptCardio >= 24 && aptCardio <= 27 ) {
                    this.setAptidaoCardiorespiratoria( 6 );
                } else if ( aptCardio >= 28 && aptCardio <= 31 ) {
                    this.setAptidaoCardiorespiratoria( 3 );
                } else if ( aptCardio >= 32 && aptCardio <= 35 ) {
                    this.setAptidaoCardiorespiratoria( 1 );
                } else if ( aptCardio >= 36 && aptCardio <= 38 ) {
                    this.setAptidaoCardiorespiratoria( 5 );
                } else if ( aptCardio > 38 ) {
                    this.setAptidaoCardiorespiratoria( 2 );
                }
            } else if ( idade >= 50 && idade <= 54 ) {
                if ( aptCardio < 19 ) {
                    this.setAptidaoCardiorespiratoria( 4 );
                } else if ( aptCardio >= 19 && aptCardio <= 22 ) {
                    this.setAptidaoCardiorespiratoria( 0 );
                } else if ( aptCardio >= 23 && aptCardio <= 25 ) {
                    this.setAptidaoCardiorespiratoria( 6 );
                } else if ( aptCardio >= 26 && aptCardio <= 29 ) {
                    this.setAptidaoCardiorespiratoria( 3 );
                } else if ( aptCardio >= 30 && aptCardio <= 32 ) {
                    this.setAptidaoCardiorespiratoria( 1 );
                } else if ( aptCardio >= 33 && aptCardio <= 36 ) {
                    this.setAptidaoCardiorespiratoria( 5 );
                } else if ( aptCardio > 36 ) {
                    this.setAptidaoCardiorespiratoria( 2 );
                }
            } else if ( idade >= 55 && idade <= 59 ) {
                if ( aptCardio < 18 ) {
                    this.setAptidaoCardiorespiratoria( 4 );
                } else if ( aptCardio >= 18 && aptCardio <= 20 ) {
                    this.setAptidaoCardiorespiratoria( 0 );
                } else if ( aptCardio >= 21 && aptCardio <= 23 ) {
                    this.setAptidaoCardiorespiratoria( 6 );
                } else if ( aptCardio >= 24 && aptCardio <= 27 ) {
                    this.setAptidaoCardiorespiratoria( 3 );
                } else if ( aptCardio >= 28 && aptCardio <= 30 ) {
                    this.setAptidaoCardiorespiratoria( 1 );
                } else if ( aptCardio >= 31 && aptCardio <= 33 ) {
                    this.setAptidaoCardiorespiratoria( 5 );
                } else if ( aptCardio > 33 ) {
                    this.setAptidaoCardiorespiratoria( 2 );
                }
            } else if ( idade >= 60 ) {
                if ( aptCardio < 16 ) {
                    this.setAptidaoCardiorespiratoria( 4 );
                } else if ( aptCardio >= 16 && aptCardio <= 18 ) {
                    this.setAptidaoCardiorespiratoria( 0 );
                } else if ( aptCardio >= 19 && aptCardio <= 21 ) {
                    this.setAptidaoCardiorespiratoria( 6 );
                } else if ( aptCardio >= 22 && aptCardio <= 24 ) {
                    this.setAptidaoCardiorespiratoria( 3 );
                } else if ( aptCardio >= 25 && aptCardio <= 27 ) {
                    this.setAptidaoCardiorespiratoria( 1 );
                } else if ( aptCardio >= 28 && aptCardio <= 30 ) {
                    this.setAptidaoCardiorespiratoria( 5 );
                } else if ( aptCardio > 30 ) {
                    this.setAptidaoCardiorespiratoria( 2 );
                }
            }
        }
    }

    changeForcaAbdominalValor() {
        let idade = this.atendimento.getFilaEsperaOcupacional().getEmpregado().getPessoa().getIdade();
        let forcAbdom = Number( this.atendimento.getAvaliacaoFisica().getForcaAbdominalValor().toString().replace( ",", "." ) );
        if ( this.atendimento.getFilaEsperaOcupacional().getEmpregado().getPessoa().getSexo() == "MASCULINO" ) {
            if ( idade >= 15 && idade <= 19 ) {
                if ( forcAbdom >= 48 ) {
                    this.setForcaAbdominal( 1 );
                } else if ( forcAbdom >= 42 && forcAbdom <= 47 ) {
                    this.setForcaAbdominal( 0 );
                } else if ( forcAbdom >= 38 && forcAbdom <= 41 ) {
                    this.setForcaAbdominal( 3 );
                } else if ( forcAbdom >= 33 && forcAbdom <= 37 ) {
                    this.setForcaAbdominal( 4 );
                } else if ( forcAbdom <= 32 ) {
                    this.setForcaAbdominal( 2 );
                }
            } else if ( idade >= 20 && idade <= 29 ) {
                if ( forcAbdom >= 43 ) {
                    this.setForcaAbdominal( 1 );
                } else if ( forcAbdom >= 37 && forcAbdom <= 42 ) {
                    this.setForcaAbdominal( 0 );
                } else if ( forcAbdom >= 33 && forcAbdom <= 36 ) {
                    this.setForcaAbdominal( 3 );
                } else if ( forcAbdom >= 29 && forcAbdom <= 32 ) {
                    this.setForcaAbdominal( 4 );
                } else if ( forcAbdom <= 28 ) {
                    this.setForcaAbdominal( 2 );
                }
            } else if ( idade >= 30 && idade <= 39 ) {
                if ( forcAbdom >= 36 ) {
                    this.setForcaAbdominal( 1 );
                } else if ( forcAbdom >= 31 && forcAbdom <= 35 ) {
                    this.setForcaAbdominal( 0 );
                } else if ( forcAbdom >= 27 && forcAbdom <= 30 ) {
                    this.setForcaAbdominal( 3 );
                } else if ( forcAbdom >= 22 && forcAbdom <= 26 ) {
                    this.setForcaAbdominal( 4 );
                } else if ( forcAbdom <= 21 ) {
                    this.setForcaAbdominal( 2 );
                }
            } else if ( idade >= 40 && idade <= 49 ) {
                if ( forcAbdom >= 31 ) {
                    this.setForcaAbdominal( 1 );
                } else if ( forcAbdom >= 26 && forcAbdom <= 30 ) {
                    this.setForcaAbdominal( 0 );
                } else if ( forcAbdom >= 22 && forcAbdom <= 25 ) {
                    this.setForcaAbdominal( 3 );
                } else if ( forcAbdom >= 17 && forcAbdom <= 21 ) {
                    this.setForcaAbdominal( 4 );
                } else if ( forcAbdom <= 16 ) {
                    this.setForcaAbdominal( 2 );
                }
            } else if ( idade >= 50 && idade <= 59 ) {
                if ( forcAbdom >= 26 ) {
                    this.setForcaAbdominal( 1 );
                } else if ( forcAbdom >= 22 && forcAbdom <= 25 ) {
                    this.setForcaAbdominal( 0 );
                } else if ( forcAbdom >= 18 && forcAbdom <= 21 ) {
                    this.setForcaAbdominal( 3 );
                } else if ( forcAbdom >= 13 && forcAbdom <= 17 ) {
                    this.setForcaAbdominal( 4 );
                } else if ( forcAbdom <= 12 ) {
                    this.setForcaAbdominal( 2 );
                }
            } else if ( idade >= 60 ) {
                if ( forcAbdom >= 23 ) {
                    this.setForcaAbdominal( 1 );
                } else if ( forcAbdom >= 17 && forcAbdom <= 22 ) {
                    this.setForcaAbdominal( 0 );
                } else if ( forcAbdom >= 12 && forcAbdom <= 16 ) {
                    this.setForcaAbdominal( 3 );
                } else if ( forcAbdom >= 7 && forcAbdom <= 11 ) {
                    this.setForcaAbdominal( 4 );
                } else if ( forcAbdom <= 6 ) {
                    this.setForcaAbdominal( 2 );
                }
            }
        } else {
            if ( idade >= 15 && idade <= 19 ) {
                if ( forcAbdom >= 42 ) {
                    this.setForcaAbdominal( 1 );
                } else if ( forcAbdom >= 36 && forcAbdom <= 41 ) {
                    this.setForcaAbdominal( 0 );
                } else if ( forcAbdom >= 32 && forcAbdom <= 35 ) {
                    this.setForcaAbdominal( 3 );
                } else if ( forcAbdom >= 27 && forcAbdom <= 31 ) {
                    this.setForcaAbdominal( 4 );
                } else if ( forcAbdom <= 26 ) {
                    this.setForcaAbdominal( 2 );
                }
            } else if ( idade >= 20 && idade <= 29 ) {
                if ( forcAbdom >= 36 ) {
                    this.setForcaAbdominal( 1 );
                } else if ( forcAbdom >= 31 && forcAbdom <= 35 ) {
                    this.setForcaAbdominal( 0 );
                } else if ( forcAbdom >= 25 && forcAbdom <= 30 ) {
                    this.setForcaAbdominal( 3 );
                } else if ( forcAbdom >= 21 && forcAbdom <= 24 ) {
                    this.setForcaAbdominal( 4 );
                } else if ( forcAbdom <= 20 ) {
                    this.setForcaAbdominal( 2 );
                }
            } else if ( idade >= 30 && idade <= 39 ) {
                if ( forcAbdom >= 29 ) {
                    this.setForcaAbdominal( 1 );
                } else if ( forcAbdom >= 24 && forcAbdom <= 28 ) {
                    this.setForcaAbdominal( 0 );
                } else if ( forcAbdom >= 20 && forcAbdom <= 23 ) {
                    this.setForcaAbdominal( 3 );
                } else if ( forcAbdom >= 15 && forcAbdom <= 19 ) {
                    this.setForcaAbdominal( 4 );
                } else if ( forcAbdom <= 14 ) {
                    this.setForcaAbdominal( 2 );
                }
            } else if ( idade >= 40 && idade <= 49 ) {
                if ( forcAbdom >= 25 ) {
                    this.setForcaAbdominal( 1 );
                } else if ( forcAbdom >= 20 && forcAbdom <= 24 ) {
                    this.setForcaAbdominal( 0 );
                } else if ( forcAbdom >= 15 && forcAbdom <= 19 ) {
                    this.setForcaAbdominal( 3 );
                } else if ( forcAbdom >= 7 && forcAbdom <= 14 ) {
                    this.setForcaAbdominal( 4 );
                } else if ( forcAbdom <= 6 ) {
                    this.setForcaAbdominal( 2 );
                }
            } else if ( idade >= 50 && idade <= 59 ) {
                if ( forcAbdom >= 19 ) {
                    this.setForcaAbdominal( 1 );
                } else if ( forcAbdom >= 12 && forcAbdom <= 18 ) {
                    this.setForcaAbdominal( 0 );
                } else if ( forcAbdom >= 5 && forcAbdom <= 11 ) {
                    this.setForcaAbdominal( 3 );
                } else if ( forcAbdom >= 3 && forcAbdom <= 4 ) {
                    this.setForcaAbdominal( 4 );
                } else if ( forcAbdom <= 2 ) {
                    this.setForcaAbdominal( 2 );
                }
            } else if ( idade >= 60 ) {
                if ( forcAbdom >= 16 ) {
                    this.setForcaAbdominal( 1 );
                } else if ( forcAbdom >= 12 && forcAbdom <= 15 ) {
                    this.setForcaAbdominal( 0 );
                } else if ( forcAbdom >= 4 && forcAbdom <= 11 ) {
                    this.setForcaAbdominal( 3 );
                } else if ( forcAbdom >= 2 && forcAbdom <= 3 ) {
                    this.setForcaAbdominal( 4 );
                } else if ( forcAbdom <= 1 ) {
                    this.setForcaAbdominal( 2 );
                }
            }
        }
        
    }

    changeFlexibilidadeValor() {
        let idade = this.atendimento.getFilaEsperaOcupacional().getEmpregado().getPessoa().getIdade();
        let flex = Number( this.atendimento.getAvaliacaoFisica().getFlexibilidadeValor().toString().replace( ",", "." ) );
        if ( this.atendimento.getFilaEsperaOcupacional().getEmpregado().getPessoa().getSexo() == "MASCULINO" ) {
            if ( idade >= 15 && idade <= 19 ) {
                if ( flex >= 39 ) {
                    this.setFlexibilidade( 2 );
                } else if ( flex >= 34 && flex <= 38 ) {
                    this.setFlexibilidade( 1 );
                } else if ( flex >= 29 && flex <= 33 ) {
                    this.setFlexibilidade( 3 );
                } else if ( flex >= 24 && flex <= 28 ) {
                    this.setFlexibilidade( 0 );
                } else if ( flex <= 23 ) {
                    this.setFlexibilidade( 4 );
                }
            } else if ( idade >= 20 && idade <= 29 ) {
                if ( flex >= 40 ) {
                    this.setFlexibilidade( 2 );
                } else if ( flex >= 34 && flex <= 39 ) {
                    this.setFlexibilidade( 1 );
                } else if ( flex >= 30 && flex <= 33 ) {
                    this.setFlexibilidade( 3 );
                } else if ( flex >= 25 && flex <= 29 ) {
                    this.setFlexibilidade( 0 );
                } else if ( flex <= 24 ) {
                    this.setFlexibilidade( 4 );
                }
            } else if ( idade >= 30 && idade <= 39 ) {
                if ( flex >= 38 ) {
                    this.setFlexibilidade( 2 );
                } else if ( flex >= 33 && flex <= 37 ) {
                    this.setFlexibilidade( 1 );
                } else if ( flex >= 28 && flex <= 32 ) {
                    this.setFlexibilidade( 3 );
                } else if ( flex >= 23 && flex <= 27 ) {
                    this.setFlexibilidade( 0 );
                } else if ( flex <= 22 ) {
                    this.setFlexibilidade( 4 );
                }
            } else if ( idade >= 40 && idade <= 49 ) {
                if ( flex >= 35 ) {
                    this.setFlexibilidade( 2 );
                } else if ( flex >= 29 && flex <= 34 ) {
                    this.setFlexibilidade( 1 );
                } else if ( flex >= 24 && flex <= 28 ) {
                    this.setFlexibilidade( 3 );
                } else if ( flex >= 18 && flex <= 23 ) {
                    this.setFlexibilidade( 0 );
                } else if ( flex <= 17 ) {
                    this.setFlexibilidade( 4 );
                }
            } else if ( idade >= 50 && idade <= 59 ) {
                if ( flex >= 35 ) {
                    this.setFlexibilidade( 2 );
                } else if ( flex >= 28 && flex <= 34 ) {
                    this.setFlexibilidade( 1 );
                } else if ( flex >= 24 && flex <= 27 ) {
                    this.setFlexibilidade( 3 );
                } else if ( flex >= 16 && flex <= 23 ) {
                    this.setFlexibilidade( 0 );
                } else if ( flex <= 15 ) {
                    this.setFlexibilidade( 4 );
                }
            } else if ( idade >= 60 ) {
                if ( flex >= 33 ) {
                    this.setFlexibilidade( 2 );
                } else if ( flex >= 25 && flex <= 32 ) {
                    this.setFlexibilidade( 1 );
                } else if ( flex >= 20 && flex <= 24 ) {
                    this.setFlexibilidade( 3 );
                } else if ( flex >= 15 && flex <= 19 ) {
                    this.setFlexibilidade( 0 );
                } else if ( flex <= 14 ) {
                    this.setFlexibilidade( 4 );
                }
            }
        } else {
            if ( idade >= 15 && idade <= 19 ) {
                if ( flex >= 43 ) {
                    this.setFlexibilidade( 2 );
                } else if ( flex >= 38 && flex <= 42 ) {
                    this.setFlexibilidade( 1 );
                } else if ( flex >= 34 && flex <= 37 ) {
                    this.setFlexibilidade( 3 );
                } else if ( flex >= 29 && flex <= 33 ) {
                    this.setFlexibilidade( 0 );
                } else if ( flex <= 28 ) {
                    this.setFlexibilidade( 4 );
                }
            } else if ( idade >= 20 && idade <= 29 ) {
                if ( flex >= 41 ) {
                    this.setFlexibilidade( 2 );
                } else if ( flex >= 37 && flex <= 40 ) {
                    this.setFlexibilidade( 1 );
                } else if ( flex >= 33 && flex <= 36 ) {
                    this.setFlexibilidade( 3 );
                } else if ( flex >= 28 && flex <= 32 ) {
                    this.setFlexibilidade( 0 );
                } else if ( flex <= 27 ) {
                    this.setFlexibilidade( 4 );
                }
            } else if ( idade >= 30 && idade <= 39 ) {
                if ( flex >= 41 ) {
                    this.setFlexibilidade( 2 );
                } else if ( flex >= 36 && flex <= 40 ) {
                    this.setFlexibilidade( 1 );
                } else if ( flex >= 32 && flex <= 35 ) {
                    this.setFlexibilidade( 3 );
                } else if ( flex >= 27 && flex <= 31 ) {
                    this.setFlexibilidade( 0 );
                } else if ( flex <= 26 ) {
                    this.setFlexibilidade( 4 );
                }
            } else if ( idade >= 40 && idade <= 49 ) {
                if ( flex >= 38 ) {
                    this.setFlexibilidade( 2 );
                } else if ( flex >= 34 && flex <= 37 ) {
                    this.setFlexibilidade( 1 );
                } else if ( flex >= 30 && flex <= 33 ) {
                    this.setFlexibilidade( 3 );
                } else if ( flex >= 25 && flex <= 29 ) {
                    this.setFlexibilidade( 0 );
                } else if ( flex <= 24 ) {
                    this.setFlexibilidade( 4 );
                }
            } else if ( idade >= 50 && idade <= 59 ) {
                if ( flex >= 39 ) {
                    this.setFlexibilidade( 2 );
                } else if ( flex >= 33 && flex <= 38 ) {
                    this.setFlexibilidade( 1 );
                } else if ( flex >= 30 && flex <= 32 ) {
                    this.setFlexibilidade( 3 );
                } else if ( flex >= 25 && flex <= 29 ) {
                    this.setFlexibilidade( 0 );
                } else if ( flex <= 24 ) {
                    this.setFlexibilidade( 4 );
                }
            } else if ( idade >= 60 ) {
                if ( flex >= 35 ) {
                    this.setFlexibilidade( 2 );
                } else if ( flex >= 31 && flex <= 34 ) {
                    this.setFlexibilidade( 1 );
                } else if ( flex >= 27 && flex <= 30 ) {
                    this.setFlexibilidade( 3 );
                } else if ( flex >= 23 && flex <= 26 ) {
                    this.setFlexibilidade( 0 );
                } else if ( flex <= 22 ) {
                    this.setFlexibilidade( 4 );
                }
            }
        }
    }

    changeForcaPreensaoManualValor() {
        let idade = this.atendimento.getFilaEsperaOcupacional().getEmpregado().getPessoa().getIdade();
        let forcPreenMan = Number( this.atendimento.getAvaliacaoFisica().getForcaPreensaoManualValor().toString().replace( ",", "." ) );
        if ( this.atendimento.getFilaEsperaOcupacional().getEmpregado().getPessoa().getSexo() == "MASCULINO" ) {
            if ( forcPreenMan > 55 ) {
                this.setForcaPreensaoManual( 1 );
            } else if ( forcPreenMan >= 41 && forcPreenMan <= 55 ) {
                this.setForcaPreensaoManual( 0 );
            } else if ( forcPreenMan >= 30 && forcPreenMan <= 40 ) {
                this.setForcaPreensaoManual( 2 );
            } else if ( forcPreenMan >= 21 && forcPreenMan <= 29 ) {
                this.setForcaPreensaoManual( 3 );
            } else if ( forcPreenMan < 21 ) {
                this.setForcaPreensaoManual( 4 );
            }
        } else {
            if ( forcPreenMan > 39 ) {
                this.setForcaPreensaoManual( 1 );
            } else if ( forcPreenMan >= 29 && forcPreenMan <= 39 ) {
                this.setForcaPreensaoManual( 0 );
            } else if ( forcPreenMan >= 21 && forcPreenMan <= 28 ) {
                this.setForcaPreensaoManual( 2 );
            } else if ( forcPreenMan >= 11 && forcPreenMan <= 20 ) {
                this.setForcaPreensaoManual( 3 );
            } else if ( forcPreenMan <= 11 ) {
                this.setForcaPreensaoManual( 4 );
            }
        }
    }

    passStringByValue( s: string ) {
        let concat: string = "";
        for ( let i = 0; i < s.length - 1; i++ ) {
            concat += s.slice( i, i + 1 );
        }
        return concat;
    }

    setAptidaoCardiorespiratoria( i: number ) {
        this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas().find( r =>
            r.getPergunta().getGrupo().includes( "EXAME F" ) && r.getPergunta().getCodigo() == "0014" )
            .setConteudo( this.aptidaoCardiorrespiratorias[i] );
        this.atendimento.getAvaliacaoFisica().setAptidaoCardiorrespiratoriaClassificacao( this.aptidaoCardiorrespiratorias[i] );
        this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas().find(r => 
        r.getPergunta().getGrupo().includes("EXAME F") && r.getPergunta().getCodigo() == "0013")
            .setConteudo(this.atendimento.getAvaliacaoFisica().getAptidaoCardiorrespiratoriaValor().toString());
        if ( i == 4 || i == 0 ) {
            this.atendimento.getTriagens()[3].setIndice( 0 );
            this.selectTriagem( 3, 0 );
            this.testesFisicos[0] = 0;
        }
        else if ( i == 6 ) {
            this.atendimento.getTriagens()[3].setIndice( 1 );
            this.selectTriagem( 3, 1 );
            this.testesFisicos[0] = 1;
        }
        else if ( i == 3 ) {
            this.atendimento.getTriagens()[3].setIndice( 2 );
            this.selectTriagem( 3, 2 );
            this.testesFisicos[0] = 2;
        }
        else if ( i == 1 ) {
            this.atendimento.getTriagens()[3].setIndice( 3 );
            this.selectTriagem( 3, 3 );
            this.testesFisicos[0] = 3;
        }
        else if ( i == 5 || i == 2 ) {
            this.atendimento.getTriagens()[3].setIndice( 4 );
            this.selectTriagem( 3, 4 );
            this.testesFisicos[3] = 4;
        }
        this.setEstagioContemplacaoTriagem();
    }

    setForcaAbdominal( i: number ) {
        this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas().find( r =>
            r.getPergunta().getGrupo().includes( "EXAME F" ) && r.getPergunta().getCodigo() == "0016" )
            .setConteudo( this.forcaAbdominais[i] );
        this.atendimento.getAvaliacaoFisica().setForcaAbdominalClassificacao( this.forcaAbdominais[i] );
        switch ( i ) {
            case 2:
                this.atendimento.getTriagens()[4].setIndice( 0 );
                this.selectTriagem( 4, 0 );
                this.testesFisicos[1] = 0;
                break;
            case 4:
                this.atendimento.getTriagens()[4].setIndice( 1 );
                this.selectTriagem( 4, 1 );
                this.testesFisicos[1] = 1;
                break;
            case 3:
                this.atendimento.getTriagens()[4].setIndice( 2 );
                this.selectTriagem( 4, 2 );
                this.testesFisicos[1] = 2;
                break;
            case 0:
                this.atendimento.getTriagens()[4].setIndice( 3 );
                this.selectTriagem( 4, 3 );
                this.testesFisicos[1] = 3;
                break;
            case 1:
                this.atendimento.getTriagens()[4].setIndice( 4 );
                this.selectTriagem( 4, 4 );
                this.testesFisicos[1] = 4;
                break;
        }
        this.setEstagioContemplacaoTriagem();
    }

    setFlexibilidade( i: number ) {
        this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas().find( r =>
            r.getPergunta().getGrupo().includes( "EXAME F" ) && r.getPergunta().getCodigo() == "0015" )
            .setConteudo( this.flexibilidades[i] );
        this.atendimento.getAvaliacaoFisica().setFlexibilidadeClassificacao( this.flexibilidades[i] );
        switch ( i ) {
            case 4:
                this.atendimento.getTriagens()[5].setIndice( 0 );
                this.selectTriagem( 5, 0 );
                this.testesFisicos[2] = 0;
                break;
            case 0:
                this.atendimento.getTriagens()[5].setIndice( 1 );
                this.selectTriagem( 5, 1 );
                this.testesFisicos[2] = 1;
                break;
            case 3:
                this.atendimento.getTriagens()[5].setIndice( 2 );
                this.selectTriagem( 5, 2 );
                this.testesFisicos[2] = 2;
                break;
            case 1:
                this.atendimento.getTriagens()[5].setIndice( 3 );
                this.selectTriagem( 5, 3 );
                this.testesFisicos[2] = 3;
                break;
            case 2:
                this.atendimento.getTriagens()[5].setIndice( 4 );
                this.selectTriagem( 5, 4 );
                this.testesFisicos[2] = 4;
                break;
        }
        this.setEstagioContemplacaoTriagem();
    }

    setForcaPreensaoManual( i: number ) {
        this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas().find( r =>
            r.getPergunta().getGrupo().includes( "EXAME F" ) && r.getPergunta().getCodigo() == "0017" )
            .setConteudo( this.forcaPreensaoManuais[i] );
        this.atendimento.getAvaliacaoFisica().setForcaPreensaoManualClassificacao( this.forcaPreensaoManuais[i] );
        switch ( i ) {
            case 4:
                this.atendimento.getTriagens()[6].setIndice( 0 );
                this.selectTriagem( 6, 0 );
                this.testesFisicos[3] = 0;
                break;
            case 3:
                this.atendimento.getTriagens()[6].setIndice( 1 );
                this.selectTriagem( 6, 1 );
                this.testesFisicos[3] = 1;
                break;
            case 2:
                this.atendimento.getTriagens()[6].setIndice( 2 );
                this.selectTriagem( 6, 2 );
                this.testesFisicos[3] = 2;
                break;
            case 0:
                this.atendimento.getTriagens()[6].setIndice( 3 );
                this.selectTriagem( 6, 3 );
                this.testesFisicos[3] = 3;
                break;
            case 1:
                this.atendimento.getTriagens()[6].setIndice( 4 );
                this.selectTriagem( 6, 4 );
                this.testesFisicos[3] = 4;
                break;
        }
        this.setEstagioContemplacaoTriagem();
    }

    changeNivelAtividadeFisica() {
        let naf: number = 4;
        let sumDias: number = 0;
        let sumMinutos: number = 0;
        let verifyMuitoAtivo: boolean = false;
        let exit: boolean = false;
    
        if ( this.atendimento.getAvaliacaoFisica().getAvaliacaoFisicaAtividadeFisicas().filter(x=> x.getTipo() == "REALIZADA").length > 0 ) {
            naf = 1;
            
            this.atendimento.getAvaliacaoFisica().getAvaliacaoFisicaAtividadeFisicas().filter(x=> x.getTipo() == "REALIZADA").forEach( afaf => {
                if ( exit ) return;
                sumDias += this.getQtdDays( afaf );
                sumMinutos += afaf.getTotalMinuto();
                
                if ( sumDias >= 5 && sumMinutos >= 150 )
                    naf = this.setNaf(naf, 3);
                else if ( sumDias >= 5 || sumMinutos >= 150 )
                    naf = this.setNaf(naf, 0);
                if ( this.getQtdDays( afaf ) >= 3 && afaf.getMinuto() >= 20 )
                    if ( afaf.getClassificacao() == this.classificacoes[2] ) {
                        naf = this.setNaf(naf, 3);
                        verifyMuitoAtivo = true;
                    } else if ( afaf.getClassificacao() == this.classificacoes[1] || afaf.getClassificacao() == this.classificacoes[0] ) {
                        if ( this.getQtdDays( afaf ) >= 5 && afaf.getMinuto() >= 30 && verifyMuitoAtivo ) {
                            naf = this.setNaf(naf, 2);
                            exit = true;
                        }
                    }
                if ( !exit && this.getQtdDays( afaf ) >= 5 && afaf.getMinuto() >= 30 )
                    if ( afaf.getClassificacao() == this.classificacoes[1] || afaf.getClassificacao() == this.classificacoes[0] )
                        naf = this.setNaf(naf, 3);
                    else if ( afaf.getClassificacao() == this.classificacoes[2] ) {
                        naf = this.setNaf(naf, 2);
                        exit = true;
                    }
            } )
        }
        this.nivelAtividadeFisica.emit( this.nivelAtividadeFisicas[naf] );
    }
    
    setNaf(naf: number, num: number) {
        let grau = this.getGrauNaf(num);
        if ( this.getGrauNaf(naf) > grau )
            return naf;
        else return num;
    }
    
    getGrauNaf( num: number ) {
        switch( num ) {
            case 0:
                return 3;
            case 1:
                return 2;
            case 2:
                return 5;
            case 3:
                return 4;
            case 4:
                return 1;
        }
    }
    
    getQtdDays( afaf: AvaliacaoFisicaAtividadeFisica ) {
        let days: number = 0;
        if ( afaf.getDomingo() )
            days++;
        if ( afaf.getSegunda() )
            days++;
        if ( afaf.getTerca() )
            days++;
        if ( afaf.getQuarta() )
            days++;
        if ( afaf.getQuinta() )
            days++;
        if ( afaf.getSexta() )
            days++;
        if ( afaf.getSabado() )
            days++;
        return days;
    }
    
    changePreensaoArterialSistolica() {
        this.testesFisicos[4] = this.atendimento.getAvaliacaoFisica().getPressaoArterialSistolica();
        this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas().find( r =>
            r.getPergunta().getGrupo().includes( "EXAME F" ) && r.getPergunta().getCodigo() == "0005" )
            .setConteudo( this.atendimento.getAvaliacaoFisica().getPressaoArterialSistolica().toString() );
    }
    
    changePreensaoArterialDiastolica() {
        this.testesFisicos[5] = this.atendimento.getAvaliacaoFisica().getPressaoArterialSistolica();
        this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas().find( r =>
            r.getPergunta().getGrupo().includes( "EXAME F" ) && r.getPergunta().getCodigo() == "0006" )
            .setConteudo( this.atendimento.getAvaliacaoFisica().getPressaoArterialDiastolica().toString() );
    }
    
    changeFrequenciaCardiaca() {
        this.testesFisicos[6] = this.atendimento.getAvaliacaoFisica().getPressaoArterialSistolica();
        this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas().find( r =>
            r.getPergunta().getGrupo().includes( "EXAME F" ) && r.getPergunta().getCodigo() == "0008" )
            .setConteudo( this.atendimento.getAvaliacaoFisica().getFrequenciaCardiaca().toString() );
    }
    
    selectTriagem( indexTriagem, indice ) {
        let i: string = "indice" + indice + "_" + indexTriagem;
        let p: string = "";

        for ( let ii = 0; ii <= 4; ii++ ) {
            p = "indice" + ii + "_" + indexTriagem;
            $( "td[title=" + p + "]" ).css( "backgroundColor", "" );
        }

        $( "td[title=" + i + "]" ).css( "backgroundColor", "#D4D4D4" );
    }
    
    downloadRelatorioProaf() {        
        this.service.getRelatorioProaf( new AtendimentoBuilder().clone( this.atendimento ))
            .then(res => {
                this.baixar( res, this.atendimento.getFilaEsperaOcupacional().getEmpregado().getMatricula().trim()+".pdf" );
            })
            .catch(error => {
                console.log(error);
            })
    }
    
    baixar( data, fileName ) {
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
    
    getRespostaAtividadesFisica() {
        let resposta: RespostaFichaColeta   = this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas().find(rfc => 
            rfc.getPergunta().getGrupo() == "ANAMNESE" && rfc.getPergunta().getCodigo() == "0020" 
        );
        return resposta != undefined ? resposta : undefined;  
    }
    
    statusDiferenteDisponivel(){
        this.verifyStatusAtendimento = true;
        this.disabledAvaliacao = (this.atendimento.getFilaAtendimentoOcupacional().getStatus() != "EM ATENDIMENTO");    
    }
    
    isDisabledAvaliacao(resposta: RespostaFichaColeta) {
        if((!this.verifyStatusAtendimento)){
            this.statusDiferenteDisponivel();
        }
        return this.disabledAvaliacao;
    }
    
}