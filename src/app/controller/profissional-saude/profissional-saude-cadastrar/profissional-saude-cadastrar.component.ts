import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../../../global';
import { ProfissionalSaudeService } from './../profissional-saude.service';
import { GenericProfissionalSaudeComponent } from './../../../generics/generic.profissional-saude.component';

@Component( {
    selector: 'app-profissional-saude-cadastrar',
    templateUrl: './../profissional-saude-form/profissional-saude-form.html',
    styleUrls: ['./../profissional-saude-form/profissional-saude-form.css']
} )
export class ProfissionalSaudeCadastrarComponent extends GenericProfissionalSaudeComponent implements OnInit {

    private titulo = "Cadastrar";
    private corTitulo = GlobalVariable.COLOR_TITLE;
    //        private formulario: FormGroup;
    //        private profissionalSaudes: Array<profissionalSaude>;
    //        private profissionalSaudeFilter: profissionalSaudeFilter = new profissionalSaudeFilter();
    //        private verifyMsg: boolean = false;
    //        private colorMsg: string = "green";
    //        private msg: string = '';

    constructor( profissionalSaudeService: ProfissionalSaudeService,
        formBuilder: FormBuilder ) {
        super( profissionalSaudeService, formBuilder );
    }

    ngOnInit() {

//        this.profissionalSaudeService.list( this.profissionalSaudeFilter )
//            .then( res => {
//                this.profissionaisSaude = JSON.parse( JSON.stringify( res.json() ) );
//                console.log( res.json() );
//            } )
//            .catch( error => {
//                console.log( error )
//            } )

    }
    
    addTelefone() {
        super.addTelefone();
    }
    
    removeTelefone(index: number){
        super.removeTelefone(index);
    }

    addCurriculoCurso() {
        super.addCurriculoCurso();
    }

    removeCurriculoCurso(i: number) {
        super.removeCurriculoCurso(i);
    }
    
    addVacina() {
        super.addVacina();
    }
    
    removeVacina(i: number) {
        super.removeVacina(i);
    }
    
    isValid() {
        return super.isValid();
    }

    save() {
        super.save();
    }

    isPossibleDeactivate() {
        if ( this.formulario.dirty ) {
            return false;
        } else return true;
    }

    changedExtraHandler( evento: string ) {
        super.changedExtraHandler( evento );
    }
    
    parseStringToDate(data) {
        let s = data.split("/");
        let d: Date = new Date(Number.parseInt(s[2]), Number.parseInt(s[1]), Number.parseInt(s[0]));
        return d;
    }

}