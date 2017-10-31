import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Cargo } from './../../../model/cargo';
import { Curso } from './../../../model/curso';
import { Vacina } from './../../../model/vacina';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { CargoBuilder } from './../cargo.builder';
import { CargoService } from './../cargo.service';

@Component( {
    selector: 'app-cargo-form',
    templateUrl: './cargo-form.html',
    styleUrls: ['./cargo-form.css']
} )
export class CargoFormComponent extends GenericFormComponent<Cargo> implements OnInit { 
    cargo: Cargo;
    cursos: Array<Curso>;
    vacinas: Array<Vacina>;
    cursosSelecteds: Array<Curso>;
    vacinasSelecteds: Array<Vacina>;
    
    constructor( private route: ActivatedRoute,
            private cargoService: CargoService) { 
            super(cargoService);
            
            this.goTo = "cargo";
            this.cargo = new CargoBuilder().initialize(this.cargo);
        }
    
    ngOnInit() {
        this.cursosSelecteds = new Array<Curso>();
        this.vacinasSelecteds = new Array<Vacina>();
        
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
                            this.showPreload = false;
                            console.log( error );
                        } )
                }
            } );
        
        this.cargoService.getCursos()
            .then(res => {
                this.cursos = res.json();
            })
            .catch(error => {
                console.log(error);
            })
        
        this.cargoService.getVacinas()
            .then(res => {
                this.vacinas = res.json();
            })
            .catch(error => {
                console.log(error);
            })
    }
    
    save() {
        super.save(new CargoBuilder().clone(this.cargo));
    }   
    
    addCurso(valor: number) {
        this.cargoService.getCursoById(valor)
            .then(res => {
                this.cursosSelecteds.push(res.json());
                this.cargo.setCursos(this.cursosSelecteds);
            })
            .catch(error => {
                console.log(error);
            })
    }

    removeCurso(i: number) {
        this.cargo.getCursos().splice(i, 1);
    }
    
    addVacina(valor: number) {
        this.cargoService.getVacinaById(valor)
            .then(res => {
                this.vacinasSelecteds.push(res.json());
                this.cargo.setVacinas(this.vacinasSelecteds);
            })
            .catch(error => {
                console.log(error);
            })
    }

    removeVacina(i: number) {
        this.cargo.getVacinas().splice(i, 1);
    }
    
}