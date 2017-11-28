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
    selector: 'app-usuario-form',
    templateUrl: './usuario-form.html',
    styleUrls: ['./usuario-form.css']
} )
export class UsuarioFormComponent extends GenericFormComponent implements OnInit { 
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
                if( params['id'] !== undefined ) {
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
                }
            } );
        
        this.usuarioService.getPerfis()
            .then(res => {
                this.perfis = new PerfilBuilder().cloneList(res.json());
            })
            .catch(error => {
                console.log(error);
            })
        
    }
    
    save() {
        super.save(new UsuarioBuilder().clone(this.usuario));
    }

    addPerfil( value ) {
        let perfil: Perfil = this.perfis.find(p => {
            return p.getId() == value;
        });
    
        this.usuario.getPerfis().push(perfil);
    }
    
    removePerfil( index ) {
        this.usuario.getPerfis().splice(index, 1);
    }
    
    
}