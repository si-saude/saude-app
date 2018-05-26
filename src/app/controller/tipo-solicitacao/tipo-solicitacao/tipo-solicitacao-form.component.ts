import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { TipoSolicitacao } from './../../../model/tipo-solicitacao';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { TipoSolicitacaoBuilder } from './../tipo-solicitacao.builder';
import { TipoSolicitacaoService } from './../tipo-solicitacao.service';

@Component( {
    selector: 'app-tipo-solicitacao-form',
    templateUrl: './tipo-solicitacao-form.html',
    styleUrls: ['./tipo-solicitacao-form.css', './../../../../assets/css/form-component.css']
} )
export class TipoSolicitacaoFormComponent extends GenericFormComponent implements OnInit {
    private tipoSolicitacao: TipoSolicitacao;

    constructor( private route: ActivatedRoute,
        private tipoSolicitacaoService: TipoSolicitacaoService,
        router: Router) {
        super( tipoSolicitacaoService, router );

        this.goTo = "tipo-solicitacao";
        this.tipoSolicitacao = new TipoSolicitacaoBuilder().initialize( this.tipoSolicitacao );
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
                            this.tipoSolicitacao = new TipoSolicitacaoBuilder().clone( res.json() );
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
    }
    
    ngOnDestroy() {
        this.inscricao.unsubscribe();
    }
    
    save() {
        super.save( new TipoSolicitacaoBuilder().clone( this.tipoSolicitacao ) );
    }
}