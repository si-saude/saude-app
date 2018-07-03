import { Component, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import { IMyDpOptions } from 'mydatepicker';
import * as $ from 'jquery';

import { Tarefa }  from './../../model/tarefa';
import { SolicitacaoServicoService } from './../solicitacao-servico.service';
import { Atestado } from './../../model/atestado';
import { AtestadoBuilder } from './../../controller/atestado/atestado.builder';
import { TarefaBuilder } from './../../controller/tarefa/tarefa.builder';

@Component( {
    selector: 'app-homologacao-atestado',
    templateUrl: './homologacao-atestado.html',
    styleUrls: ['./homologacao-atestado.css']
} )
export class HomologacaoAtestadoComponent {
    @ViewChild( 'anexo' ) inputElAnexo: ElementRef;
    private atestado: Atestado;
    private myDatePickerOptions: IMyDpOptions;
    private globalActions;
    private toastParams;
    private tarefa: Tarefa;
    
    private showConfirmSave: boolean;
    private msgConfirmSave: string;
    private goTo: string;

    constructor( private route: ActivatedRoute, private router: Router,
        private solicitacaoServicoService: SolicitacaoServicoService ) {
        this.atestado = new AtestadoBuilder().initialize(new Atestado());
        this.tarefa = new TarefaBuilder().initialize(this.tarefa);
        this.globalActions = new EventEmitter<string | MaterializeAction>();
        this.toastParams = ['', 4000];
        this.myDatePickerOptions = {
                dateFormat: 'dd/mm/yyyy'
            };
    }

    ngOnInit() {
        if ( localStorage.getItem("tarefa") == undefined ) {
            this.router.navigate(["/solicitacao-servico/selecao-servico"]);
        } else {
            this.tarefa = new TarefaBuilder().clone(JSON.parse(localStorage.getItem("tarefa")));
            localStorage.removeItem("tarefa");
        }
    }

    next() {
        this.atestado.setTarefa(this.tarefa);
        
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
    }
    
    callSave( i: number, total: number, atestado: Atestado ) {
        if ( i == total ) {
            this.salvar( atestado );
        }
    }
    
    salvar ( atestado ) {
        this.solicitacaoServicoService.salvarAtestado( atestado )
            .then(res => {
                this.showConfirmSave = true;
                this.msgConfirmSave = res.text();
                this.goTo = "solicitacao-servico/autenticacao-usuario";
            })
            .catch(error => {
                this.showConfirmSave = true;
                this.msgConfirmSave = error.text();
                this.goTo = "solicitacao-servico/autenticacao-usuario";
            })
    }
    
    back() {
        this.router.navigate(["/solicitacao-servico/selecao-servico"]);
    }
    
    showCardNotice( evento ) {
        $(".card-notice").toggle();
    }
}