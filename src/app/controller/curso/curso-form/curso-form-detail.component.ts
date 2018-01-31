import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Curso } from './../../../model/curso';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { CursoBuilder } from './../curso.builder';
import { CursoService } from './../curso.service';

@Component( {
    selector: 'app-curso-form-detail',
    templateUrl: './curso-form-detail.html',
    styleUrls: ['./curso-form.css', './../../../../assets/css/form-component.css']
} )
export class CursoFormDetailComponent extends GenericFormComponent implements OnInit { 
    curso: Curso;
    
    constructor( private route: ActivatedRoute,
            private cursoService: CursoService,
            router: Router) { 
            super(cursoService, router);
            
            this.goTo = "curso";
            this.curso = new CursoBuilder().initialize(this.curso);
        }
    
    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {                
                let id = params['id'];
                this.showPreload = true;

                this.cursoService.get( id )
                    .then( res => {
                        this.showPreload = false;
                        this.curso = new CursoBuilder().clone(res.json());
                    } )
                    .catch( error => {
                        this.catchConfiguration( error );
                    } )
            } );
        
    }
    
}