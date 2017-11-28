import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MyDatePickerModule } from 'mydatepicker';

import { GlobalVariable } from './../../../global';
import { Empregado } from './../../../model/empregado';
import { EmpregadoService } from './../empregado.service';
import { EmpregadoFilter } from './../empregado.filter';
import { Cargo } from './../../../model/cargo';
import { Funcao } from './../../../model/funcao';
import { Regime } from './../../../model/regime';
import { Gerencia } from './../../../model/gerencia';
import { Base } from './../../../model/base';
import { Ghe } from './../../../model/ghe';
import { Ghee } from './../../../model/ghee';
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
import { GrupoMonitoramentoBuilder } from './../../grupo-monitoramento/grupo-monitoramento.builder';
import { HistoricoGrupoMonitoramentoBuilder } from './../../historico-grupo-monitoramento/historico-grupo-monitoramento.builder';

@Component( {
    selector: 'app-empregado-form',
    templateUrl: './empregado-form.html',
    styleUrls: ['./empregado-form.css']
} )
export class EmpregadoFormComponent extends GenericFormComponent implements OnInit {

    @ViewChild( 'assinatura' ) inputElAssinatura: ElementRef;
    @ViewChild( 'foto' ) inputElFoto: ElementRef;
    assinaturaSrcStyle: any;
    fotoSrcStyle: any;

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
    instalacoesSelecteds: Array<Instalacao>;
    gruposMonitoramento: Array<GrupoMonitoramento>;
    historicoGrupoMonitoramentos: Array<HistoricoGrupoMonitoramento>;
    fotoSrc: string;
    assinaturaSrc: any;

    //ngModel
    dataNascimento: any;
    dataVacinas: Array<any> = new Array<any>();
    proximaDoseVacinas: Array<any> = new Array<any>();
    dataRemocaoHistoricos: Array<any> = new Array<any>();

    empregadoFilter: EmpregadoFilter = new EmpregadoFilter();

    constructor( private route: ActivatedRoute,
        private empregadoService: EmpregadoService ) {
        super( empregadoService );
        this.goTo = "empregado";

        this.assinaturaSrcStyle = { 'width': '0px', 'heigth': '0px' };
        this.fotoSrcStyle = { 'width': '0px', 'heigth': '0px' };
        this.empregado = new EmpregadoBuilder().initialize( this.empregado );
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
                            this.verifyAndSetSelectsStrings();
                            this.parseAndSetDates();
                            this.verifyAndSetDatasRemocaoHistorico();

                            if ( this.empregado.getFotoBase64() !== undefined ) {
                                this.fotoSrc = "data:image/png;base64," + this.empregado.getFotoBase64();
                                this.fotoSrcStyle = { 'width': '500px', 'heigth': '500px' };
                            }

                            if ( this.empregado.getAssinaturaBase64() !== undefined ){
                                this.assinaturaSrc = "data:image/png;base64," + this.empregado.getAssinaturaBase64();
                                this.assinaturaSrcStyle = { 'width': '500px', 'heigth': '500px' };
                            }
                            
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );

        this.empregadoService.getStatuses()
            .then( res => {
                this.statuses = Object.keys( res.json() );
            } )
            .catch( error => {
                console.log( error );
            } )

        this.empregadoService.getSexos()
            .then( res => {
                this.sexos = Object.keys( res.json() );
            } )
            .catch( error => {
                console.log( error );
            } )

        this.empregadoService.getEstadosCivies()
            .then( res => {
                this.estadosCivies = Object.keys( res.json() );
            } )
            .catch( error => {
                console.log( error );
            } )

        this.empregadoService.getEscolaridades()
            .then( res => {
                this.escolaridades = Object.keys( res.json() );
            } )
            .catch( error => {
                console.log( error );
            } )
        
        this.empregadoService.getVinculos()
            .then( res => {
                this.vinculos = Object.keys( res.json() );
            } )
            .catch( error => {
                console.log( error );
            } )

        this.empregadoService.getCargos()
            .then( res => {
                this.cargos = res.json();
            } )
            .catch( error => {
                console.log( error );
            } )

        this.empregadoService.getFuncoes()
            .then( res => {
                this.funcoes = res.json();
            } )
            .catch( error => {
                console.log( error );
            } )

        this.empregadoService.getRegimes()
            .then( res => {
                this.regimes = res.json();
            } )
            .catch( error => {
                console.log( error );
            } )

        this.empregadoService.getGerencias()
            .then( res => {
                this.gerencias = res.json();
            } )
            .catch( error => {
                console.log( error );
            } )

        this.empregadoService.getBases()
            .then( res => {
                this.bases = res.json();
            } )
            .catch( error => {
                console.log( error );
            } )

        this.empregadoService.getGhes()
            .then( res => {
                this.ghes = res.json();
            } )
            .catch( error => {
                console.log( error );
            } )

        this.empregadoService.getGhees()
            .then( res => {
                this.ghees = res.json();
            } )
            .catch( error => {
                console.log( error );
            } )

        this.empregadoService.getCidades()
            .then( res => {
                this.cidades = res.json();
            } )
            .catch( error => {
                console.log( error );
            } )

        this.empregadoService.getVacinas()
            .then( res => {
                this.vacinas = res.json();
            } )
            .catch( error => {
                console.log( error );
            } )

        this.empregadoService.getInstalacoes()
            .then( res => {
                this.instalacoes = new InstalacaoBuilder().cloneList( res.json() );
            } )
            .catch( error => {
                console.log( error );
            } )

        this.empregadoService.getGruposMonitoramento()
            .then( res => {
                this.gruposMonitoramento = res.json();
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
    
    callSave(i:number, total:number, empregado:Empregado){
        if(i == total){
            this.salvar(empregado);
        }
    }

    save() {
        this.verifyAndSetDates();
        
        let i:number = 0;
        let total:number = 0;
        let assinatura = undefined;
        let foto = undefined;
        
        if(this.inputElAssinatura.nativeElement.files.length > 0){
            assinatura = this.inputElAssinatura.nativeElement.files[0];
            total++;
        }
        
        if(this.inputElFoto.nativeElement.files[0]){
            foto = this.inputElFoto.nativeElement.files[0];
            total++;
        }
        
        if(total > 0){
            let component = this;
            let empregado: Empregado = new EmpregadoBuilder().clone( component.empregado );
            
            if(assinatura != undefined){
                let readerAssinatura = new FileReader();
                
                readerAssinatura.onload = function() {
                    let arrayBuffer: ArrayBuffer = readerAssinatura.result;
                    let array = new Uint8Array( arrayBuffer );
                    empregado.setAssinatura( array );
                    component.callSave(++i, total, empregado);
                }
                
                readerAssinatura.readAsArrayBuffer( new Blob([assinatura]) );
            }
            
            if(foto != undefined){
                let readerFoto = new FileReader();
                
                readerFoto.onload = function() {
                    let arrayBuffer: ArrayBuffer = readerFoto.result;
                    let array = new Uint8Array( arrayBuffer );
                    empregado.setFoto( array );
                    component.callSave(++i, total, empregado);
                }
                
                readerFoto.readAsArrayBuffer( new Blob([foto]) );
            }
            
        }else {
            super.save( new EmpregadoBuilder().clone( this.empregado ) );
        }
    }

    salvar( empregado ) {
        super.save( empregado );
    }

    addGrupoMonitoramento( valor: number ) {
        let grupoMonitoramento = this.gruposMonitoramento.find( o => o["id"] == valor );
        this.empregado.getGrupoMonitoramentos().push( new GrupoMonitoramentoBuilder().clone( grupoMonitoramento ) );
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
        if ( this.empregado.getPessoa().getTelefones() === undefined ) {
            this.empregado.getPessoa().setTelefones( new Array<Telefone>() );
        }
        this.empregado.getPessoa().getTelefones().push( new Telefone() );
    }

    removeTelefone( i: number ) {
        this.empregado.getPessoa().getTelefones().splice( i, 1 );
    }

    addInstalacao( valor ) {
        let instalacao: Instalacao = this.instalacoes.find( i => {
            return i.getId() == valor;
        } );
        this.instalacoesSelecteds.push( instalacao );
        this.empregado.setInstalacoes( this.instalacoesSelecteds );
    }

    removeInstalacao( i: number ) {
        this.empregado.getInstalacoes().splice( i, 1 );
    }

    onDestroy() {
        this.inscricao.unsubscribe();
    }

    verifyAndSetDates() {
        if ( this.dataNascimento !== null &&
            this.dataNascimento !== undefined )
            this.empregado.getPessoa().setDataNascimento(
                this.parseDatePickerToDate( this.dataNascimento ) );

        if ( this.empregado.getEmpregadoVacinas() !== undefined &&
            this.empregado.getEmpregadoVacinas() !== null ) {
            for ( let i = 0; i < this.empregado.getEmpregadoVacinas().length; i++ ) {
                this.empregado.getEmpregadoVacinas()[i].setData(
                    this.parseDatePickerToDate( this.dataVacinas[i] ) );
                this.empregado.getEmpregadoVacinas()[i].setProximaDose(
                    this.parseDatePickerToDate( this.proximaDoseVacinas[i] ) );
            }
        }

    }

    parseAndSetDates() {
        if ( this.empregado.getPessoa().getDataNascimento() !== null &&
            this.empregado.getPessoa().getDataNascimento() !== undefined ) {
            this.dataNascimento = this.parseDataToObjectDatePicker( this.empregado.getPessoa().getDataNascimento() );
        }

        if ( this.empregado.getEmpregadoVacinas() !== undefined &&
            this.empregado.getEmpregadoVacinas() !== null ) {
            for ( let i = 0; i < this.empregado.getEmpregadoVacinas().length; i++ ) {
                this.dataVacinas[i] =
                    this.parseDataToObjectDatePicker(
                        this.empregado.getEmpregadoVacinas()[i].getData() );
                this.proximaDoseVacinas[i] =
                    this.parseDataToObjectDatePicker(
                        this.empregado.getEmpregadoVacinas()[i].getProximaDose() );
            }
        }

    }

    verifyAndSetSelectsStrings() {
        if ( this.empregado.getPessoa().getSexo() == undefined ||
            this.empregado.getPessoa().getSexo() == null )
            this.empregado.getPessoa().setSexo( "" );

        if ( this.empregado.getStatus() == undefined ||
            this.empregado.getStatus() == null )
            this.empregado.setStatus( "" );
    }

    verifyAndSetDatasRemocaoHistorico() {
        if ( this.empregado.getHistoricoGrupoMonitoramentos() !== undefined &&
            this.empregado.getHistoricoGrupoMonitoramentos() !== null ) {
            for ( let i = 0; i < this.empregado.getHistoricoGrupoMonitoramentos().length; i++ ) {
                this.dataRemocaoHistoricos[i] =
                    this.parseDataToString(
                        this.empregado.getHistoricoGrupoMonitoramentos()[i].getDataRemocao() );
            }
        }
    }
}
