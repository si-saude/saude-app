import { Component, OnInit, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MyDatePickerModule } from 'mydatepicker';
import { MaterializeAction } from "angular2-materialize";
import 'rxjs/Rx';

import { Profissiograma } from './../../../model/profissiograma';
import { ProfissiogramaBuilder } from './../../profissiograma/profissiograma.builder';
import { Convocacao } from './../../../model/convocacao';
import { Empregado } from './../../../model/empregado';
import { Exame } from './../../../model/exame';
import { ExameBuilder } from './../../exame/exame.builder';
import { EmpregadoBuilder } from './../../empregado/empregado.builder';
import { ConvocacaoBuilder } from './../convocacao.builder';
import { ConvocacaoService } from './../convocacao.service';
import { EmpregadoService } from './../../empregado/empregado.service';
import { GerenciaConvocacao } from './../../../model/gerencia-convocacao';
import { EmpregadoConvocacao } from './../../../model/empregado-convocacao';
import { EmpregadoConvocacaoBuilder } from './../../empregado-convocacao/empregado-convocacao.builder';
import { EmpregadoConvocacaoExame } from './../../../model/empregado-convocacao-exame';
import { EmpregadoConvocacaoExameBuilder } from './../../empregado-convocacao-exame/empregado-convocacao-exame.builder';
import { GerenciaConvocacaoBuilder } from './../../gerencia-convocacao/gerencia-convocacao.builder';
import { GlobalVariable } from './../../../global';
import { GenericFormComponent } from './../../../generics/generic.form.component';

@Component( {
    selector: 'app-convocacao-form-detail',
    templateUrl: './convocacao-form-detail.html',
    styleUrls: ['./convocacao-form.css', './../../../../assets/css/form-component.css']
} )
export class ConvocacaoFormDetailComponent extends GenericFormComponent implements OnInit {
    tipos: Array<string>;
    convocacao: Convocacao;
    empregados: Array<Empregado>;
    profissiogramas: Array<Profissiograma>;
    exames: Array<Exame>;
    gerenciaConvocacoes: Array<GerenciaConvocacao>;
    empregadoConvocacoes: Array<EmpregadoConvocacao>;
    autocompleteGerenciaConvocacoes;
    autocompleteEmpregado;

    selectedGerenciaConvocacao: boolean;
    selectedGerenciaConvocacaoCC: Array<string>;

    checkBoxSelecteds: Array<boolean>;
    filterGerenciaByCodigoCompleto: any;
    filterChaveEmpregado: any;
    filterNomeEmpregado: any;
    filterGerenciaEmpregado: any;
    empregadoToAdd: Empregado;
    empregadoDetail: EmpregadoConvocacao;
    checkEmpregados: boolean;
    pendenteRelatorio: boolean;
    conformList: Array<boolean>;

    selectedGC;
    existProfissiograma;

    modalEditEmpregado;
    modalConfirmProfissiograma;

    dataGerenciaConvocacaoInicio: Array<any>;
    dataGerenciaConvocacaoFim: Array<any>;

    constructor( private route: ActivatedRoute,
        private convocacaoService: ConvocacaoService,
        private empregadoService: EmpregadoService ) {
        super( convocacaoService );

        this.tipos = new Array<string>();
        this.goTo = "convocacao";
        this.convocacao = new ConvocacaoBuilder().initialize( this.convocacao );
        this.empregados = new Array<Empregado>();
        this.empregadoToAdd = new EmpregadoBuilder().initialize( this.empregadoToAdd );
        this.empregadoDetail = new EmpregadoConvocacaoBuilder().initialize( this.empregadoDetail );
        this.profissiogramas = new ProfissiogramaBuilder().initializeList( Array<Profissiograma>() );
        this.gerenciaConvocacoes = new GerenciaConvocacaoBuilder().initializeList( Array<GerenciaConvocacao>() );
        this.empregadoConvocacoes = new EmpregadoConvocacaoBuilder().initializeList( Array<EmpregadoConvocacao>() );

        this.selectedGerenciaConvocacao = false;
        this.selectedGerenciaConvocacaoCC = new Array<string>();

        this.checkBoxSelecteds = new Array<boolean>();
        this.dataGerenciaConvocacaoInicio = new Array<any>();
        this.dataGerenciaConvocacaoFim = new Array<any>();
        this.autocompleteGerenciaConvocacoes = [];
        this.autocompleteEmpregado = [];
        this.selectedGC = null;
        this.existProfissiograma = false;
        this.modalEditEmpregado = new EventEmitter<string | MaterializeAction>();
        this.modalConfirmProfissiograma = new EventEmitter<string | MaterializeAction>();
        this.checkEmpregados = false;
        this.conformList = new Array<boolean>();
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                let id = params['id'];
                this.showPreload = true;

                this.convocacaoService.get( id )
                    .then( res => {
                        this.showPreload = false;
                        this.existProfissiograma = true;
                        this.convocacao = new ConvocacaoBuilder().clone( res.json() );
                        this.gerenciaConvocacoes = this.convocacao.getGerenciaConvocacoes();
                        this.empregadoConvocacoes = this.convocacao.getEmpregadoConvocacoes();
                        this.selectedsGerenciaConvocacoes();
                        this.parseAndSetDates();
                    } )
                    .catch( error => {
                        this.catchConfiguration( error );
                    } )
            } );

        this.convocacaoService.getTipos()
            .then( res => {
                this.tipos = Object.keys( res.json() );
            } )
            .catch( error => {
                console.log( error );
            } )

        this.convocacaoService.getProfissiogramas()
            .then( res => {
                this.profissiogramas = new ProfissiogramaBuilder().cloneList( res.json() );
            } )
            .catch( error => {
                console.log( error );
            } )

        this.convocacaoService.getExames()
            .then( res => {
                this.exames = new ExameBuilder().cloneList( res.json() );
            } )
            .catch( error => {
                console.log( error );
            } )
    }

    filterGerenciaConvocacoes( evento: string ) {
        if ( this.convocacao.getGerenciaConvocacoes().length > 0 ) {
            this.gerenciaConvocacoes = this.convocacao.getGerenciaConvocacoes().filter( gC => {
                evento = evento.toLowerCase();
                let lowerCaseCC = gC.getGerencia().getCodigoCompleto().toLowerCase();
                return lowerCaseCC.includes( evento );
            } )
        }
    }

    selectGerenciaConvocacao( index: number, gerenciaConvocacao: GerenciaConvocacao ) {
        this.selectedGC = this.gerenciaConvocacoes[index];
        setTimeout(() => {
            if ( this.gerenciaConvocacoes[index].getSelecionado() == true ) {

                let sG = this.selectedGerenciaConvocacaoCC.find( s => s == gerenciaConvocacao.getGerencia().getCodigoCompleto() )

                if ( sG == undefined ) {
                    this.selectedGerenciaConvocacaoCC.push( gerenciaConvocacao.getGerencia().getCodigoCompleto() );
                    this.dataGerenciaConvocacaoInicio[gerenciaConvocacao.getGerencia().getCodigoCompleto()] = gerenciaConvocacao.getInicio();
                    this.dataGerenciaConvocacaoFim[gerenciaConvocacao.getGerencia().getCodigoCompleto()] = gerenciaConvocacao.getFim();
                }

                let sendConvocacao = new ConvocacaoBuilder().initialize( new Convocacao() );
                sendConvocacao.setProfissiograma( this.convocacao.getProfissiograma() );
                sendConvocacao.getGerenciaConvocacoes().push(
                    new GerenciaConvocacaoBuilder().clone( this.gerenciaConvocacoes[index] ) );
                sendConvocacao.setId( this.convocacao.getId() );

                this.convocacaoService.getEmpregadosByGerencia( sendConvocacao )
                    .then( res => {
                        let eCs = new EmpregadoConvocacaoBuilder().cloneList( res.json().empregadoConvocacoes );
                        this.empregadoConvocacoes = this.empregadoConvocacoes.concat( eCs );
                        this.convocacao.setEmpregadoConvocacoes( this.empregadoConvocacoes );
                    } )
                    .catch( error => {
                        console.log( error );
                    } )
            } else {
                let i: number = this.selectedGerenciaConvocacaoCC.findIndex( sG => sG == gerenciaConvocacao.getGerencia().getCodigoCompleto() );
                if ( i >= 0 )
                    this.selectedGerenciaConvocacaoCC.splice( i, 1 );

                let empregadoConvocacoes: Array<EmpregadoConvocacao> = this.empregadoConvocacoes.filter( eC => {
                    return eC.getEmpregado().getGerencia().getId() == this.gerenciaConvocacoes[index].getGerencia().getId();
                } );

                empregadoConvocacoes.forEach( eC1 => {
                    this.empregadoConvocacoes.splice( this.empregadoConvocacoes.indexOf( eC1 ), 1 );
                } )
            }
        }, 50 );
    }

    choisedGerenciaConvocacao( gC: number, gerenciaConvocacao: GerenciaConvocacao ) {
        if ( this.gerenciaConvocacoes[gC] === this.selectedGC ) {
            return "active";
        } else return "";
    }

    choiseGerenciaConvocacao( gC: number, gerenciaConvocacao: GerenciaConvocacao ) {
        this.selectedGC = this.gerenciaConvocacoes[gC];
    }

    getEmpregado( evento ) {
        if ( this.empregadoToAdd !== undefined ) {

            let empregado = this.empregados.find( e => {
                if ( e.getChave() == undefined ||
                    e.getChave() == null ||
                    e.getChave() == '' ) {
                    return "- " + e.getPessoa().getNome() == this.empregadoToAdd.getPessoa().getNome();
                } else {
                    return e.getChave() + " - " + e.getPessoa().getNome() ==
                        this.empregadoToAdd.getPessoa().getNome();
                }
            } );

            if ( empregado !== undefined ) {
                this.empregadoToAdd = empregado;
            } else this.empregadoToAdd = new EmpregadoBuilder().initialize( this.empregadoToAdd );
        } else this.empregadoToAdd = new EmpregadoBuilder().initialize( this.empregadoToAdd );
    }

    private oldChaveEmpregado: string;
    selectEmpregadoByChave( evento ) {
        if ( this.oldChaveEmpregado != evento ) {
            this.oldChaveEmpregado = evento;

            this.empregadoService.getEmpregadoByChave( evento )
                .then( res => {
                    this.empregados = new EmpregadoBuilder().cloneList( res.json() );
                    this.autocompleteEmpregado = [this.buildAutocompleteEmpregado( this.empregados )];
                } )
                .catch( error => {
                    console.log( error );
                } )

        }
    }

    private oldNomeEmpregado: string;
    selectEmpregado( evento: string ) {
        if ( this.oldNomeEmpregado != evento ) {
            this.oldNomeEmpregado = evento;
            if ( evento.length > 3 ) {
                this.empregadoService.getEmpregadoByName( evento )
                    .then( res => {
                        this.empregados = new EmpregadoBuilder().cloneList( res.json() );
                        this.autocompleteEmpregado = [this.buildAutocompleteEmpregado( this.empregados )];
                    } )
                    .catch( error => {
                        console.log( error );
                    } )
            }
        }
    }

    filterEmpregadoByChave( evento ) {
        if ( this.convocacao.getEmpregadoConvocacoes().length > 0 ) {
            this.empregadoConvocacoes = this.convocacao.getEmpregadoConvocacoes().filter( eC => {
                evento = evento.toLowerCase();
                let lowerCaseC = eC.getEmpregado().getChave().toLowerCase();
                return lowerCaseC.includes( evento );
            } )
        }
    }

    filterEmpregadoByNome( evento ) {
        if ( this.convocacao.getEmpregadoConvocacoes().length > 0 ) {
            this.empregadoConvocacoes = this.convocacao.getEmpregadoConvocacoes().filter( eC => {
                evento = evento.toLowerCase();
                let lowerCaseN = eC.getEmpregado().getPessoa().getNome().toLowerCase();
                return lowerCaseN.includes( evento );
            } )
        }
    }

    filterEmpregadoByGerencia( evento ) {
        if ( this.convocacao.getEmpregadoConvocacoes().length > 0 ) {
            this.empregadoConvocacoes = this.convocacao.getEmpregadoConvocacoes().filter( eC => {
                evento = evento.toLowerCase();
                let lowerCaseCC = eC.getEmpregado().getGerencia().getCodigoCompleto().toLowerCase();
                return lowerCaseCC.includes( evento );
            } )
        }
    }

    parseAndSetDates() {
        for ( let i = 0; i < this.gerenciaConvocacoes.length; i++ ) {
            let cC = this.gerenciaConvocacoes[i].getGerencia().getCodigoCompleto();

            if ( this.gerenciaConvocacoes[i].getSelecionado() == true ) {
                this.dataGerenciaConvocacaoInicio[cC] =
                    this.parseDataToObjectDatePicker(
                        this.gerenciaConvocacoes[i].getInicio() );

                this.dataGerenciaConvocacaoFim[cC] =
                    this.parseDataToObjectDatePicker(
                        this.gerenciaConvocacoes[i].getFim() );
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

    selectedsGerenciaConvocacoes() {
        this.gerenciaConvocacoes.forEach(gC => {
            if ( gC.getSelecionado() == true ) {
                this.selectedGerenciaConvocacaoCC.push(gC.getGerencia().getCodigoCompleto());
            }
        })
    }
}






