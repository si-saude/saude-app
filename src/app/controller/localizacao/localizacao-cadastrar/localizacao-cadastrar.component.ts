import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../../../global';
import { LocalizacaoService } from './../localizacao.service';

@Component({
  selector: 'app-localizacao-cadastrar',
  templateUrl: './../localizacao-form/localizacao-form.html',
  styleUrls: ['./../localizacao-form/localizacao-form.css']
})
export class LocalizacaoCadastrarComponent implements OnInit {
    private titulo = "Cadastrar";
    private corTitulo = GlobalVariable.COLOR_TITLE;
    private formulario: FormGroup;
//    private permissoesArray: FormArray;  
//    private funcoes: Array<Object>;
    private verifyMsg: boolean = false;
    private colorMsg: string = "green";
    private msg: string = '';
    
    constructor(private localizacaoService: LocalizacaoService, 
            private formBuilder: FormBuilder) { 
    }

    ngOnInit() {
        this.formulario = this.formBuilder.group({
            nome: [null, Validators.required],
            id: [0],
            version: [0]
        });
    }
    
    save() {
        this.localizacaoService.submit(this.formulario.value)
            .then(res => {
                this.verifyMsg = true;
                this.colorMsg = "green";
                this.msg = res.text();
            })
            .catch(error => {
                this.verifyMsg = true;
                this.colorMsg = "red";
                this.msg = error.text();
            })
    }
  
    isValid() {
        if ( this.formulario.valid ) { 
            return true;
        } else { return false; }    
    }
    
  }