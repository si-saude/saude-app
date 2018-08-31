import { Component, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";

import { Tarefa } from './../../model/tarefa';
import { SolicitacaoServicoService } from './../solicitacao-servico.service';
import { Atestado } from './../../model/atestado';
import { AtestadoBuilder } from './../../controller/atestado/atestado.builder';
import { TarefaBuilder } from './../../controller/tarefa/tarefa.builder';
import { ModalHomologacaoAtestadoComponent } from './../../includes/modal-homologacao-atestado/modal-homologacao-atestado.component';
import { TextUtil } from './../../generics/utils/text.util';
import { GlobalVariable } from './../../../../src/app/global';

@Component( {
    selector: 'app-homologacao-atestado',
    templateUrl: './homologacao-atestado.html',
    styleUrls: ['./homologacao-atestado.css']
} )
export class HomologacaoAtestadoComponent {
    @ViewChild( ModalHomologacaoAtestadoComponent ) modalHomologacaoAtestado: ModalHomologacaoAtestadoComponent;
    private atestado: Atestado;
    private textUtil: TextUtil;

    private showConfirmSave: boolean;
    private msgConfirmSave: string;
    private goTo: string;

    constructor( private route: ActivatedRoute, private router: Router,
        private solicitacaoServicoService: SolicitacaoServicoService ) {
        this.textUtil = new TextUtil();
        this.atestado = new AtestadoBuilder().initialize(new Atestado());
    }

    ngOnInit() {
        if ( localStorage.getItem( "tarefa" ) == undefined ) {
            this.router.navigate( ["/solicitacao-servico/selecao-servico"] );
        } else {
            let tarefa = new TarefaBuilder().clone( JSON.parse( localStorage.getItem( "tarefa" ) ) );
            this.atestado.setTarefa( tarefa );
            this.atestado.setEmpregado( tarefa.getCliente() );
            this.modalHomologacaoAtestado.configure( this.atestado );
            localStorage.removeItem( "tarefa" );
        }
    }

    next() {
        if ( this.atestado.getInicio() == undefined ) {
            this.textUtil.showTextToast( "Por favor, insira uma data inicial.", 4000 );
            return;
        }
        let canSave = this.modalHomologacaoAtestado.canSave();

        if ( !canSave[0] ) {
            this.textUtil.showTextToast( canSave[1], 4000 );
            return;
        }

        let i: number = 0;
        let total: number = 0;
        let anexo = undefined;
        let anexoRelatorioMedico = undefined;

        if ( this.modalHomologacaoAtestado.inputElAnexo.nativeElement.files.length > 0 ) {
            anexo = this.modalHomologacaoAtestado.inputElAnexo.nativeElement.files[0];
            total++;
        }

        if ( this.modalHomologacaoAtestado.inputElAnexoRelatorioMedico.nativeElement.files.length > 0 ) {
            anexoRelatorioMedico = this.modalHomologacaoAtestado.inputElAnexoRelatorioMedico.nativeElement.files[0];
            total++;
        }

        if ( total > 0 ) {
            let component = this;
            let atestado: Atestado = new AtestadoBuilder().clone( component.atestado );

            if ( anexo != undefined ) {
                if ( anexo["type"] != "application/pdf" ) {
                    this.textUtil.showTextToast( "O formato do anexo deve ser PDF.", 4000 );
                    return;
                }

                let readerAnexo = new FileReader();

                readerAnexo.onload = function() {
                    let arrayBuffer: ArrayBuffer = readerAnexo.result;
                    let array = new Uint8Array( arrayBuffer );
                    atestado.setAnexo( array );
                    component.callSave( ++i, total, atestado );
                }

                readerAnexo.readAsArrayBuffer( new Blob( [anexo] ) );
            }

            if ( anexoRelatorioMedico != undefined ) {
                if ( anexoRelatorioMedico["type"] != "application/pdf" ) {
                    this.textUtil.showTextToast( "O formato do anexo deve ser PDF.", 4000 );
                    return;
                }

                let readerAnexoRelatorioMedico = new FileReader();

                readerAnexoRelatorioMedico.onload = function() {
                    let arrayBuffer: ArrayBuffer = readerAnexoRelatorioMedico.result;
                    let array = new Uint8Array( arrayBuffer );
                    atestado.setAnexoRelatorioMedico( array );
                    component.callSave( ++i, total, atestado );
                }

                readerAnexoRelatorioMedico.readAsArrayBuffer( new Blob( [anexoRelatorioMedico] ) );
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

    salvar( atestado: Atestado ) {
        atestado.setHomologacaoAtestado( undefined );
        this.solicitacaoServicoService.registrarAtestado( atestado )
            .then( res => {
                this.showConfirmSave = true;
                this.msgConfirmSave = res.text();
                this.goTo = "solicitacao-servico/autenticacao-usuario";
            } )
            .catch( error => {
                this.showConfirmSave = true;
                this.msgConfirmSave = error.text();
                this.goTo = "solicitacao-servico/autenticacao-usuario";
            } )
    }

    back() {
        this.router.navigate( ["/solicitacao-servico/selecao-servico"] );
    }
}