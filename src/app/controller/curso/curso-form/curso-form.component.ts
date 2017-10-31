import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Curso } from './../../../model/curso';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { CursoBuilder } from './../curso.builder';
import { CursoService } from './../curso.service';

@Component( {
    selector: 'app-curso-form',
    templateUrl: './curso-form.html',
    styleUrls: ['./curso-form.css']
} )
export class CursoFormComponent extends GenericFormComponent<Curso> implements OnInit { 
    curso: Curso;
    
    constructor( private route: ActivatedRoute,
            private cursoService: CursoService) { 
            super(cursoService);
            
            this.goTo = "curso";
            this.curso = new CursoBuilder().initialize(this.curso);
        }
    
    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.cursoService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.curso = new CursoBuilder().clone(res.json());
                        } )
                        .catch( error => {
                            this.showPreload = false;
                            console.log( error );
                        } )
                }
            } );
        
    }
    
    save() {
        super.save(new CursoBuilder().clone(this.curso));
    }   
    
    
}