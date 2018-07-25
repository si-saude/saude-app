import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


import { Usuario } from './../../../model/usuario';
import { UsuarioBuilder } from './../../usuario/usuario.builder';
import { PessoaFilter } from './../../pessoa/pessoa.filter';
import { ProfissionalSaudeFilter } from './../../profissional-saude/profissional-saude.filter';
import { ProfissionalSaudeBuilder } from './../../profissional-saude/profissional-saude.builder';
import { EmpregadoFilter } from './../../empregado/empregado.filter';
import { Profissional } from './../../../model/profissional';

import { FilaAtendimentoOcupacional } from './../../../model/fila-atendimento-ocupacional';
import { GlobalVariable } from './../../../global';
import { Atendimento } from './../../../model/atendimento';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { AtendimentoBuilder } from './../../atendimento/atendimento.builder';
import { LocalizacaoBuilder } from './../../localizacao/localizacao.builder';
import { AtendimentoService } from './../../atendimento/atendimento.service';
import { Localizacao } from './../../../model/localizacao';
import { ModalFilaAtendimentoOcupacionalComponent } from './../../../includes/modal-fila-atendimento-ocupacional/modal-fila-atendimento-ocupacional.component';

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

    @ViewChild( ModalFilaAtendimentoOcupacionalComponent ) modalFilaAtendimento: ModalFilaAtendimentoOcupacionalComponent;

    constructor( private route: ActivatedRoute,
        private atendimentoService: AtendimentoService,
        router: Router ) {
        super( atendimentoService, router );

        this.goTo = "atendimento-avulso";
        this.localizacoes = new LocalizacaoBuilder().initializeList( this.localizacoes );
        this.atendimento = new AtendimentoBuilder().initialize( this.atendimento );
        this.profissional = new ProfissionalSaudeBuilder().initialize( new Profissional() );
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
                                    this.inscricao = this.route.params.subscribe(
                                        ( params: any ) => {
                                            if ( params['id'] !== undefined ) {
                                                let id = params['id'];
                                                this.showPreload = true;

                                                this.atendimentoService.get( id )
                                                    .then( res => {
                                                        this.showPreload = false;
                                                        this.atendimento = new AtendimentoBuilder().clone( res.json() );
                                                    } )
                                                    .catch( error => {
                                                        this.catchConfiguration( error );
                                                    } )
                                            }
                                        } );
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
        super.save( new AtendimentoBuilder().clone( this.atendimento ) );
    }

}