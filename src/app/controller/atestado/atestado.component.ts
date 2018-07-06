import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Atestado } from '../../model/atestado';
import { AtestadoService } from './atestado.service';
import { AtestadoFilter } from './atestado.filter';
import { AtestadoGuard } from '../../guards/guards-child/atestado.guard';
import { GenericListComponent } from '../../generics/generic.list.component';
import { HttpUtil } from './../../generics/utils/http.util';

@Component( {
    selector: 'app-atestado',
    templateUrl: './atestado.component.html',
    styleUrls: ['./atestado.component.css', '../../../assets/css/list-component.css']
} )
export class AtestadoComponent extends GenericListComponent<Atestado, AtestadoFilter, AtestadoGuard> {
    private httpUtil: HttpUtil;
    private atestadoService: any;

    constructor( service: AtestadoService, atestadoGuard: AtestadoGuard, router: Router ) {
        super( service, new AtestadoFilter(), atestadoGuard, router );
        
        this.atestadoService = service;
        this.httpUtil = new HttpUtil();
    }
    
    //generalizar solicitacaoCentralIntegraUtil
    getAnexo( atestado: Atestado ) {
        this.showPreload = true;
        console.log(atestado)
        this.atestadoService.getAnexo( atestado["id"] )
            .then( res => {
                this.showPreload = false;
                this.httpUtil.downloadFile( res, "atestado.zip" );
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