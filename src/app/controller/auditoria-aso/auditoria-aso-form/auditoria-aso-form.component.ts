import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { RequisitoAso } from './../../../model/requisito-aso';
import { RequisitoAsoBuilder } from './../../requisito-aso/requisito-aso.builder'; 
import { Usuario } from './../../../model/usuario';
import { UsuarioBuilder } from './../../usuario/usuario.builder';
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
    requisitosAso: Array<RequisitoAso>;

    constructor( private route: ActivatedRoute,
        private auditoriaAsoService: AuditoriaAsoService,
        router: Router) {
        super( auditoriaAsoService, router );

        this.goTo = "auditoria-aso";
        this.aso = new AsoBuilder().initialize( this.aso );
        this.requisitosAso = new RequisitoAsoBuilder().initializeList(new Array<RequisitoAso>());
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
                            this.getRequisitos();
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
        
    }
    
    getRequisitos() {
        this.auditoriaAsoService.getRequisitos()
            .then(res => {
                this.requisitosAso = new RequisitoAsoBuilder().cloneList(res.json());
                
                this.auditoriaAsoService.getListExame(this.aso).then(res => {
                    let requisitosAsoExame: Array<RequisitoAso>;
                    requisitosAsoExame = new RequisitoAsoBuilder().cloneList(res.json());
                    
                    if(requisitosAsoExame != undefined && requisitosAsoExame != null
                            && requisitosAsoExame.length > 0){
//                        this.requisitosAso.push(requisitosAsoExame);
                        
                        requisitosAsoExame.forEach(item => this.requisitosAso.push(item));
                    }
                    
                }).catch(error => {
                    console.log("Erro ao retornar os requisitos do aso.");
                });
            })
            .catch(error => {
                console.log("Erro ao retornar os requisitos do aso.");
            })
    }
    
    save() {
        this.getRequisitosNaoConformes();
        super.save( new AsoBuilder().clone( this.aso ) );
    }
    
    getRequisitosNaoConformes() {
        let conteudoRequisito: string = "";
        this.requisitosAso.forEach(rA => {
            if ( rA.getConforme() == false )
                conteudoRequisito += rA.getConteudo() + "/";
        })
        
        if ( conteudoRequisito.length > 0 )
            this.aso.setNaoConformidades(conteudoRequisito.slice(0, -1));
        else this.aso.setNaoConformidades( "" );
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