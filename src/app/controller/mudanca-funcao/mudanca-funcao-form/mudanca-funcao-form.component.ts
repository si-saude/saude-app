import { Component, OnInit, ViewChild, EventEmitter,ViewEncapsulation, ElementRef} from '@angular/core';
import { NgForm } from "@angular/forms";


import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { MaterializeDirective} from "angular2-materialize";
import { MaterializeAction } from "angular2-materialize";

import { Usuario } from './../../../model/usuario';
import { UsuarioBuilder } from './../../usuario/usuario.builder';
import { PessoaFilter } from './../../pessoa/pessoa.filter';
import { ProfissionalSaudeFilter } from './../../profissional-saude/profissional-saude.filter';
import { ProfissionalSaudeBuilder } from './../../profissional-saude/profissional-saude.builder';
import { EmpregadoFilter } from './../../empregado/empregado.filter';

import { GlobalVariable } from './../../../global';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { MudancaFuncao } from './../../../model/mudanca-funcao';
import { MudancaFuncaoBuilder } from './../mudanca-funcao.builder';
import { MudancaFuncaoService } from './../mudanca-funcao.service';
import { RegimeService } from './../../regime/regime.service';

import { Profissional } from './../../../model/profissional';
import { Tarefa } from './../../../model/tarefa';
import { TarefaBuilder } from './../../tarefa/tarefa.builder';
import { EmpregadoBuilder } from './../../empregado/empregado.builder';


@Component( {
    selector: 'app-mudanca-funcao-form',
    templateUrl: './mudanca-funcao-form.html',   
    styleUrls: ['./mudanca-funcao-form.css','./../../../../assets/css/modal-filter.css','./../../../../assets/css/form-component.css']
} )
export class MudancaFuncaoFormComponent extends GenericFormComponent implements OnInit {
    private listStatus: Array<string>;   
    private usuario: Usuario;
    private profissional: Profissional;
    mudancaFuncao: MudancaFuncao;
    private tarefaMedicinaOcupacional:Tarefa;
    private tarefaErgonomia:Tarefa;
    private tarefaHigieneOcupacional:Tarefa;
        
    constructor( private route: ActivatedRoute,
        private mudancaFuncaoService: MudancaFuncaoService,
        router: Router) {
        super( mudancaFuncaoService, router );
        this.goTo = "mudanca-funcao";
        
        this.globalActions = new EventEmitter<string | MaterializeAction>();
        this.mudancaFuncao = new MudancaFuncaoBuilder().initialize(this.mudancaFuncao);
        this.listStatus = new Array<string>();
        this.profissional = new ProfissionalSaudeBuilder().initialize( new Profissional() );
        this.tarefaMedicinaOcupacional = new TarefaBuilder().initialize(new Tarefa());
        this.tarefaErgonomia = new TarefaBuilder().initialize(new Tarefa());
        this.tarefaHigieneOcupacional = new TarefaBuilder().initialize(new Tarefa());
    }

    ngOnInit() {        
        if ( localStorage.getItem( "usuario-id" ) != undefined ) {
            this.mudancaFuncaoService.getUsuario( Number( localStorage.getItem( "usuario-id" ) ) )
                .then( res => {
                    this.usuario = new UsuarioBuilder().clone( res.json() );
                    if ( this.usuario.getId() > 0 && this.usuario.getPessoa() != undefined ) {
                        let pessoaFilter: PessoaFilter = new PessoaFilter();
                        pessoaFilter.setCpf( this.usuario.getPessoa().getCpf() );
                        let empregadoFilter: EmpregadoFilter = new EmpregadoFilter();
                        empregadoFilter.setPessoa( pessoaFilter );
                        let profissionalFilter: ProfissionalSaudeFilter = new ProfissionalSaudeFilter();
                        profissionalFilter.setEmpregado( empregadoFilter );

                        this.mudancaFuncaoService.getProfissional( profissionalFilter )
                            .then( res => {
                                if ( res.json().list[0] != undefined ) {
                                    this.profissional = new ProfissionalSaudeBuilder().clone( res.json().list[0] );
                                    this.inscricao = this.route.params.subscribe(
                                                ( params: any ) => {
                                                    if ( params['id'] !== undefined ) {
                                                        let id = params['id'];
                                                        this.showPreload = true;
                                
                                                        this.service.get( id )
                                                            .then( res => {
                                                                this.showPreload = false;
                                                                this.mudancaFuncao = new MudancaFuncaoBuilder().clone( res.json() );
                                                                this.tarefaMedicinaOcupacional = this.mudancaFuncao.getTarefas().find(x => x.getEquipe().getAbreviacao() == 'MED');
                                                                this.tarefaErgonomia = this.mudancaFuncao.getTarefas().find(x => x.getEquipe().getAbreviacao() == 'ERG');
                                                                this.tarefaHigieneOcupacional = this.mudancaFuncao.getTarefas().find(x => x.getEquipe().getAbreviacao() == 'HIG');                                                                
                                                                this.tarefaMedicinaOcupacional.getInicioCustomDate().setAppTime("08:00");
                                                                this.loadingEmpregado();
                                                                this.verifyEquipes();
                                                        } )
                                                            .catch( error => {
                                                                this.catchConfiguration( error );
                                                             } )
                                                    }
                                                } );                                      
                                    this.getStatus();
                                        
                                } else {
                                    this.router.navigate( ["/home"] );
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
    
    getStatus() {
        this.mudancaFuncaoService.getStatus()
            .then(res => {
                this.listStatus = Object.keys( res.json() ).sort();
            })
            .catch(error => {
                console.log("Erro ao retornar Status.");
            })
    }

    setarResponsavel(i: number) { 
        if(this.profissional.getEquipe().getId() == this.mudancaFuncao.getTarefas()[i].getEquipe().getId() ||
           this.profissional.getEquipes().find(e=> e.getId() == this.mudancaFuncao.getTarefas()[i].getEquipe().getId())){
            this.mudancaFuncao.getTarefas()[i].setResponsavel(this.profissional);
        }
    }
    ngOnDestroy() {
        this.inscricao.unsubscribe();
    }
    
    save() {
        super.save( new MudancaFuncaoBuilder().clone( this.mudancaFuncao ) );
    }   
    
    solicitarConvocacao(){        
        this.mudancaFuncaoService.solicitarConvocacao(new MudancaFuncaoBuilder().clone(this.mudancaFuncao))
        .then(res => {  
                 localStorage.setItem("tarefa", JSON.stringify(this.tarefaMedicinaOcupacional));
                 window.open("/solicitacao-servico/solicitacao-central-integra");              
        })
        .catch(error => {
            this.catchConfiguration( error );
        })  
    }
    
    aplicarAlteracao(){   
            this.mudancaFuncaoService.aplicarAlteracoes(new MudancaFuncaoBuilder().clone(this.mudancaFuncao))
            .then(res => {
                this.processReturn( true, res );
            })
            .catch(error => {
                this.catchConfiguration( error );
            })    
    }
    
    loadingEmpregado() {            
        this.mudancaFuncaoService.getEmpregadoService().get(this.mudancaFuncao.getTarefas()[0].getCliente().getId())
           .then( res => {
               this.mudancaFuncao.getTarefas()[0].setCliente(new EmpregadoBuilder().clone( res.json() ));
           } )
           .catch( error => {
               console.log( error );
           } )
    }
    
    
    
    verifyEquipes(){
        this.mudancaFuncao.getTarefas().forEach(x=>{
            if(this.profissional.getEquipe().getId() == x.getEquipe().getId() || this.profissional.getEquipes().find(e=>e.getId() == x.getEquipe().getId())){
                x.setDesabilitarTarefaMundancaFuncao(false);
             }else
                x.setDesabilitarTarefaMundancaFuncao(true);
        });
    }
    
}