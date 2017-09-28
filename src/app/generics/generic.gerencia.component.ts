import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { Gerencia } from './../model/gerencia';
import { GerenciaService } from '../controller/gerencia/gerencia.service';
import { GerenciaFilter } from '../controller/gerencia/gerencia.filter';

export abstract class GenericGerenciaComponent {

    formulario: FormGroup;
    gerencias: Array<Gerencia>;
    gerencia: Gerencia;
    colorMsg: string;
    msg: string;
    verifyMsg: boolean = false;
    gerenciaService: GerenciaService;
    gerenciaFilter: GerenciaFilter = new GerenciaFilter();
    formBuilder: FormBuilder;

    constructor( gerenciaService: GerenciaService,
        formBuilder: FormBuilder ) {
        this.gerenciaService = gerenciaService;
        this.formBuilder = formBuilder;
    }

    isValid() {
        if ( this.formulario.valid ) {
            return true;
        } else { return false; }
    }

    save() {
        if ( this.formulario.value.gerencia == '' ) {
            this.formulario.value.gerencia = null;
        } else {
            let gerencia: Gerencia = new Gerencia();
            let id = this.formulario.value.gerencia;
            this.formulario.value.gerencia = gerencia;
            this.formulario.value.gerencia.id = id;
        }
        this.gerenciaService.submit( this.formulario.value )
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

}