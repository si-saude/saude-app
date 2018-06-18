import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { MyDatePickerModule } from 'mydatepicker';
import * as $ from 'jquery';
import { MaterializeAction } from "angular2-materialize";

import { RiscoPotencialDto } from './../../model/dto/risco-potencial-dto';
import { RiscoPotencialService } from './risco-potencial.service';
import { RiscoPotencialFilter } from './risco-potencial.filter';
import { RiscoPotencialReportBuilder } from './risco-potencial-report.builder';
import { RiscoPotencialGuard } from './../../guards/guards-child/risco-potencial.guard';
import { EmpregadoBuilder } from './../empregado/empregado.builder';
import { Equipe } from './../../model/equipe';
import { EquipeBuilder } from './../equipe/equipe.builder';
import { BooleanFilter } from './../../generics/boolean.filter';
import { ProfissionalSaudeBuilder } from './../profissional-saude/profissional-saude.builder';
import { ProfissionalSaudeFilter } from './../profissional-saude/profissional-saude.filter';
import { Profissional } from './../../model/profissional';
import { Usuario } from './../../model/usuario';
import { UsuarioBuilder } from './../usuario/usuario.builder';
import { EmpregadoFilter } from './../empregado/empregado.filter';
import { BaseFilter } from './../base/base.filter';
import { PessoaFilter } from './../pessoa/pessoa.filter';
import { FilterDataPipe } from './../../pipes/filter-data.pipe';
import { HttpUtil } from './../../generics/utils/http.util';

@Component( {
    selector: 'app-risco-potencial',
    templateUrl: './risco-potencial.component.html',
    styleUrls: ['./risco-potencial.component.css', '../../../assets/css/list-component.css']
} )
export class RiscoPotencialComponent {
    private riscoPotenciais: Array<RiscoPotencialDto>;
    private flagRiscoPotenciais: Array<RiscoPotencialDto>;
    private riscoPotencialRPSats: Array<string>;
    private equipes: Array<Equipe>;
    private statuses: Array<string>;
    private rpsats: Array<string>;
    private empregado;
    private equipe;
    private profissional: Profissional;
    private uf: string;
    private ufs: Array<string>;
    private filtro: string;
    private instantTypeFiltro: string;
    
    private filter: any;
    private tipoFiltro: string;
    private value: string;
    private arrayObjects = [[]];
    private arrayTypes: Array<string>;
    private httpUtil: HttpUtil;

    private globalActions;
    private toastParams;
    private showPreload: boolean;

    constructor( private riscoPotencialService: RiscoPotencialService, 
            riscoGuard: RiscoPotencialGuard, 
            private router: Router ) {
        this.riscoPotenciais = new RiscoPotencialReportBuilder().initializeList( new Array<RiscoPotencialDto>() );
        this.flagRiscoPotenciais = new RiscoPotencialReportBuilder().initializeList( new Array<RiscoPotencialDto>() );
        this.riscoPotencialRPSats = new Array<string>();
        this.uf = '';
        this.ufs = new Array<string>();
        this.equipes = new EquipeBuilder().initializeList(new Array<Equipe>());
        this.statuses = new Array<string>();
        this.instantTypeFiltro = '';
        this.filtro = '';
        this.filter = "";
        this.arrayTypes = new Array<string>();
        this.globalActions = new EventEmitter<string | MaterializeAction>();
        this.toastParams = ['', 4000];
        this.httpUtil = new HttpUtil();
    }

    ngOnInit() {
        if ( localStorage.getItem( "usuario-id" ) != undefined ) {
            this.riscoPotencialService.getUsuario( Number( localStorage.getItem( "usuario-id" ) ) )
                .then( res => {
                    let usuario: Usuario = new Usuario();
                    usuario = new UsuarioBuilder().clone( res.json() );
                    if ( usuario.getId() > 0 && usuario.getPessoa() != undefined ) {
                        let profissionalFilter: ProfissionalSaudeFilter = new ProfissionalSaudeFilter();
                        profissionalFilter.setEmpregado( new EmpregadoFilter() );
                        profissionalFilter.getEmpregado().setPessoa( new PessoaFilter() );
                        profissionalFilter.getEmpregado().getPessoa().setCpf( usuario.getPessoa().getCpf() );

                        this.riscoPotencialService.getProfissional( profissionalFilter )
                            .then( res => {
                                this.showPreload = false;
                                if ( res.json().list[0] != undefined )
                                    this.profissional = new ProfissionalSaudeBuilder().clone( res.json().list[0] );
                                else {
                                    this.router.navigate( ["/login"] );
                                    return;
                                }
                            } )
                            .catch( error => {
                                console.log( "Erro no servidor ao buscar o profissional. Tentar mais tarde." );
                            } )
                    } else {
                        this.router.navigate( ["/login"] );
                        return;
                    }
                } )
                .catch( error => {
                    console.log( "Erro no servidor ao buscar o usuario." );
                } )
        } else {
            console.log( "Usuario nao logada." );
            this.router.navigate( ["/login"] );
        }
            
        this.getUfs();
        this.getEquipes();
        this.getStatus();
        this.getRPSats();
    }
    
    getUfs() {
        this.riscoPotencialService.getUfs()
            .then(res => {
                this.ufs = Object.keys( res.json() ).sort();
            })
            .catch(error => {
                console.log("Erro ao retornar ufs.");
            })
    }
    
    getStatus() {
        this.riscoPotencialService.getStatusRiscoPotencial( )
            .then( res => {
                this.statuses = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
                console.log( error );
            } )
    }
    
    getRPSats() {
        this.riscoPotencialService.getStatusRPSat()
            .then( res => {
                this.rpsats = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
                console.log( error );
            } )
    }
    
    getEquipes() {
        this.riscoPotencialService.getEquipes()
            .then( res => {
                this.equipes = new EquipeBuilder().cloneList( res.json() );
            } )
            .catch( error => {
                console.log( error );
            } )
    }
    
    selectFilterData( filtro ) {
        if ( this.setInstantTypeFiltro( filtro, 'data' ) ) return;
        
        let component = this;
        this.flagRiscoPotenciais = new RiscoPotencialReportBuilder().initializeList( new Array<RiscoPotencialDto>() );
        
        this.flagRiscoPotenciais = this.riscoPotenciais.filter(rP =>
            rP[this.instantTypeFiltro] != undefined && 
                component.transformDate( rP[this.instantTypeFiltro] ).includes( filtro.target.value )
        )
    }
    
    selectFilterRPSat( filtro ) {
        if ( this.setInstantTypeFiltro( filtro, 'statusRPSat' ) ) return;
        
        let component = this;
        this.flagRiscoPotenciais = new RiscoPotencialReportBuilder().initializeList( new Array<RiscoPotencialDto>() );
        
        this.flagRiscoPotenciais = this.riscoPotenciais.filter(rP =>
            rP[this.instantTypeFiltro] != undefined && rP[this.instantTypeFiltro] == filtro.target.value
        )
    }
    
    selectFilterEquipe( filtro ) {
        if ( this.setInstantTypeFiltro( filtro, 'equipeResponsavel' ) ) return;
        
        let component = this;
        this.flagRiscoPotenciais = new RiscoPotencialReportBuilder().initializeList( new Array<RiscoPotencialDto>() );
        
        this.flagRiscoPotenciais = this.riscoPotenciais.filter(rP => {
            if ( rP[this.instantTypeFiltro]['nome'] != undefined && 
                rP[this.instantTypeFiltro]['nome'].includes( filtro.target.value ) )
                return true;
            else return false;
        })
        
    }
    
    selectFilterEmpregado( filtro ) {
        if ( this.setInstantTypeFiltro( filtro, 'empregado' ) ) return;
        
        let component = this;
        this.flagRiscoPotenciais = new RiscoPotencialReportBuilder().initializeList( new Array<RiscoPotencialDto>() );
        
        this.flagRiscoPotenciais = this.riscoPotenciais.filter(rP => {
            if ( rP[this.instantTypeFiltro]['pessoa']['nome'] != undefined && 
                rP[this.instantTypeFiltro]['pessoa']['nome'].includes( filtro.target.value ) )
                return true;
            else return false;
        })
    }
    
    selectFilterStatus( filtro ) {
        if ( this.setInstantTypeFiltro( filtro, 'status' ) ) return; 
        
        let component = this;
        this.flagRiscoPotenciais = new RiscoPotencialReportBuilder().initializeList( new Array<RiscoPotencialDto>() );
        
        this.flagRiscoPotenciais = this.riscoPotenciais.filter(rP => 
                rP[this.instantTypeFiltro] != undefined && rP[this.instantTypeFiltro].includes( filtro.target.value ) 
        )
        
    }
    
    setInstantTypeFiltro( filtro, tipo ) {
        if ( filtro.target.value == '' ) {
            this.instantTypeFiltro = '';
            this.flagRiscoPotenciais = this.riscoPotenciais;
            return true;
        }
        else 
            this.instantTypeFiltro = tipo;
        
        return false;
    }
    
    verifyFiltro( tipo ) {
        if ( this.instantTypeFiltro == '' )
            return false;
        else if ( this.instantTypeFiltro == tipo ) 
            return false;
        else return true;
    }
    
    selectUf() {
        if ( this.uf != '' ) {
            this.showPreload = true;
            this.riscoPotencialService.getRiscoPotenciais( this.uf )
                .then( res => {
                    this.showPreload = false;
                    this.riscoPotenciais = new RiscoPotencialReportBuilder().cloneList( res.json() );
                    this.riscoPotenciais.sort(function(a, b){
                        if ( a['ranking'] > b['ranking'] )
                            return -1;
                        else if ( a['ranking'] < b['ranking'] )
                            return 1;
                        else return 0;
                    });             
                    
                    for ( let i = 0; i < this.riscoPotenciais.length; i++)
                        this.riscoPotenciais[i].setRanking(i+1)
                        
                    this.flagRiscoPotenciais = this.riscoPotenciais;
                    this.filter = "";
                    this.value = "change";
                    } )
                    .catch( error => {
                        this.showPreload = false;
                    } );
        } else {
            this.toastParams = ['Por favor, selecione um UF', 4000];
            this.globalActions.emit( 'toast' );
        }
    }

    changeColorStatusRPSat( campo ) {
        if ( campo != undefined ) {
            if ( campo.includes( "IN" ) )
                return {'background-color':'red'};
            else if ( campo.includes( "TOLER" ) )
                return {'background-color':'yellow'};
            else return {'background-color':'green'};
        }
    }

    toggleButtons( indexRisco: number ) {
        $( ".row-btns-risco" + indexRisco ).toggle( "slow" );
    }

    verifyPlanejamento( item: RiscoPotencialDto ) {
        if ( item.getStatus() == "PLANEJAMENTO" )
            return true;
        return false;
    }
    
    verifyStatusAcao( item: RiscoPotencialDto ) {
        if ( item.getStatus() == "VALIDADO" &&
            item.getEquipeResponsavelNome() == this.profissional.getEquipe().getNome() )
            return true;
        return false;
    }

    verifyStatusPlanoIntervencao( item: RiscoPotencialDto  ) {
        if ( item.getStatus() == "PLANEJAMENTO" && 
                item.getAbreviacaoEquipeAcolhimento() == this.profissional.getEquipe().getAbreviacao() )
            return true;
        return false;
    }

    verifyStatusCriarPlano( item: RiscoPotencialDto ) {
        if ( item.getStatus() == "ABERTO" && 
                item.getAbreviacaoEquipeAcolhimento() == this.profissional.getEquipe().getAbreviacao() )
            return true;
        return false;
    }
    
    verifyStatusAcompanhamento( item: RiscoPotencialDto  ) {
        if ( item.getStatus() == "VALIDADO" )
            return true;
        return false;
    }
    
    verifyAcolhimento( item: RiscoPotencialDto ) { 
        if ( this.profissional.getEquipe().getAbreviacao() == item.getAbreviacaoEquipeAcolhimento() )
            return true;
        return false;
    }
    
    transformDate( value: Date ): string {
        let date: string;
        let arrayDate: Array<string>;
        date = value.toString();
        arrayDate = date.split('T');
        arrayDate = arrayDate[0].split('-');
        date = arrayDate[2] + '/' + arrayDate[1] + '/' + arrayDate[0];
        return date;
    }
    
    selectFilter( event, type: string ) {
        this.filter = event.target.value;
        this.tipoFiltro = type;
        this.value = type;
    }

    dropdown( event, tipo ) {
        let arrayDropDown: Array<any> = new Array<any>();
        arrayDropDown = this.getItensDropDown( tipo );

        $( "#dropdown" ).empty();

        let count = 0;
        for ( let item of arrayDropDown ) {
            let el = $( "<li id='" + item + "' title='" + tipo + "'><input type='checkbox' id='" + item + ( ++count ) + "' value='false'>" +
                "<label for='" + ( item + count ) + "'>" + item + "</label></li>" );
            $( '#dropdown' ).append( el );
            let component = this;

            el.mousedown( function() {
                if ( $( this ).get( 0 ).children.item( 0 ).getAttribute( 'value' ) == 'false' ) {
                    $( this ).get( 0 ).children.item( 0 ).setAttribute( 'value', 'true' );
                    if ( component.arrayObjects[$( this ).attr( 'title' )] == undefined ) {
                        component.arrayObjects[$( this ).attr( 'title' )] = new Array<any>();
                        component.arrayTypes.push( $( this ).attr( 'title' ) );
                    }
                    component.arrayObjects[$( this ).attr( 'title' )].push( $( this ).attr( 'id' ) );
                } else {
                    $( this ).get( 0 ).children.item( 0 ).setAttribute( 'value', 'false' );
                    component.arrayObjects[$( this ).attr( 'title' )].splice(
                        component.arrayObjects[$( this ).attr( 'title' )].indexOf( $( this ).attr( 'id' ) ), 1 );
                }

                component.filter = this.getAttribute( 'id' );
                component.tipoFiltro = this.getAttribute( 'title' );
                component.value = undefined;

                setTimeout(() => {
                    component.filter = "";
                    component.tipoFiltro = "";
                    component.value = "timeout";
                }, 50 );
            } );

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

    selectItemDropDown( item, tipo ) {
        this.tipoFiltro = tipo;
        this.filter = item;
    }

    getItensDropDown( tipo ) {
        let arrayFilter: Array<any> = new Array<any>()
        
        this.riscoPotenciais.forEach( p => {
            if ( arrayFilter.find( a => a == p[tipo] ) == undefined &&
                p[tipo] != "" && p[tipo] != undefined ) {
                arrayFilter.push( p[tipo] );
            }
        } );

        return arrayFilter;
    }

    exportFile() {
        if ( this.riscoPotenciais.length > 0 )
            this.riscoPotencialService.exportFile( this.riscoPotenciais )
                .then( res => {
                    this.httpUtil.downloadFile( res, "risco-potencial.xlsx" );
                } )
                .catch( error => {
                    console.log( error );
                } )
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