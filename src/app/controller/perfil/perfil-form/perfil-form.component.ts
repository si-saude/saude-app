import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Perfil } from './../../../model/perfil';
import { Permissao } from './../../../model/permissao';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { PerfilBuilder } from './../perfil.builder';
import { PerfilFilter } from './../perfil.filter';
import { PerfilService } from './../perfil.service';
import { PermissaoBuilder } from './../../permissao/permissao.builder';

@Component( {
    selector: 'app-perfil-form',
    templateUrl: './perfil-form.html',
    styleUrls: ['./../../../../assets/css/form-component.css', './perfil-form.css']
} )
export class PerfilFormComponent extends GenericFormComponent implements OnInit {
    perfil: Perfil;
    perfilGet: Perfil;
    funcionalidades: Array<string>;

    perfilFilter: PerfilFilter = new PerfilFilter();

    constructor( private route: ActivatedRoute,
        private perfilService: PerfilService,
        router: Router) {
        super( perfilService, router );
        this.goTo = "perfil";

        this.funcionalidades = new Array<string>();
        this.perfil = new PerfilBuilder().initialize( this.perfil );
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if ( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;
                    this.perfilService.get( id )
                        .then( res => {
                            this.getFuncionalidades();
                            this.perfilGet = new PerfilBuilder().clone( res.json() );
                            this.perfil.setVersion(this.perfilGet.getVersion());
                            this.perfil.setId(this.perfilGet.getId());
                            setTimeout(() => {
                                this.initializeFuncionalidades();
                                this.perfil.getPermissoes().forEach(p => {
                                    if ( this.perfilGet.getPermissoes().
                                            find( pGet => p.getFuncionalidade() == pGet.getFuncionalidade() ) != undefined )
                                        p.setValor(true);
                                })
                            }, 200);
                            this.perfil.setTitulo( this.perfilGet.getTitulo() );
                            this.showPreload = false;
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                } else {
                    this.getFuncionalidades();
                    setTimeout(() => {
                        this.initializeFuncionalidades();
                    }, 100);
                }
            } );
    }

    getFuncionalidades() {
        this.perfilService.getFuncionalidades()
            .then( res => {
                this.funcionalidades = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
                console.log( error.text() );
            } )
    }

    save() {
        let perfilSave: Perfil = new PerfilBuilder().initialize(new Perfil());
        this.perfil.getPermissoes().forEach(p => {
            if ( p.getValor() == true ) {
                perfilSave.getPermissoes().push(p);
            }
        })
        perfilSave.setTitulo(this.perfil.getTitulo());
        perfilSave.setId(this.perfil.getId());
        perfilSave.setVersion(this.perfil.getVersion());
        console.log(perfilSave);
        super.save( new PerfilBuilder().clone( perfilSave ) );
    }

    initializeFuncionalidades() {
        this.funcionalidades.forEach(f => {
            let permissao: Permissao = new Permissao();
            permissao.setFuncionalidade(f);
            permissao.setValor(false);
            this.perfil.getPermissoes().push(permissao);
        })
    }
    
    editFuncionalidades() {
        this.initializeFuncionalidades();
    }

    onDestroy() {
        this.inscricao.unsubscribe();
    }
}
