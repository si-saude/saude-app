import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

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
        
        this.formulario = this.formBuilder.group({
            nome: [null, Validators.required],
            id: [0],
            version: [0],
            cursos: this.formBuilder.array([
                this.formBuilder.group({
                    nome: [''],
                    descricao: [''],
                    validade: [0],
                    id: [0],
                }),
            ]),
        } );
        
        this.cursosArray = this.formulario.get('cursos') as FormArray;
        this.cursosArray.removeAt(0);
        
        this.funcaoService.getCursos( this.cursoFilter )
//            .then(res => {
//                this.cursos = res.json();
//            })
//            .catch(error => {
//                console.log(error);
//            })
    }

    addCurso(valor: number) {
        this.funcaoService.getCursoById(valor)
//            .then(res => {
//                let curso = new FormGroup({});
//                curso.addControl("nome", new FormControl(res.json().nome));
//                curso.addControl("descricao", new FormControl(res.json().descricao));
//                curso.addControl("validade", new FormControl(res.json().validade));
//                curso.addControl("id", new FormControl(res.json().id));
//                this.cursosArray.push(curso);
//            })
        
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
        console.log(this.formulario.value);
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
                
                this.funcaoService.getCursos( this.cursoFilter )
//                    .then(res => {
//                        console.log(JSON.parse('[{"data":' + JSON.stringify(res.json()) + '}]'));
////                        this.cursos = JSON.parse('[{"data":' + JSON.stringify(res.json()) + '}]');
//                        console.log(res.json());
//                    })
//                    .catch(error => {
//                        console.log(error);
//                    })
                
            }
        }
    }

}