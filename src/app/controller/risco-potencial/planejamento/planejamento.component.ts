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
import { RiscoPotencialService } from './../../risco-potencial/risco-potencial.service';

@Component( {
    selector: 'app-planejamento',
    templateUrl: './planejamento.html',
    styleUrls: ['./planejamento.css', './../../../../assets/css/form-component.css']
} )
export class PlanejamentoComponent extends GenericFormComponent implements OnInit {
    private nomeEmpregado: string;
    private riscoEmpregado: RiscoEmpregado;
    private profissional: Profissional;
    private prazos: Array<string>;
    private tabsActions;
    private triagemIndices: Map<number, number>;
    private triagens: Array<Triagem>;

    private diagnosticos: Array<Diagnostico>;
    private validDiagnostico: string;
    private autocompleteDiagnostico;

    private intervencoes: Array<Intervencao>;
    private validIntervencao: string;
    private autocompleteIntervencao;

    private equipeAbordagens: Array<Equipe>;
    private validEquipeAbordagem: string;
    private autocompleteEquipeAbordagem;

    constructor( private route: ActivatedRoute,
        private triagemService: TriagemService,
        router: Router ) {
        super( triagemService, router );

        this.goTo = "risco-potencial";

        this.triagens = new TriagemBuilder().initializeList( new Array<Triagem>() );
        this.riscoEmpregado = new RiscoEmpregadoBuilder().initialize( new RiscoEmpregado() );
        this.profissional = new ProfissionalSaudeBuilder().initialize( new Profissional() );
        this.tabsActions = new EventEmitter<string | MaterializeAction>();
        this.triagemIndices = new Map<number, number>();
        this.validDiagnostico = "";
        this.diagnosticos = new Array<Diagnostico>();
        this.validIntervencao = "";
        this.intervencoes = new Array<Intervencao>();
        this.prazos = new Array<string>();
        this.equipeAbordagens = new EquipeBuilder().initializeList( new Array<Equipe>() );
    }

    ngOnInit() {
        let component = this;
        if ( localStorage.getItem( "usuario-id" ) != undefined ) {
            component.triagemService.getUsuario( Number( localStorage.getItem( "usuario-id" ) ) )
                .then( res => {
                    let usuario: Usuario = new Usuario();
                    usuario = new UsuarioBuilder().clone( res.json() );
                    if ( usuario.getId() > 0 && usuario.getPessoa() != undefined ) {
                        let profissionalFilter: ProfissionalSaudeFilter = new ProfissionalSaudeFilter();
                        profissionalFilter.setEmpregado( new EmpregadoFilter() );
                        profissionalFilter.getEmpregado().setPessoa( new PessoaFilter() );
                        profissionalFilter.getEmpregado().getPessoa().setCpf( usuario.getPessoa().getCpf() );

                        component.triagemService.getProfissional( profissionalFilter )
                            .then( res => {
                                if ( res.json().list[0] != undefined ) {
                                    component.profissional = new ProfissionalSaudeBuilder().clone( res.json().list[0] );

                                    component.inscricao = this.route.params.subscribe(
                                        ( params: any ) => {
                                            if ( params['id'] !== undefined ) {
                                                let id = params['id'];
                                                component.nomeEmpregado = params['empregado'];
                                                component.showPreload = true;

                                                component.triagemService.getTriagensByEquipeIndicador( component.profissional.getEquipe().getId(), id )
                                                    .then( res => {
                                                        component.showPreload = false;
                                                        component.triagens = new TriagemBuilder().cloneList( res.json().list );
                                                        
                                                        component.triagens.forEach(t => {
                                                            component.diagnosticos.push(t.getDiagnostico());
                                                            component.intervencoes.push(t.getIntervencao());
                                                            component.equipeAbordagens.push(t.getEquipeAbordagem());
                                                        });
                                                        
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
        super.saveList( JSON.stringify(new TriagemBuilder().cloneList( this.triagens )) );
    }

    getPrazos() {
        this.triagemService.getPrazos()
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

    getDiagnostico( index: number ) {
        if ( this.validDiagnostico == this.triagens[index].getDiagnostico().getDescricao() ) return;
        if ( this.triagens[index].getDiagnostico().getDescricao() !== undefined ) {
            let diagnostico = this.diagnosticos.find( d => {
                if ( ( d.getCodigo() + " - " + d.getDescricao() ).trim() ==
                    this.triagens[index].getDiagnostico().getDescricao().trim() ||
                    d.getDescricao().trim() == this.triagens[index].getDiagnostico().getDescricao().trim() )
                    return true;
                else return false;
            } );

            if ( diagnostico !== undefined ) {
                this.triagens[index].setDiagnostico( diagnostico );
                this.validDiagnostico = this.triagens[index].getDiagnostico().getDescricao();
            } else this.triagens[index].setDiagnostico( new DiagnosticoBuilder().initialize( new Diagnostico() ) );
        } else this.triagens[index].setDiagnostico( new DiagnosticoBuilder().initialize( new Diagnostico() ) );
    }

    private oldDescricaoDiagnostico: string;
    selectDiagnosticoByDescricaoAndAbreviacao( evento ) {
        if ( this.oldDescricaoDiagnostico != evento ) {
            this.oldDescricaoDiagnostico = evento;
            if ( evento.length >= 6 ) {
                this.triagemService.getDiagnosticoByDescricaoAndAbreviacao( evento, this.profissional.getEquipe().getAbreviacao() )
                    .then( res => {
                        this.diagnosticos = new DiagnosticoBuilder().cloneList( res.json() );
                        this.autocompleteDiagnostico = [this.buildAutocompleteDiagnostico( this.diagnosticos )];
                    } )
                    .catch( error => {
                        console.log( error );
                    } )
            }
        }
    }

    private oldCodigoDiagnostico: string;
    selectDiagnosticoByCodigoAndAbreviacao( evento ) {
        if ( this.oldCodigoDiagnostico != evento ) {
            this.oldCodigoDiagnostico = evento;
            if ( evento.length < 6 ) {
                this.triagemService.getDiagnosticoByCodigoAndAbreviacao( evento, this.profissional.getEquipe().getAbreviacao() )
                    .then( res => {
                        this.diagnosticos = new DiagnosticoBuilder().cloneList( res.json() );
                        this.autocompleteDiagnostico = [this.buildAutocompleteDiagnostico( this.diagnosticos )];
                    } )
                    .catch( error => {
                        console.log( error );
                    } )
            }
        }
    }

    buildAutocompleteDiagnostico( diagnosticos: Array<Diagnostico> ) {
        let data = {};
        diagnosticos.forEach( item => {
            data[item.getCodigo() + " - " + item.getDescricao()] = null;
        } );

        let array = {};
        array["data"] = data;

        return array;
    }

    getIntervencao( index: number ) {
        if ( this.validIntervencao == this.triagens[index].getIntervencao().getDescricao() ) return;
        if ( this.triagens[index].getIntervencao().getDescricao() !== undefined ) {
            let intervencao = this.intervencoes.find( d => {
                if ( d.getDescricao().trim() == this.triagens[index].getIntervencao().getDescricao().trim() )
                    return true;
                else return false;
            } );

            if ( intervencao !== undefined ) {
                this.triagens[index].setIntervencao( intervencao );
                this.validIntervencao = this.triagens[index].getIntervencao().getDescricao();
            } else this.triagens[index].setIntervencao( new IntervencaoBuilder().initialize( new Intervencao() ) );
        } else this.triagens[index].setIntervencao( new IntervencaoBuilder().initialize( new Intervencao() ) );
    }

    private oldDescricaoIntervencao: string;
    selectIntervencaoByDescricaoAndAbreviacao( evento ) {
        if ( this.oldDescricaoIntervencao != evento ) {
            this.oldDescricaoIntervencao = evento;
            if ( evento.length > 3 ) {
                this.triagemService.getIntervencaoByDescricaoAndAbreviacao( evento, this.profissional.getEquipe().getAbreviacao() )
                    .then( res => {
                        this.intervencoes = new IntervencaoBuilder().cloneList( res.json() );
                        this.autocompleteIntervencao = [this.buildAutocompleteIntervencao( this.intervencoes )];
                    } )
                    .catch( error => {
                        console.log( error );
                    } )
            }
        }
    }

    buildAutocompleteIntervencao( intervencoes: Array<Intervencao> ) {
        let data = {};
        intervencoes.forEach( item => {
            data[item.getDescricao()] = null;
        } );

        let array = {};
        array["data"] = data;

        return array;
    }

    getEquipeAbordagem( index: number ) {
        if ( this.validEquipeAbordagem == this.triagens[index].getEquipeAbordagem().getNome() ) return;
        if ( this.triagens[index].getEquipeAbordagem().getNome() !== undefined ) {
            let equipe = this.equipeAbordagens.find( e => {
                if ( e.getNome().trim() == this.triagens[index].getEquipeAbordagem().getNome().trim() )
                    return true;
                else return false;
            } );

            if ( equipe !== undefined ) {
                this.triagens[index].setEquipeAbordagem( equipe );
                this.validEquipeAbordagem = this.triagens[index].getEquipeAbordagem().getNome();
            } else this.triagens[index].setEquipeAbordagem( new EquipeBuilder().initialize( new Equipe() ) );
        } else this.triagens[index].setEquipeAbordagem( new EquipeBuilder().initialize( new Equipe() ) );
    }

    private oldNomeEquipeAbordagem: string;
    selectEquipeAbordagemByName( evento ) {
        if ( this.oldNomeEquipeAbordagem != evento ) {
            this.oldNomeEquipeAbordagem = evento;
            if ( evento.length > 3 ) {
                this.triagemService.getEquipeAbordagemByName( evento )
                    .then( res => {
                        this.equipeAbordagens = new EquipeBuilder().cloneList( res.json() );
                        this.autocompleteEquipeAbordagem = [this.buildAutocompleteEquipeAbordagem( this.equipeAbordagens )];
                    } )
                    .catch( error => {
                        console.log( error );
                    } )
            }
        }
    }

    buildAutocompleteEquipeAbordagem( equipeAbordagens: Array<Equipe> ) {
        let data = {};
        equipeAbordagens.forEach( item => {
            data[item.getNome()] = null;
        } );

        let array = {};
        array["data"] = data;

        return array;
    }

    ngOnDestroy() {
        if ( this.inscricao != undefined )
            this.inscricao.unsubscribe();
    }
}
