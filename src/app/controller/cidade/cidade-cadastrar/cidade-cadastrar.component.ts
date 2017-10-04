import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../../../global';
import { CidadeService } from './../cidade.service';
import { CidadeFilter } from './../cidade.filter';
import { Cidade } from './../../../model/cidade';
import { GenericCidadeComponent } from './../../../generics/generic.cidade.component';

@Component( {
    selector: 'app-cidade-cadastrar',
    templateUrl: './../cidade-form/cidade-form.html',
    styleUrls: ['./../cidade-form/cidade-form.css']
} )
export class CidadeCadastrarComponent extends GenericCidadeComponent implements OnInit {
    private titulo = "Cadastrar Cidade";
    private corTitulo = GlobalVariable.COLOR_TITLE;

    constructor( cidadeService: CidadeService,
            formBuilder: FormBuilder ) {
        super(cidadeService, formBuilder);
    }

    ngOnInit() {
        this.formulario = this.formBuilder.group( {
            nome: [null, Validators.required],
            uf: [null],
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