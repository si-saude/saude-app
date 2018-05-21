import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import * as $ from 'jquery';

import { GlobalVariable } from './../../../global';
import { RiscoPotencialService } from './../risco-potencial.service';
import { RiscoPotencial } from './../../../model/risco-potencial';
import { RiscoPotencialBuilder } from './../risco-potencial.builder';
import { RiscoPotencialFilter } from './../risco-potencial.filter';
import { Profissional } from './../../../model/profissional';
import { ProfissionalSaudeBuilder } from './../../profissional-saude/profissional-saude.builder';
import { ProfissionalSaudeFilter } from './../../profissional-saude/profissional-saude.filter';
import { FichaColeta } from './../../../model/ficha-coleta';
import { FichaColetaBuilder } from './../../ficha-coleta/ficha-coleta.builder';
import { Triagem } from './../../../model/triagem';
import { TriagemBuilder } from './../../triagem/triagem.builder';
import { Usuario } from './../../../model/usuario';
import { UsuarioBuilder } from './../../usuario/usuario.builder';
import { EmpregadoFilter } from './../../empregado/empregado.filter';
import { PessoaFilter } from './../../pessoa/pessoa.filter';
import { FilaEsperaOcupacionalService } from './../../fila-espera-ocupacional/fila-espera-ocupacional.service';
import { FilaEsperaOcupacionalFilter } from './../../fila-espera-ocupacional/fila-espera-ocupacional.filter';
import { GenericFormComponent } from './../../../generics/generic.form.component';

@Component( {
    selector: 'app-risco-potencial-acolhimento',
    templateUrl: './acolhimento.html',
    styleUrls: ['./acolhimento.css', './../../../../assets/css/form-component.css']
} )
export class AcolhimentoComponent extends GenericFormComponent implements OnInit {
    private riscoPotencial: RiscoPotencial;
    private profissional: Profissional;
    private nomeEmpregado: string;
    private triagens: Array<Triagem>;
    private fichaColeta: FichaColeta;
    private idEquipeProfissional: number;

    constructor( private route: ActivatedRoute,
        private riscoPotencialService: RiscoPotencialService,
        private filaEsperaOcupacionalService: FilaEsperaOcupacionalService,
        router: Router ) {
        super( riscoPotencialService, router );

        this.goTo = "risco-potencial";

        this.riscoPotencial = new RiscoPotencialBuilder().initialize( new RiscoPotencial() );
        this.profissional = new ProfissionalSaudeBuilder().initialize( new Profissional() );
        this.fichaColeta = new FichaColetaBuilder().initialize(new FichaColeta());
        this.nomeEmpregado = '';
        this.triagens = new Array<Triagem>();
        this.idEquipeProfissional = -1;
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
                                                        this.riscoPotencial = new RiscoPotencialBuilder().clone( res.json() );
                                                        this.riscoPotencial.getRiscoEmpregados().forEach(rE => {
                                                            rE.getTriagens().forEach(t => {
                                                                this.triagens.push(t);
                                                            })
                                                        })
                                                        this.triagens = new TriagemBuilder().cloneList(this.triagens);
                                                        this.nomeEmpregado = this.riscoPotencial.getEmpregado().getPessoa().getNome();
                                                        let filaFilter: FilaEsperaOcupacionalFilter = new FilaEsperaOcupacionalFilter();
                                                        filaFilter.setRiscoPotencial( new RiscoPotencialFilter() );
                                                        filaFilter.getRiscoPotencial().setId( id );
                                                        
                                                        this.filaEsperaOcupacionalService.listAll( filaFilter )
                                                            .then( res => {
                                                                this.showPreload = false;
                                                                this.fichaColeta = new FichaColetaBuilder().clone( res.json().list[0]["fichaColeta"] );
                                                            } )
                                                            .catch( error => {
                                                                this.catchConfiguration( error );
                                                            } )
                                                        
                                                    } )
                                                    .catch( error => {
                                                        this.showPreload = false;
                                                        this.catchConfiguration( error );
                                                    } )
                                            }
                                        } );
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
    
    ngOnDestroy() {
        if ( this.inscricao != undefined )
            this.inscricao.unsubscribe();
    }
}
