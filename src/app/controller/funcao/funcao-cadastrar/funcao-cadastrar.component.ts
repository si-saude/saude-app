import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../../../global';
import { FuncaoService } from './../funcao.service';
import { FuncaoFilter } from './../funcao.filter';
import { Funcao } from './../../../model/funcao';
import { GenericFuncaoComponent } from './../../../generics/generic.funcao.component';

@Component( {
    selector: 'app-funcao-cadastrar',
    templateUrl: './../funcao-form/funcao-form.html',
    styleUrls: ['./../funcao-form/funcao-form.css']
} )
export class FuncaoCadastrarComponent extends GenericFuncaoComponent implements OnInit {
    private titulo = "Cadastrar";
    private corTitulo = GlobalVariable.COLOR_TITLE;
//    private formulario: FormGroup;
//    private funcaos: Array<funcao>;
//    private funcaoFilter: funcaoFilter = new funcaoFilter();
//    private verifyMsg: boolean = false;
//    private colorMsg: string = "green";
//    private msg: string = '';

    constructor( funcaoService: FuncaoService,
            formBuilder: FormBuilder ) {
        super(funcaoService, formBuilder);
    }

    ngOnInit() {
        this.formulario = this.formBuilder.group( {
            nome: [null, Validators.required],
            id: [0],
            version: [0],
            cursos: this.formBuilder.array([
                this.formBuilder.group({
                    curso: [null, Validators.required],
                    id: [0],
                    version: [0]
                }),
            ]),
        } );
        
        this.cursosArray = this.formulario.get('cursos') as FormArray;

    }
    
    addCurso() {
        super.addCurso();
    }
    
    removeCurso(i: number) {
        super.removeCurso(i);
    }

    isValid() {
        return super.isValid();
    }

    save() {
        super.save();
    }
    
    changedExtraHandler(evento: string) {
        super.changedExtraHandler(evento);
    }
    
    isPossibleDeactivate() {
        if( this.formulario.dirty ) {
            return false;
        } else return true;
    }

}