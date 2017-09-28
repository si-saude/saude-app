import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../../../global';
import { GerenciaService } from './../gerencia.service';
import { GerenciaFilter } from './../gerencia.filter';
import { Gerencia } from './../../../model/gerencia';
import { GenericGerenciaComponent } from './../../../generics/generic.gerencia.component';

@Component( {
    selector: 'app-gerencia-cadastrar',
    templateUrl: './../gerencia-form/gerencia-form.html',
    styleUrls: ['./../gerencia-form/gerencia-form.css']
} )
export class GerenciaCadastrarComponent extends GenericGerenciaComponent implements OnInit {
    private titulo = "Cadastrar";
    private corTitulo = GlobalVariable.COLOR_TITLE;
//    private formulario: FormGroup;
//    private gerencias: Array<Gerencia>;
//    private gerenciaFilter: GerenciaFilter = new GerenciaFilter();
//    private verifyMsg: boolean = false;
//    private colorMsg: string = "green";
//    private msg: string = '';

    constructor( gerenciaService: GerenciaService,
            formBuilder: FormBuilder ) {
        super(gerenciaService, formBuilder);
    }

    ngOnInit() {
        this.formulario = this.formBuilder.group( {
            codigo: [null, Validators.required],
            id: [0],
            version: [0],
            descricao: [''],
            gerencia: ['']
        } );
        
        this.gerenciaService.selectList(this.gerenciaFilter)
            .then(res => {
                this.gerencias = JSON.parse(JSON.stringify(res.json()));
                console.log(res.json());
            })
            .catch(error => {
                console.log(error)
            })

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