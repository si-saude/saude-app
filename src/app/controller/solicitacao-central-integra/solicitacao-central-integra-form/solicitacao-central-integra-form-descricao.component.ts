import { Component, ViewChild, ElementRef, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { MaterializeDirective,MaterializeAction } from "angular2-materialize";

import { GlobalVariable } from './../../../global';
import { StatusSolicitacaoConst } from './../../../generics/consts/status-solicitacao.const';
import { SolicitacaoCentralIntegra } from './../../../model/solicitacao-central-integra';
import { TipoSolicitacao } from './../../../model/tipo-solicitacao';
import { TipoSolicitacaoBuilder } from './../../tipo-solicitacao/tipo-solicitacao.builder';
import { Empregado } from './../../../model/empregado';
import { Profissional } from './../../../model/profissional';
import { ProfissionalSaudeBuilder } from './../../../controller/profissional-saude/profissional-saude.builder';
import { EmpregadoBuilder } from './../../../controller/empregado/empregado.builder';
import { EmpregadoFilter } from './../../../controller/empregado/empregado.filter';
import { SolicitacaoCentralIntegraBuilder } from './../solicitacao-central-integra.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { SolicitacaoCentralIntegraService } from './../solicitacao-central-integra.service';

@Component( {
    selector: 'app-solicitacao-central-integra-form-descricao',
    templateUrl: './solicitacao-central-integra-form-descricao.html',
    styleUrls: ['./solicitacao-central-integra-form.css', './../../../../assets/css/form-component.css']
} )
export class SolicitacaoCentralIntegraFormDescricaoComponent extends GenericFormComponent implements OnInit {
    private solicitacaoCentralIntegra: SolicitacaoCentralIntegra;
    
    constructor( private route: ActivatedRoute,
            private solicitacaoCentralIntegraService: SolicitacaoCentralIntegraService,
            router: Router) { 
            super(solicitacaoCentralIntegraService, router);
            this.goTo = "$*close*$";
            this.solicitacaoCentralIntegra = new SolicitacaoCentralIntegraBuilder().initialize(new SolicitacaoCentralIntegra());
    }
    
    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.solicitacaoCentralIntegraService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.solicitacaoCentralIntegra = new SolicitacaoCentralIntegraBuilder().clone(res.json());
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
    }
    
    save() {
        super.save(new SolicitacaoCentralIntegraBuilder().clone(this.solicitacaoCentralIntegra));
    }
    
    getMsgConfirmSave(res: any){
        return "Salvo com sucesso.";
    }
}