import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../../../global';
import { CargoService } from './../cargo.service';
import { CargoFilter } from './../cargo.filter';
import { Cargo } from './../../../model/cargo';
import { GenericCargoComponent } from './../../../generics/generic.cargo.component';

@Component( {
    selector: 'app-cargo-cadastrar',
    templateUrl: './../cargo-form/cargo-form.html',
    styleUrls: ['./../cargo-form/cargo-form.css']
} )
export class CargoCadastrarComponent extends GenericCargoComponent implements OnInit {
    private titulo = "Cadastrar";
    private corTitulo = GlobalVariable.COLOR_TITLE;
//    private formulario: FormGroup;
//    private funcaos: Array<funcao>;
//    private funcaoFilter: funcaoFilter = new funcaoFilter();
//    private verifyMsg: boolean = false;
//    private colorMsg: string = "green";
//    private msg: string = '';

    constructor( funcaoService: CargoService,
            formBuilder: FormBuilder ) {
        super(funcaoService, formBuilder);
    }

    ngOnInit() {
        
    }
    
    addCurso(valor) {
//        console.log(valor);
        super.addCurso(valor);
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