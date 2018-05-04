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
        private riscoEmpregadoService: RiscoEmpregadoService,
        router: Router ) {
        super( riscoEmpregadoService, router );

        this.goTo = "risco-potencial";

        this.riscoEmpregado = new RiscoEmpregadoBuilder().initialize( new RiscoEmpregado() );
        this.profissional = new ProfissionalSaudeBuilder().initialize( new Profissional() );
        this.tabsActions = new EventEmitter<string | MaterializeAction>();
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

    getDiagnostico( index: number ) {
//        if ( this.validDiagnostico == this.triagens[index].getDiagnostico().getDescricao() ) return;
        if ( this.riscoEmpregado.getTriagens()[index].getDiagnostico().getDescricao() !== undefined ) {
            let diagnostico = this.diagnosticos.find( d => {
                if ( ( d.getCodigo() + " - " + d.getDescricao() ).trim() ==
                    this.riscoEmpregado.getTriagens()[index].getDiagnostico().getDescricao().trim() ||
                    d.getDescricao().trim() == this.riscoEmpregado.getTriagens()[index].getDiagnostico().getDescricao().trim() )
                    return true;
                else return false;
            } );

            if ( diagnostico !== undefined ) {
                this.riscoEmpregado.getTriagens()[index].setDiagnostico( diagnostico );
                this.validDiagnostico = this.riscoEmpregado.getTriagens()[index].getDiagnostico().getDescricao();
            } else this.riscoEmpregado.getTriagens()[index].setDiagnostico( new DiagnosticoBuilder().initialize( new Diagnostico() ) );
        } else this.riscoEmpregado.getTriagens()[index].setDiagnostico( new DiagnosticoBuilder().initialize( new Diagnostico() ) );
    }

    private oldDescricaoDiagnostico: string;
    selectDiagnosticoByDescricaoAndAbreviacao( evento ) {
        if ( this.oldDescricaoDiagnostico != evento ) {
            this.oldDescricaoDiagnostico = evento;
            if ( evento.length >= 6 ) {
                this.riscoEmpregadoService.getDiagnosticoByDescricaoAndAbreviacao( evento, this.profissional.getEquipe().getAbreviacao() )
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
                this.riscoEmpregadoService.getDiagnosticoByCodigoAndAbreviacao( evento, this.profissional.getEquipe().getAbreviacao() )
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
//        if ( this.validIntervencao == this.triagens[index].getIntervencao().getDescricao() ) return;
        if ( this.riscoEmpregado.getTriagens()[index].getIntervencao().getDescricao() !== undefined ) {
            let intervencao = this.intervencoes.find( d => {
                if ( d.getDescricao().trim() == this.riscoEmpregado.getTriagens()[index].getIntervencao().getDescricao().trim() )
                    return true;
                else return false;
            } );

            if ( intervencao !== undefined ) {
                this.riscoEmpregado.getTriagens()[index].setIntervencao( intervencao );
                this.validIntervencao = this.riscoEmpregado.getTriagens()[index].getIntervencao().getDescricao();
            } else this.riscoEmpregado.getTriagens()[index].setIntervencao( new IntervencaoBuilder().initialize( new Intervencao() ) );
        } else this.riscoEmpregado.getTriagens()[index].setIntervencao( new IntervencaoBuilder().initialize( new Intervencao() ) );
    }

    private oldDescricaoIntervencao: string;
    selectIntervencaoByDescricaoAndAbreviacao( evento ) {
        if ( this.oldDescricaoIntervencao != evento ) {
            this.oldDescricaoIntervencao = evento;
            if ( evento.length > 3 ) {
                this.riscoEmpregadoService.getIntervencaoByDescricaoAndAbreviacao( evento, this.profissional.getEquipe().getAbreviacao() )
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
//        if ( this.validEquipeAbordagem == this.triagens[index].getEquipeAbordagem().getNome() ) return;
        if ( this.riscoEmpregado.getTriagens()[index].getEquipeAbordagem().getNome() !== undefined ) {
            let equipe = this.equipeAbordagens.find( e => {
                if ( e.getNome().trim() == this.riscoEmpregado.getTriagens()[index].getEquipeAbordagem().getNome().trim() )
                    return true;
                else return false;
            } );

            if ( equipe !== undefined ) {
                this.riscoEmpregado.getTriagens()[index].setEquipeAbordagem( equipe );
                this.validEquipeAbordagem = this.riscoEmpregado.getTriagens()[index].getEquipeAbordagem().getNome();
            } else this.riscoEmpregado.getTriagens()[index].setEquipeAbordagem( new EquipeBuilder().initialize( new Equipe() ) );
        } else this.riscoEmpregado.getTriagens()[index].setEquipeAbordagem( new EquipeBuilder().initialize( new Equipe() ) );
    }

    private oldNomeEquipeAbordagem: string;
    selectEquipeAbordagemByName( evento ) {
        if ( this.oldNomeEquipeAbordagem != evento ) {
            this.oldNomeEquipeAbordagem = evento;
            if ( evento.length > 3 ) {
                this.riscoEmpregadoService.getEquipeAbordagemByName( evento )
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
