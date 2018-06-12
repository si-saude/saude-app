import { Component, EventEmitter, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeDirective } from "angular2-materialize";
import * as $ from 'jquery';
import { MaterializeAction } from "angular2-materialize";

import { SolicitacaoCentralIntegraService } from './../../controller/solicitacao-central-integra/solicitacao-central-integra.service';
import { SolicitacaoCentralIntegraBuilder } from './../../controller/solicitacao-central-integra/solicitacao-central-integra.builder';
import { SolicitacaoCentralIntegraFilter } from './../../controller/solicitacao-central-integra/solicitacao-central-integra.filter';
import { SolicitacaoCentralIntegra } from './../../model/solicitacao-central-integra';
import { SolicitacaoCentralIntegraUtil } from './../../generics/utils/solicitacao-central-integra.util';
import { PessoaFilter } from './../../controller/pessoa/pessoa.filter';
import { Empregado } from './../../model/empregado';
import { EmpregadoFilter } from './../../controller/empregado/empregado.filter';
import { TarefaFilter } from './../../controller/tarefa/tarefa.filter';
import { Usuario } from './../../model/usuario';
import { UsuarioBuilder } from './../../controller/usuario/usuario.builder';
import { ProfissionalSaudeBuilder } from './../../controller/profissional-saude/profissional-saude.builder';
import { ProfissionalSaudeFilter } from './../../controller/profissional-saude/profissional-saude.filter';
import { HttpUtil } from './../../generics/utils/http.util';

@Component( {
    selector: 'app-report-solicitacao-central-integra',
    templateUrl: './solicitacao-central-integra.html',
    styleUrls: ['./solicitacao-central-integra.css']
} )
export class SolicitacaoCentralIntegraComponent {
    private solicitacaoCentralIntegras: Array<SolicitacaoCentralIntegra>;
    private filter: any;
    private typeFilter: string;
    private value: string;
    private numberScroll: number;
    private arrayObjects = [[]];
    private arrayTypes: Array<string>;
    private solicitacaoCentralIntegraUtil: SolicitacaoCentralIntegraUtil;
    private httpUtil: HttpUtil;
    private usuario: Usuario;
    private countCheckbox: number = 0;
    
    private showPreload: boolean;
    private globalActions;
    private toastParams;

    constructor( private router: Router,
        private solicitacaoCentralIntegraService: SolicitacaoCentralIntegraService ) {
        this.solicitacaoCentralIntegras = new SolicitacaoCentralIntegraBuilder().initializeList( new Array<SolicitacaoCentralIntegra>() );
        this.filter = "";
        this.arrayTypes = new Array<string>();
        this.solicitacaoCentralIntegraUtil = new SolicitacaoCentralIntegraUtil();
        this.httpUtil = new HttpUtil();
        this.usuario = new Usuario();

        this.showPreload = false;
        this.globalActions = new EventEmitter<string | MaterializeAction>();
        this.toastParams = ['', 4000];
    }

    ngAfterViewInit() {
        let component = this;
        $( ".container" ).get( 0 ).style.width = "100%";

        component.solicitacaoCentralIntegraService.getUsuario( Number( localStorage.getItem( 'usuario-id' ) ) )
            .then( res => {
                component.usuario = new UsuarioBuilder().clone( res.json() );
                component.getSolicitacoes();
            } )
            .catch( error => {
                console.log( "Erro no servidor ao buscar o usuario." );
            } )

        $( '#dropdown' ).mouseleave( function() {
            $( '#dropdown' ).toggleClass( 'show' );
        } );
    }

    getSolicitacoes() {
        let solicitacaoCentralIntegraFilter: SolicitacaoCentralIntegraFilter = new SolicitacaoCentralIntegraFilter();
        solicitacaoCentralIntegraFilter.setTarefa( new TarefaFilter() );
        solicitacaoCentralIntegraFilter.getTarefa().setCliente( new EmpregadoFilter() );
        solicitacaoCentralIntegraFilter.getTarefa().getCliente().setPessoa( new PessoaFilter() );
        solicitacaoCentralIntegraFilter.getTarefa().getCliente().getPessoa().setCpf( this.usuario.getPessoa().getCpf() );
        solicitacaoCentralIntegraFilter.setPageSize( Math.pow( 2, 31 ) - 1 );
        solicitacaoCentralIntegraFilter.setPageNumber( 1 );
        this.solicitacaoCentralIntegraService.getSolicitacoes( solicitacaoCentralIntegraFilter )
            .then( res => {
                this.solicitacaoCentralIntegras = new SolicitacaoCentralIntegraBuilder().cloneList( res.json().list );
                this.solicitacaoCentralIntegras.forEach( x => {
                    x.getAberturaString();
                    x.getPrazoString();
                } );

//                setTimeout(() => {
//                    this.setClickAguardandoInformacao();
//                }, 500 );
            } )
            .catch( error => {
                console.log( "Erro ao pegar panoramas." )
            } )
    }

    setClickAguardandoInformacao() {
        let component = this;
        
    }
    
    openDescricao(id){
        this.solicitacaoCentralIntegras.forEach( sCI => {
            if ( sCI.getId() == id && sCI.getStatus().includes( "AGUARDANDO INFORMA" ) ) {
                window.open( "/solicitacao-central-integra/descricao/"+id );
            }
        } );
    }

    selectFilter( event, type: string ) {
        this.filter = event.target.value;
        this.typeFilter = type;
        this.value = type;
    }

    dropdown( event, tipo ) {
        let arrayDropDown: Array<any> = new Array<any>();
        arrayDropDown = this.getItensDropDown( tipo );
        $( "#dropdown" ).empty();

        if ( tipo == "concluido" ) {
            let component = this;
            if ( component.arrayObjects['concluido'] == undefined )
                component.arrayObjects['concluido'] = new Array<any>();
            
            $( '#dropdown' ).append( "<li id='true' title='concluido'>" +
                "<input type='checkbox' id=true1>" +
                "<label for='true1'>Concluido</label></li>" );
            let el: HTMLInputElement = <HTMLInputElement>document.getElementById( 'true1' );
            el.indeterminate = true;
            el.checked = true;

            $( "#true1" ).click( function() {
                if ( !el.checked ) {
                    component.countCheckbox++;
                    el.value = 'false';
                } else el.value = 'true';
                if ( component.countCheckbox % 2 == 0 ) {
                    el.indeterminate = true;
                    el.checked = true;
                    component.countCheckbox = 0;
                }
                
                component.typeFilter = "concluido";
                component.value = "concluido";
                
                if ( el.indeterminate ) {
                    component.filter = undefined;
                    component.arrayObjects['concluido'] = 'indeterminate';
                } else if ( el.checked ) {
                    component.filter = true;
                    component.arrayObjects['concluido'] = 'true';
                } else {
                    component.filter = false;
                    component.arrayObjects['concluido'] = 'false';
                }
            } );

            $( '#dropdown' ).toggleClass( 'show' );
            $( '#dropdown' ).insertAfter( "#" + tipo );
            $( '#dropdown' ).css( "margin-left", "-" + $( ".list-container" ).scrollLeft() + "px" );
            
            if ( component.arrayObjects['concluido'] == 'indeterminate' ) {
                el.indeterminate = true;
                el.checked = true;
            } else if ( component.arrayObjects['concluido'] == 'true' ) {
                el.indeterminate = false;
                el.checked = true;            
            } else if ( component.arrayObjects['concluido'] == 'false' ) {
                el.indeterminate = false;
                el.checked = false;
            }

            return;
        } else {
            let count = 0;
            let el: any;
            for ( let item of arrayDropDown ) {
                el = $( "<li id='" + item + "' title='" + tipo + "'>" +
                    "<input type='checkbox' id='" + item + ( ++count ) + "' value='false'>" +
                    "<label for='" + ( item + count ) + "'>" + item + "</label></li>" );
                $( '#dropdown' ).append( el );

                let component = this;

                el.mousedown(function() {
                    
                    if ( $(this).get(0).children.item(0).getAttribute('value') == 'false') {
                        $(this).get(0).children.item(0).setAttribute('value', 'true');
                        if ( component.arrayObjects[$(this).attr('title')] == undefined ) {
                            component.arrayObjects[$(this).attr('title')] = new Array<any>();
                            component.arrayTypes.push($(this).attr('title'));
                        }
                        component.arrayObjects[$(this).attr('title')].push($(this).attr('id'));
                    } else {
                        $(this).get(0).children.item(0).setAttribute('value', 'false');
                        component.arrayObjects[$(this).attr('title')].splice( 
                                component.arrayObjects[$(this).attr('title')].indexOf($(this).attr('id')), 1);
                    }
                    
                    component.filter = this.getAttribute('id');
                    component.typeFilter = this.getAttribute('title');
                    component.value = undefined;
                    
                    setTimeout(() => {
                        component.filter = "";
                        component.typeFilter = "";
                        component.value = "timeout";
                    }, 50);
                });

            }

            $( '#dropdown' ).toggleClass( 'show' );
            $( '#dropdown' ).insertAfter( "#" + tipo );
            $( '#dropdown' ).css( "margin-left", "-" + $( ".list-container" ).scrollLeft() + "px" );

            for ( let t of this.arrayTypes ) {
                this.arrayObjects[t].forEach( aO => {
                    if ( document.getElementById( aO ) != null && document.getElementById( aO ) != undefined ) {
                        document.getElementById( aO ).children.item( 0 ).setAttribute( 'checked', 'true' );
                        document.getElementById( aO ).children.item( 0 ).setAttribute( 'value', 'true' );
                    }
                } )
            }
        }

    }

    selectItemDropDown( item, tipo ) {
        this.typeFilter = tipo;
        this.filter = item;
        this.value = undefined;
    }

    getItensDropDown( tipo ) {
        let arrayFilter: Array<any> = new Array<any>();

        if ( tipo == 'tipoSolicitacao-nome' ) {
            this.solicitacaoCentralIntegras.forEach( p => {
                if ( arrayFilter.find( a => a == p['tipoSolicitacao']['nome'] ) == undefined &&
                    p['tipoSolicitacao']['nome'] != "" && p['tipoSolicitacao']['nome'] != undefined ) {
                    arrayFilter.push( p['tipoSolicitacao']['nome'] );
                }
            } );
        } else if ( tipo == 'concluido' ) {
            arrayFilter = [true, false];
        } else this.solicitacaoCentralIntegras.forEach( p => {
            if ( arrayFilter.find( a => a == p[tipo] ) == undefined &&
                p[tipo] != "" && p[tipo] != undefined ) {
                arrayFilter.push( p[tipo] );
            }
        } );
        return arrayFilter;
    }

    splitText( texto: string ) {
        if ( texto != undefined && texto.length > 30 )
            return texto.substring( 0, 27 ) + "...";
        else return texto;

    }

    //generalizar solicitacaoCentralIntegraUtil
    getAnexo( solicitacaoCentralIntegra: SolicitacaoCentralIntegra ) {
        this.showPreload = true;

        this.solicitacaoCentralIntegraService.getAnexo( solicitacaoCentralIntegra.getId() )
            .then( res => {
                this.showPreload = false;
                this.httpUtil.downloadFile( res, solicitacaoCentralIntegra.
                    getTarefa().getCliente().getPessoa().getNome() + ".zip" );
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

    showTextToast( text ) {
        if ( text == "" ) return;

        this.toastParams = [text, 60000];
        this.globalActions.emit( 'toast' );
    }

    closeTooltip() {
        $( ".toast" ).remove();
    }

    ngOnDestroy() {
        $( ".toast" ).remove();
    }

}