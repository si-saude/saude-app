import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    styleUrls: ['./perfil-form.css']
} )
export class PerfilFormComponent extends GenericFormComponent implements OnInit {
    perfil: Perfil;
    funcionalidades: Array<string>;
    
    perfilFilter: PerfilFilter = new PerfilFilter();
    
    constructor( private route: ActivatedRoute,
        private perfilService: PerfilService) { 
        super(perfilService);
        this.goTo = "perfil";
        
        this.funcionalidades = new Array<string>();
        this.perfil = new PerfilBuilder().initialize(this.perfil);
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.perfilService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.perfil = new PerfilBuilder().clone(res.json());
                        } )
                        .catch( error => {
                            this.showPreload = false;
                            console.log( error );
                        } )
                }
            } );
        
        this.perfilService.getFuncionalidades()
            .then(res => {
                this.funcionalidades = Object.keys(res.json());
            })
            .catch(error => {
                console.log(error.text());
            })
                  
    }
    
    save() {
        super.save(new PerfilBuilder().clone(this.perfil));
    }
    
    addPermissao() {
        this.perfil.getPermissoes().push(new PermissaoBuilder().initialize(new Permissao()));
    }
    
    removePermissao(i: number) {
        this.perfil.getPermissoes().splice(i, 1);
    }
    
    onDestroy() { 
        this.inscricao.unsubscribe();
    }
}
