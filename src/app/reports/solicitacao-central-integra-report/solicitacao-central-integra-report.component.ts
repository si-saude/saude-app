import { ViewChild, Component, EventEmitter, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeDirective } from "angular2-materialize";
import * as $ from 'jquery';
import { MaterializeAction } from "angular2-materialize";

import { SolicitacaoCentralIntegraService } from './../../controller/solicitacao-central-integra/solicitacao-central-integra.service';
import { SolicitacaoCentralIntegraReportBuilder } from './solicitacao-central-integra-report.builder';
import { SolicitacaoCentralIntegraDto } from './../../model/dto/solicitacao-central-integra-dto';
import { SolicitacaoCentralIntegraUtil } from './../../generics/utils/solicitacao-central-integra.util';
import { Usuario } from './../../model/usuario';
import { UsuarioBuilder } from './../../controller/usuario/usuario.builder';
import { ProfissionalSaudeBuilder } from './../../controller/profissional-saude/profissional-saude.builder';
import { ProfissionalSaudeFilter } from './../../controller/profissional-saude/profissional-saude.filter';
import { GenericReportComponent } from './../../generics/generic.report.component';


@Component( {
    selector: 'app-report-solicitacao-central-integra-report',
    templateUrl: './solicitacao-central-integra-report.html',
    styleUrls: ['./solicitacao-central-integra-report.css', './../../../assets/css/report-component.css']
} )
export class SolicitacaoCentralIntegraReportComponent extends GenericReportComponent<SolicitacaoCentralIntegraDto> {
    private usuario: Usuario;
    private showPreload: boolean;
    private solicitacaoCentralIntegraUtil: SolicitacaoCentralIntegraUtil;

    constructor( private solicitacaoCentralIntegraService: SolicitacaoCentralIntegraService ) {
        super( solicitacaoCentralIntegraService, new SolicitacaoCentralIntegraReportBuilder, "solicitacao-central-integra.xlsx");
        
        this.usuario = new UsuarioBuilder().initialize(new Usuario());
        this.solicitacaoCentralIntegraUtil = new SolicitacaoCentralIntegraUtil();
    }
    
    ngOnInit() {
        let component = this;
        
        this.solicitacaoCentralIntegraService.getUsuario( Number( localStorage.getItem( 'usuario-id' ) ) )
            .then( res => {
                component.usuario = new UsuarioBuilder().clone( res.json() );
                component.getSolicitacoes();
            } )
            .catch( error => {
                console.log( "Erro no servidor ao buscar o usuario." );
            } )
    }
    
    ngAfterViewInit() {
        this.getSolicitacoes();
        super.ngAfterViewInit();
    }
    
    getSolicitacoes() {
        this.solicitacaoCentralIntegraService.getSolicitacoesReport( this.usuario.getPessoa().getCpf() )
            .then(res => {
                this.entities = new SolicitacaoCentralIntegraReportBuilder().cloneList(res.json());
            } )
            .catch(error => {
                console.log( "Erro no servidor ao buscar solicitacoes." );
            })
    }
    
    getAnexo( solicitacaoCentralIntegra: SolicitacaoCentralIntegraDto ) {
        this.showPreload = true;

        this.solicitacaoCentralIntegraService.getAnexo( solicitacaoCentralIntegra.getId() )
            .then( res => {
                this.showPreload = false;
                this.httpUtil.downloadFile( res, "solicitacao-central-integra.zip" );
            } )
            .catch( error => {
                this.showPreload = false;
                if ( typeof error.text === "function" ) {
                    this.textUtil.showTextToast(error.text(), 6000);
                    return;
                } else console.log( "Erro ao buscar o anexo: " + error );
            } )
    }
    
}