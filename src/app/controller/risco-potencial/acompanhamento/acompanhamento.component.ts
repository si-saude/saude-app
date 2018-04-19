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
    private dataTarefaAcao: any;
    private dataAcoes = [[]];
    private flagTriagem: Triagem;
    private flagIndexAcao: number = -1;
    private modalAcao;
    private profissional: Profissional;

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
                                                        this.getDataTarefaAcoes();
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
        } )
    }

    getDataTarefaAcoes() {
        this.riscoPotencial.getRiscoEmpregados().forEach( rE => {
            rE.getTriagens().forEach( t => {
                t.getAcoes().forEach( a => {
                    if ( this.dataAcoes[t.getId()] == undefined )
                        this.dataAcoes[t.getId()] = new Array<any>();
                    let data = this.addFormattedDate( a.getTarefa().getFim() );
                    this.dataAcoes[t.getId()].push( data );
                } );
            } );
        } );
    }

    addFormattedDate( data: any ) {
        if ( data === undefined || data === null ) {
            return undefined;
        }
        let s = data.split( "T" );
        let datas = s[0].split( "-" );
        let st = datas[2] + "/" + datas[1] + "/" + datas[0];
        let o = { formatted: st };
        return o;
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
    
    triagensEncerradas() {
        let ret: boolean = true;
        this.equipesAbordagemTriagens.forEach(eA => {
            this.triagensByEquipeAbordagem[eA.getId()].forEach(t => {
                if ( t.getAcoes().find( a => a.getStatus() != "ENCERRADA" ) != undefined )
                    ret = false;
            });
        });
        return ret;
    }

    verifyAcompanhamento( acao: Acao ) {
        if ( acao.getStatus() == this.statusAcoes[1] )
            return false;
        
        return true;
    }
    
    verifyEncerrarAcompanhamento(triagem: Triagem, acao: Acao) {
        if ( this.profissional.getEquipe().getId() != triagem.getEquipeAbordagem().getId() )
            return false;
        
        if ( acao.getStatus() == this.statusAcoes[1] )
            return false;
        
        return true;
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
