import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Gerencia } from './../../../model/gerencia';
import { Empregado } from './../../../model/empregado';
import { EmpregadoBuilder } from './../../empregado/empregado.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { GerenciaBuilder } from './../gerencia.builder';
import { GerenciaService } from './../gerencia.service';
import { EmpregadoService } from './../../empregado/empregado.service';

@Component( {
    selector: 'app-gerencia-form',
    templateUrl: './gerencia-form.html',
    styleUrls: ['./gerencia-form.css', './../../../../assets/css/form-component.css']
} )
export class GerenciaFormComponent extends GenericFormComponent implements OnInit {
    gerencia: Gerencia;
    gerencias: Array<Gerencia>;
    gerentes: Array<Empregado>;
    secretarios1: Array<Empregado>;
    secretarios2: Array<Empregado>;
    autocompleteGerente;
    autocompleteSecretario1;
    autocompleteSecretario2;
    flagAutocomplete: boolean;

    constructor( private route: ActivatedRoute,
        private gerenciaService: GerenciaService,
        private empregadoService: EmpregadoService ) {
        super( gerenciaService );
        this.goTo = "gerencia";

        this.gerentes = new Array<Empregado>();
        this.secretarios1 = new Array<Empregado>();
        this.secretarios2 = new Array<Empregado>();
        this.gerencias = new Array<Gerencia>();
        this.gerencia = new GerenciaBuilder().initialize( this.gerencia );
        this.flagAutocomplete = false;
        this.autocompleteGerente = [];
        this.autocompleteSecretario1 = [];
        this.autocompleteSecretario2 = [];
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if ( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.gerenciaService.get( id )
                        .then( res => {
                            this.showPreload = false;

                            this.gerencia = new GerenciaBuilder().clone( res.json() );

                            if ( this.gerencia.getGerente().getId() > 0 )
                                this.gerentes.push( new EmpregadoBuilder().clone( this.gerencia.getGerente() ) );

                            if ( this.gerencia.getSecretario1().getId() > 0 )
                                this.secretarios1.push( new EmpregadoBuilder().clone( this.gerencia.getSecretario1() ) );

                            if ( this.gerencia.getSecretario2().getId() > 0 )
                                this.secretarios2.push( new EmpregadoBuilder().clone( this.gerencia.getSecretario2() ) );

                            this.getGerencias();

                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                } else {
                    this.getGerencias();
                }
            } );

    }
    
    getGerencias() {
        this.gerenciaService.getGerenciasWithFilterId( this.gerencia.getId() )
            .then( res => {
                this.gerencias = res.json();
            } )
            .catch( error => {
                console.log( error );
            } )
    }

    save() {
        
        if ( this.verifyIfExistEmpregados() ) {
            super.save( new GerenciaBuilder().clone( this.gerencia ) );
        } else {
            this.toastParams = ['Por favor, selecione corretamente um empregado', 4000];
            this.globalActions.emit('toast');
        }
    }
    
    verifyIfExistEmpregados() {
        if ( this.gerencia.getGerente().getPessoa().getNome() != undefined ) {
            if ( !this.verifyIfExistEmpregado (this.gerencia.getGerente(), this.gerentes ) ) return false;
        } 
        if ( this.gerencia.getSecretario1().getPessoa().getNome() != undefined ) {
            if ( !this.verifyIfExistEmpregado (this.gerencia.getSecretario1(), this.secretarios1 ) ) return false;
        } 
        if ( this.gerencia.getSecretario2().getPessoa().getNome() != undefined ) {
            if ( !this.verifyIfExistEmpregado (this.gerencia.getSecretario2(), this.secretarios2 ) ) return false;
        }
        
       return true;
    }
    
    verifyIfExistEmpregado(empregado: Empregado, lista: Array<Empregado>) {
        let emp = lista.find(e => {
            return empregado.getId() === e.getId(); 
        });
        return emp != undefined ? true : false;
    }

    getGerente() {
        if ( this.gerencia.getGerente().getPessoa().getNome() !== undefined ) {

            let gerente = this.gerentes.find( e => {
                return e.getChave() + " - " + e.getPessoa().getNome() ==
                    this.gerencia.getGerente().getPessoa().getNome();
            } );

            if ( gerente !== undefined ) {
                this.gerencia.setGerente( gerente );
            } else this.gerencia.setGerente( new EmpregadoBuilder().initialize( new Empregado() ) );
        } else this.gerencia.setGerente( new EmpregadoBuilder().initialize( new Empregado() ) );
    }

    getSecretario1() {
        //        this.gerencia.setSecretario1(this.getAutocompleteValue(this.gerencia.getSecretario1().getNome()));
        if ( this.gerencia.getSecretario1().getPessoa().getNome() !== undefined ) {
            let secretario1 = this.secretarios1.find( e => { 
                return e.getChave() + " - " + e.getPessoa().getNome() ==
                    this.gerencia.getSecretario1().getPessoa().getNome(); 
            });

            if ( secretario1 !== undefined ) {
                this.gerencia.setSecretario1( secretario1 );
            } else this.gerencia.setSecretario1( new EmpregadoBuilder().initialize( new Empregado() ) );
        } else this.gerencia.setSecretario1( new EmpregadoBuilder().initialize( new Empregado() ) );
    }

    getSecretario2() {
        if ( this.gerencia.getSecretario2().getPessoa().getNome() !== undefined ) {
            let secretario2 = this.secretarios2.find( e => { 
                return e.getChave() + " - " + e.getPessoa().getNome() ==
                    this.gerencia.getSecretario2().getPessoa().getNome(); 
            });

            if ( secretario2 !== undefined ) {
                this.gerencia.setSecretario2( secretario2 );
            } else this.gerencia.setSecretario2( new EmpregadoBuilder().initialize( new Empregado() ) );
        } else this.gerencia.setSecretario2( new EmpregadoBuilder().initialize( new Empregado() ) );
    }

    private oldNomeGerente: string;
    selectGerente( evento ) {
        if ( this.oldNomeGerente != evento ) {
            this.oldNomeGerente = evento;
            if ( evento.length > 3 ) {
                this.empregadoService.getEmpregadoByName( evento )
                    .then( res => {
                        this.gerentes = new EmpregadoBuilder().cloneList( res.json() );
                        this.autocompleteGerente = [this.buildAutocompleteEmpregado( this.gerentes )];
                    } )
                    .catch( error => {
                        console.log( error );
                    } )
            }
        }
    }

    private oldChaveGerente: string;
    selectGerenteByChave( evento ) {
        if ( this.oldChaveGerente != evento ) {
            this.oldChaveGerente = evento;
            this.empregadoService.getEmpregadoByChave( evento )
                .then( res => {
                    this.gerentes = new EmpregadoBuilder().cloneList( res.json() );
                    this.autocompleteGerente = [this.buildAutocompleteEmpregado( this.gerentes )];
                } )
                .catch( error => {
                    console.log( error );
                } )
        }
    }

    private oldNomeSecretario1: string;
    selectSecretario1( evento ) {
        if ( this.oldNomeSecretario1 != evento ) {
            this.oldNomeSecretario1 = evento;
            if ( evento.length > 3 ) {

                this.empregadoService.getEmpregadoByName( evento )
                    .then( res => {
                        this.secretarios1 = new EmpregadoBuilder().cloneList( res.json() );
                        this.autocompleteSecretario1 = [this.buildAutocompleteEmpregado( this.secretarios1 )];
                    } )
                    .catch( error => {
                        console.log( error );
                    } )
            }
        }
    }

    private oldChaveSecretario1: string;
    selectSecretario1ByChave( evento ) {
        if ( this.oldChaveSecretario1 != evento ) {
            this.oldChaveSecretario1 = evento;
            this.empregadoService.getEmpregadoByChave( evento )
                .then( res => {
                    this.secretarios1 = new EmpregadoBuilder().cloneList( res.json() );
                    this.autocompleteSecretario1 = [this.buildAutocompleteEmpregado( this.secretarios1 )];
                } )
                .catch( error => {
                    console.log( error );
                } )
        }
    }

    private oldNomeSecretario2: string;
    selectSecretario2( evento ) {
        if ( this.oldNomeSecretario2 != evento ) {
            this.oldNomeSecretario2 = evento;
            if ( evento.length > 3 ) {

                this.empregadoService.getEmpregadoByName( evento )
                    .then( res => {
                        this.secretarios2 = new EmpregadoBuilder().cloneList( res.json() );
                        this.autocompleteSecretario2 = [this.buildAutocompleteEmpregado( this.secretarios2 )];
                    } )
                    .catch( error => {
                        console.log( error );
                    } )
            }
        }
    }

    private oldChaveSecretario2: string;
    selectSecretario2ByChave( evento ) {
        if ( this.oldChaveSecretario2 != evento ) {
            this.oldChaveSecretario2 = evento;
            this.empregadoService.getEmpregadoByChave( evento )
                .then( res => {
                    this.secretarios2 = new EmpregadoBuilder().cloneList( res.json() );
                    this.autocompleteSecretario2 = [this.buildAutocompleteEmpregado( this.secretarios2 )];
                } )
                .catch( error => {
                    console.log( error );
                } )
        }
    }

    buildAutocompleteEmpregado( empregados ) {
        let data = {};
        empregados.forEach( item => {
            data[item.getChave() + " - " + item.getPessoa().getNome()] = null;
        } );

        let array = {};
        array["data"] = data;

        return array;
    }


}