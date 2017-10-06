import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

import { Cidade } from './../model/cidade';
import { CidadeService } from './../controller/cidade/cidade.service';
import { CidadeFilter } from './../controller/cidade/cidade.filter';

export abstract class GenericCidadeComponent {

    formulario: FormGroup;
    cidadeFilter: CidadeFilter = new CidadeFilter();

    colorMsg: string;
    msg: string;
    verifyMsg: boolean = false;
    cidadeService: CidadeService;
    formBuilder: FormBuilder;

    constructor( cidadeService: CidadeService,
        formBuilder: FormBuilder ) {
        this.cidadeService = cidadeService;
        this.formBuilder = formBuilder;
        
    }
    
    isValid() {
        if ( this.formulario.valid ) {
            return true;
        } else { return false; }
    }
    
    processReturn(sucess:boolean, res:any){
        if(sucess){
            this.verifyMsg = true;
            this.colorMsg = "green";
            this.msg = res.text();
        }else{
            this.verifyMsg = true;
            this.colorMsg = "red";
            this.msg = res.text();
        }
    }

    save() {
        this.cidadeService.submit( this.formulario.value )
            .then( res => {
                this.processReturn(true,res);
            } )
            .catch( error => {
                this.processReturn(false,error);
            } )
    }
}