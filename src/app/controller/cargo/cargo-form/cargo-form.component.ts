import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Cargo } from './../../../model/cargo';
import { Curso } from './../../../model/curso';
import { CursoBuilder } from './../../curso/curso.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { CargoBuilder } from './../cargo.builder';
import { CargoService } from './../cargo.service';

@Component( {
    selector: 'app-cargo-form',
    templateUrl: './cargo-form.html',
    styleUrls: ['./cargo-form.css', './../../../../assets/css/form-component.css']
} )
export class CargoFormComponent extends GenericFormComponent implements OnInit { 
    cargo: Cargo;
    cursos: Array<Curso>;
    cursosSelecteds: Array<Curso>;
    
    constructor( private route: ActivatedRoute,
            private cargoService: CargoService) { 
            super(cargoService);
            
            this.goTo = "cargo";
            this.cargo = new CargoBuilder().initialize(this.cargo);
        }
    
    ngOnInit() {
        this.cursosSelecteds = new Array<Curso>();
        
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.cargoService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.cargo = new CargoBuilder().clone(res.json());
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
        
        this.getCursos();
        
    }
    
    save() {
        super.save(new CargoBuilder().clone(this.cargo));
    }
    
    getCursos(){
        this.cargoService.getCursos()
        .then(res => {
            this.cursos = new CursoBuilder().cloneList(res.json());
        })
        .catch(error => {
            console.log(error);
        });
    }
    
    addCurso(valor: number) {
        if ( valor != 0 ) {
            let c = this.cursosSelecteds.find(c => c.getId() == valor);
            if ( c == undefined ) {
                let curso: Curso = this.cursos.find(c => c.getId() == valor);
                this.cursosSelecteds.push(curso);
                this.cargo.setCursos(this.cursosSelecteds);
            }
        }
    }

    removeCurso(i: number) {
        this.cargo.getCursos().splice(i, 1);
    }
    
}