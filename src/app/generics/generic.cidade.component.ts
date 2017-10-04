import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

import { Cidade } from './../model/cidade';
import { CidadeService } from './../controller/cidade/cidade.service';
import { CidadeFilter } from './../controller/cidade/cidade.filter';

export abstract class GenericCidadeComponent {

    formulario: FormGroup;
    cidadesArray: FormArray;
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

    save() {
        this.cidadeService.submit( this.formulario.value )
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
    
//    changedExtraHandler(evento: string) {
//        if ( evento != undefined ) {
//            if ( evento.length > 3 ) {
//                
////                this.cidadeService.getcidades( this.cidadeFilter )
////                    .then(res => {
////                        console.log(JSON.parse('[{"data":' + JSON.stringify(res.json()) + '}]'));
//////                        this.cidades = JSON.parse('[{"data":' + JSON.stringify(res.json()) + '}]');
////                        console.log(res.json());
////                    })
////                    .catch(error => {
////                        console.log(error);
//                    })
//                
//            }
//        }
//    }

}