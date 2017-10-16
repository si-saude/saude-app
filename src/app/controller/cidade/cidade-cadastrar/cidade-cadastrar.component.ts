import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../../../global';
import { CidadeService } from './../cidade.service';
import { CidadeFilter } from './../cidade.filter';
import { Cidade } from './../../../model/cidade';
import { GenericCidadeComponent } from './../../../generics/generic.cidade.component';
import { GenericFormComponent } from './../../../generics/generic.form.component';

@Component( {
    selector: 'app-cidade-cadastrar',
    templateUrl: './../cidade-form/cidade-form.html',
    styleUrls: ['./../cidade-form/cidade-form.css']
} )
export class CidadeCadastrarComponent extends GenericFormComponent<Cidade> implements OnInit {
    private cidade: Cidade;

    constructor( cidadeService: CidadeService ) {
        super(cidadeService);
        
        this.cidade = new Cidade();
    }

    ngOnInit() {
        
        this.cidade.setNome(null);
        this.cidade.setUf(null);
        this.cidade.setId(0);
        this.cidade.setVersion(0);
        
    }
    
    isPossibleDeactivate() {
//        if( this.formulario.dirty ) {
//            return false;
//        } else return true;
    }

}