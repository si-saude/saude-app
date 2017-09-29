import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../../../global';
import { CursoService } from './../curso.service';
import { CursoFilter } from './../curso.filter';
import { Curso } from './../../../model/curso';
import { GenericCursoComponent } from './../../../generics/generic.curso.component';

@Component( {
    selector: 'app-curso-cadastrar',
    templateUrl: './../curso-form/curso-form.html',
    styleUrls: ['./../curso-form/curso-form.css']
} )
export class CursoCadastrarComponent extends GenericCursoComponent implements OnInit {
    private titulo = "Cadastrar";
    private corTitulo = GlobalVariable.COLOR_TITLE;

    constructor( cursoService: CursoService,
            formBuilder: FormBuilder ) {
        super(cursoService, formBuilder);
    }

    ngOnInit() {
        this.formulario = this.formBuilder.group( {
            nome: [null, Validators.required],
            descricao: [null],
            validade: [0],
            id: [0],
            version: [0]
        } );
    }
    
    isValid() {
        return super.isValid();
    }

    save() {
        super.save();
    }
    
    isPossibleDeactivate() {
        if( this.formulario.dirty ) {
            return false;
        } else return true;
    }

}