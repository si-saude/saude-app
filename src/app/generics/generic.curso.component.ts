import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

import { Curso } from './../model/curso';
import { CursoService } from './../controller/curso/curso.service';
import { CursoFilter } from './../controller/curso/curso.filter';

export abstract class GenericCursoComponent {

    formulario: FormGroup;
    cursosArray: FormArray;
    cursoFilter: CursoFilter = new CursoFilter();

    colorMsg: string;
    msg: string;
    verifyMsg: boolean = false;
    cursoService: CursoService;
    formBuilder: FormBuilder;

    constructor( cursoService: CursoService,
        formBuilder: FormBuilder ) {
        this.cursoService = cursoService;
        this.formBuilder = formBuilder;
        
    }
    
    isValid() {
        if ( this.formulario.valid ) {
            return true;
        } else { return false; }
    }

    save() {
        this.cursoService.submit( this.formulario.value )
            .then( res => {
                this.verifyMsg = true;
                this.colorMsg = "green";
                this.msg = res.text();
            } )
            .catch( error => {
                this.verifyMsg = true;
                this.colorMsg = "red";
                this.msg = error.text();
            } )
    }
    
//    changedExtraHandler(evento: string) {
//        if ( evento != undefined ) {
//            if ( evento.length > 3 ) {
//                
////                this.cursoService.getCursos( this.cursoFilter )
////                    .then(res => {
////                        console.log(JSON.parse('[{"data":' + JSON.stringify(res.json()) + '}]'));
//////                        this.cursos = JSON.parse('[{"data":' + JSON.stringify(res.json()) + '}]');
////                        console.log(res.json());
////                    })
////                    .catch(error => {
////                        console.log(error);
//                    })
//                
//            }
//        }
//    }

}