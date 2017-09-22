import { Component, OnInit } from '@angular/core'; 
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms'; 

import 'rxjs/add/operator/toPromise'; 

import { GlobalVariable } from './../../../global'; 
import { EquipeService } from './../equipe.service'; 

@Component({
  selector: 'app-equipe-cadastrar',
  templateUrl: './../equipe-form/equipe-form.html',
  styleUrls: ['./../equipe-form/equipe-form.css']
})
export class EquipeCadastrarComponent implements OnInit {
    private titulo = "Cadastrar";
    private corTitulo = GlobalVariable.COLOR_TITLE;
    private formulario: FormGroup;
//    private permissoesArray: FormArray;   
//    private funcoes: Array<Object>; 
    private verifyMsg: boolean = false;
    private colorMsg: string = "green";
    private msg: string = '';
    
    constructor(private equipeService: EquipeService, 
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
        this.equipeService.submit(this.formulario.value)
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