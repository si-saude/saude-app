import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import * as $ from 'jquery';

import { GlobalVariable } from './../../../global';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { RiscoPotencialService } from './../risco-potencial.service';
import { Triagem } from './../../../model/triagem';
import { Equipe } from './../../../model/equipe';
import { EquipeBuilder } from './../../equipe/equipe.builder';
import { Acompanhamento } from './../../../model/acompanhamento';
import { AcompanhamentoBuilder } from './../../acompanhamento/acompanhamento.builder';
import { Acao } from './../../../model/acao';
import { AcaoBuilder } from './../../acao/acao.builder';
import { Tarefa } from './../../../model/tarefa';
import { RiscoPotencial } from './../../../model/risco-potencial';
import { RiscoPotencialBuilder } from './../risco-potencial.builder';
import { RiscoPotencialFilter } from './../risco-potencial.filter';
import { UsuarioBuilder } from './../../usuario/usuario.builder';
import { Profissional } from './../../../model/profissional';
import { ProfissionalSaudeBuilder } from './../../profissional-saude/profissional-saude.builder';
import { ProfissionalSaudeFilter } from './../../profissional-saude/profissional-saude.filter';
import { Usuario } from './../../../model/usuario';
import { PessoaFilter } from './../../pessoa/pessoa.filter';
import { EmpregadoFilter } from './../../empregado/empregado.filter';
import { ConfirmSaveComponent } from './../../../includes/confirm-save/confirm-save.component';

@Component( {
    selector: 'app-acompanhamento',
    templateUrl: './acompanhamento.html',
    styleUrls: ['./acompanhamento.css', './../../../../assets/css/form-component.css']
} )
export class AcompanhamentoComponent extends GenericFormComponent implements OnInit {
    private equipesAbordagemTriagens: Array<Equipe>;
    private triagensByEquipeAbordagem = [[]];
    private riscoPotencial: RiscoPotencial;
    private acao: Acao;
    private tipoAcoes: Array<string>;
    private statusAcoes: Array<string>;
    private tipoContatoAcoes: Array<string>;
    private flagTriagem: Triagem;
    private flagIndexAcao: number = -1;
    private modalAcao;
    private profissional: Profissional;
    @ViewChild( ConfirmSaveComponent) confirmSaveComponent: ConfirmSaveComponent;

    constructor( private route: ActivatedRoute,
        private riscoPotencialService: RiscoPotencialService,
        router: Router ) {
        super( riscoPotencialService, router );

        this.goTo = "risco-potencial";

        this.equipesAbordagemTriagens = new EquipeBuilder().initializeList( new Array<Equipe>() );
        this.riscoPotencial = new RiscoPotencialBuilder().initialize( new RiscoPotencial() );
        this.modalAcao = new EventEmitter<string | MaterializeAction>();
        this.acao = new AcaoBuilder().initialize( new Acao() );
        this.profissional = new ProfissionalSaudeBuilder().initialize( new Profissional() );
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
                                if ( res.json().list[0] != undefined ) {
                                    this.profissional = new ProfissionalSaudeBuilder().clone( res.json().list[0] );

                                    this.inscricao = this.route.params.subscribe(
                                        ( params: any ) => {
                                            if ( params['id'] !== undefined ) {
                                                let id = params['id'];
                                                this.showPreload = true;

                                                this.riscoPotencialService.getAcoes( id )
                                                    .then( res => {
                                                        this.showPreload = false;
                                                        this.riscoPotencial = new RiscoPotencialBuilder().clone( res.json() );
                                                        this.riscoPotencial.setProfissional(this.profissional);
                                                        this.getTriagensEquipeAbordagem();
                                                    } )
                                                    .catch( error => {
                                                        this.showPreload = false;
                                                        this.catchConfiguration( error );
                                                    } )
                                            }
                                        } );
                                    this.getTipoAcao();
                                    this.getStatusAcao();
                                    this.getTipoContatoAcao();                                    
                                } else {
                                    this.router.navigate( ["/risco-potencial"] );
                                    return;
                                }
                            } )
                            .catch( error => {
                                console.log( "Erro no servidor ao buscar o profissional. Tentar mais tarde." );
                                this.catchConfiguration( error );
                            } )
                    } else {
                        this.router.navigate( ["/login"] );
                        return;
                    }
                } )
                .catch( error => {
                    console.log( "Erro no servidor ao buscar o usuario." );
                    this.catchConfiguration( error );
                } )
        } else {
            console.log( "Usuario nao logada." );
            this.router.navigate( ["/login"] );
        }
    }

    getTipoAcao() {
        this.riscoPotencialService.getTipoAcao( new RiscoPotencialFilter() )
            .then( res => {
                this.tipoAcoes = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
                console.log( error );
            } )
    }

    getStatusAcao() {
        this.riscoPotencialService.getStatusAcao( new RiscoPotencialFilter() )
            .then( res => {
                this.statusAcoes = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
                console.log( error );
            } )
    }

    getTipoContatoAcao() {
        this.riscoPotencialService.getTipoContatoAcao( new RiscoPotencialFilter() )
            .then( res => {
                this.tipoContatoAcoes = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
                console.log( error );
            } )
    }

    save() {
        this.showPreload = true;
        this.canDeactivate = true;
        this.riscoPotencialService.saveAcompanhamentos( new RiscoPotencialBuilder().clone( this.riscoPotencial ) )
            .then( res => {
                this.confirmSaveComponent.setGoTo("$*close*$");
                this.processReturn( true, res );
            } )
            .catch( error => {
                this.processReturn( false, error );
            } )
    }
    
    savaAndRedirect() {
        this.showPreload = true;
        this.canDeactivate = true;
        this.riscoPotencialService.saveAcompanhamentos( new RiscoPotencialBuilder().clone( this.riscoPotencial ) )
            .then( res => {
                this.router.navigate(['/risco-potencial/triagem-reavaliacao', this.riscoPotencial.getId()])
            } )
            .catch( error => {
                this.processReturn( false, error );
            } )
    }

    getTriagensEquipeAbordagem() {
        this.riscoPotencial.getRiscoEmpregados().forEach( rE => {
            if ( rE.getAtivo() ) {
                rE.getTriagens().forEach( t => {
                    if ( this.riscoPotencial.getEquipeResponsavel().getId() == this.profissional.getEquipe().getId() ||
                            this.profissional.getEquipe().getId() == t.getEquipeAbordagem().getId() ) {
                        if ( t.getEquipeAbordagem().getId() > 0 &&
                            this.equipesAbordagemTriagens.find( eA => eA.getId() == t.getEquipeAbordagem().getId() ) == undefined ) {
        
                            if ( this.riscoPotencial.getEquipes().find( e => e.getId() == t.getEquipeAbordagem().getId() ) != undefined ) {
                                this.equipesAbordagemTriagens.push( t.getEquipeAbordagem() );
                                this.triagensByEquipeAbordagem[t.getEquipeAbordagem().getId()] = new Array<Triagem>();
                            }
                        }
        
                        if ( this.triagensByEquipeAbordagem[t.getEquipeAbordagem().getId()] != undefined &&
                            t.getEquipeAbordagem().getId() > 0 )
                            this.triagensByEquipeAbordagem[t.getEquipeAbordagem().getId()].push( t );
                    }
                } )
            }
        } )
    }

    addAcompanhamento( idEquipe, idTriagem, indexAcao ) {
        let triagem: Triagem = this.triagensByEquipeAbordagem[idEquipe].find( t => t.getId() == idTriagem );
        triagem.getAcoes()[indexAcao].getAcompanhamentos().push( new Acompanhamento() );
    }

    removeAcompanhamento( idEquipe, idTriagem, indexAcao, indexAcompanhamento ) {
        let triagem: Triagem = this.triagensByEquipeAbordagem[idEquipe].find( t => t.getId() == idTriagem );
        triagem.getAcoes()[indexAcao].getAcompanhamentos().splice( indexAcompanhamento, 1 );
    }

    encerrarAcao( idEquipe, idTriagem, indexAcao ) {
        let triagem: Triagem = this.triagensByEquipeAbordagem[idEquipe].find( t => t.getId() == idTriagem );
        triagem.getAcoes()[indexAcao].setStatus( this.statusAcoes[1] )
    }
    
    validarAcao( idEquipe, idTriagem, indexAcao ) {
        let triagem: Triagem = this.triagensByEquipeAbordagem[idEquipe].find( t => t.getId() == idTriagem );
        triagem.getAcoes()[indexAcao].setStatus( this.statusAcoes[4] );
    }
    
    triagensValidadas() {
        let ret: boolean = (this.equipesAbordagemTriagens != undefined && this.equipesAbordagemTriagens.length > 0);
        this.equipesAbordagemTriagens.forEach(eA => {
            this.triagensByEquipeAbordagem[eA.getId()].forEach(t => {
                if ( t.getIgnorarAcoes() ) return; 
                if ( ( this.profissional.getEquipe().getId() != this.riscoPotencial.getEquipeResponsavel().getId() && 
                        t.getIndicadorSast().getEquipe().getId() != this.profissional.getEquipe().getId() &&
                        t.getEquipeAbordagem().getId() != this.profissional.getEquipe().getId() ) ||
                                t.getAcoes() == undefined || 
                                t.getAcoes().length == 0 ||
                                t.getAcoes().filter(a => a.getStatus() != "VALIDADA").
                                    filter(a1 => a1.getStatus() != "REAVALIADA").length > 0 )
                    ret = false;
            });
        });
        
        return ret;
    }

    verifyAcompanhamento( acao: Acao ) {
        if ( acao.getStatus() == this.statusAcoes[1] || 
                acao.getStatus() == this.statusAcoes[3] || 
                acao.getStatus() == this.statusAcoes[4] )
            return false;
        
        return true;
    }
    
    verifyEncerrarAcompanhamento(triagem: Triagem, acao: Acao) {
        if ( this.profissional.getEquipe().getId() != triagem.getEquipeAbordagem().getId() || 
                acao.getStatus() == this.statusAcoes[1] || 
                acao.getStatus() == this.statusAcoes[3] ||
                acao.getStatus() == this.statusAcoes[4] )
            return false;
        
        return true;
    }
    
    verifyValidarAcompanhamento(triagem: Triagem, acao: Acao) {
        if ( this.profissional.getEquipe().getId() == this.riscoPotencial.getEquipeResponsavel().getId() && 
                acao.getStatus() == this.statusAcoes[1] )
            return true;
        
        return false;
    }
    
    getIndiceDescricao( triagem: Triagem ) {
        return triagem.getIndice() + " - " + triagem["indicadorSast"]["indice" + triagem.getIndice()];
    }

    openModal() {
        this.modalAcao.emit( { action: "modal", params: ['open'] } );
    }

    closeModal() {
        this.modalAcao.emit( { action: "modal", params: ['close'] } );
    }

    ngOnDestroy() {
        if ( this.inscricao != undefined )
            this.inscricao.unsubscribe();
    }
}
