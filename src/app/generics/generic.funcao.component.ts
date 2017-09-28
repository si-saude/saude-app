import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

import { Funcao } from './../model/funcao';
import { Curso } from './../model/curso';
import { FuncaoService } from './../controller/funcao/funcao.service';
import { FuncaoFilter } from './../controller/funcao/funcao.filter';
import { CursoFilter } from './../controller/curso/curso.filter';

export abstract class GenericFuncaoComponent {

    formulario: FormGroup;
    cursosArray: FormArray;
    cursos: Array<Object>;
    cursoFilter: CursoFilter = new CursoFilter();

    colorMsg: string;
    msg: string;
    verifyMsg: boolean = false;
    funcaoService: FuncaoService;
    funcaoFilter: FuncaoFilter = new FuncaoFilter();
    formBuilder: FormBuilder;

    constructor( funcaoService: FuncaoService,
        formBuilder: FormBuilder ) {
        this.funcaoService = funcaoService;
        this.formBuilder = formBuilder;
        
        this.funcaoService.getCursos( this.cursoFilter )
            .then(res => {
                this.cursos = res.json();
                console.log(res.json());
            })
            .catch(error => {
                console.log(error);
            })
        
    }

    addCurso() {
        let curso = new FormGroup({});
        curso.addControl("curso", new FormControl(null));
        curso.addControl("id", new FormControl(0));
        curso.addControl("version", new FormControl(0));
        
        this.cursosArray.push(curso);
    }

    removeCurso(i: number) {
        this.cursosArray.removeAt(i);
    }
    
    isValid() {
        if ( this.formulario.valid ) {
            return true;
        } else { return false; }
    }

    save() {
        this.funcaoService.submit( this.formulario.value )
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
    
    changedExtraHandler(evento: string) {
        if ( evento != undefined ) {
            if ( evento.length > 3 ) {
                
//              this.funcaoService.getCursos(evento)
//                  .then(res => {
//                      this.cursos = JSON.parse('[{"data":' + JSON.stringify(res.json()) + '}]')); 
//                  });
//                this.cursos = "['data':{'apple': null, 'google': null}}]";
                                
            }
        }
    }

}