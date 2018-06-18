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
    private autoCompletePessoa:PessoaNomeAutocomplete;

    constructor( private route: ActivatedRoute,
        private usuarioService: UsuarioService,
        router: Router) {
        super( usuarioService, router );
        this.goTo = "usuario";

        this.perfis = new PerfilBuilder().initializeList( this.perfis );
        this.usuario = new UsuarioBuilder().initialize( this.usuario );
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
                            this.autoCompletePessoa.getAutocomplete().initializeLastValue(this.usuario.getPessoa().getNome());
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

}