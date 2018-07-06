import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Atestado } from './../../../model/atestado';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { AtestadoBuilder } from './../atestado.builder';
import { AtestadoService } from './../atestado.service';
import { HttpUtil } from './../../../generics/utils/http.util';

@Component( {
    selector: 'app-atestado-form-detail',
    templateUrl: './atestado-form-detail.html',
    styleUrls: ['./atestado-form.css', './../../../../assets/css/form-component.css']
} )
export class AtestadoFormDetailComponent extends GenericFormComponent implements OnInit {
    private atestado: Atestado;
    private statuses: Array<string>;
    private httpUtil: HttpUtil;

    constructor( private route: ActivatedRoute,
        private atestadoService: AtestadoService,
        router: Router) {
        super( atestadoService, router );

        this.goTo = "atestado";
        this.atestado = new AtestadoBuilder().initialize( this.atestado );
        this.statuses = new Array<string>();
        this.httpUtil = new HttpUtil();
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                let id = params['id'];
                this.showPreload = true;

                this.service.get( id )
                    .then( res => {
                        this.showPreload = false;
                        this.atestado = new AtestadoBuilder().clone( res.json() );
                    } )
                    .catch( error => {
                        this.catchConfiguration( error );
                    } )
            } );
        this.getStatuses();
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
    
    //generalizar solicitacaoCentralIntegraUtil
    getAnexo( atestado: Atestado ) {
        this.showPreload = true;

        this.atestadoService.getAnexo( atestado.getId() )
            .then( res => {
                this.showPreload = false;
                this.httpUtil.downloadFile( res, atestado.getTarefa().getCliente().getPessoa().getNome() + ".zip" );
            } )
            .catch( error => {
                this.showPreload = false;
                if ( typeof error.text === "function" ) {
                    this.toastParams = [error.text(), 6000];
                    this.globalActions.emit( 'toast' );
                    return;
                } else console.log( "Erro ao buscar o anexo: " + error );
            } )
    }
    

}