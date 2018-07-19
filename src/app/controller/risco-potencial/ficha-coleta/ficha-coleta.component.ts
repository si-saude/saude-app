import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { RiscoPotencial } from './../../../model/risco-potencial';
import { RiscoPotencialBuilder } from './../../risco-potencial/risco-potencial.builder';
import { Usuario } from './../../../model/usuario';
import { Profissional } from './../../../model/profissional';
import { ProfissionalSaudeBuilder } from './../../profissional-saude/profissional-saude.builder';
import { UsuarioBuilder } from './../../usuario/usuario.builder';
import { FichaColeta } from './../../../model/ficha-coleta';
import { FichaColetaBuilder } from './../../ficha-coleta/ficha-coleta.builder';
import { FilaEsperaOcupacionalFilter } from './../../fila-espera-ocupacional/fila-espera-ocupacional.filter';
import { FilaEsperaOcupacionalService } from './../../fila-espera-ocupacional/fila-espera-ocupacional.service';
import { ProfissionalSaudeFilter } from './../../profissional-saude/profissional-saude.filter';
import { RiscoPotencialFilter } from './../../risco-potencial/risco-potencial.filter';
import { EmpregadoFilter } from './../../empregado/empregado.filter';
import { PessoaFilter } from './../../pessoa/pessoa.filter';
import { FichaColetaService } from './../../ficha-coleta/ficha-coleta.service';
import { RiscoPotencialService } from './../../risco-potencial/risco-potencial.service';

@Component( {
    selector: 'app-risco-potencial-ficha-coleta',
    templateUrl: './ficha-coleta.html',
    styleUrls: ['./ficha-coleta.css', './../../../../assets/css/form-component.css']
} )
export class FichaColetaComponent extends GenericFormComponent implements OnInit {
    private fichaColeta: FichaColeta;
    private idEquipeProfissional: number;
    private usuario: Usuario;
    private profissional: Profissional;
    private nomeEmpregado: string;

    constructor( private route: ActivatedRoute,
        private fichaColetaService: FichaColetaService,
        private filaEsperaOcupacionalService: FilaEsperaOcupacionalService,
        router: Router ) {
        super( fichaColetaService, router );

        this.goTo = "risco-potencial";

        this.fichaColeta = new FichaColetaBuilder().initialize( new FichaColeta() );
        this.idEquipeProfissional = -1;
    }

    ngOnInit() {
        let component = this;
        if ( localStorage.getItem( "usuario-id" ) != undefined ) {
            this.filaEsperaOcupacionalService.getUsuario( Number( localStorage.getItem( "usuario-id" ) ) )
                .then( res => {
                    let usuario: Usuario = new Usuario();
                    usuario = new UsuarioBuilder().clone( res.json() );
                    if ( usuario.getId() > 0 && usuario.getPessoa() != undefined ) {
                        let profissionalFilter: ProfissionalSaudeFilter = new ProfissionalSaudeFilter();
                        profissionalFilter.setEmpregado( new EmpregadoFilter() );
                        profissionalFilter.getEmpregado().setPessoa( new PessoaFilter() );
                        profissionalFilter.getEmpregado().getPessoa().setCpf( usuario.getPessoa().getCpf() );

                        this.filaEsperaOcupacionalService.getProfissional( profissionalFilter )
                            .then( res => {
                                if ( res.json().list[0] != undefined ) {
                                    this.profissional = new ProfissionalSaudeBuilder().clone( res.json().list[0] );
                                    component.idEquipeProfissional = component.profissional.getId();

                                    this.inscricao = this.route.params.subscribe(
                                        ( params: any ) => {
                                            if ( params['id'] !== undefined ) {
                                                let id = params['id'];
                                                this.nomeEmpregado = params['empregado'];
                                                this.showPreload = true;
                                                
                                                let filaFilter: FilaEsperaOcupacionalFilter = new FilaEsperaOcupacionalFilter();
                                                filaFilter.setRiscoPotencial( new RiscoPotencialFilter() );
                                                filaFilter.getRiscoPotencial().setId( id );
                                                
                                                component.filaEsperaOcupacionalService.listAll( filaFilter )
                                                    .then( res => {
                                                        component.showPreload = false;
                                                        console.log(res.json());
                                                        component.fichaColeta = new FichaColetaBuilder().clone( res.json().list[0]["fichaColeta"] );
                                                    } )
                                                    .catch( error => {
                                                        component.catchConfiguration( error );
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

    salvar() {
        this.save( new FichaColetaBuilder().clone( this.fichaColeta ) );
    }

    ngOnDestroy() {
        if ( this.inscricao != undefined )
            this.inscricao.unsubscribe();
    }
}