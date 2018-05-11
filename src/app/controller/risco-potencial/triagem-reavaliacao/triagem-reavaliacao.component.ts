import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import { Subscription } from 'rxjs/Rx';

import { Usuario } from './../../../model/usuario';
import { Triagem } from './../../../model/triagem';
import { TriagemBuilder } from './../../triagem/triagem.builder';
import { Diagnostico } from './../../../model/diagnostico';
import { DiagnosticoBuilder } from './../../diagnostico/diagnostico.builder';
import { Intervencao } from './../../../model/intervencao';
import { IntervencaoBuilder } from './../../intervencao/intervencao.builder';
import { Equipe } from './../../../model/equipe';
import { EquipeBuilder } from './../../equipe/equipe.builder';
import { EquipeFilter } from './../../equipe/equipe.filter';
import { UsuarioBuilder } from './../../usuario/usuario.builder';
import { Profissional } from './../../../model/profissional';
import { ProfissionalSaudeBuilder } from './../../profissional-saude/profissional-saude.builder';
import { ProfissionalSaudeFilter } from './../../profissional-saude/profissional-saude.filter';
import { EmpregadoFilter } from './../../empregado/empregado.filter';
import { PessoaFilter } from './../../pessoa/pessoa.filter';
import { RiscoEmpregado } from './../../../model/risco-empregado';
import { RiscoEmpregadoBuilder } from './../../risco-empregado/risco-empregado.builder';
import { RiscoPotencial } from './../../../model/risco-potencial';
import { RiscoPotencialBuilder } from './../../risco-potencial/risco-potencial.builder';
import { IndicadorSast } from './../../../model/indicador-sast';
import { IndicadorSastBuilder } from './../../indicador-sast/indicador-sast.builder';
import { GlobalVariable } from './../../../global';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { BooleanFilter } from './../../../generics/boolean.filter';
import { RiscoEmpregadoService } from './../../risco-empregado/risco-empregado.service';
import { RiscoEmpregadoFilter } from './../../risco-empregado/risco-empregado.filter';
import { RiscoPotencialService } from './../../risco-potencial/risco-potencial.service';
import { RiscoPotencialFilter } from './../../risco-potencial/risco-potencial.filter';

@Component({
  selector: 'app-triagem-reavaliacao',
  templateUrl: './triagem-reavaliacao.html',
  styleUrls: ['./triagem-reavaliacao.css', './../../../../assets/css/form-component.css']
})
export class TriagemReavaliacaoComponent extends GenericFormComponent implements OnInit {
    private riscoEmpregado: RiscoEmpregado;
    private profissional: Profissional;
    private triagemIndices: Map<number, number>;
    private nomeEmpregado: string;
    
    constructor(private route: ActivatedRoute,
            private riscoEmpregadoService: RiscoEmpregadoService,
            router: Router) {
            super( riscoEmpregadoService, router );
        
            this.goTo = "risco-potencial";
            
            this.riscoEmpregado = new RiscoEmpregadoBuilder().initialize(new RiscoEmpregado());
            this.profissional = new ProfissionalSaudeBuilder().initialize(new Profissional());
            this.triagemIndices = new Map<number, number>();
    }

    ngOnInit() {
        let component = this;
        if ( localStorage.getItem( "usuario-id" ) != undefined ) {
            component.riscoEmpregadoService.getUsuario( Number( localStorage.getItem( "usuario-id" ) ) )
                .then( res => {
                    let usuario: Usuario = new Usuario();
                    usuario = new UsuarioBuilder().clone( res.json() );
                    if ( usuario.getId() > 0 && usuario.getPessoa() != undefined ) {
                        let profissionalFilter: ProfissionalSaudeFilter = new ProfissionalSaudeFilter();
                        profissionalFilter.setEmpregado( new EmpregadoFilter() );
                        profissionalFilter.getEmpregado().setPessoa( new PessoaFilter() );
                        profissionalFilter.getEmpregado().getPessoa().setCpf( usuario.getPessoa().getCpf() );
                        
                        component.riscoEmpregadoService.getProfissional( profissionalFilter )
                            .then( res => {
                                if ( res.json().list[0] != undefined ) {
                                    component.profissional = new ProfissionalSaudeBuilder().clone( res.json().list[0] );
                                
                                    component.inscricao = this.route.params.subscribe(
                                            ( params: any ) => {
                                                if( params['id'] !== undefined ) {
                                                    let id = params['id'];
                                                    component.showPreload = true;
                                                    
                                                    let riscoEmpregadoFilter: RiscoEmpregadoFilter = new RiscoEmpregadoFilter();
                                                    riscoEmpregadoFilter.setRiscoPotencial(new RiscoPotencialFilter());
                                                    riscoEmpregadoFilter.getRiscoPotencial().setId(id);
                                                    riscoEmpregadoFilter.setEquipe(new EquipeFilter());
                                                    riscoEmpregadoFilter.getEquipe().setId(this.profissional.getEquipe().getId());
                                                    riscoEmpregadoFilter.setStatus('VALIDADO');
    
                                                    component.riscoEmpregadoService.listToCopy(riscoEmpregadoFilter)
                                                        .then( res => {
                                                            component.showPreload = false;
                                                            this.riscoEmpregado = new RiscoEmpregadoBuilder().clone( res.json().list[0] );
                                                            this.nomeEmpregado = this.riscoEmpregado.getRiscoPotencial().getEmpregado().getPessoa().getNome();
                                                            setTimeout(() => {
                                                                component.triagemIndices = new Map<number, number>();
                                                                
                                                                for ( let idx = 0; idx < component.riscoEmpregado.getTriagens().length; idx++ ) {
                                                                    component.triagemIndices.set( idx, this.riscoEmpregado.getTriagens()[idx].getIndice() );
                                                                    if ( component.riscoEmpregado.getTriagens()[idx].getIndice() != -1 ) {
                                                                        let i: string = "indice" + component.triagemIndices.get( idx ) + "_" + idx;
                                                                        $( "td[title=" + i + "]" ).css( "background", "#D4D4D4" );
                                                                    }
                                                                }
                                                            }, 200 );
                                                            console.log(this.riscoEmpregado);
                                                        } )
                                                        .catch( error => {
                                                            component.catchConfiguration( error );
                                                        } )
                                                }
                                            } );
                            } else {
                                component.router.navigate( ["/risco-potencial"] );
                                    return;
                                }
                            } )
                            .catch( error => {
                                console.log( "Erro no servidor ao buscar o profissional. Tentar mais tarde." );
                                component.catchConfiguration( error );
                            } )
                    } else {
                        component.router.navigate( ["/login"] );
                        return;
                    }
                } )
                .catch( error => {
                    console.log( "Erro no servidor ao buscar o usuario." );
                    component.catchConfiguration( error );
                } )
        } else {
            console.log( "Usuario nao logada." );
            component.router.navigate( ["/login"] );
        }
    }
    
    save() {
        
        if ( !this.verifyValidTriagens() ) {
            this.toastParams = ["Por favor, preencha os campos de Triagem exigidos", 4000];
            this.globalActions.emit( 'toast' );
            return;
        }
        
        this.showPreload = true;
        this.canDeactivate = true;
        this.riscoEmpregadoService.saveReavaliacao(new RiscoEmpregadoBuilder().clone(this.riscoEmpregado))
            .then( res => {
                this.processReturn( true, res );
            } )
            .catch( error => {
                this.processReturn( false, error );
            } )
    }
    
    verifyValidTriagens() {
        let triagem = this.riscoEmpregado.getTriagens().find( t => {
            if ( t.getIndicadorSast().getObrigatorio() == true && t.getIndice() == -1 )
                return true;
            else return false;
        } );

        if ( triagem != undefined ) return false;
        else return true;
    }
    
    verifyIndiceTriagem( triagem: Triagem ) {
        if ( triagem.getIndice() > -1 ) return true;

        return false;
    }
    
    getIndiceDescricao( triagem: Triagem ) {
        return triagem.getIndice() + " - " + triagem["indicadorSast"]["indice" + triagem.getIndice()];
    }
    
    selectTriagem( indexTriagem, indice ) {
        let i: string = "indice" + indice + "_" + indexTriagem.toString();

        if ( this.triagemIndices.get( indexTriagem ) != undefined ) {
            if ( this.triagemIndices.get( indexTriagem ) == Number( indice ) ) {
                $( "td[title=" + i + "]" ).css( "background", "" );
                this.riscoEmpregado.getTriagens()[indexTriagem].setIndice( -1 );
                this.triagemIndices.delete( indexTriagem );
                return;
            }
            let iAntigo: string = "indice" + this.triagemIndices.get( indexTriagem ) + "_" + indexTriagem.toString();
            $( "td[title=" + iAntigo + "]" ).css( "background", "" );
        }

        $( "td[title=" + i + "]" ).css( "background", "#D4D4D4" );
        
        this.triagemIndices.set( indexTriagem, Number( indice ) );

        this.riscoEmpregado.getTriagens()[indexTriagem].setIndice( Number( indice ) );
    }
    
    verifyObrigatoriedadeIndicador( triagem: Triagem ) {
        if ( triagem.getIndicadorSast().getObrigatorio() ) 
            return "triagem-indicador-bold";
        
        return "";
    } 
    
    ngOnDestroy() {
        if ( this.inscricao != undefined ) 
            this.inscricao.unsubscribe();
    }
}
