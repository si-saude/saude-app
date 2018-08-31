import { Component, OnInit, ViewChild, ElementRef,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

import { GlobalVariable } from './../../../global';
import { Empregado } from './../../../model/empregado';
import { EmpregadoService } from './../empregado.service';
import { EmpregadoFilter } from './../empregado.filter';
import { Enfase } from './../../../model/enfase';
import { EnfaseBuilder } from './../../enfase/enfase.builder';
import { Cargo } from './../../../model/cargo';
import { Funcao } from './../../../model/funcao';
import { Regime } from './../../../model/regime';
import { Gerencia } from './../../../model/gerencia';
import { Base } from './../../../model/base';
import { Ghe } from './../../../model/ghe';
import { GheBuilder } from './../../ghe/ghe.builder';
import { Ghee } from './../../../model/ghee';
import { IndicadorRiscoAcidenteInstalacao } from './../../../model/indicador-risco-acidente-instalacao';
import { GheeBuilder } from './../../ghee/ghee.builder'; 
import { Cidade } from './../../../model/cidade';
import { Instalacao } from './../../../model/instalacao';
import { InstalacaoBuilder } from './../../instalacao/instalacao.builder';
import { Telefone } from './../../../model/telefone';
import { Vacina } from './../../../model/vacina';
import { EmpregadoVacina } from './../../../model/empregado-vacina';
import { GrupoMonitoramento } from './../../../model/grupo-monitoramento';
import { HistoricoGrupoMonitoramento } from './../../../model/historico-grupo-monitoramento';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { EmpregadoBuilder } from './../empregado.builder';
import { IndicadorRiscoAcidenteInstalacaoBuilder } from './../../indicador-risco-acidente-instalacao/indicador-risco-acidente-instalacao.builder';
import { GrupoMonitoramentoBuilder } from './../../grupo-monitoramento/grupo-monitoramento.builder';
import { HistoricoGrupoMonitoramentoBuilder } from './../../historico-grupo-monitoramento/historico-grupo-monitoramento.builder';
import { InstalacaoNomeAutocomplete } from './../../instalacao/instalacao-nome.autocomplete';
import { MaterializeAction } from "angular2-materialize";
import { GerenciaBuilder } from './../../gerencia/gerencia.builder';

@Component( {
    selector: 'app-empregado-form',
    templateUrl: './empregado-form.html',
    styleUrls: ['./empregado-form.css', './../../../../assets/css/form-component.css']
} )
export class EmpregadoFormComponent extends GenericFormComponent implements OnInit {
    @ViewChild( 'assinatura' ) inputElAssinatura: ElementRef;
    @ViewChild( 'foto' ) inputElFoto: ElementRef;
    assinaturaSrcStyle: any;
    fotoSrcStyle: any;

    cpf: string;
    empregado: Empregado;
    statuses: Array<string>;
    sexos: Array<string>;
    estadosCivies: Array<string>;
    escolaridades: Array<string>;
    vinculos: Array<string>;
    cargos: Array<Cargo>;
    funcoes: Array<Funcao>;
    regimes: Array<Regime>;
    gerencias: Array<Gerencia>;
    bases: Array<Base>;
    ghes: Array<Ghe>;
    ghees: Array<Ghee>;
    cidades: Array<Cidade>;
    vacinas: Array<Vacina>;
    instalacoes: Array<Instalacao>;
    enfases: Array<Enfase>;
    instalacoesSelecteds: Array<Instalacao>;
    gruposMonitoramento: Array<GrupoMonitoramento>;
    historicoGrupoMonitoramentos: Array<HistoricoGrupoMonitoramento>;
    fotoSrc: string;
    assinaturaSrc: any;
    instalacao: IndicadorRiscoAcidenteInstalacao; 
    gerenciaAxu;
    
    empregadoFilter: EmpregadoFilter = new EmpregadoFilter();
    
    autoCompleteInstalacao: InstalacaoNomeAutocomplete;
    
    constructor( private route: ActivatedRoute,
        private empregadoService: EmpregadoService,
        router: Router ) {
        super( empregadoService, router );
        this.goTo = "empregado";

        this.assinaturaSrcStyle = { 'width': '0px', 'heigth': '0px' };
        this.fotoSrcStyle = { 'width': '0px', 'heigth': '0px' };
        this.empregado = new EmpregadoBuilder().initialize( this.empregado );
        this.gerenciaAxu = new GerenciaBuilder().initialize(this.gerenciaAxu);
        this.instalacao = new IndicadorRiscoAcidenteInstalacaoBuilder().initialize( this.instalacao );
        
        this.enfases = new EnfaseBuilder().initializeList(new Array<Enfase>());
        
        this.autoCompleteInstalacao = new InstalacaoNomeAutocomplete(this.empregadoService.getInstalacaoService());
    }

    ngOnInit() {
        let component = this;
        document.getElementById( 'foto' ).onchange = function() {
            component.loadFoto();
        };

        document.getElementById( 'assinatura' ).onchange = function() {
            component.loadAssinatura();
        };

        this.instalacoesSelecteds = new Array<Instalacao>();

        this.historicoGrupoMonitoramentos = new HistoricoGrupoMonitoramentoBuilder().initializeList(
            Array<HistoricoGrupoMonitoramento>() );

        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if ( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.empregadoService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.empregado = new EmpregadoBuilder().clone( res.json() );
                            this.instalacoesSelecteds = this.empregado.getInstalacoes();
                            this.verifyAndSetSelectsStrings();
                            if ( this.empregado.getFotoBase64() !== undefined ) {
                                this.fotoSrc = "data:image/png;base64," + this.empregado.getFotoBase64();
                                this.fotoSrcStyle = { 'width': '500px', 'heigth': '500px' };
                            }

                            if ( this.empregado.getAssinaturaBase64() !== undefined ) {
                                this.assinaturaSrc = "data:image/png;base64," + this.empregado.getAssinaturaBase64();
                                this.assinaturaSrcStyle = { 'width': '500px', 'heigth': '500px' };
                            }
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );

        this.getStatuses();
        this.getSexos();
        this.getEstadosCivies();
        this.getEscolaridades();
        this.getVinculos();
        this.getCargos();
        this.getCargos();
        this.getFuncoes();
        this.getRegimes();
        this.getGerencias();
        this.getBases();
        this.getGhes();
        this.getGhees();
        this.getCidades();
        this.getVacinas();
        this.getInstalacoes();
        this.getGruposMonitoramento();
        this.getEnfases();
    }

    getStatuses() {
        this.empregadoService.getStatuses()
            .then( res => {
                this.statuses = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
                console.log( error );
            } )
    }

    getSexos() {
        this.empregadoService.getSexos()
            .then( res => {
                this.sexos = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
                console.log( error );
            } )
    }

    getEstadosCivies() {
        this.empregadoService.getEstadosCivies()
            .then( res => {
                this.estadosCivies = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
                console.log( error );
            } )
    }

    getEscolaridades() {
        this.empregadoService.getEscolaridades()
            .then( res => {
                this.escolaridades = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
                console.log( error );
            } )
    }

    getVinculos() {
        this.empregadoService.getVinculos()
            .then( res => {
                this.vinculos = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
                console.log( error );
            } )
    }

    getCargos() {
        this.empregadoService.getCargos()
            .then( res => {
                this.cargos = res.json();
            } )
            .catch( error => {
                console.log( error );
            } )
    }

    getFuncoes() {
        this.empregadoService.getFuncoes()
            .then( res => {
                this.funcoes = res.json();
            } )
            .catch( error => {
                console.log( error );
            } )
    }

    getRegimes() {
        this.empregadoService.getRegimes()
            .then( res => {
                this.regimes = res.json();
            } )
            .catch( error => {
                console.log( error );
            } )
    }
    
    getEnfases() {
        this.empregadoService.getEnfases()
            .then( res => {
                this.enfases = new EnfaseBuilder().cloneList(res.json());
            } )
            .catch( error => {
                console.log( error );
            } )
    }

    getGerencias() {
        this.empregadoService.getGerencias()
            .then( res => {
                this.gerencias = res.json();
                this.gerencias.sort(function(a, b){
                    if ( a['codigoCompleto'] > b['codigoCompleto'] )
                        return 1;
                    else if ( a['codigoCompleto'] < b['codigoCompleto'] )
                        return -1;
                    else return 0;
                });
            } )
            .catch( error => {
                console.log( error );
            } )
    }

    getBases() {
        this.empregadoService.getBases()
            .then( res => {
                this.bases = res.json();
            } )
            .catch( error => {
                console.log( error );
            } )
    }

    getGhes() {
        this.empregadoService.getGhes()
            .then( res => {
                this.ghes = new GheBuilder().cloneList(res.json());
            } )
            .catch( error => {
                console.log( error );
            } )
    }

    getGhees() {
        this.empregadoService.getGhees()
            .then( res => {
                this.ghees = new GheeBuilder().cloneList(res.json());
            } )
            .catch( error => {
                console.log( error );
            } )
    }

    getCidades() {
        this.empregadoService.getCidades()
            .then( res => {
                this.cidades = res.json();
            } )
            .catch( error => {
                console.log( error );
            } )
    }

    getVacinas() {
        this.empregadoService.getVacinas()
            .then( res => {
                this.vacinas = res.json();
            } )
            .catch( error => {
                console.log( error );
            } )
    }

    getInstalacoes() {
        this.empregadoService.getInstalacoes()
            .then( res => {
                this.instalacoes = new InstalacaoBuilder().cloneList( res.json() );
            } )
            .catch( error => {
                console.log( error );
            } )
    }

    getGruposMonitoramento() {
        this.empregadoService.getGruposMonitoramento()
            .then( res => {
                this.gruposMonitoramento = new GrupoMonitoramentoBuilder().cloneList( res.json() );
            } )
            .catch( error => {
                console.log( error );
            } )
    }

    loadAssinatura() {
        let inputEl: HTMLInputElement = this.inputElAssinatura.nativeElement;

        if ( inputEl.files.length > 0 ) {
            let reader = new FileReader();
            this.assinaturaSrcStyle = { 'width': '500px', 'heigth': '500px' };
            let component = this;

            reader.onload = function() {
                if ( reader.result.toString().substring( 0, 40 ).indexOf( "stream" ) !== -1 ) {
                    component.assinaturaSrc = reader.result.toString().replace( 'data:application/octet-stream;base64', 'data:image/png;base64' );
                } else {
                    component.assinaturaSrc = reader.result.toString().replace( 'data:;base64', 'data:image/png;base64' );
                }
            };
            reader.readAsDataURL( new Blob( [inputEl.files[0]] ) );
        } else {
            this.assinaturaSrcStyle = { 'width': '0px', 'heigth': '0px' };
        }
    }

    loadFoto() {
        let inputEl: HTMLInputElement = this.inputElFoto.nativeElement;

        if ( inputEl.files.length > 0 ) {
            let reader = new FileReader();
            this.fotoSrcStyle = { 'width': '500px', 'heigth': '500px' };
            let component = this;

            reader.onload = function() {
                if ( reader.result.toString().substring( 0, 40 ).indexOf( "stream" ) !== -1 ) {
                    component.fotoSrc = reader.result.toString().replace( 'data:application/octet-stream;base64', 'data:image/png;base64' );
                } else {
                    component.fotoSrc = reader.result.toString().replace( 'data:;base64', 'data:image/png;base64' );
                }
            };

            reader.readAsDataURL( new Blob( [inputEl.files[0]] ) );
        } else {
            this.fotoSrcStyle = { 'width': '0px', 'heigth': '0px' };
        }
    }

    callSave( i: number, total: number, empregado: Empregado ) {
        if ( i == total ) {
            this.salvar( empregado );
        }
    }

    save() {
        let i: number = 0;
        let total: number = 0;
        let assinatura = undefined;
        let foto = undefined;

        if ( this.inputElAssinatura.nativeElement.files.length > 0 ) {
            assinatura = this.inputElAssinatura.nativeElement.files[0];
            total++;
        }

        if ( this.inputElFoto.nativeElement.files[0] ) {
            foto = this.inputElFoto.nativeElement.files[0];
            total++;
        }
        
        if ( total > 0 ) {
            let component = this;
            let empregado: Empregado = new EmpregadoBuilder().clone( component.empregado );

            if ( assinatura != undefined ) {
                let readerAssinatura = new FileReader();

                readerAssinatura.onload = function() {
                    let arrayBuffer: ArrayBuffer = readerAssinatura.result;
                    let array = new Uint8Array( arrayBuffer );
                    empregado.setAssinatura( array );
                    component.callSave( ++i, total, empregado );
                }

                readerAssinatura.readAsArrayBuffer( new Blob( [assinatura] ) );
            }

            if ( foto != undefined ) {
                let readerFoto = new FileReader();

                readerFoto.onload = function() {
                    let arrayBuffer: ArrayBuffer = readerFoto.result;
                    let array = new Uint8Array( arrayBuffer );
                    empregado.setFoto( array );
                    component.callSave( ++i, total, empregado );
                }

                readerFoto.readAsArrayBuffer( new Blob( [foto] ) );
            }

        } else {
            super.save( new EmpregadoBuilder().clone( this.empregado ) );
        }
    }

    salvar( empregado ) {
        super.save( empregado );
    }
    
    showToastGhe(evento) {
        if ( evento == 0 ) return;
        
        let ghe = this.ghes.find(g => g.getId() == evento);
        
        this.toastParams = [ghe.getDescricao(), 60000];
        this.globalActions.emit('toast');
    }
    
    showToastGhee(evento) {
        if ( evento == 0 ) return;
        
        let ghee = this.ghees.find(g => g.getId() == evento);
        
        this.toastParams = [ghee.getDescricao(), 60000];
        this.globalActions.emit('toast');
    }
    
    closeTooltip() {
        $(".toast").remove();
    }

    addGrupoMonitoramento( valor: number ) {
        if ( valor != 0 ) {
            let gM: GrupoMonitoramento = this.empregado.getGrupoMonitoramentos().find( gM => gM.getId() == valor );
            if ( gM == undefined ) {
                let grupoMonitoramento = this.gruposMonitoramento.find( gM => gM.getId() == valor );
                this.empregado.getGrupoMonitoramentos().push( grupoMonitoramento );
            }
        }
    }

    removeGrupoMonitoramento( i: number ) {
        this.empregado.getGrupoMonitoramentos().splice( i, 1 );
    }

    addEmpregadoVacina() {
        if ( this.empregado.getEmpregadoVacinas() === undefined ) {
            this.empregado.setEmpregadoVacinas( new Array<EmpregadoVacina>() );
        }

        let eV: EmpregadoVacina = new EmpregadoVacina();
        eV.setVacina( new Vacina() );

        this.empregado.getEmpregadoVacinas().push( eV );
    }


    removeEmpregadoVacina( i: number ) {
        this.empregado.getEmpregadoVacinas().splice( i, 1 );
    }

    addTelefone() {
        if ( this.empregado.getPessoa().getTelefones() === undefined )
            this.empregado.getPessoa().setTelefones( new Array<Telefone>() );
        this.empregado.getPessoa().getTelefones().push( new Telefone() );
    }

    removeTelefone( i: number ) {
        this.empregado.getPessoa().getTelefones().splice( i, 1 );
    }

    addInstalacao() {
        if ( this.instalacao.getInstalacao().getId() > 0 ) {
            console.log(this.instalacao)
            console.log(this.instalacoesSelecteds)
            if ( this.instalacoesSelecteds.find( i => i.getId() == this.instalacao.getInstalacao().getId() ) != undefined ) {
                this.toastParams = ["Valor adicionado anteriormente.", 4000];
                this.globalActions.emit('toast');
                return;
            }
            this.instalacoesSelecteds.push( new InstalacaoBuilder().clone(this.instalacao.getInstalacao()) );
            this.empregado.setInstalacoes( this.instalacoesSelecteds );
        } else {
            this.toastParams = ["Nenhum valor correto selecionado.", 4000];
            this.globalActions.emit('toast');
        }
    }

    removeInstalacao( i: number ) {
        this.empregado.getInstalacoes().splice( i, 1 );
    }

    onDestroy() {
        this.inscricao.unsubscribe();
    }

    verifyAndSetSelectsStrings() {
        if ( this.empregado.getPessoa().getSexo() == undefined ||
            this.empregado.getPessoa().getSexo() == null )
            this.empregado.getPessoa().setSexo( "" );

        if ( this.empregado.getStatus() == undefined ||
            this.empregado.getStatus() == null )
            this.empregado.setStatus( "" );
    }

    private getDefaultPickaOption(): any {
        return {
        monthsFull: ['Janeiro', 'Fevereiro', 'Mar�o', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        weekdaysFull: ['Domingo', 'Segunda', 'Ter�a', 'Quarta', 'Quinta', 'Sexta', 'Sab�do'],
        weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        today: 'Hoje',
        clear: 'Limpar',
        close: 'Fecha',
        labelMonthNext: 'Pr�ximo m�s',
        labelMonthPrev: 'M�s anterior',
        labelMonthSelect: 'Selecione um m�s',
        labelYearSelect: 'Selecione um ano',
        format: 'dd/mm/yyyy',
        editable: true,
        closeOnSelect: true,
        selectYears: 15
        };
    }

}
