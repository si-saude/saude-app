import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../../../global';
import { GerenciaService } from './../gerencia.service';
import { GerenciaFilter } from './../gerencia.filter';
import { Gerencia } from './../../../model/gerencia';

@Component( {
    selector: 'app-gerencia-cadastrar',
    templateUrl: './../gerencia-form/gerencia-form.html',
    styleUrls: ['./../gerencia-form/gerencia-form.css']
} )
export class GerenciaCadastrarComponent implements OnInit {
    private titulo = "Cadastrar";
    private corTitulo = GlobalVariable.COLOR_TITLE;
    private formulario: FormGroup;
    private gerencias: Array<Gerencia>;
    private gerenciaFilter: GerenciaFilter = new GerenciaFilter();
    private verifyMsg: boolean = false;
    private colorMsg: string = "green";
    private msg: string = '';

    constructor( private gerenciaService: GerenciaService,
            private formBuilder: FormBuilder ) {
    }

    ngOnInit() {
        this.formulario = this.formBuilder.group( {
            codigo: [null, Validators.required],
            id: [0],
            version: [0],
            descricao: [''],
            gerencia: [null]
        } );
        
        this.gerenciaService.list(this.gerenciaFilter)
            .then(res => {
                this.gerencias = JSON.parse(JSON.stringify(res.json())).list;
            })
            .catch(error => {
                console.log(error)
            })

    }

    isValid() {
        if ( this.formulario.valid ) {
            return true;
        } else { return false; }

    }

    save() {
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
            } );
    }

}