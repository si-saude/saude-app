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
export class PerfilFormDetailComponent extends GenericFormComponent implements OnInit {
    perfil: Perfil;
    
    constructor( private route: ActivatedRoute,
        private perfilService: PerfilService,
        router: Router) {
        super( perfilService, router );
        this.goTo = "perfil";

        this.perfil = new PerfilBuilder().initialize( this.perfil );
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
                }
            } );
    }

    onDestroy() {
        this.inscricao.unsubscribe();
    }
}
