import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import { Subscription } from 'rxjs/Rx';

import { Usuario } from './../../../model/usuario';
import { Triagem } from './../../../model/triagem';
import { TriagemBuilder } from './../../triagem/triagem.builder';
import { TriagemService } from './../../triagem/triagem.service';
import { Diagnostico } from './../../../model/diagnostico';
import { DiagnosticoBuilder } from './../../diagnostico/diagnostico.builder';
import { Intervencao } from './../../../model/intervencao';
import { IntervencaoBuilder } from './../../intervencao/intervencao.builder';
import { Equipe } from './../../../model/equipe';
import { EquipeBuilder } from './../../equipe/equipe.builder';
import { Eixo } from './../../../model/eixo';
import { EixoBuilder } from './../../eixo/eixo.builder';
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
import { GlobalVariable } from './../../../global';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { RiscoEmpregadoService } from './../../risco-empregado/risco-empregado.service';
import { PlanejamentoUtil } from './../../../generics/utils/planejamento.util';

@Component( {
    selector: 'app-risco-potencial-planejamento',
    templateUrl: './planejamento.html',
    styleUrls: ['./planejamento.css', './../../../../assets/css/form-component.css']
} )
export class PlanejamentoComponent extends GenericFormComponent implements OnInit {
    private nomeEmpregado: string;
    private riscoEmpregado: RiscoEmpregado;
    private profissional: Profissional;
    private tabsActions;
    private planejamentoUtil: PlanejamentoUtil;

    constructor( private route: ActivatedRoute,
        private riscoEmpregadoService: RiscoEmpregadoService,
        router: Router ) {
        super( riscoEmpregadoService, router );

        this.goTo = "risco-potencial";

        this.riscoEmpregado = new RiscoEmpregadoBuilder().initialize( new RiscoEmpregado() );
        this.profissional = new ProfissionalSaudeBuilder().initialize( new Profissional() );
        this.tabsActions = new EventEmitter<string | MaterializeAction>();
        
        this.planejamentoUtil = new PlanejamentoUtil();
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
                                            if ( params['id'] !== undefined ) {
                                                let id = params['id'];
                                                component.nomeEmpregado = params['empregado'];
                                                component.showPreload = true;

                                                component.riscoEmpregadoService.getByEquipe( component.profissional.getEquipe().getId(), id )
                                                    .then( res => {
                                                        component.showPreload = false;
                                                        this.riscoEmpregado = new RiscoEmpregadoBuilder().clone(res.json().list[0]);
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
        if ( !this.planejamentoUtil.verifyPlanejamento(this.riscoEmpregado.getTriagens(), this.profissional.getEquipe().getId()) ) {
            this.toastParams = ["Por favor, preencha os campos do Planejamento exigidos", 4000];
            this.globalActions.emit( 'toast' );
            return;
        }
        
        super.save( new RiscoEmpregadoBuilder().clone( this.riscoEmpregado ));
//        window.close();
    }

    ngOnDestroy() {
        if ( this.inscricao != undefined )
            this.inscricao.unsubscribe();
    }
    
}
