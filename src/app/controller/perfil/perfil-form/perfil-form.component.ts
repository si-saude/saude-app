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
    funcionalidades: Array<string>;
    select: boolean;

    perfilFilter: PerfilFilter = new PerfilFilter();

    constructor( private route: ActivatedRoute,
        private perfilService: PerfilService,
        router: Router) {
        super( perfilService, router );
        this.goTo = "perfil";

        this.funcionalidades = new Array<string>();
        this.perfil = new PerfilBuilder().initialize( this.perfil );
        this.select = false;
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if ( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;
                    this.perfilService.getAll( id )
                        .then( res => {
                            this.perfil = new PerfilBuilder().clone( res.json() );
                            this.perfil.getPermissoes().sort((a,b) => ( a.getFuncionalidade() > b.getFuncionalidade() ) ? 1 : -1);
                            this.showPreload = false;
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                } else {
                    this.getFuncionalidades();
                }
            } );
    }

    save() {
        super.save( new PerfilBuilder().clone( this.perfil ) );
    }
    
    getFuncionalidades() {
        this.perfilService.getFuncionalidades()
            .then(res => {
                this.funcionalidades = Object.keys(res.json()).sort();
                this.setPermissoesPerfil();
            })
            .catch(error => {
                console.log("Erro ao buscar funcionalidades.");
            })
    }
    
    setPermissoesPerfil() {
        this.funcionalidades.forEach(f => {
            let permissao: Permissao = new Permissao();
            permissao.setFuncionalidade(f);
            permissao.setValor(false);
            this.perfil.getPermissoes().push(permissao);
        })
    }
    
    selectAll() {
        setTimeout(() => {
            if ( this.select == true ) { 
                this.perfil.getPermissoes().forEach( p => p.setValor(true));
            } else this.perfil.getPermissoes().forEach( p => p.setValor(false));
        }, 100);
    }

    onDestroy() {
        this.inscricao.unsubscribe();
    }
}
