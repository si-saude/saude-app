import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


import { Usuario } from './../../../model/usuario';
import { UsuarioBuilder } from './../../usuario/usuario.builder';
import { PessoaFilter } from './../../pessoa/pessoa.filter';
import { ProfissionalSaudeFilter } from './../../profissional-saude/profissional-saude.filter';
import { ProfissionalSaudeBuilder } from './../../profissional-saude/profissional-saude.builder';
import { EmpregadoFilter } from './../../empregado/empregado.filter';
import { Profissional } from './../../../model/profissional';
import { MaterializeAction } from "angular2-materialize";

import { FilaAtendimentoOcupacional } from './../../../model/fila-atendimento-ocupacional';
import { GlobalVariable } from './../../../global';
import { Atendimento } from './../../../model/atendimento';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { AtendimentoBuilder } from './../../atendimento/atendimento.builder';
import { LocalizacaoBuilder } from './../../localizacao/localizacao.builder';
import { AtendimentoService } from './../../atendimento/atendimento.service';
import { Localizacao } from './../../../model/localizacao';
import { ModalFilaAtendimentoOcupacionalComponent } from './../../../includes/modal-fila-atendimento-ocupacional/modal-fila-atendimento-ocupacional.component';
import { ModalTarefaComponent } from './../../../includes/modal-tarefa/modal-tarefa.component';
import { ModalFilaEsperaOcupacionalComponent } from './../../../includes/modal-fila-espera-ocupacional/modal-fila-espera-ocupacional.component';

@Component( {
    selector: 'app-atendimento-avulso-form',
    templateUrl: './atendimento-avulso-form.html',
    styleUrls: ['./atendimento-avulso-form.css', './../../../../assets/css/form-component.css']
} )
export class AtendimentoAvulsoFormComponent extends GenericFormComponent implements OnInit {

    atendimento: Atendimento;
    private localizacoes: Array<Localizacao>;
    private usuario: Usuario;
    private profissional: Profissional;
    private diaHoraTarefaInicioTimeActions;

    @ViewChild( ModalFilaAtendimentoOcupacionalComponent ) modalFilaAtendimento: ModalFilaAtendimentoOcupacionalComponent;
    @ViewChild( ModalFilaEsperaOcupacionalComponent ) modalFilaEspera: ModalFilaEsperaOcupacionalComponent;
    @ViewChild( ModalTarefaComponent ) modalTarefa: ModalTarefaComponent;


    constructor( private route: ActivatedRoute,
        private atendimentoService: AtendimentoService,
        router: Router ) {
        super( atendimentoService, router );

        this.goTo = "atendimento-avulso";
        this.localizacoes = new LocalizacaoBuilder().initializeList( this.localizacoes );
        this.atendimento = new AtendimentoBuilder().initialize( this.atendimento );
        this.profissional = new ProfissionalSaudeBuilder().initialize( new Profissional() );
        this.diaHoraTarefaInicioTimeActions = new EventEmitter<string|MaterializeAction>();
    }

    ngOnInit() {
        if ( localStorage.getItem( "usuario-id" ) != undefined ) {
            this.atendimentoService.getUsuario( Number( localStorage.getItem( "usuario-id" ) ) )
                .then( res => {
                    this.usuario = new UsuarioBuilder().clone( res.json() );
                    if ( this.usuario.getId() > 0 && this.usuario.getPessoa() != undefined ) {
                        let pessoaFilter: PessoaFilter = new PessoaFilter();
                        pessoaFilter.setCpf( this.usuario.getPessoa().getCpf() );
                        let empregadoFilter: EmpregadoFilter = new EmpregadoFilter();
                        empregadoFilter.setPessoa( pessoaFilter );
                        let profissionalFilter: ProfissionalSaudeFilter = new ProfissionalSaudeFilter();
                        profissionalFilter.setEmpregado( empregadoFilter );

                        this.atendimentoService.getProfissional( profissionalFilter )
                            .then( res => {
                                if ( res.json().list[0] != undefined ) {
                                    this.profissional = new ProfissionalSaudeBuilder().clone( res.json().list[0] );
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
            console.log( "Usuario nao logado." );
            this.router.navigate( ["/login"] );
        }

    }

    save() {
        this.showPreload = true;
        this.canDeactivate = true;
        this.atendimentoService.saveAtendimentoAvulso( new AtendimentoBuilder().clone( this.atendimento ) )
            .then( res => {
                this.processReturn( true, res );
            } )
            .catch( error => {
                this.processReturn( false, error );
            } )
    }

}