import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Usuario } from './../../../model/usuario';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { UsuarioBuilder } from './../usuario.builder';
import { UsuarioService } from './../usuario.service';

@Component( {
    selector: 'app-usuario-form',
    templateUrl: './usuario-form.html',
    styleUrls: ['./usuario-form.css']
} )
export class UsuarioFormComponent extends GenericFormComponent implements OnInit { 
    usuario: Usuario;
    
    constructor( private route: ActivatedRoute,
            private usuarioService: UsuarioService) { 
            super(usuarioService);
            this.goTo = "usuario";
            
            this.usuario = new UsuarioBuilder().initialize(this.usuario);
        }
    
    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.usuarioService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.usuario = new UsuarioBuilder().clone(res.json());
                        } )
                        .catch( error => {
                            this.showPreload = false;
                            console.log( error );
                        } )
                }
            } );
        
    }
    
    save() {
        super.save(new UsuarioBuilder().clone(this.usuario));
    }   
    
    
}