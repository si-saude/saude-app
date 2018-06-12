import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Usuario } from './../../../model/usuario';
import { Perfil } from './../../../model/perfil';
import { Pessoa } from './../../../model/pessoa';
import { PessoaBuilder } from './../../pessoa/pessoa.builder';
import { PerfilBuilder } from './../../perfil/perfil.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { UsuarioBuilder } from './../usuario.builder';
import { UsuarioService } from './../usuario.service';
import { PessoaNomeAutocomplete } from './../../../controller/pessoa/pessoa-nome.autocomplete';

@Component( {
    selector: 'app-usuario-form',
    templateUrl: './usuario-form.html',
    styleUrls: ['./usuario-form.css', './../../../../assets/css/form-component.css']
} )
export class UsuarioFormComponent extends GenericFormComponent implements OnInit {
    usuario: Usuario;
    perfis: Array<Perfil>;
    autocompletePessoa;
    pessoaToAdd: Pessoa;
    pessoas: Array<Pessoa>;
    validPessoa: string;
    private autoCompletePessoa:PessoaNomeAutocomplete;

    constructor( private route: ActivatedRoute,
        private usuarioService: UsuarioService,
        router: Router) {
        super( usuarioService, router );
        this.goTo = "usuario";

        this.perfis = new PerfilBuilder().initializeList( this.perfis );
        this.usuario = new UsuarioBuilder().initialize( this.usuario );
        this.autocompletePessoa = [];
        this.pessoaToAdd = new PessoaBuilder().initialize( this.pessoaToAdd );
        this.pessoas = new Array<Pessoa>();
        this.autoCompletePessoa = new PessoaNomeAutocomplete(this.usuarioService.getPessoaService());
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if ( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.usuarioService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.usuario = new UsuarioBuilder().clone( res.json() );
                            this.saveArrayPessoa();
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );

        this.getPerfis();
    }

    getPerfis() {
        this.usuarioService.getPerfis()
            .then( res => {
                this.perfis = new PerfilBuilder().cloneList( res.json() );
            } )
            .catch( error => {
                console.log( error );
            } )
    }

    save() {
        super.save( new UsuarioBuilder().clone( this.usuario ) );
    }

    addPerfil( value ) {
        if ( value != 0 ) {
            let p: Perfil = this.usuario.getPerfis().find( p => p.getId() == value );

            if ( p == undefined ) {
                let perfil: Perfil = this.perfis.find( p => p.getId() == value );
                this.usuario.getPerfis().push( perfil );
            }
        }
    }

    removePerfil( index ) {
        this.usuario.getPerfis().splice( index, 1 );
    }

//    getPessoa( evento ) {
//        if ( this.validPessoa == this.usuario.getPessoa().getNome() ) return;
//        if ( this.usuario.getPessoa() !== undefined ) {
//
//            let pessoa: Pessoa = this.pessoas.find( p => p.getNome().trim() == this.usuario.getPessoa().getNome().trim() );
//
//            if ( pessoa !== undefined ) {
//                this.usuario.setPessoa( new PessoaBuilder().clone( pessoa ) );
//                this.validPessoa = this.usuario.getPessoa().getNome();
//            } else this.usuario.setPessoa( new PessoaBuilder().initialize( this.usuario.getPessoa() ) );
//        } else this.usuario.setPessoa( new PessoaBuilder().initialize( this.usuario.getPessoa() ) );
//    }
//
//    private oldNomePessoa: string;
//    selectPessoa( evento ) {
//        if ( this.oldNomePessoa != evento ) {
//            this.oldNomePessoa = evento;
//            if ( evento.length > 3 ) {
//                this.usuarioService.getPessoasByNome( evento )
//                    .then( res => {
//                        this.pessoas = new PessoaBuilder().cloneList(res.json());
//                        this.autocompletePessoa = [this.buildAutocompletePessoa( this.pessoas )];
//                    } )
//                    .catch( error => {
//                        console.log( error );
//                    } )
//            }
//        }
//    }
//
//    buildAutocompletePessoa( pessoas: Array<Pessoa> ) {
//        let data = {};
//        pessoas.forEach( item => {
//            data[item.getNome()] = null;
//        } );
//
//        let array = {};
//        array["data"] = data;
//
//        return array;
//    }
    
    saveArrayPessoa() {
        if ( this.usuario.getPessoa().getId() > 0 )
            this.pessoas.push( this.usuario.getPessoa() );
    }

}