import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Usuario } from './../../../model/usuario';
import { UsuarioBuilder } from './../../usuario/usuario.builder';
import { ItemAuditoriaAsoBuilder } from './../../item-auditoria-aso/item-auditoria-aso.builder';
import { Aso } from './../../../model/aso';
import { AsoBuilder } from './../../aso/aso.builder';
import { AuditoriaAsoService } from './../auditoria-aso.service';
import { GenericFormComponent } from './../../../generics/generic.form.component';

@Component( {
    selector: 'app-auditoria-aso-form',
    templateUrl: './auditoria-aso-form.html',
    styleUrls: ['./auditoria-aso-form.css', './../../../../assets/css/form-component.css']
} )
export class AuditoriaAsoFormComponent extends GenericFormComponent implements OnInit {
    aso: Aso;
    usuario: Usuario;
    selectAll: boolean;

    constructor( private route: ActivatedRoute,
        private auditoriaAsoService: AuditoriaAsoService,
        router: Router) {
        super( auditoriaAsoService, router );

        this.goTo = "auditoria-aso";
        this.aso = new AsoBuilder().initialize( this.aso );
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if ( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.service.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.aso = new AsoBuilder().clone( res.json() );
                            this.aso.setConforme(false);
                            this.getAndSetUsuario();
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
        
    }
    
    selecionarTodos() {
        setTimeout(() => {
            if ( this.selectAll )
                this.aso.getItemAuditoriaAsos().forEach(rA => rA.setConforme(true))
            else this.aso.getItemAuditoriaAsos().forEach(rA => rA.setConforme(false));
        }, 100);
    }
    
    save() {
        super.save( new AsoBuilder().clone( this.aso ) );
    }
    
    getAndSetUsuario() {
        this.auditoriaAsoService.getUsuarioById( Number( localStorage.getItem("usuario-id") ) )
            .then(res => {
                this.usuario = new UsuarioBuilder().clone( res.json() );
                this.aso.setUsuario(this.usuario);
            })
            .catch(error => {
                console.log("Erro ao pegar o usuario do servidor.");
            })
    }
    
    ngOnDestroy() {
        this.inscricao.unsubscribe();
    }
}