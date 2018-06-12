import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Profissional } from './../model/profissional';
import { ProfissionalSaudeBuilder } from './../controller/profissional-saude/profissional-saude.builder';
import { ProfissionalSaudeFilter } from './../controller/profissional-saude/profissional-saude.filter';
import { Usuario } from './../model/usuario';
import { UsuarioBuilder } from './../controller/usuario/usuario.builder';
import { UsuarioFilter } from './../controller/usuario/usuario.filter';
import { PessoaFilter } from './../controller/pessoa/pessoa.filter';
import { EquipeFilter } from './../controller/equipe/equipe.filter';
import { EmpregadoFilter } from './../controller/empregado/empregado.filter';
import { Notificacao } from './../model/notificacao';
import { NotificacaoService } from './../controller/notificacao/notificacao.service';
import { NotificacaoGuard } from './../guards/guards-child/notificacao.guard';
import { GenericListComponent } from './../generics/generic.list.component';
import { NotificacaoFilter } from './../controller/notificacao/notificacao.filter';

@Component( {
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css', './../../assets/css/list-component.css']
} )
export class HomeComponent extends GenericListComponent<Notificacao, NotificacaoFilter, NotificacaoGuard> {
    private profissional: Profissional;
    private showPaginator: boolean;
    private showNothing: boolean;

    constructor(private notificacaoService: NotificacaoService, notificacaoGuard: NotificacaoGuard, router: Router) {
        super(notificacaoService, new NotificacaoFilter(), notificacaoGuard, router);
        
        this.msgEmptyPaginas = "Nada a notificar.";
        this.showPaginator = true;
        this.showNothing = false;
    }
    
    ngOnInit() {
        setTimeout(() => {
            if ( localStorage.getItem( "usuario-id" ) != undefined ) {
                this.notificacaoService.getUsuario( Number( localStorage.getItem( "usuario-id" ) ) )
                    .then( res => {
                        let usuario: Usuario = new UsuarioBuilder().clone( res.json() );
                        if ( usuario.getId() > 0 && usuario.getPessoa() != undefined ) {
                            this.showPreload = false;
                            let pessoaFilter: PessoaFilter = new PessoaFilter();
                            pessoaFilter.setCpf( usuario.getPessoa().getCpf() );
                            let profissionalFilter: ProfissionalSaudeFilter = new ProfissionalSaudeFilter();
                            profissionalFilter.setEmpregado( new EmpregadoFilter() );
                            profissionalFilter.getEmpregado().setPessoa(pessoaFilter);
    
                            this.notificacaoService.getProfissional( profissionalFilter )
                                .then( res => {
                                    if ( res.json().list[0] != undefined ) {
                                        this.profissional = new ProfissionalSaudeBuilder().clone( res.json().list[0] );
                                        
                                        this.filter.setEquipe(new EquipeFilter());
                                        this.filter.getEquipe().setId(this.profissional.getEquipe().getId());
                                        
                                        super.list();
                                    } else {
                                        this.showPreload = false;
                                        this.showPaginator = false;
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
        }, 500);
    }
    
    ngOnDestroy() {
        
    }
    
}
