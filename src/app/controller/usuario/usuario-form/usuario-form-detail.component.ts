import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Usuario } from './../../../model/usuario';
import { Perfil } from './../../../model/perfil';
import { PerfilBuilder } from './../../perfil/perfil.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { UsuarioBuilder } from './../usuario.builder';
import { UsuarioService } from './../usuario.service';

@Component( {
    selector: 'app-usuario-form-detail',
    templateUrl: './usuario-form-detail.html',
    styleUrls: ['./usuario-form.css', './../../../../assets/css/form-component.css']
} )
export class UsuarioFormDetailComponent extends GenericFormComponent implements OnInit { 
    usuario: Usuario;
    perfis: Array<Perfil>;
    
    constructor( private route: ActivatedRoute,
            private usuarioService: UsuarioService) { 
            super(usuarioService);
            this.goTo = "usuario";
            
            this.perfis = new PerfilBuilder().initializeList(this.perfis);
            this.usuario = new UsuarioBuilder().initialize(this.usuario);
        }
    
    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                let id = params['id'];
                this.showPreload = true;

                this.usuarioService.get( id )
                    .then( res => {
                        this.showPreload = false;
                        this.usuario = new UsuarioBuilder().clone(res.json());
                    } )
                    .catch( error => {
                        this.catchConfiguration( error );
                    } )
            } );
        
        this.usuarioService.getPerfis()
            .then(res => {
                this.perfis = new PerfilBuilder().cloneList(res.json());
            })
            .catch(error => {
                console.log(error);
            })
        
    }
    
}