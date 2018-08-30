import { Component, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Atestado } from './../../../model/atestado';
import { Diagnostico } from './../../../model/diagnostico';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { AtestadoBuilder } from './../atestado.builder';
import { AtestadoService } from './../atestado.service';
import { EmpregadoNomeAutocomplete } from './../../empregado/empregado-nome.autocomplete';
import { CatNumeroAutocomplete } from './../../cat/cat-numero.autocomplete';
import { DiagnosticoAtestadoAutocomplete } from './../../diagnostico/diagnostico-atestado.autocomplete';
import { EquipeFilter } from './../../equipe/equipe.filter';
import { DiagnosticoFilter } from './../../diagnostico/diagnostico.filter';
import { DiagnosticoBuilder } from './../../diagnostico/diagnostico.builder';
import { ProfissionalNomeAutocomplete } from './../../profissional-saude/profissional-nome.autocomplete';
import { MaterializeAction } from "angular2-materialize";

@Component( {
    selector: 'app-atestado-form',
    templateUrl: './atestado-form.html',
    styleUrls: ['./atestado-form.css', './../../../../assets/css/form-component.css']
} )
export class AtestadoFormComponent extends GenericFormComponent implements OnInit {
    private atestado: Atestado;
    private statuses: Array<string>;
    private statusesHomologacaoAtestado: Array<string>;
    @ViewChild( 'anexo' ) inputElAnexo: ElementRef;
    private edit: boolean = false;
    private autoCompleteEmp: EmpregadoNomeAutocomplete;
    private autoCompleteCat: CatNumeroAutocomplete;
    private proxyAutocompleteDiagnostico: ProxyAutocompleteDiagnostico;
    private autoCompleteProfissional: ProfissionalNomeAutocomplete;
    private situacaoEmpregados: Array<string>;
    
    constructor( private route: ActivatedRoute,
        private atestadoService: AtestadoService,
        router: Router ) {
        super( atestadoService, router );

        this.goTo = "atestado";
        this.atestado = new AtestadoBuilder().initialize( this.atestado );
        this.statuses = new Array<string>();
        this.statusesHomologacaoAtestado = new Array<string>();
        this.autoCompleteEmp = new EmpregadoNomeAutocomplete( this.atestadoService.getEmpregadoService() );
        this.autoCompleteCat = new CatNumeroAutocomplete( this.atestadoService.getCatService() );
        this.proxyAutocompleteDiagnostico = new ProxyAutocompleteDiagnostico( atestadoService );
        this.autoCompleteProfissional = new ProfissionalNomeAutocomplete(this.atestadoService.getProfissionalService())
        this.situacaoEmpregados = new Array<string>();
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if ( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.service.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.atestado = new AtestadoBuilder().clone( res.json() );
                            
                            if ( this.atestado.getCid() != undefined && this.atestado.getCid() != "" ) {
                                this.proxyAutocompleteDiagnostico.getAutocompleteDiagnostico()
                                        .getAutocomplete().initializeLastValue( this.atestado.getCid() );
                                let diagnosticoFilter: DiagnosticoFilter = new DiagnosticoFilter();
                                diagnosticoFilter.getEixo().setEquipe(new EquipeFilter());
                                diagnosticoFilter.getEixo().getEquipe().setAbreviacao("MED");
                                diagnosticoFilter.getInativo().setValue(2);
                                diagnosticoFilter.setCodigo(this.atestado.getCid());
                                this.atestadoService.getDiagnosticoService().list(diagnosticoFilter)
                                    .then(res => {
                                        this.proxyAutocompleteDiagnostico.getEncapsulatorDiagnostico().setDiagnostico(
                                                new DiagnosticoBuilder().clone(res.json().list));
                                    })
                                    .catch(error => {
                                        console.log("Erro ao buscar diagnostico.");
                                    })
                                
                            }
                            if ( this.atestado.getProfissionalRealizouVisita() != undefined ) {
                                this.autoCompleteProfissional.getAutocomplete().initializeLastValue(
                                        this.atestado.getProfissionalRealizouVisita().getEmpregado().getPessoa().getNome() )
                            }
                            
                            this.edit = true;
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );

        this.getStatuses();
        this.getSituacaoEmpregados();
    }

    getSituacaoEmpregados() {
        this.atestadoService.getSituacaoEmpregado()
            .then(res => {
                this.situacaoEmpregados = Object.keys(res.json()).sort();
            })
            .catch(error => {
                console.log("Erro ao buscar a situacao do empregado");
            })
    }
    
    getStatuses() {
        this.atestadoService.getStatuses()
            .then( res => {
                this.statuses = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
                console.log( "Erro ao retornar status." );
            } )
    }
    
    ngOnDestroy() {
        this.inscricao.unsubscribe();
    }

    save() {
        if ( this.atestado.getHomologacaoAtestado().getDataEntregaCustomTime().getApiDate() != undefined && 
                this.atestado.getHomologacaoAtestado().getDataHomologacaoCustomTime().getApiDate() != undefined && 
                ( this.atestado.getHomologacaoAtestado().getDataEntregaCustomTime().getApiDate().getTime() > 
                this.atestado.getHomologacaoAtestado().getDataHomologacaoCustomTime().getApiDate().getTime() ) ) {
            this.showTextToast("Erro: datas incondizentes.", 5000);
            return;
        }

        if ( !this.edit ) {
            let i: number = 0;
            let total: number = 0;
            let anexo = undefined;

            if ( this.inputElAnexo.nativeElement.files.length > 0 ) {
                anexo = this.inputElAnexo.nativeElement.files[0];
                total++;
            }

            if ( total > 0 ) {
                let component = this;
                let atestado: Atestado = new AtestadoBuilder().clone( component.atestado );

                if ( anexo != undefined ) {
                    let readerAnexo = new FileReader();

                    readerAnexo.onload = function() {
                        let arrayBuffer: ArrayBuffer = readerAnexo.result;
                        let array = new Uint8Array( arrayBuffer );
                        atestado.setAnexo( array );
                        component.callSave( ++i, total, atestado );
                    }

                    readerAnexo.readAsArrayBuffer( new Blob( [anexo] ) );
                }
            } else {
                this.salvar( new AtestadoBuilder().clone( this.atestado ) );
            }
        } else {
            this.salvar( new AtestadoBuilder().clone( this.atestado ) );
        }
    }

    callSave( i: number, total: number, atestado: Atestado ) {
        if ( i == total ) {
            this.salvar( atestado );
        }
    }

    salvar( atestado ) {
        super.save( atestado );
    }

    showTextToast( text, time = 60000 ) {
        if ( text == "" ) return;

        this.toastParams = [text, time];
        this.globalActions.emit( 'toast' );
    }

    closeTooltip() {
        $( ".toast" ).remove();
    }
}

class ProxyAutocompleteDiagnostico {
    private autocompleteDiagnostico: DiagnosticoAtestadoAutocomplete;
    private encapsulatorDiagnostico: EncapsulatorDiagnostico;

    constructor(private atestadoService: AtestadoService) {
        this.autocompleteDiagnostico = new DiagnosticoAtestadoAutocomplete(atestadoService.getDiagnosticoService());
        this.encapsulatorDiagnostico = new EncapsulatorDiagnostico();
    }

    getAutocompleteDiagnostico() {
        return this.autocompleteDiagnostico;
    }
    
    setAutocompleteDiagnostico(autocompleteDiagnostico: DiagnosticoAtestadoAutocomplete) {
        this.autocompleteDiagnostico = autocompleteDiagnostico;
    }
    
    changeDiagnostico(evento) {
        this.encapsulatorDiagnostico.getDiagnostico().setCodigo(evento);
        this.autocompleteDiagnostico.getAutocomplete().getList(this.encapsulatorDiagnostico.getDiagnostico(), 'getCodigo');
    }
    
    setCid(atestado: Atestado, evento) {
        this.autocompleteDiagnostico.getAutocomplete().getObj(
                evento, this.encapsulatorDiagnostico,'setDiagnostico','getCodigo');
        atestado.setCid(this.encapsulatorDiagnostico.getDiagnostico().getCodigo());
    }
    
    getCid() {
        if ( this.encapsulatorDiagnostico.getDiagnostico().getId() > 0 )
            this.encapsulatorDiagnostico.getDiagnostico().getCodigo();
        else return "";
    }
    
    getEncapsulatorDiagnostico() {
        return this.encapsulatorDiagnostico;
    }
}

class EncapsulatorDiagnostico {
    private diagnostico: Diagnostico;

    constructor() {
        this.diagnostico = new Diagnostico();
    }

    getDiagnostico() {
        return this.diagnostico;
    }
    
    setDiagnostico( diagnostico: Diagnostico ) {
        this.diagnostico = diagnostico;
    }
}