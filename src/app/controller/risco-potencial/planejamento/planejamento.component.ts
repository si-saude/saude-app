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

@Component( {
    selector: 'app-risco-potencial-planejamento',
    templateUrl: './planejamento.html',
    styleUrls: ['./planejamento.css', './../../../../assets/css/form-component.css']
} )
export class PlanejamentoComponent extends GenericFormComponent implements OnInit {
    private nomeEmpregado: string;
    private riscoEmpregado: RiscoEmpregado;
    private profissional: Profissional;
    private prazos: Array<string>;
    private tabsActions;
    
    private flagIdTriagem: number;
    private activeDiagnostico:boolean;
    private activeIntervencao:boolean;
    
    private idEquipeProfissional: number;
    private showModalDiagnostico: boolean;
    private showModalIntervencao: boolean;
    private showModalEquipe: boolean;

    constructor( private route: ActivatedRoute,
        private riscoEmpregadoService: RiscoEmpregadoService,
        router: Router ) {
        super( riscoEmpregadoService, router );

        this.goTo = "risco-potencial";

        this.riscoEmpregado = new RiscoEmpregadoBuilder().initialize( new RiscoEmpregado() );
        this.profissional = new ProfissionalSaudeBuilder().initialize( new Profissional() );
        this.tabsActions = new EventEmitter<string | MaterializeAction>();
        this.prazos = new Array<string>();
        
        this.activeDiagnostico = false;
        this.activeIntervencao = false;
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

        component.getPrazos();
    }

    save() {
        if ( !this.verifyPlanejamento() ) {
            this.toastParams = ["Por favor, preencha os campos do Planejamento exigidos", 4000];
            this.globalActions.emit( 'toast' );
            return;
        }
        
        super.save( new RiscoEmpregadoBuilder().clone( this.riscoEmpregado ));
    }

    getPrazos() {
        this.riscoEmpregadoService.getPrazos()
            .then( res => {
                this.prazos = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
                console.log( "Erro ao retornar os prazos." );
            } )
    }

    verifyIndiceTriagem( triagem: Triagem ) {
        if ( triagem.getIndice() > -1 ) return true;

        return false;
    }

    getIndiceDescricao( triagem: Triagem ) {
        return triagem.getIndice() + " - " + triagem["indicadorSast"]["indice" + triagem.getIndice()];
    }
    
    verifyPlanejamento() {
        let ret: boolean = true;
        let ts: Array<Triagem> = new Array<Triagem>();
        let triagensInvalidas: Array<Triagem> = new Array<Triagem>();

        if ( this.riscoEmpregado.getTriagens().length == 0 ) return true;

        ts = this.riscoEmpregado.getTriagens().filter( t => {
            if ( t.getIndice() > -1 ) {
                if ( t.getDiagnostico().getDescricao() == "" || t.getDiagnostico().getDescricao() == undefined ) {
                    triagensInvalidas.push( t );
                    return false;
                } else if ( t.getIntervencao().getDescricao() == "" || t.getIntervencao().getDescricao() == undefined ) {
                    triagensInvalidas.push( t );
                    return false;
                } else if ( t.getEquipeAbordagem().getNome() == "" || t.getEquipeAbordagem().getNome() == undefined ) {
                    triagensInvalidas.push( t );
                    return false;
                } else if ( t.getPrazo() == "" || t.getPrazo() == undefined ) {
                    triagensInvalidas.push( t );
                    return false;
                }
            }

            return true;
        } )

        if ( ts.length > 0 ){
            triagensInvalidas.forEach( t => {
                if (t.getIndice() < 3 && (t.getJustificativa() == "" || t.getJustificativa() == undefined) )
                    ret = false;
            } );
            
            if( ts.find(t => t.getEquipeAbordagem().getId() == this.profissional.getEquipe().getId())
                    == undefined)
                ret = false;
        }
        else ret = false;

        return ret;
    }
    
    openModalDiagnostico( triagem: Triagem ) {
        this.activeDiagnostico = true;
        this.activeIntervencao = false;
        this.showModalDiagnostico = true;
        this.flagIdTriagem = triagem.getId();
        this.idEquipeProfissional = this.profissional.getEquipe().getId();
    }

    selectDiagnostico( diagnostico: Diagnostico ) {
        let triagem = this.riscoEmpregado.getTriagens().find(t => t.getId() == this.flagIdTriagem);
        triagem.setDiagnostico(diagnostico);
        this.showModalDiagnostico = false; 
    }
    
    cancelarModalDiagnostico() {
        this.showModalDiagnostico = false;
    }
    
    openModalIntervencao( triagem: Triagem ) {
        this.activeDiagnostico = false;
        this.activeIntervencao = true;
        this.showModalIntervencao = true;
        this.flagIdTriagem = triagem.getId();
        this.idEquipeProfissional = this.profissional.getEquipe().getId();
    }
    
    selectIntervencao( intervencao: Intervencao) {
        let triagem = this.riscoEmpregado.getTriagens().find(t => t.getId() == this.flagIdTriagem);
        triagem.setIntervencao(intervencao);
        this.showModalIntervencao = false;
    }
    
    cancelarModalIntervencao( valor ) {
        this.showModalIntervencao = false;
    }
    
    openModalEquipe( triagem: Triagem ) {
        this.flagIdTriagem = triagem.getId();
        this.showModalEquipe = true;
    }
    
    selectEquipe( equipe: Equipe ) {
        let triagem = this.riscoEmpregado.getTriagens().find(t => t.getId() == this.flagIdTriagem);
        triagem.setEquipeAbordagem(equipe);
        this.showModalEquipe = false;
    }
    
    cancelarModalEquipe( valor ) {
        this.showModalEquipe = false;
    }
    
    planejamentoBackground( triagem: Triagem ) {
        if ( triagem.getIndice() <= 2 )
            return 'red';
    }

    ngOnDestroy() {
        if ( this.inscricao != undefined )
            this.inscricao.unsubscribe();
    }
    
}
